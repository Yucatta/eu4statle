import React, { useMemo } from "react";
interface props {
  thisguess: [string | number, number];
  coordinates: number[];
}
const Guesses = ({ thisguess, coordinates }: props) => {
  const distance = useMemo(() => {
    if (coordinates) {
      const R = 6371; // metres
      const φ1 = (coordinates[0] * Math.PI) / 180; // φ, λ in radians
      const φ2 = (coordinates[2] * Math.PI) / 180;
      const Δφ = ((coordinates[2] - coordinates[0]) * Math.PI) / 180;
      const Δλ = ((coordinates[3] - coordinates[1]) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      // console.log(coordinates);
      return Math.floor(R * c);
    } else {
      return;
    }
  }, [coordinates]);
  const direction = useMemo(() => {
    if (coordinates) {
      const a =
        -(
          Math.atan2(
            coordinates[1] - coordinates[3],
            coordinates[0] - coordinates[2]
          ) * 180
        ) / Math.PI;
      // console.log(a);
      // console.log(coordinates);
      if (a >= 0) {
        if (a <= 22.5) {
          return "➡️";
        } else if (a <= 77.5) {
          return "↗️";
        } else if (a <= 112.5) {
          return "⬆️";
        } else if (a <= 157.5) {
          return "↖️";
        } else {
          return "⬅️";
        }
      } else {
        if (-a <= 22.5) {
          return "➡️";
        } else if (-a <= 77.5) {
          return "↘️";
        } else if (-a <= 112.5) {
          return "⬇️";
        } else if (-a < 157.5) {
          return "↙️";
        } else {
          return "⬅️";
        }
      }
    } else {
      return;
    }
  }, [coordinates]);
  // console.log(direction, "direction");

  return (
    <>
      {typeof thisguess[0] === "string" ? (
        <div className="w-full h-11 flex flex-row justify-between mb-1">
          <span className="h-full rounded-xl w-1/2 border-2 border-neutral-300 mb-1 bg-gray-900 text flex justify-center items-center">
            {thisguess[0]}
          </span>
          <span className="h-full rounded-xl w-3/14 border-2 border-neutral-300 mb-1 bg-gray-900 text flex justify-center items-center">
            {distance}KM
          </span>
          <span className="h-full w-20 rounded-xl  border-2 border-neutral-300 mb-1 bg-gray-900 text flex justify-center items-center">
            {!distance ? "✅" : direction}
          </span>
        </div>
      ) : (
        <div className="w-full h-11 rounded-2xls mb-1 bg-neutral-700 text flex justify-center items-center">
          <span></span>
        </div>
      )}
    </>
  );
};

export default Guesses;

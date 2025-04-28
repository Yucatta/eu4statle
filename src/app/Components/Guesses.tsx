import { useGameState } from "@/context/gamecontext";
import React, { useEffect, useMemo } from "react";
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

      return [Math.floor(R * c)];
    } else {
      return;
    }
  }, [coordinates]);
  return (
    <>
      {typeof thisguess[0] === "string" ? (
        <div className="w-7/8 h-11 flex flex-row justify-between">
          <span className="h-full rounded-xl w-1/2 border-2 border-neutral-300 mb-1 bg-neutral-800 text flex justify-center items-center">
            {thisguess[0]}
          </span>
          <span className="h-full rounded-xl w-3/14 border-2 border-neutral-300 mb-1 bg-neutral-800 text flex justify-center items-center">
            {distance}KM
          </span>
          <span className="h-full rounded-xl w-1/10  border-2 border-neutral-300 mb-1 bg-neutral-800 text flex justify-center items-center">
            {/* {thisguess} */}ok
          </span>
          <span className="h-full rounded-xl w-1/10  border-2 border-neutral-300 mb-1 bg-neutral-800 text flex justify-center items-center">
            <img
              src={
                thisguess[1] < 823
                  ? "/Icon_states.png"
                  : "/Number_of_states.png"
              }
              className="size-5/6"
            ></img>
          </span>
        </div>
      ) : (
        <div className="w-7/8 h-11 rounded-full mb-1 bg-neutral-700 text flex justify-center items-center">
          <span></span>
        </div>
      )}
    </>
  );
};

export default Guesses;

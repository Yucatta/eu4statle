"use client";
import React, { useEffect, useState } from "react";

const GuessDistribution = () => {
  const [guessDistribution, setGuessDistribution] = useState<number[][]>([]);
  const [amountofplays, setamountofplays] = useState(0);
  const [maxstrek, setmaxstreak] = useState(0);
  const [streak, setstreak] = useState(0);
  const [diffucultyindex, setdiffucltyindex] = useState(0);
  useEffect(() => {
    const localstorage = localStorage.getItem("GuessDistributioneu4statle");

    if (localstorage) {
      setGuessDistribution(JSON.parse(localstorage));
    } else {
      const temp = [0, 0, 0].map(() => Array(5).fill(0));
      localStorage.setItem("GuessDistributioneu4statle", JSON.stringify(temp));
      setGuessDistribution(temp);
    }
    const timesplayed = localStorage.getItem("TimesPlayedeu4statle");
    if (timesplayed) {
      setamountofplays(Number(timesplayed));
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-2 w-full   justify-center ">
      <div
        className="flex items-center justify-center font-bold text-3xl"
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
      >
        Statistics
      </div>
      <div className="flex justify-center items-center">
        <div className="flex-row flex justify-evenly w-full  sm:w-2/3 gap-x-1 mb-2 text-3xl font-semibold items-center">
          {[
            [amountofplays, "Times Played"],
            [streak, "Win Percantage"],
            [streak, "Streak"],
            [maxstrek, "Max Streak"],
          ].map((values, index) => (
            <div
              key={index}
              className="flex justify-center items-center  flex-col w-5 "
            >
              <div>{values[0]}</div>
              <div className="text-[16px] flex justify-center text-center h-10 mt-2 items-center text-[rgb(176,176,176)]">
                {values[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex items-center justify-center font-bold text-3xl"
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
      >
        Guess Distribution
      </div>
      {(guessDistribution.length
        ? guessDistribution[diffucultyindex]
        : [0, 0, 0, 0, 0]
      ).map((length, index) => (
        <div
          className="flex flex-row  w-full "
          key={index}
          style={{
            marginLeft:
              typeof window !== "undefined" && window.innerWidth < 550
                ? "10vw"
                : "25%",
          }}
        >
          <div className="mr-1 font-bold text-xl w-5 flex justify-center">
            {index + 1}
            {index === 4 ? "+" : ""}
          </div>

          <div
            key={index}
            onClick={() => setdiffucltyindex(index)}
            className="h-6 flex justify-end max-w items-center bg-[rgb(64,31,128)] "
            style={{
              width: `calc(${
                (40 /
                  Math.max(
                    ...(guessDistribution.length
                      ? guessDistribution[diffucultyindex]
                      : [0, 0, 0, 0, 0])
                  )) *
                length
              }% + 60px)`,
            }}
          >
            <div className="mr-1 font-bold text-xl">{length}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessDistribution;

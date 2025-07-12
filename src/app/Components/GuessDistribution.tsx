"use client";
import { useGameState } from "@/context/gamecontext";
import React, { useEffect, useState } from "react";

const GuessDistribution = () => {
  const [guessDistribution, setGuessDistribution] = useState<number[][]>(
    Array(3).fill(Array(5).fill(0))
  );
  const [amountofplays, setamountofplays] = useState([0, 0, 0]);
  const [maxstrek, setmaxstreak] = useState([0, 0, 0]);
  const [streak, setstreak] = useState([0, 0, 0]);
  const { diffucultyindex, setdiffucltyindex } = useGameState();
  useEffect(() => {
    const localstorage = localStorage.getItem("GuessDistributioneu4statle");

    if (localstorage) {
      const distributaea: number[][] = JSON.parse(localstorage);
      console.log(distributaea);
      setGuessDistribution(distributaea.map((a) => a.slice(0, 5)));
      setamountofplays(
        distributaea.map((a) => a.slice(0, 5).reduce((b, c) => b + c, 0))
      );
    }
    const steasrask = localStorage.getItem("eu4statlestreak");
    console.log(steasrask);
    if (steasrask) {
      const streaka: number[][] = JSON.parse(steasrask);
      setstreak(streaka.map((dif) => dif[0]));
      setmaxstreak(streaka.map((dif) => dif[1]));
    }
  }, []);
  console.log(
    guessDistribution[diffucultyindex],
    (40 / Math.max(...guessDistribution[diffucultyindex])) * 0
  );
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
            [
              guessDistribution.map(
                (dif) =>
                  `${Math.floor(
                    (dif.slice(0, 5).reduce((a, b) => a + b, 0) /
                      (dif.reduce((a, b) => a + b, 0)
                        ? dif.reduce((a, b) => a + b, 0)
                        : 1)) *
                      100
                  )}%`
              ),
              "Win Percantage",
            ],
            [streak, "Streak"],
            [maxstrek, "Max Streak"],
          ].map((values, index) => (
            <div
              key={index}
              className="flex justify-center items-center  flex-col w-5 "
            >
              <div>{values[0][diffucultyindex]}</div>
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
      {guessDistribution[diffucultyindex].slice(0, 4).map((length, index) => (
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
          </div>

          <div
            key={index}
            onClick={() => setdiffucltyindex(index)}
            className="h-6 flex justify-end max-w items-center bg-[rgb(64,31,128)] "
            style={{
              width: `calc(${
                length
                  ? (40 / Math.max(...guessDistribution[diffucultyindex])) *
                    length
                  : 0
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

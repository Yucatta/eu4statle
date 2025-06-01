"use client";
// import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";
import CardContainer from "./Components/CardContainer";
import { useGameState } from "@/context/gamecontext";
import useGameFunction from "@/hooks/utilitys";
import { useState } from "react";
export default function Home() {
  const { isgameover, setisgameover } = useGameState();
  const [diffuculty, setdiffuclty] = useState(0);
  const { ChangeRndNum } = useGameFunction();
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div
          className={
            isgameover
              ? "w-[clamp(100vh,50vw,60vw)] h-max bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
              : "w-[clamp(100vh,50vw,60vw)] h-screen bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
          }
        >
          <header className="h-10 w-full font-bold  bg-[rgb(4,5,9)] flex items-center justify-center border-b-2  ">
            EU4 STATLE
          </header>
          <StateGuesses></StateGuesses>
          {/* <CardContainer></CardContainer> */}
          {isgameover ? <CardContainer></CardContainer> : ""}
          <div>
            {[0, 1, 2].map((index) => {
              return (
                <button
                  className={
                    diffuculty == index
                      ? "h-10 w-25 bg-[rgb(9,29,42)]  rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150 scale-90 active:scale-80"
                      : "h-10 w-25 bg-[rgb(23,73,100)] rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150  active:scale-90"
                  }
                  onClick={() => {
                    setdiffuclty(index);
                    ChangeRndNum(index);
                    setisgameover(0);
                  }}
                  key={index}
                >
                  {index === 2 ? "Hard" : index ? "Normal" : "Easy"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

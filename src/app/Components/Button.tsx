import { useGameState } from "@/context/gamecontext";
import useGameFunction from "@/hooks/utilitys";
import React from "react";
interface Props {
  index: number;
}
const Button = ({ index }: Props) => {
  const { diffuculty, setdiffuclty } = useGameState();
  const { ChangeRndNum } = useGameFunction();
  return (
    <>
      {" "}
      <button
        className={
          index === 2
            ? diffuculty == index
              ? "h-10 w-25 bg-[rgb(125,24,24)] rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150 scale-90 active:scale-80"
              : "h-10 w-25 bg-[rgb(207,17,17)] hover:scale-105 rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150  active:scale-90"
            : index
            ? diffuculty == index
              ? "h-10 w-25 bg-[rgb(9,29,42)] rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150 scale-90 active:scale-80"
              : "h-10 w-25 bg-[rgb(23,73,100)] hover:scale-105 rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150  active:scale-90"
            : diffuculty == index
            ? "h-10 w-25 bg-[rgb(39,91,35)] rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150 scale-90 active:scale-80"
            : "h-10 w-25 bg-[rgb(43,144,26)] hover:scale-105 rounded-xl text-md font-bold cursor-pointer ml-3 mt-6 transition-all duration-150  active:scale-90"
        }
        onClick={() => {
          setdiffuclty(index);
          ChangeRndNum(index);
        }}
        key={index}
      >
        {index === 2 ? "Hard" : index ? "Normal" : "Easy"}
      </button>
    </>
  );
};

export default Button;

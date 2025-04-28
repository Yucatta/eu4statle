"use client";
import React from "react";
import { useGameState } from "@/context/gamecontext";
const States = () => {
  const { rndnum } = useGameState();
  return (
    <div className="w-[37.5vw] h-[45vh] mt-[4vh] bg-[rgb(0,0,0)] border-2 flex items-center justify-center border-gray-300">
      <img
        src={`states/${rndnum}.png`}
        // src={`states/173.png`}
        className="w-auto   h-[40vh] flex justify-center "
      ></img>
    </div>
  );
};

export default States;

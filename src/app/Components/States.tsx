"use client";
import React from "react";
import { useGameState } from "@/context/gamecontext";
const States = () => {
  const { rndnum } = useGameState();
  return (
    <div className="w-3/4 h-[45vh] mt-[2vh] bg-[rgb(0,0,0)] border-2 flex items-center justify-center border-gray-300">
      {rndnum ? (
        <img
          src={`states/${rndnum[0]}.png`}
          // src={`states/173.png`}
          className=" w-auto   h-9/10  object-cover"
        ></img>
      ) : (
        ""
      )}
    </div>
  );
};

export default States;

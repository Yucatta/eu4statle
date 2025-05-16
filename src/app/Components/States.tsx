"use client";
import React, { useRef } from "react";
import { useGameState } from "@/context/gamecontext";
const States = () => {
  const { rndnum } = useGameState();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageref = useRef<HTMLImageElement>(null);
  return (
    <div
      className="w-3/4 h-[45vh] mt-[2vh] bg-[rgb(0,0,0)] border-2 border-neutral-300 flex items-center justify-center "
      ref={containerRef}
    >
      {rndnum ? (
        <img
          ref={imageref}
          src={`states/${rndnum[0]}.png`}
          // src={`states/173.png`}
          className="block w-10/11 h-10/11 object-contain object-center"
        ></img>
      ) : (
        ""
      )}
    </div>
  );
};

export default States;

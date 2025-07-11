"use client";
import { useGameState } from "@/context/gamecontext";
import React from "react";

const HeaderOfPage = () => {
  const { setdiffucltyindex, diffucultyindex } = useGameState();
  return (
    <div className="flex  justify-center gap-x-4 select-none w-[clamp(0px,977px,100vw)] items-center h-15">
      {" "}
      {["Easy", "Medium", "Hard"].map((dif, index) => (
        <div
          key={index}
          onClick={() => setdiffucltyindex(index)}
          className={
            index === diffucultyindex
              ? "text-[rgb(103,0,191)] cursor-pointer  text-2xl font-semibold"
              : "hover:text-[rgb(89,15,153)] text-2xl font-semibold cursor-pointer"
          }
        >
          {dif}
        </div>
      ))}
    </div>
  );
};

export default HeaderOfPage;

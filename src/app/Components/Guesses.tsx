import { useGameState } from "@/context/gamecontext";
import React, { useEffect } from "react";
interface props {
  thisguess: string | number;
}
const Guesses = ({ thisguess }: props) => {
  return (
    <>
      {typeof thisguess === "string" ? (
        <div className="w-7/8 h-11 rounded-full mb-1 bg-neutral-700 text flex justify-center items-center">
          <span>{thisguess}</span>
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

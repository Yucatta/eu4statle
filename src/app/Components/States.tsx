"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGameState } from "@/context/gamecontext";
const States = () => {
  const { rndnum } = useGameState();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageref = useRef<HTMLImageElement>(null);
  const [imagestyle, setimagestyle] = useState("scale-0");
  useEffect(() => {
    if (
      containerRef.current &&
      containerRef.current.getBoundingClientRect() &&
      imageref.current &&
      imageref.current.naturalHeight &&
      rndnum
    ) {
      setimagestyle(
        containerRef.current &&
          imageref.current &&
          containerRef.current.getBoundingClientRect().height /
            containerRef.current.getBoundingClientRect().width >
            imageref.current.naturalHeight / imageref.current.naturalWidth
          ? "h-auto w-10/11 object-cover"
          : containerRef.current && imageref.current
          ? "h-10/11 w-auto object-cover"
          : "scale-0"
      );
    }
  }, [rndnum, imageref]);
  return (
    <div
      className="w-3/4 h-[45vh] mt-[2vh] bg-[rgb(0,0,0)] border-2 flex items-center justify-center border-gray-300"
      ref={containerRef}
    >
      {rndnum ? (
        <img
          ref={imageref}
          src={`states/${rndnum[0]}.png`}
          // src={`states/173.png`}
          className={imagestyle}
        ></img>
      ) : (
        ""
      )}
    </div>
  );
};

export default States;

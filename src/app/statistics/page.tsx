import React from "react";
import GuessDistribution from "../Components/GuessDistribution";
import HeaderOfPage from "./HeaderOfPage";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col w-full">
      <Link
        href={"/"}
        className="flex cursor-pointer flex-row  mt-5 w-20 items-center ml-10 h-10 justify-center"
      >
        <svg viewBox="-10 -20 50 40" className="z-120 w-10">
          <path
            stroke="rgb(103,0,191)"
            strokeWidth={3}
            strokeLinecap="round"
            d="M 30 0 L 0 0 M 10 10 L 0 0 L 10 -10"
          ></path>
        </svg>
        <div className="w-10 font-bold text-[rgb(136,0,255)]">Back</div>
      </Link>
      <HeaderOfPage></HeaderOfPage>
      <GuessDistribution></GuessDistribution>
    </div>
  );
};

export default page;

import { useGameState } from "@/context/gamecontext";
import useGameFunction from "@/hooks/utilitys";
import React, { useEffect, useState } from "react";

const DayNavigation = () => {
  const { selectedDate, diffuculty, setSelectedDate } = useGameState();
  const { ChangeRndNum } = useGameFunction();
  const currentDate = new Date();
  const maximumDays = Math.floor(
    (Number(currentDate) - Number(new Date(2025, 4, 29))) /
      (24 * 60 * 60 * 1000)
  );
  const selecteDateFormat = new Date();
  selecteDateFormat.setDate(selecteDateFormat.getDate() - selectedDate);
  useEffect(() => {
    ChangeRndNum(diffuculty);
  }, [selectedDate]);
  return (
    <div
      className="flex flex-row w-25 sm:w-30 justify-center items-center sm:text-base text-sm top-3.5 absolute select-none"
      style={{ left: "clamp(0px,10px,1vw)" }}
    >
      {selectedDate < maximumDays && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 absolute left-0 cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            console.log("!!!");
            setSelectedDate((prev) => prev + 1);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
      <div className="pointer-events-none flex-col items-center justify-center flex">
        <div>
          {selecteDateFormat.getDate()}{" "}
          {selecteDateFormat.toLocaleString("default", { month: "long" })}
        </div>
        <div>#{maximumDays - selectedDate}</div>
      </div>
      {selectedDate > 0 && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 absolute right-0 cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            console.log("!!!");
            setSelectedDate((prev) => prev - 1);
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
};

export default DayNavigation;

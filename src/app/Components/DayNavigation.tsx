import { useGameState } from "@/context/gamecontext";
import useGameFunction from "@/hooks/utilitys";
import React, { useEffect, useState } from "react";

const DayNavigation = () => {
  const { selectedDate, diffuculty, setSelectedDate } = useGameState();
  const { ChangeRndNum } = useGameFunction();
  const currentDate = new Date();
  const maximumDays = Math.min(
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
      className="flex flex-row w-30 justify-center absolute select-none"
      style={{ left: "clamp(0px,40px,4vw)" }}
    >
      {selectedDate < maximumDays && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 absolute left-0 cursor-pointer"
          aria-hidden="true"
          onClick={() => setSelectedDate((prev) => prev + 1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
      <div>
        {selecteDateFormat.getDate()}
        {"   "}
        {selecteDateFormat.toLocaleString("default", { month: "long" })}
      </div>
      {selectedDate > 0 && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6 absolute right-0 cursor-pointer"
          aria-hidden="true"
          onClick={() => setSelectedDate((prev) => prev - 1)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
};

export default DayNavigation;

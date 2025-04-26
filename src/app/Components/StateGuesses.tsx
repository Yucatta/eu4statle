"use client";
import React, { useMemo, useRef } from "react";
import Guesses from "./Guesses";
import Papa from "papaparse";
const StateGuesses = () => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const StateData = useMemo(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/regionids.csv");
        const csvText = await response.text();
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            const temp = result.data.map((element: string[]) => [
              element[0],
              +element[1],
              +element[2],
              +element[4],
              +element[5],
              +element[6],
            ]);
            return temp;
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    return fetchdata();
  }, []);

  return (
    <>
      <div className="mt-3 w-[37.5vw] border-2  justify-between items-center flex  ">
        <input
          type="search"
          ref={inputref}
          className="w-3/4 left-0 h-10 border-2   border-[rgb(255,255,255)]"
          placeholder="  aaaaaa"
        ></input>
        <button className="bg-amber-600 w-25 right-0 rounded-2xl h-10 text-sm">
          this is important
        </button>
      </div>
      <ol className="w-3/4  border-gray-300 border-1 h-2/5 flex items-center flex-col mt-2">
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
      </ol>
    </>
  );
};

export default StateGuesses;

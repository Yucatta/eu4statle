"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Guesses from "./Guesses";
import Papa from "papaparse";
const StateGuesses = () => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const [query, setquery] = useState<string | undefined>(undefined);
  const [StateData, setStateData] = useState<number[][]>();
  const [statenames, setstatenames] = useState<string[]>();
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/regionids.csv");
        const csvText = await response.text();
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            const tempids: any[] = [];
            const tempnames: any[] = [];
            result.data.forEach((element) => {
              tempnames.push(element[0]);
              tempids.push([
                +element[1],
                +element[2],
                +element[3],
                +element[4],
                +element[5],
                +element[6],
              ]);
            });
            setstatenames(tempnames);
            setStateData(tempids);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    fetchdata();
  }, []);
  function handleinput() {}
  useEffect(() => {
    if (query && statenames) {
      const a = statenames.filter((state) => {
        return state.toLowerCase().includes(query.toLowerCase());
      });
      console.log(a);
    }
    // console.log(StateData, query);
  }, [statenames, query]);
  return (
    <>
      <div className="mt-3 w-[37.5vw]  justify-between items-center flex  ">
        <input
          type="search"
          ref={inputref}
          onChange={() => {
            setquery(inputref.current?.value);
          }}
          className="w-3/4 left-0 h-10 border-2   border-[rgb(255,255,255)]"
          placeholder="  aaaaaa"
        ></input>

        <button className="bg-amber-600 w-25 right-0 rounded-2xl h-10 text-sm">
          this is important
        </button>
      </div>
      <ul
        className={
          query
            ? "  text-sm z-5 size-[40vh] mt-5 border-2 overflow-y-auto from-neutral-50"
            : "scale-0 transition-normal "
        }
      >
        <li>AHMEADABADARASDA</li>
        {statenames && query
          ? statenames
              .filter((state) => {
                return state.toLowerCase().includes(query.toLowerCase());
              })
              .map((item, index) => (
                // <div>
                <li key={index}>{item}</li>
                // </div>
              ))
          : ""}
      </ul>
      {/* <ol className="w-3/4  border-gray-300 border-1 h-2/5 flex items-center z-1 flex-col mt-2">
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
        <Guesses></Guesses>
      </ol> */}
    </>
  );
};

export default StateGuesses;

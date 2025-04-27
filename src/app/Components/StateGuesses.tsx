"use client";
import React, { useEffect, useRef, useState } from "react";
import Guesses from "./Guesses";
import Papa from "papaparse";
const StateGuesses = () => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const [query, setquery] = useState<string | undefined>(undefined);
  const [StateData, setStateData] = useState<number[][]>();
  const [statenames, setstatenames] = useState<string[]>();
  const [StateGuesses, setstateguesses] = useState<(string | number)[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
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
                +element[7],
              ]);
            });
            setstatenames(tempnames);
            setStateData(tempids);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
        console.log(StateData);
      }
    }
    fetchdata();
  }, []);
  function handlesubmit() {
    if (statenames && query && inputref.current) {
      let maybe = false;
      for (let i = 0; i < statenames.length; i++) {
        if (statenames[i].toLowerCase() === query) {
          maybe = true;
          break;
        }
      }
      console.log("this is available input");
      setstateguesses(() => {
        return [query, ...StateGuesses.slice(0, 5)];
      });
      console.log(StateGuesses);
      setquery("");
      inputref.current.value = "";
    }
  }
  return (
    <>
      <div className="mt-3 w-[37.5vw]  justify-between items-center flex  relative">
        <div className="w-3/4 relative group">
          <input
            type="search"
            ref={inputref}
            onChange={() => {
              setquery(inputref.current?.value);
            }}
            className="w-full h-10 border-2 border-white focus:"
            placeholder="aaaaaa"
          />

          <ul className="absolute top-full left-0  w-full bg-neutral-800  border-2 overflow-y-auto opacity-0 transition  text-sm z-10 max-h-40 group-focus-within:opacity-100">
            {/* List items go here */}
            {statenames && query
              ? statenames
                  .filter((state) => {
                    return state.toLowerCase().includes(query.toLowerCase());
                  })
                  .map((item, index) => (
                    <li
                      className=" py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                      key={index}
                      onClick={() => {
                        setquery(item);
                        if (inputref.current) {
                          inputref.current.value = item;
                        }
                      }}
                    >
                      {item}
                    </li>
                  ))
              : ""}
          </ul>
        </div>
        <button
          className="bg-amber-600 w-25 rounded-2xl h-10 text-sm"
          onClick={handlesubmit}
        >
          this is important
        </button>
      </div>
      <ol className="w-3/4  border-gray-300 border-1 h-2/5 flex items-center z-1 flex-col mt-2">
        {StateGuesses.map((stateguess, index) => (
          <Guesses thisguess={stateguess} key={index}></Guesses>
        ))}
      </ol>
    </>
  );
};

export default StateGuesses;

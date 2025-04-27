"use client";
import React, { useEffect, useRef, useState } from "react";
import Guesses from "./Guesses";
import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
const StateGuesses = () => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const [query, setquery] = useState<string | undefined>(undefined);
  const [StateData, setStateData] = useState<number[][]>();
  const [statenames, setstatenames] = useState<string[]>();
  const [StateGuesses, setstateguesses] = useState<(string | number)[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const guessid = useRef(-1);
  const { rndnum, setrndnum } = useGameState();
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/regionids.csv");
        const csvText = await response.text();
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            const tempids: number[][] = [];
            const tempnames: string[] = [];
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
      for (let i = 0; i < statenames.length; i++) {
        if (statenames[i].toLowerCase() === query.toLocaleLowerCase()) {
          guessid.current = i;
          console.log(guessid.current);

          break;
        } else {
          console.log("a");
          guessid.current = -1;
        }
      }
      console.log(guessid.current);
      if (guessid.current >= 0) {
        console.log("this is available input");
        setstateguesses(() => {
          return [query, ...StateGuesses.slice(0, 5)];
        });
        console.log(StateGuesses);
        setquery("");
        inputref.current.value = "";
      }
      if (guessid.current === rndnum) {
        alert("you won");
      }
    }
  }
  useEffect(() => {
    setrndnum(Math.floor(Math.random() * 824));
  }, []);
  return (
    <>
      <div className=" w-[37.5vw]  justify-between items-center flex  relative">
        <div className="w-3/4 relative group">
          <input
            type="search"
            ref={inputref}
            onChange={() => {
              setquery(inputref.current?.value);
            }}
            className="w-full mt-3 h-10 border-2 border-white focus:"
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
          className=" w-30 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700"
          onClick={handlesubmit}
        >
          GUESS
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

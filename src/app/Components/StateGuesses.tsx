"use client";
import React, {
  AriaAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Guesses from "./Guesses";
import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
const StateGuesses = () => {
  const inputref = useRef<HTMLInputElement | null>(null);
  const [query, setquery] = useState<string | undefined>(undefined);
  const [StateData, setStateData] = useState<number[][]>();
  const [statenames, setstatenames] = useState<string[]>();
  const [regionStateIds, setregionStateIds] = useState<number[][]>();
  const [RegionNames, setRegionNames] = useState<string[]>();
  const [StateGuesses, setstateguesses] = useState<
    Array<[string | number, number]>
  >([
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
  ]);
  const guessid = useRef(-1);
  const { rndnum, setrndnum } = useGameState();
  const filteredstatenames = useMemo(() => {
    // console.log(!!statenames, !!query);
    if (statenames) {
      if (query) {
        return statenames.filter((state) => {
          return state.toLowerCase().includes(query.toLowerCase());
        });
      } else {
        return statenames;
      }
    } else {
      return;
    }
  }, [statenames, query]);
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/areaids.csv");
        const csvText = await response.text();
        const tempids: number[][] = [];
        const tempnames: string[] = [];
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("this");
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
            // console.log(tempnames);
            setStateData(tempids);
          },
        });
        const response2 = await fetch("/regionids.csv");
        const csvText2 = await response2.text();
        const tempids2: number[][] = [];
        const tempnames2: string[] = [];
        Papa.parse<string[]>(csvText2, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((element) => {
              tempnames2.push(element[0]);
              tempids2.push([
                +element[1],
                +element[2],
                +element[3],
                +element[4],
                +element[5],
                +element[6],
                +element[7],
                +element[8],
                +element[9],
                +element[10],
                +element[11],
                +element[12],
                +element[13],
                +element[14],
                +element[15],
                +element[16],
                +element[17],
                +element[18],
                +element[19],
                +element[20],
                +element[21],
              ]);
            });
            setstatenames(() => {
              return [...tempnames, ...tempnames2];
            });
            // console.log("aaaaa");

            // console.log(tempnames.length);
            setregionStateIds(tempids);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
        console.log(StateData);
      }
    }
    async function fetchregiondis() {
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
                +element[8],
                +element[9],
                +element[10],
                +element[11],
                +element[12],
                +element[13],
                +element[14],
                +element[15],
                +element[16],
                +element[17],
                +element[18],
                +element[19],
                +element[20],
                +element[21],
              ]);
            });
            setRegionNames(tempnames);
            console.log(tempnames.length);
            setregionStateIds(tempids);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
        console.log(StateData);
      }
    }
    fetchdata();
    fetchregiondis();
  }, []);
  function handlesubmit() {
    if (statenames && filteredstatenames && inputref.current) {
      if (query) {
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
        // console.log(guessid.current);
        if (guessid.current >= 0) {
          console.log("this is available input");
          const temp = StateGuesses;
          console.log(temp.length);
          for (let i = 0; i < temp.length; i++) {
            if (typeof temp[i][0] !== "string") {
              temp[i][0] = statenames[guessid.current];
              temp[i][1] = guessid.current;
              console.log(guessid.current);
              console.log(i);
              break;
            }
          }
          console.log(temp);
          setstateguesses(temp);
          setquery("");
          inputref.current.value = "";
        }
        if (guessid.current === rndnum) {
          console.log("correct guess");
          alert("you won");
        }
      } else {
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
            placeholder="Region or Area"
          />

          <ul className="absolute top-full left-0  w-full bg-neutral-800  border-2 overflow-y-auto opacity-0 transition  text-sm z-10 max-h-40 group-focus-within:opacity-100">
            {/* List items go here */}
            {statenames && query && filteredstatenames
              ? filteredstatenames.map((item, index) => (
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
              : statenames && filteredstatenames
              ? filteredstatenames.map((item, index) => (
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
          <Guesses
            thisguess={[stateguess[0], guessid.current]}
            coordinates={
              typeof rndnum === "number" && StateData && stateguess[1] > -1
                ? [
                    StateData[stateguess[1]][5],
                    StateData[stateguess[1]][6],
                    StateData[rndnum][5],
                    StateData[rndnum][6],
                  ]
                : []
            }
            key={index}
          ></Guesses>
        ))}
      </ol>
    </>
  );
};

export default StateGuesses;

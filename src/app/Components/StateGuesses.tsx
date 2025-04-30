"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
import GuessContainer from "./GuessContainer";
const StateGuesses = () => {
  const stateinputref = useRef<HTMLInputElement | null>(null);
  const regioninputref = useRef<HTMLInputElement | null>(null);
  const [statesquery, setstatequery] = useState<string | undefined>(undefined);
  const [regionsquery, setregionsquery] = useState<string | undefined>(
    undefined
  );
  const [StateData, setStateData] = useState<number[][]>();
  const [statenames, setstatenames] = useState<string[]>();
  const [regionStateIds, setregionStateIds] = useState<number[][]>();
  const [StateGuesses, setstateguesses] = useState<
    Array<[string | number, number]>
  >([
    [0, -1],
    [0, -1],
    [0, -1],
  ]);
  const guessid = useRef([-1, -1]);

  const { rndnum, setrndnum } = useGameState();
  const filteredstatenames = useMemo(() => {
    // console.log(!!statenames, !!query);

    if (statenames) {
      if (regionsquery) {
        const regionindex = statenames
          .slice(823, 896)
          .findIndex((statename) => {
            if (statename === regionsquery) {
              return regionsquery;
            }
          });

        if (regionindex + 1 && regionStateIds) {
          const temp = [];
          // console.log(regionStateIds[regionindex]);
          for (let i = 0; i < 21; i++) {
            if (regionStateIds[regionindex][i] || !i) {
              temp.push(statenames[regionStateIds[regionindex][i]]);
              // console.log(
              //   statenames[regionStateIds[regionindex][i]],
              //   regionStateIds[regionindex][i]
              // );
            } else {
              // console.log(i, "this is breaking point");
              break;
            }
          }
          // console.log(temp);
          return temp;
        }
      } else if (statesquery) {
        return statenames.slice(0, 823).filter((state) => {
          return state.toLowerCase().includes(statesquery.toLowerCase());
        });
      } else {
        return statenames;
      }
    } else {
      return;
    }
  }, [statenames, regionStateIds, statesquery, regionsquery]);

  const filteredregionsnames = useMemo(() => {
    // console.log(!!statenames, !!query);
    if (statenames) {
      if (regionsquery) {
        return statenames.slice(823, 896).filter((state) => {
          return state.toLowerCase().includes(regionsquery.toLowerCase());
        });
      } else {
        return statenames.slice(823, 896);
      }
    } else {
      return;
    }
  }, [statenames, regionsquery]);
  // console.log(StateData, regionStateIds);
  if (statenames) {
    // console.log(statenames.slice(823, statenames.length));
    // console.log(statenames.length);
  }
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
                +element[22],
                +element[23],
              ]);
            });
            console.log(tempnames.length);
            setstatenames(() => {
              return [...tempnames, ...tempnames2];
            });
            // console.log("aaaaa");

            // console.log(tempnames.length);
            setregionStateIds(tempids2);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
        console.log(StateData);
      }
    }
    fetchdata();
    // fetchregiondis();
    const temp = Math.floor(Math.random() * 824);
    setrndnum([temp, -1]);
  }, []);
  function handlesubmit() {
    if (statenames && filteredstatenames && stateinputref.current && rndnum) {
      if (statesquery) {
        for (let i = 0; i < statenames.length; i++) {
          if (statenames[i].toLowerCase() === statesquery.toLocaleLowerCase()) {
            guessid.current = [i, findRegion(i)];
            break;
          } else {
            console.log("a");
            guessid.current[0] = -1;
          }
        }
        // console.log(guessid.current);
        if (guessid.current[0] >= 0) {
          console.log("this is available input");
          const temp = StateGuesses;
          console.log(temp.length);
          for (let i = 0; i < temp.length; i++) {
            if (typeof temp[i][0] !== "string") {
              temp[i][0] = statenames[guessid.current[0]];
              temp[i][1] = guessid.current[0];
              console.log(guessid.current);
              console.log(i);
              break;
            }
          }
          console.log(temp);
          setstateguesses(temp);
          setstatequery("");
          stateinputref.current.value = "";
        }
        if (guessid.current[0] === rndnum[0]) {
          console.log("correct guess");
          alert("you won");
        }
      } else {
      }
    }
  }
  function findRegion(stateid: number) {
    if (regionStateIds && rndnum) {
      if (stateid > 822) {
        return stateid - 823;
      } else {
        for (let k = 0; k < regionStateIds.length; k++) {
          for (let j = 0; j < regionStateIds[k].length; j++) {
            if (regionStateIds[k][j] === rndnum[0]) {
              return k;
            }
          }
        }
      }
    }
    return -1;
  }
  useEffect(() => {
    const temp = Math.floor(Math.random() * 824);
    setrndnum([temp, -1]);
  }, []);
  useEffect(() => {
    if (rndnum) {
      setrndnum([rndnum[0], findRegion(rndnum[0])]);
    }
  }, [regionStateIds]);
  return (
    <>
      <div className=" w-3/4  justify-between items-center flex  relative">
        <div className="w-3/11 relative group">
          <input
            type="search"
            ref={regioninputref}
            onChange={() => {
              setregionsquery(regioninputref.current?.value);
            }}
            className="w-full mt-3 h-10 border-2 border-white focus:"
            placeholder=" Specify Region"
          />

          <ul className="absolute top-full left-0  w-full bg-neutral-800  border-2 overflow-y-auto opacity-0 transition  text-sm z-10 max-h-40 group-focus-within:opacity-100">
            {/* List items go here */}
            {statenames && statesquery && filteredregionsnames
              ? filteredregionsnames.map((item, index) => (
                  <li
                    className=" py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                    key={index}
                    onClick={() => {
                      setregionsquery(item);
                      if (regioninputref.current) {
                        regioninputref.current.value = item;
                      }
                    }}
                  >
                    {item}
                  </li>
                ))
              : statenames && filteredregionsnames
              ? filteredregionsnames.map((item, index) => (
                  <li
                    className=" py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                    key={index}
                    onClick={() => {
                      setregionsquery(item);
                      if (regioninputref.current) {
                        regioninputref.current.value = item;
                      }
                    }}
                  >
                    {item}
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div className="w-3/6 relative group">
          <input
            type="search"
            ref={stateinputref}
            onChange={() => {
              setstatequery(stateinputref.current?.value);
            }}
            className="w-full mt-3 h-10 border-2 border-white focus:"
            placeholder=" State (within region)"
          />

          <ul className="absolute top-full left-0  w-full bg-neutral-800  border-2 overflow-y-auto opacity-0 transition  text-sm z-10 max-h-40 group-focus-within:opacity-100">
            {statenames && statesquery && filteredstatenames
              ? filteredstatenames.map((item, index) => (
                  <li
                    className=" py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                    key={index}
                    onClick={() => {
                      setstatequery(item);
                      if (stateinputref.current) {
                        stateinputref.current.value = item;
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
                      setstatequery(item);
                      if (stateinputref.current) {
                        stateinputref.current.value = item;
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
          className=" w-2/11 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700"
          onClick={handlesubmit}
        >
          GUESS
        </button>
      </div>

      <GuessContainer
        StateData={StateData}
        rndnum={rndnum}
        guessid={guessid.current}
        StateGuesses={StateGuesses}
      ></GuessContainer>
    </>
  );
};

export default StateGuesses;

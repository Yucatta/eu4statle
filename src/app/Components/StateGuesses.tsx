"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
import GuessContainer from "./GuessContainer";
import InputandList from "./Input";
import CardGuessContainer from "./CardContainer";
import fetchCsvData from "@/utils/fetchcsv";
const StateGuesses = () => {
  const stateinputref = useRef<HTMLInputElement | null>(null);
  const regioninputref = useRef<HTMLInputElement | null>(null);
  const [statesquery, setstatequery] = useState<string | undefined>(undefined);
  const [regionsquery, setregionsquery] = useState<string | undefined>(
    undefined
  );
  const [StateData, setStateData] = useState<number[][]>();
  const [statelocation, setstatelocation] = useState<number[][]>();
  const [regionbboxes, setregionbboxes] = useState<number[][]>();
  const [emptylands, setemptylands] = useState<number[]>();
  const [statenames, setstatenames] = useState<string[]>();
  const [regionStateIds, setregionStateIds] = useState<number[][]>();
  const [StateGuesses, setstateguesses] = useState<
    Array<[string | number, number]>
  >([
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
  ]);
  const guessid = useRef([-1, -1]);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef(null);
  const paths = useRef<Array<[string, unknown]>>([]);
  const areapaths = useRef<Array<[string, unknown]>>([]);
  const oceanea = useRef<Array<[string, unknown]>>([]);
  const regionids = useRef<Array<[string, number[]]>>([]);
  const imageinitizalied = useRef(false);
  const { rndnum, setrndnum } = useGameState();

  useEffect(() => {
    async function fetchjson() {
      const response2 = await fetch("stateoutlines.json");
      const data2 = await response2.json();
      areapaths.current = Object.entries(data2);
      const response3 = await fetch("stateoutlines.json");
      const data3 = await response3.json();
      oceanea.current = Object.entries(data3);
      const response4 = await fetch("regionids.json");
      const data4 = await response4.json();
      regionids.current = Object.entries(data4);
    }
    fetchjson();
  }, []);
  useEffect(() => {
    async function fetchjson() {
      const response = await fetch("completemap.json");
      const data = await response.json();
      paths.current = Object.entries(data);
    }
    fetchjson();
  }, []);
  const Image = useMemo(() => {
    if (
      regionStateIds &&
      rndnum &&
      StateData &&
      !imageinitizalied.current &&
      rndnum[1] !== -1 &&
      paths.current[0] &&
      statelocation &&
      emptylands &&
      regionbboxes &&
      regionids &&
      areapaths.current
    ) {
      imageinitizalied.current = true;
      // return 1;

      if (rndnum[1] === 58) {
        const a = (
          <svg
            className="w-full h-full  bg-[rgb(50,50,150)]"
            viewBox={
              // "0 0 5632 2048"
              `
              ${regionbboxes[rndnum[1]][0]} ${regionbboxes[rndnum[1]][1]}  ${
                regionbboxes[rndnum[1]][2] - regionbboxes[rndnum[1]][0]
              } ${regionbboxes[rndnum[1]][3] - regionbboxes[rndnum[1]][1]}
              `
            }
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            {regionids.current[rndnum[1]][1].map((provinceid) => {
              return (
                <path
                  d={String(paths.current[provinceid - 1][1])}
                  fill={
                    StateData[rndnum[0]].includes(provinceid)
                      ? "rgb(190, 160, 255)"
                      : // ? "none"
                        "rgb(50,50,50)"
                  }
                  stroke="white"
                  strokeWidth="0.5"
                  key={provinceid}
                  // className="hover:fill-amber-700"
                  // onClick={() => {
                  //   console.log(provinceid);
                  // }}
                ></path>
              );
            })}
            {areapaths.current.map((path, index) => {
              const areasplace = regionStateIds[rndnum[1]].indexOf(index);
              console.log(index, rndnum[0]);
              if ((index !== 0 && areasplace + 1) || areasplace === 0) {
                return (
                  <path
                    d={String(path[1])}
                    fill={"none"}
                    stroke={
                      index === rndnum[0]
                        ? "rgb(80, 0, 100)"
                        : "rgb(230,230,230)"
                    }
                    strokeWidth={index === rndnum[0] ? "3" : "0.8"}
                    key={index}
                  ></path>
                );
              }
            })}
          </svg>
        );
        return a;
      } else {
        const a = (
          <svg
            className="w-full h-full  bg-[rgb(20,50,80)]"
            viewBox={
              // "0 0 5632 2048"
              `
              ${regionbboxes[rndnum[1]][0]} ${regionbboxes[rndnum[1]][1]}  ${
                regionbboxes[rndnum[1]][2] - regionbboxes[rndnum[1]][0]
              } ${regionbboxes[rndnum[1]][3] - regionbboxes[rndnum[1]][1]}
              `
            }
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            {paths.current.map((path, index) => {
              return (
                <path
                  d={String(path[1])}
                  fill={
                    StateData[rndnum[0]].includes(+path[0] + 1)
                      ? "rgb(190, 160, 255)"
                      : emptylands.includes(+path[0] + 1)
                      ? "none"
                      : regionids.current[rndnum[1]][1].includes(+path[0] + 1)
                      ? "rgb(50,50,50)"
                      : "	rgb(30, 30, 30)"
                  }
                  // stroke={emptylands.includes(provinceid) ? "none" : "white"}
                  stroke={
                    regionids.current[rndnum[1]][1].includes(+path[0] + 1)
                      ? "white"
                      : emptylands.includes(+path[0] + 1)
                      ? "none"
                      : "rgb(35,35,35)"
                  }
                  strokeWidth={
                    regionids.current[rndnum[1]][1].includes(+path[0] + 1)
                      ? "0.2"
                      : emptylands.includes(+path[0] + 1)
                      ? "0"
                      : "1"
                  }
                  key={+path[0]}
                  // className="hover:fill-amber-700"
                  // onClick={() => {
                  //   console.log(
                  //     provinceid
                  //     // paths.current[provinceid][0],
                  //     // console.log(StateData[stateid])
                  //   );
                  // }}
                ></path>
              );
            })}
            {areapaths.current.map((path, index) => {
              const areasplace = regionStateIds[rndnum[1]].indexOf(index);
              console.log(index, rndnum[0]);
              if ((index !== 0 && areasplace + 1) || areasplace === 0) {
                return (
                  <path
                    className={index === rndnum[0] ? "z-40" : "z-10"}
                    d={String(path[1])}
                    fill={"none"}
                    stroke={
                      index === rndnum[0]
                        ? "rgb(80, 0, 100)"
                        : "rgb(230,230,230)"
                    }
                    strokeWidth={index === rndnum[0] ? "3" : "0.8"}
                    key={index}
                  ></path>
                );
              }
            })}
          </svg>
        );
        return a;
      }
    }
  }, [
    regionStateIds,
    StateData,
    rndnum,
    paths.current,
    statelocation,
    emptylands,
    regionbboxes,
    regionids,
    areapaths.current,
  ]);

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
            } else {
              // console.log(i, "this is breaking point");
              break;
            }
          }
          // console.log(temp);
          if (statesquery) {
            return temp.filter((state) => {
              return state.toLowerCase().includes(statesquery.toLowerCase());
            });
          } else {
            return temp;
          }
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
            setstatenames(() => {
              return [...tempnames, ...tempnames2];
            });
            setregionStateIds(tempids2);
          },
        });
        const response3 = await fetch("/locations.csv");
        const csvText3 = await response3.text();
        const tempids3: number[][] = [];
        Papa.parse<string[]>(csvText3, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((element) => {
              tempids3.push([+element[0], +element[1]]);
            });
            // console.log(tempnames);
            setstatelocation(tempids3);
          },
        });
        const response4 = await fetch("/seatiles.csv");
        const csvText4 = await response4.text();
        const tempids4: number[] = [];
        Papa.parse<string[]>(csvText4, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((element) => {
              tempids4.push(+element[0]);
            });
            // console.log(tempnames);
            setemptylands(tempids4);
          },
        });
        const response5 = await fetch("/regionbboxes.csv");
        const csvText5 = await response5.text();
        const tempids5: number[][] = [];
        Papa.parse<string[]>(csvText5, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((element) => {
              tempids5.push([
                +element[0],
                +element[1],
                +element[2],
                +element[3],
              ]);
            });
            // console.log(tempnames);
            setregionbboxes(tempids5);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    // fetchCsvData()
    fetchdata();
    const temp = Math.floor(Math.random() * 824);
    setrndnum([temp, -1]);
  }, []);
  function handlesubmit() {
    if (statenames && filteredstatenames && stateinputref.current && rndnum) {
      for (let i = 0; i < StateGuesses.length; i++) {
        if (StateGuesses[i][0] === statesquery) {
          return;
        }
      }
      if (statesquery) {
        for (let i = 0; i < statenames.length; i++) {
          if (statenames[i].toLowerCase() === statesquery.toLocaleLowerCase()) {
            guessid.current = [i, findRegion(i, rndnum[0])];
            break;
          } else {
            guessid.current[0] = -1;
          }
        }
        if (guessid.current[0] >= 0) {
          const temp = StateGuesses;
          for (let i = 0; i < temp.length; i++) {
            if (typeof temp[i][0] !== "string") {
              temp[i][0] = statenames[guessid.current[0]];
              temp[i][1] = guessid.current[0];
              break;
            }
          }
          setstateguesses(temp);
          setstatequery("");
          stateinputref.current.value = "";
        }
      }
    }
  }
  function findRegion(stateid: number, correctid: number) {
    if (regionStateIds) {
      if (stateid > 822) {
        return stateid - 823;
      } else {
        for (let k = 0; k < regionStateIds.length; k++) {
          for (let j = 0; j < regionStateIds[k].length; j++) {
            if (regionStateIds[k][j] === correctid) {
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
      setrndnum([rndnum[0], findRegion(rndnum[0], rndnum[0])]);
    }
  }, [regionStateIds]);
  useEffect(() => {
    setstateguesses([
      [0, -1],
      [0, -1],
      [0, -1],
      [0, -1],
    ]);
    setstatequery("");
    setregionsquery("");
  }, [rndnum]);
  // if(regionStateIds &&)
  // console.log();
  // console.log(StateData.slic);
  return (
    <>
      <div
        className="w-3/4 h-[45vh] mt-[2vh] bg-[rgb(50,50,50)] border-2  overflow-scroll   border-gray-300"
        ref={containerRef}
      >
        {Image ? Image : ""}
      </div>
      {rndnum &&
      (StateGuesses[0][1] === rndnum[0] ||
        StateGuesses[1][1] === rndnum[0] ||
        StateGuesses[2][1] === rndnum[0] ||
        StateGuesses[3][1] === rndnum[0]) &&
      statenames ? (
        <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1   bg-green-500 text-white items-center flex justify-evenly font-semibold ">
          <span>State: {statenames[rndnum[0]]} </span>
          <span>Region:{statenames[823 + rndnum[1]]}</span>
        </div>
      ) : StateGuesses[3][1] !== -1 && statenames && rndnum ? (
        <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1   bg-red-300 text-white items-center flex justify-evenly font-semibold">
          <span>State: {statenames[rndnum[0]]} </span>
          <span>Region:{statenames[823 + rndnum[1]]}</span>
        </div>
      ) : (
        <div className=" w-3/4  justify-between items-center flex  relative">
          <InputandList
            inputref={regioninputref}
            statenames={statenames}
            statesquery={regionsquery}
            setquery={setregionsquery}
            filterednames={filteredregionsnames ? filteredregionsnames : [""]}
            placeholder="Region"
            widthofinput={"1/12"}
          ></InputandList>
          <InputandList
            inputref={stateinputref}
            placeholder="State (within region)"
            statenames={statenames}
            statesquery={statesquery}
            setquery={setstatequery}
            filterednames={filteredstatenames ? filteredstatenames : [""]}
            widthofinput={"10/12"}
          ></InputandList>
          <button
            className=" w-2/12 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 cursor-pointer transition-all hover:scale-105 active:scale-90"
            onClick={handlesubmit}
          >
            GUESS
          </button>
        </div>
      )}
      <GuessContainer
        StateData={StateData}
        rndnum={rndnum}
        guessid={guessid.current}
        StateGuesses={StateGuesses}
      ></GuessContainer>
      {rndnum ? (
        //  &&
        // (StateGuesses[0][1] === rndnum[0] ||
        //   StateGuesses[1][1] === rndnum[0] ||
        //   StateGuesses[2][1] === rndnum[0] ||
        //   StateGuesses[3][1] === rndnum[0] ||
        //   StateGuesses[3][1] !== -1)
        <>
          <CardGuessContainer
            StateData={StateData}
            rndnum={rndnum}
            guessid={guessid.current}
            StateGuesses={StateGuesses}
          ></CardGuessContainer>
          <button
            className=" w-50 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 cursor-pointer transition-all hover:scale-105 active:scale-90"
            onClick={() => {
              const temp = Math.floor(Math.random() * 824);
              setrndnum([temp, findRegion(temp, temp)]);
            }}
          >
            Retry
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default StateGuesses;

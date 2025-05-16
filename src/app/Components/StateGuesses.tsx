"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
import GuessContainer from "./GuessContainer";
import InputandList from "./Input";
import CardGuessContainer from "./CardContainer";
import States from "./States";
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
    [0, -1],
  ]);
  const guessid = useRef([-1, -1]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageref = useRef<HTMLImageElement>(null);
  const paths = useRef<Array<[string, unknown]>>([]);
  const imageinitizalied = useRef(false);
  const { rndnum, setrndnum } = useGameState();
  // const data = useMemo(() => {
  //   async function fetchjson() {
  //     const response = await fetch("states.json");
  //     const data = await response.json();
  //     console.log(Object.entries(data));
  //     return Object.entries(data);
  //   }
  //   return fetchjson();
  // }, []);
  useEffect(() => {
    async function fetchjson() {
      const response = await fetch("completemap.json");
      const data = await response.json();
      // console.log(Object.entries(data));
      paths.current = Object.entries(data);
    }
    fetchjson();
  }, []);
  // console.log(paths.current);
  // console.log(data, typeof data);
  const Image = useMemo(() => {
    if (
      regionStateIds &&
      rndnum &&
      StateData &&
      !imageinitizalied.current &&
      rndnum[1] !== -1 &&
      paths.current
    ) {
      imageinitizalied.current = true;
      // return 1;
      const a = (
        <svg className="w-full h-full bg-gray-500" viewBox="0 0  5632 2048">
          {/* {regionStateIds[rndnum[1]].slice(0, 21).map((areaid, firstindex) => {
            if (areaid !== 0 || firstindex === 0) {
              return StateData[areaid].slice(0, 5).map((item, index) => {
                if (item !== 0) {
                  // console.log(item);
                  // console.log(paths.current[item]);
                  console.log(item);
                  return (
                    <path
                      d={String(paths.current[item - 1][1])}
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      key={item}
                      // className={"text-green-700"}
                      // src={`svgstates/${item}.svg`}
                    ></path>
                  );
                }
              });
            }
          })} */}
          {paths.current.map((item, index) => {
            const b = String(item[1]);
            const c = index;
            // console.log(b);
            return (
              <path
                d={String(item[1])}
                fill="black"
                stroke="white"
                strokeWidth="5"
                key={item[0]}
                // onhover
                className="hover:fill-amber-700"
                onClick={() => {
                  console.log(item[0]);
                }}
                // className={"text-green-700"}
                // src={`svgstates/${item}.svg`}
              ></path>
            );
            if (Number(item[1]) >= 3003 && Number(item[1]) < 4018) {
              console.log(item, index);
              return (
                <path
                  d={item[1]}
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  key={item[0]}
                  // className={"text-green-700"}
                  // src={`svgstates/${item}.svg`}
                ></path>
              );
            }
          })}
        </svg>
      );
      // console.log(a);
      return a;
    }
  }, [regionStateIds, StateData, rndnum, paths.current]);
  if (Image) {
    // console.log(Image);
  }

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
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    fetchdata();
    // fetchregiondis();
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
        className="w-3/4 h-[45vh] mt-[2vh] bg-[rgb(154,123,123)] border-2 flex items-center justify-center border-gray-300"
        ref={containerRef}
      >
        {/* {rndnum && StateData && regionStateIds
          ? regionStateIds[rndnum[1]].map((item) => {
              // if()
              // StateData[item]
              // console.log()
              return StateData[item].slice(0, 5).map((item, index) => {
                if (item !== 0) {
                  console.log(item);
                  return (
                    <img
                      className={"text-green-700"}
                      src={`svgstates/${item}.png`}
                    ></img>
                  );
                }
                return <></>;
              });
            })
          : // <img
            //   ref={imageref}
            //   src={`states/${rndnum[0]}.png`}
            //   // src={`states/173.png`}
            //   className="block w-10/11 h-10/11 object-contain object-center"
            // ></img>
            ""} */}
        {/* {Image ? Image : ""} */}
        {/* <img
          ref={imageref}
          src={`svgstates/5.svg`}
          // src={`states/173.png`}
          className="block w-10/11 h-10/11 bg-blue-800 fill-green-500 border-amber-300 object-contain object-center"
        ></img> */}
        {
          // <svg>
          //   {regionStateIds &&
          //   rndnum &&
          //   StateData &&
          //   !imageinitizalied.current &&
          //   rndnum[1] !== -1 &&
          //   paths.current
          //     ? regionStateIds[rndnum[1]]
          //         .slice(0, 21)
          //         .map((areaid, firstindex) => {
          //           if (areaid !== 0 || firstindex === 0) {
          //             return (
          //               <>
          //                 {StateData[areaid].slice(0, 5).map((item, index) => {
          //                   if (item !== 0) {
          //                     // console.log(item);
          //                     // console.log(paths.current[item]);
          //                     console.log(item);
          //                     return (
          //                       <path
          //                         d={String(paths.current[item][1])}
          //                         fill="none"
          //                         stroke="white"
          //                         strokeWidth="1"
          //                         key={item}
          //                         // className={"text-green-700"}
          //                         // src={`svgstates/${item}.svg`}
          //                       ></path>
          //                     );
          //                   }
          //                 })}
          //               </>
          //             );
          //           }
          //         })
          //     : ""}
          // </svg>
        }
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

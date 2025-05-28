"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
import GuessContainer from "./GuessContainer";
import InputandList from "./Input";
// import fetchCsvData from "@/utils/fetchcsv";
import { useDataContext } from "@/context/DataContext";
import useGameFunction from "@/hooks/utilitys";
const StateGuesses = () => {
  const { ChangeRndNum, findRegion } = useGameFunction();

  const stateinputref = useRef<HTMLInputElement | null>(null);
  const regioninputref = useRef<HTMLInputElement | null>(null);
  const [statesquery, setstatequery] = useState<string | undefined>(undefined);
  const [regionsquery, setregionsquery] = useState<string | undefined>(
    undefined
  );
  const [StateGuesses, setstateguesses] = useState<
    Array<[string | number, number]>
  >([
    [0, -1],
    [0, -1],
    [0, -1],
    [0, -1],
  ]);
  const imageinitizalied = useRef(false);
  const guessid = useRef([-1, -1]);
  const svgRef = useRef(null);
  const { rndnum, isgameover, setisgameover } = useGameState();

  const {
    paths,
    regionStateIds,
    statenames,
    StateData,
    areapaths,
    oceania,
    regionids,
    regionbboxes,
    emptylands,
  } = useDataContext();

  const Image = useMemo(() => {
    if (
      regionStateIds &&
      rndnum &&
      StateData &&
      !imageinitizalied.current &&
      paths &&
      emptylands &&
      regionbboxes &&
      regionids &&
      areapaths[0]
    ) {
      // imageinitizalied.current = true;
      if (rndnum[1] === 58) {
        const a = (
          <svg
            className="w-full h-full  bg-[rgb(28,87,146)]"
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
            {oceania.map((provinceid) => {
              return (
                <path
                  d={provinceid[1]}
                  fill={
                    StateData[rndnum[0]].includes(Number(provinceid[0]))
                      ? "rgb(190, 160, 255)"
                      : // ? "none"
                        "rgb(70,70,70)"
                  }
                  stroke="white"
                  strokeWidth="0.5"
                  key={Number(provinceid[0])}
                  // className="hover:fill-amber-700"
                  // onClick={() => {
                  //   console.log(provinceid);
                  // }}
                ></path>
              );
            })}
            {areapaths.map((path, index) => {
              const areasplace = regionStateIds[rndnum[1]].indexOf(index);
              // console.log(index, rndnum[0]);
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
                    strokeWidth={index === rndnum[0] ? "6" : "0.8"}
                    key={index}
                  ></path>
                );
              }
            })}
          </svg>
        );
        return a;
      } else {
        // console.log("aaaaaaaaaaa");
        const a = (
          <svg
            className="w-full h-full  bg-[rgb(28,87,146)]"
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
            {paths.map((path) => {
              // console.log(path[1], index);
              const b = (
                <path
                  d={String(path[1])}
                  fill={
                    StateData[rndnum[0]].includes(+path[0] + 1)
                      ? "rgb(190, 160, 255)"
                      : emptylands.includes(+path[0] + 1)
                      ? "none"
                      : regionids[rndnum[1]].includes(+path[0] + 1)
                      ? "rgb(70,70,70)"
                      : "	rgb(50, 50, 50)"
                  }
                  // stroke={emptylands.includes(provinceid) ? "none" : "white"}
                  stroke={
                    regionids[rndnum[1]].includes(+path[0] + 1)
                      ? "white"
                      : emptylands.includes(+path[0] + 1)
                      ? "none"
                      : "rgb(15,15,15)"
                  }
                  strokeWidth={
                    regionids[rndnum[1]].includes(+path[0] + 1)
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

              // if (index < 5) {
              //   console.log(b);
              // }
              return b;
            })}
            {areapaths.map((path, index) => {
              const areasplace = regionStateIds[rndnum[1]].indexOf(index);
              // console.log(index, rndnum[0]);
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
        // console.log(a);
        return a;
      }
    }
  }, [
    regionStateIds,
    StateData,
    rndnum,
    paths,
    emptylands,
    regionbboxes,
    regionids,
    areapaths,
  ]);

  const filteredstatenames = useMemo(() => {
    // console.log(!!statenames, !!query);
    if (statenames) {
      if (regionsquery) {
        const regionname = statenames.slice(823, 896).filter((region) => {
          return region.toLowerCase().includes(regionsquery.toLowerCase());
        });
        console.log(regionname, statenames.indexOf(regionname[0]) - 823);
        if (regionname.length === 1 && regionStateIds) {
          const temp = [];
          // console.log(regionStateIds[regionindex]);
          for (let i = 0; i < 21; i++) {
            if (
              regionStateIds[statenames.indexOf(regionname[0]) - 823][i] ||
              !i
            ) {
              temp.push(
                statenames[
                  regionStateIds[statenames.indexOf(regionname[0]) - 823][i]
                ]
              );
            } else {
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
          if (
            temp[0][1] === rndnum[0] ||
            temp[1][1] === rndnum[0] ||
            temp[2][1] === rndnum[0] ||
            temp[3][1] === rndnum[0] ||
            temp[3][1] !== -1
          ) {
            setisgameover(1);
          }
        }
      }
    }
  }

  useEffect(() => {
    if (regionStateIds) {
      ChangeRndNum();
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
  return (
    <>
      <div className="w-3/4 h-[45vh] p-0 mt-[2vh] bg-[rgb(50,50,50)] ">
        {/* {SvgImage} */}
        {Image ? Image : ""}
      </div>
      {rndnum &&
      (StateGuesses[0][1] === rndnum[0] ||
        StateGuesses[1][1] === rndnum[0] ||
        StateGuesses[2][1] === rndnum[0] ||
        StateGuesses[3][1] === rndnum[0]) &&
      statenames ? (
        <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1   bg-green-500 text-black items-center flex justify-evenly font-semibold ">
          <span>State: {statenames[rndnum[0]]} </span>
          <span>Region:{statenames[823 + rndnum[1]]}</span>
        </div>
      ) : StateGuesses[3][1] !== -1 && statenames && rndnum ? (
        <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1   bg-red-300 text-black items-center flex justify-evenly font-semibold">
          <span>State: {statenames[rndnum[0]]} </span>
          <span>Region:{statenames[823 + rndnum[1]]}</span>
        </div>
      ) : (
        <div className=" w-3/4  justify-between items-center flex  relative">
          <InputandList
            inputref={regioninputref}
            query={regionsquery ? regionsquery : ""}
            setquery={setregionsquery}
            filterednames={filteredregionsnames ? filteredregionsnames : [""]}
            placeholder="Region"
            widthofinput="4/12"
          ></InputandList>
          <InputandList
            inputref={stateinputref}
            query={statesquery ? statesquery : ""}
            onSubmit={handlesubmit}
            placeholder="State "
            setquery={setstatequery}
            filterednames={filteredstatenames ? filteredstatenames : [""]}
            widthofinput="5/12"
          ></InputandList>

          <button
            className=" w-20 rounded-2xl mt-2 h-11 text-sm border-2 border-[rgb(16,50,35)] bg-[rgb(16,84,80)] cursor-pointer transition-all hover:scale-105 active:scale-90"
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
    </>
  );
};

export default StateGuesses;

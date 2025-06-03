"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Papa from "papaparse";
import { useGameState } from "@/context/gamecontext";
import GuessContainer from "./GuessContainer";
import InputandList from "./Input";
// import fetchCsvData from "@/utils/fetchcsv";
import { useDataContext } from "@/context/DataContext";
import useGameFunction from "@/hooks/utilitys";
import CorrectAnswers from "./Answers";
const StateGuesses = () => {
  const { ChangeRndNum } = useGameFunction();

  const stateinputref = useRef<HTMLInputElement | null>(null);
  const regioninputref = useRef<HTMLInputElement | null>(null);
  const [statesquery, setstatequery] = useState<string | undefined>(undefined);
  const [regionsquery, setregionsquery] = useState<string | undefined>(
    undefined
  );
  const [StateGuesses, setstateguesses] = useState<[string, number][][]>(
    Array(3).fill([])
  );
  const imageinitizalied = useRef(false);
  const guessid = useRef([-1, -1]);
  const { rndnum, diffuculty, setisgameover } = useGameState();
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
    if (rndnum && !imageinitizalied.current) {
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
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            {paths.map((path) => {
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
                  stroke={
                    regionids[rndnum[1]].includes(+path[0] + 1)
                      ? "rgb(200,200,200)"
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
                ></path>
              );

              return b;
            })}
            {areapaths.map((path, index) => {
              const areasplace = regionStateIds[rndnum[1]].indexOf(index);
              if ((index !== 0 && areasplace + 1) || areasplace === 0) {
                return (
                  <path
                    d={String(path[1])}
                    fill={"none"}
                    stroke={
                      index === rndnum[0]
                        ? "rgb(80, 0, 100)"
                        : "rgb(150,150,150)"
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
    paths,
    emptylands,
    regionbboxes,
    regionids,
    areapaths,
  ]);

  const filteredstatenames = useMemo(() => {
    if (statenames) {
      if (regionsquery) {
        const regionname = statenames.slice(823, 896).filter((region) => {
          return regionsquery.toLowerCase().includes(region.toLowerCase());
        });
        if (regionname.length === 1 && regionStateIds) {
          const temp = [];
          console.log(regionname, statenames.indexOf(regionname[0]));
          for (let i = 0; i < 21; i++) {
            if (
              regionStateIds[statenames.slice(823, 896).indexOf(regionname[0])][
                i
              ] ||
              !i
            ) {
              temp.push(
                statenames[
                  regionStateIds[
                    statenames.slice(823, 896).indexOf(regionname[0])
                  ][i]
                ]
              );
            } else {
              break;
            }
          }
          if (statesquery) {
            return temp.filter((state) => {
              return state.toLowerCase().includes(statesquery.toLowerCase());
            });
          } else {
            return temp;
          }
        } else {
          return statenames;
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
    if (
      filteredstatenames &&
      stateinputref.current &&
      filteredstatenames.some((statename) =>
        stateinputref
          .current!.value.toLowerCase()
          .includes(statename.toLowerCase())
      ) &&
      !StateGuesses[diffuculty].some((guess) =>
        guess[0]
          .toLocaleLowerCase()
          .includes(stateinputref.current!.value.toLowerCase())
      )
    ) {
      const temp: [string, number][][] = StateGuesses.map((arr) => [...arr]);

      const thestate = filteredstatenames.filter((statename) =>
        stateinputref
          .current!.value.toLowerCase()
          .includes(statename.toLowerCase())
      )[0];
      temp[diffuculty].push([thestate, statenames.indexOf(thestate)]);
      setstateguesses(temp);
      setstatequery("");
      stateinputref.current.value = "";
    }
  }
  useEffect(() => {
    if (regionStateIds) {
      ChangeRndNum(0);
    }
  }, [regionStateIds]);
  useEffect(() => {
    setstatequery("");
    if (stateinputref.current) {
      stateinputref.current.value = "";
    }
    if (
      rndnum &&
      StateGuesses[diffuculty].some((guess) => rndnum[0] === guess[1])
    ) {
      setisgameover(1);
    } else {
      setisgameover(0);
    }
  }, [diffuculty, StateGuesses, rndnum]);
  useEffect(() => {
    setstatequery("");
    setregionsquery("");
    if (stateinputref.current && regioninputref.current) {
      stateinputref.current.value = "";
      regioninputref.current.value = "";
    }
  }, [diffuculty, rndnum]);
  return (
    <>
      <div className="w-10/12 h-[45vh] p-0 mt-[2vh] bg-[rgb(50,50,50)] ">
        {/* {SvgImage} */}
        {Image ? Image : ""}
      </div>
      {rndnum &&
      (StateGuesses[diffuculty].some((guess) => guess[1] === rndnum[0]) ||
        StateGuesses[diffuculty].length === 4) &&
      statenames ? (
        <CorrectAnswers
          isitwrong={StateGuesses[diffuculty].some(
            (guess) => guess[1] === rndnum[0]
          )}
          correctanswers={
            <div className="flex-col flex text-lg font-bold px-8">
              <div>State: {statenames[rndnum[0]]} </div>
              <div>Region: {statenames[823 + rndnum[1]]}</div>
            </div>
          }
        ></CorrectAnswers>
      ) : (
        //  (
        //   <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1 px-10 text-lg bg-green-500 text-black items-center flex justify-evenly font-semibold ">
        // <div className="flex-col flex">
        //   <div>State: {statenames[rndnum[0]]} </div>
        //   <div>Region: {statenames[823 + rndnum[1]]}</div>
        // </div>
        //   </div>
        // ) : StateGuesses[diffuculty].length === 4 && statenames && rndnum ? (
        //   <div className=" w-2/4  h-15 rounded-xl mt-1.5 mb-1 text-lg   bg-red-300 text-black items-center flex justify-evenly font-semibold">
        //     <div className="flex-col flex">
        //       <div>State: {statenames[rndnum[0]]} </div>
        //       <div>Region: {statenames[823 + rndnum[1]]}</div>
        //     </div>
        //   </div>
        // )
        <div className=" w-10/12  justify-evenly mt-1 items-center flex  relative">
          <div className="w-1/4">
            <InputandList
              inputref={regioninputref}
              query={regionsquery ? regionsquery : ""}
              setquery={setregionsquery}
              filterednames={filteredregionsnames ? filteredregionsnames : [""]}
              placeholder="Region"
            ></InputandList>
          </div>
          <div className="w-1/3">
            <InputandList
              inputref={stateinputref}
              query={statesquery ? statesquery : ""}
              onSubmit={handlesubmit}
              placeholder="State "
              setquery={setstatequery}
              filterednames={filteredstatenames ? filteredstatenames : [""]}
            ></InputandList>
          </div>

          <button
            className=" w-20 rounded-2xl mt-2 h-11 font-semibold text-md border-2 border-[rgb(16,50,35)] bg-[rgb(16,84,80)] cursor-pointer transition-all hover:scale-105 active:scale-90"
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
        StateGuesses={[
          ...StateGuesses[diffuculty],
          ...Array(4 - StateGuesses[diffuculty].length).fill(["", -1]),
        ]}
      ></GuessContainer>
    </>
  );
};

export default StateGuesses;

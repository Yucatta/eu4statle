"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import { useDataContext } from "@/context/DataContext";
import CorrectAnswers from "./Answers";
import { useGameState } from "@/context/gamecontext";
import AreaOutlines from "./AreaPaths";
interface Props {
  CardsNames: string[][][];
  provincestats: Array<[string, number, string, string, string, string]>;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
}
const CultureCard = ({
  CardsNames,
  provincestats,
  cardguesses,
  onProvinceGuess,
}: Props) => {
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const [regionquery, setregionquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
  const regionref = useRef<HTMLInputElement>(null);
  // const [cardguesses, setcardguesses] = useState<string[]>([]);
  const [correctguessedprovinces, setcorrectguessedprovinces] = useState([-1]);
  const hasinitialized = useRef(false);
  const correctanswers = useRef<string[] | undefined>(undefined);
  const { rndnum } = useGameState();
  const {
    paths,
    regionStateIds,
    statenames,
    StateData,
    areapaths,
    areabboxes,
    oceania,
    regionids,
    regionbboxes,
    emptylands,
  } = useDataContext();
  const culturegroups = useMemo(() => {
    if (CardsNames) {
      return CardsNames.map((group) => group[0][0]);
    }
  }, [CardsNames]);
  const filteredculturegroups = useMemo(() => {
    if (culturegroups) {
      return culturegroups.filter((group) => {
        if (!regionquery) {
          return true;
        } else {
          return (
            regionquery &&
            group.toLowerCase().includes(regionquery.toLowerCase())
          );
        }
      });
    }
  }, [culturegroups, regionquery]);
  const filteredCardNames = useMemo(() => {
    if (CardsNames) {
      if (
        regionquery &&
        provincestats &&
        culturegroups &&
        filteredculturegroups &&
        filteredculturegroups.length === 1
      ) {
        if (cardquery) {
          return CardsNames[
            culturegroups.indexOf(filteredculturegroups[0])
          ][1].filter((culture) =>
            culture.toLowerCase().includes(cardquery.toLowerCase())
          );
        } else {
          return CardsNames[culturegroups.indexOf(filteredculturegroups[0])][1];
        }
      }

      if (cardquery) {
        return CardsNames.map((group) => {
          return group[1].filter((culture) => {
            return culture.toLowerCase().includes(cardquery.toLowerCase());
          });
        }).flat();
      } else {
        return CardsNames.map((group) => group[1]).flat();
      }
    } else {
      return;
    }
  }, [CardsNames, cardquery, provincestats, statenames, regionquery]);

  const Image = useMemo(() => {
    if (
      regionStateIds &&
      rndnum &&
      StateData &&
      paths &&
      emptylands &&
      regionbboxes &&
      regionids &&
      areabboxes &&
      areapaths[0] &&
      CardsNames &&
      provincestats
    ) {
      const a = (
        <svg
          className="w-full h-full  "
          viewBox={`
                ${areabboxes[rndnum[0]][0]} ${areabboxes[rndnum[0]][1]}  ${
            areabboxes[rndnum[0]][2] - areabboxes[rndnum[0]][0]
          } ${areabboxes[rndnum[0]][3] - areabboxes[rndnum[0]][1]}
                `}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          {rndnum[1] === 58
            ? oceania.map((provinceid) => {
                return (
                  <path
                    d={provinceid[1]}
                    fill={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? correctguessedprovinces.includes(
                            Number(provinceid[0])
                          )
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 6
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : // ? "none"
                          "rgb(50,50,50)"
                    }
                    stroke={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? "rgb(150,150,150)"
                        : "rgb(50,50,50)"
                    }
                    strokeWidth={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? "0.5"
                        : "1"
                    }
                    key={Number(provinceid[0])}
                  ></path>
                );
              })
            : regionids[rndnum[1]].map((provinceid) => {
                return (
                  <path
                    d={String(paths[provinceid - 1][1])}
                    fill={
                      StateData[rndnum[0]].includes(provinceid)
                        ? correctguessedprovinces.includes(provinceid)
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 6
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : // ? "none"
                          "rgb(50,50,50)"
                    }
                    stroke={
                      StateData[rndnum[0]].includes(provinceid)
                        ? "rgb(150,150,150)"
                        : "rgb(40,40,40)"
                    }
                    strokeWidth={
                      StateData[rndnum[0]].includes(provinceid) ? "0.5" : "1"
                    }
                    key={provinceid}
                  ></path>
                );
              })}
          <AreaOutlines></AreaOutlines>
        </svg>
      );
      return a;
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
    CardsNames,
    provincestats,
    correctguessedprovinces,
  ]);

  useEffect(() => {
    function getcorrectanswers() {
      if (StateData && rndnum && provincestats) {
        hasinitialized.current = true;
        const tempanswers: string[] = [];
        for (let i = 0; i < 5; i++) {
          if (StateData[rndnum[0]][i] === 0) {
            break;
          } else {
            tempanswers.push(provincestats[StateData[rndnum[0]][i] - 1][2]);
          }
        }
        return tempanswers;
      } else {
        return;
      }
    }
    // 1796 1996
    if (!hasinitialized.current) {
      const temp = getcorrectanswers();
      // correctanswers.current = undefined;
      correctanswers.current = temp;
    }
  }, [rndnum, StateData, provincestats]);
  const uniquecorrectanswers: string[] = useMemo(() => {
    if (correctanswers.current) {
      const temp = [];
      for (let i = 0; i < correctanswers.current.length; i++) {
        let tempok = true;
        for (let j = 0; j < temp.length; j++) {
          if (temp[j] === correctanswers.current[i]) {
            tempok = false;
            break;
          }
        }
        if (tempok) {
          temp.push(correctanswers.current[i]);
        }
      }
      return temp;
    } else {
      return [];
    }
  }, [correctanswers.current]);

  useEffect(() => {
    if (correctanswers.current) {
      const temp: number[] = [];
      for (let i = 0; i < cardguesses.length; i++) {
        const temp2 = findCorrectProvinces(cardguesses[i]);
        if (temp2) {
          temp.push(...temp2);
        }
      }
      setcorrectguessedprovinces(temp);
    }
  }, [cardguesses]);
  function handlesubmit() {
    if (
      inputref.current &&
      filteredCardNames &&
      !cardguesses.includes(String(inputref.current.value)) &&
      filteredCardNames.length > 0
    ) {
      onProvinceGuess([...cardguesses, String(inputref.current.value)]);
      inputref.current!.value = "";
      setcardquery("");
    }
  }
  function findCorrectProvinces(cardquery: string) {
    if (
      CardsNames &&
      StateData &&
      rndnum &&
      provincestats &&
      correctanswers.current
    ) {
      const temp = [];
      for (let i = 0; i < correctanswers.current.length; i++) {
        if (correctanswers.current[i] === cardquery) {
          temp.push(StateData[rndnum[0]][i]);
        }
      }
      return temp;
    }
  }
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        {rndnum ? (
          <div
            className={
              "flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden"
            }
          >
            <div className="flex flex-row w-full h-30 items-center justify-evenly">
              <div className="flex justify-center w-1/3 border-0 h-30">
                {Image ? Image : ""}
              </div>
              {(correctanswers &&
                correctanswers.current?.length ===
                  correctguessedprovinces.length) ||
              (CardsNames && cardguesses && cardguesses.length === 6) ? (
                <CorrectAnswers
                  correctanswers={
                    <div className="flex-col">
                      <div>
                        Culture Group:
                        {CardsNames.filter((group) => {
                          return uniquecorrectanswers.some((answer) => {
                            return group[1].includes(answer);
                          });
                        }).map((group, index) => (
                          <span key={index}>{group[0]} </span>
                        ))}
                      </div>
                      <div>
                        Cultures:
                        {uniquecorrectanswers.map((culture, index) => (
                          <span key={index}>{culture} </span>
                        ))}
                      </div>
                    </div>
                  }
                  isitwrong={
                    correctanswers &&
                    correctanswers.current?.length ===
                      correctguessedprovinces.length
                  }
                ></CorrectAnswers>
              ) : (
                <div className="flex-row flex w-6/12 justify-evenly">
                  <div className="flex flex-col ">
                    <InputandList
                      inputref={regionref}
                      setquery={setregionquery}
                      query={regionquery ? regionquery : ""}
                      filterednames={
                        filteredculturegroups ? filteredculturegroups : [""]
                      }
                      placeholder="Culture Groups"
                    ></InputandList>
                    <InputandList
                      inputref={inputref}
                      setquery={setcardquery}
                      query={cardquery ? cardquery : ""}
                      filterednames={
                        filteredCardNames ? filteredCardNames : [""]
                      }
                      placeholder="Cultures"
                      onSubmit={handlesubmit}
                    ></InputandList>
                  </div>
                  <button
                    className=" w-10 rounded-lg mt-2  h-25 font-semibold text-md to-[rgb(132,3,168)]
             from-[rgb(150,10,175)] shadow-md shadow-[rgba(150,10,175,0.3)] justify-center items-center flex
             bg-gradient-to-b cursor-pointer transition-all hover:bg-gradient-to-t hover:scale-105 active:scale-90"
                    onClick={handlesubmit}
                  >
                    <img src={"/Logo/rightarrow.svg"} className="w-6"></img>
                  </button>
                </div>
              )}
            </div>

            {CardsNames && cardguesses ? (
              <CardGuesContainer
                cardguesses={[
                  ...cardguesses,
                  ...Array(6 - cardguesses.length).fill(""),
                ]}
                correctsolutions={uniquecorrectanswers}
              ></CardGuesContainer>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CultureCard;

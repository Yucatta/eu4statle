"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import { useDataContext } from "@/context/DataContext";
import CorrectAnswers from "./Answers";
import { useGameState } from "@/context/gamecontext";
import AreaOutlines from "./AreaPaths";
interface Props {
  CardsNames: string[];
  Cardrgbs: string[];
  countryprovinces: number[][];
  provincestats: Array<[string, number, string, string, string, string]>;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
}
const CountryGuesser = ({
  CardsNames,
  provincestats,
  Cardrgbs,
  cardguesses,
  onProvinceGuess,
  countryprovinces,
}: Props) => {
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
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

  const filteredCardNames = useMemo(() => {
    if (CardsNames) {
      if (cardquery) {
        return CardsNames.filter((cardname) => {
          return cardname.toLowerCase().includes(cardquery.toLowerCase());
        });
      } else {
        return CardsNames;
      }
    } else {
      return;
    }
  }, [CardsNames, cardquery, provincestats, statenames]);

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
                          ) ||
                          correctanswers.current?.length ===
                            correctguessedprovinces.length ||
                          cardguesses.length === 3
                          ? Cardrgbs && provincestats && CardsNames
                            ? Cardrgbs[
                                countryprovinces.findIndex((country) =>
                                  country.includes(Number(provinceid[0]))
                                )
                              ]
                            : "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : "rgb(50,50,50)"
                    }
                    stroke={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? "rgb(150,150,150)"
                        : "rgb(40,40,40)"
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
                        ? correctguessedprovinces.includes(provinceid) ||
                          correctanswers.current?.length ===
                            correctguessedprovinces.length ||
                          cardguesses.length === 3
                          ? Cardrgbs && provincestats && CardsNames
                            ? Cardrgbs[
                                countryprovinces.findIndex((country) =>
                                  country.includes(provinceid)
                                )
                              ]
                            : "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : "rgb(50,50,50)"
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
    Cardrgbs,
    provincestats,
    correctguessedprovinces,
  ]);

  useEffect(() => {
    function getcorrectanswers() {
      if (StateData && rndnum && CardsNames && provincestats) {
        hasinitialized.current = true;
        const tempanswers: string[] = [];
        // console.log(StateData, rndnum, CardsNames, provincestats);
        for (let i = 0; i < 5; i++) {
          if (StateData[rndnum[0]][i] === 0) {
            break;
          } else {
            tempanswers.push(
              CardsNames[
                countryprovinces.findIndex((country) =>
                  country.includes(StateData[rndnum[0]][i])
                )
              ]
            );
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
      correctanswers.current = temp;
    }
  }, [rndnum, StateData, CardsNames, provincestats]);
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
  }, [correctanswers]);
  const numberofguess = uniquecorrectanswers.length + 1;
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
    if (CardsNames && cardquery && inputref.current) {
      const temp = [...cardguesses];

      for (let i = 0; i <= temp.length; i++) {
        if (temp[i] === cardquery) {
          return;
        } else if (temp.length === i) {
          temp[i] = cardquery;
          break;
        }
      }
      onProvinceGuess(temp);
      inputref.current.value = "";
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
          <div className="flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden">
            <div className="flex flex-row w-full h-30 items-center justify-evenly">
              <div className="flex justify-center w-1/3 border-0 h-30">
                {Image ? Image : ""}
              </div>

              {correctanswers &&
              CardsNames &&
              (correctanswers.current?.length ===
                correctguessedprovinces.length ||
                cardguesses.length === 3) ? (
                <CorrectAnswers
                  isitwrong={
                    correctanswers &&
                    correctanswers.current?.length ===
                      correctguessedprovinces.length
                  }
                  correctanswers={
                    <>
                      Countries:{" "}
                      {uniquecorrectanswers.map(
                        (uniquecorrectanswer, index) => {
                          return (
                            <span key={index}>
                              {uniquecorrectanswer + " "}{" "}
                            </span>
                          );
                        }
                      )}
                    </>
                  }
                ></CorrectAnswers>
              ) : (
                <div className="flex-col flex w-auto justify-center itms-center">
                  <div className="flex w-50 flex-col ">
                    <InputandList
                      query={cardquery ? cardquery : ""}
                      inputref={inputref}
                      onSubmit={handlesubmit}
                      setquery={setcardquery}
                      filterednames={
                        filteredCardNames ? filteredCardNames : [""]
                      }
                      placeholder={"Countries"}
                    ></InputandList>
                  </div>
                  <button
                    className=" w-25 rounded-2xl mt-2 h-11 ml-10 text-sm border-2 border-[rgb(16,50,35)] bg-[rgb(16,84,80)] z-[5] cursor-pointer transition-all hover:scale-103 active:scale-90"
                    onClick={handlesubmit}
                    // onClick={handlesubmit}
                  >
                    GUESS
                  </button>
                </div>
              )}
            </div>

            {CardsNames && cardguesses ? (
              <CardGuesContainer
                cardguesses={[
                  ...cardguesses,
                  ...Array(numberofguess - cardguesses.length).fill(""),
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

export default CountryGuesser;

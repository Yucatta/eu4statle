"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import { useDataContext } from "@/context/DataContext";
interface Props {
  rndnum: number[] | undefined;
  CardsNames: string[][][];
  provincestats:
    | Array<[string, number, string, string, string, string]>
    | undefined;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
}
const CultureCard = ({
  rndnum,
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
  const cultures = useMemo(() => {
    if (CardsNames) {
      return CardsNames.map((group) => group[1]).flat();
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
                          ? "rgb(119, 221, 119)"
                          : "rgb(60, 60, 60)"
                        : // ? "none"
                          "rgb(45,45,45)"
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
                    // className="hover:fill-amber-700"
                    // onClick={() => {
                    //   console.log(provinceid);
                    // }}
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
                          ? "rgb(119, 221, 119)"
                          : cardguesses.length === 6
                          ? "rgb(177 64 62)"
                          : "rgb(60, 60, 60)"
                        : // ? "none"
                          "rgb(45,45,45)"
                    }
                    stroke={
                      StateData[rndnum[0]].includes(provinceid)
                        ? "rgb(150,150,150)"
                        : "rgb(50,50,50)"
                    }
                    strokeWidth={
                      StateData[rndnum[0]].includes(provinceid) ? "0.5" : "1"
                    }
                    key={provinceid}
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
                  stroke={index === rndnum[0] ? "rgb(80, 0, 100)" : "none"}
                  strokeWidth="1.2"
                  key={index}
                ></path>
              );
            }
          })}
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

  // console.log(StateData)
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
  const uniquecorrectanswers: string[] = [];
  if (correctanswers.current) {
    for (let i = 0; i < correctanswers.current.length; i++) {
      let tempok = true;
      for (let j = 0; j < uniquecorrectanswers.length; j++) {
        if (uniquecorrectanswers[j] === correctanswers.current[i]) {
          tempok = false;
          break;
        }
      }
      if (tempok) {
        uniquecorrectanswers.push(correctanswers.current[i]);
      }
    }
  }
  useEffect(() => {
    if (correctanswers.current) {
      const temp: number[] = [];
      for (let i = 0; i < cardguesses.length; i++) {
        const temp2 = findCorrectProvinces(cardguesses[i]);
        if (temp2) {
          console.log(temp2);
          temp.push(...temp2);
        }
      }
      setcorrectguessedprovinces(temp);
    }
  }, [cardguesses]);
  // const uniquecorrectanswers =
  function handlesubmit() {
    if (CardsNames && cardquery && inputref.current) {
      const temp = [...cardguesses];

      for (let i = 0; i <= temp.length; i++) {
        if (temp[i] === cardquery) {
          return;
        } else if (temp.length === i) {
          temp[i] = cardquery;
          // const tempcorrect = findCorrectProvinces(cardquery);

          // setcorrectguessedprovinces(() => {
          //   if (correctguessedprovinces[0] > 0) {
          //     return [...tempcorrect, ...correctguessedprovinces];
          //   } else {
          //     return tempcorrect;
          //   }
          // });
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
      <div className="flex flex-col w-9/10 pb-20">
        {rndnum ? (
          <div
            className={
              "flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden"
            }
          >
            <div className="flex flex-row w-full h-30 items-start justify-evenly">
              <div className="flex justify-center w-1/2 border-0 h-30">
                {Image ? Image : ""}
              </div>
              {correctanswers &&
              correctanswers.current?.length ===
                correctguessedprovinces.length ? (
                <div className=" w-9/10 h-10 rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100">
                  Cultures :{" "}
                  {uniquecorrectanswers.map((uniquecorrectanswer, index) => {
                    return <span key={index}>{uniquecorrectanswer} </span>;
                  })}
                </div>
              ) : CardsNames && cardguesses && cardguesses.length === 6 ? (
                <div className=" w-9/10  h-10 rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold">
                  Cultures :{" "}
                  {uniquecorrectanswers.map((uniquecorrectanswer, index) => {
                    return <span key={index}>{uniquecorrectanswer} </span>;
                  })}
                </div>
              ) : (
                <div className="flex-row flex  justify-evenly">
                  <div className="flex flex-col ">
                    <InputandList
                      inputref={regionref}
                      setquery={setregionquery}
                      statenames={culturegroups}
                      filterednames={
                        filteredculturegroups ? filteredculturegroups : [""]
                      }
                      widthofinput={"5/11"}
                      placeholder="Culture Groups"
                    ></InputandList>
                    <InputandList
                      inputref={inputref}
                      setquery={setcardquery}
                      statenames={cultures}
                      filterednames={
                        filteredCardNames ? filteredCardNames : [""]
                      }
                      widthofinput={"5/11"}
                      placeholder="Cultures"
                    ></InputandList>
                  </div>
                  <button
                    className=" w-4/11 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 z-50 cursor-pointer transition-all hover:scale-103 active:scale-90"
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

{
  /* <button
          onClick={() => {
            const temp = iscardopened;
            if (!temp) {
              setTimeout(() => {
                document.getElementById("card-container")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 200);
            }
            setiscardopened(!iscardopened);
          }}
          className="w-full h-11 mt-3 bg-[rgb(39,39,41)] rounded-xl cursor-pointer border-2 flex-row flex justify-between items-center border-[rgb(98,99,104)]"
        >
          <span className="ml-[15%]">
            {!CardsNames
              ? "Development"
              : CardsNames.length === 31
              ? "Trade Good Guesser"
              : CardsNames.length === 24
              ? "Religion Guesser"
              : CardsNames.length === 16
              ? "Terrain Guesser"
              : "Province Name Guesser"}
          </span>
          <div className="mr-[2%] w-6 h-6  text-center bg-[rgb(50,50,50)] rounded-full flex justify-center items-center">
            <span>
              {iscardopened ? (
                <svg width="10" height="7" viewBox="0 0 50 35 ">
                  {" "}
                  <path
                    d="M 0 0 L 25 35 L 50 0"
                    fill="none"
                    stroke={`rgb(255 255 255)`}
                    strokeWidth="8"
                  />
                </svg>
              ) : (
                <svg width="7" height="10" viewBox="0 0 35 50 ">
                  {" "}
                  <path
                    d="M 35 0 L 0 25 L 35 50"
                    fill="none"
                    stroke={`rgb(255 255 255)`}
                    strokeWidth="8"
                  />
                </svg>
              )}
            </span>
          </div>
        </button> */
}

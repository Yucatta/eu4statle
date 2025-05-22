"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import { useDataContext } from "@/context/DataContext";
interface Props {
  rndnum: number[] | undefined;
  CardsNames?: string[];
  provincestats:
    | Array<[string, number, string, string, string, string]>
    | undefined;
}
const ProvinceGuessCards = ({ rndnum, CardsNames, provincestats }: Props) => {
  const [iscardopened, setiscardopened] = useState(false);
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
  const [cardguesses, setcardguesses] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [correctguessedprovinces, setcorrectguessedprovinces] = useState([-1]);
  const hasinitialized = useRef(false);
  const correctanswers = useRef<string[] | undefined>(undefined);
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
  }, [CardsNames, cardquery]);
  const {
    paths,
    regionStateIds,
    // statenames,
    StateData,
    areapaths,
    areabboxes,
    // oceania,
    regionids,
    regionbboxes,
    emptylands,
    // areabboxes,
  } = useDataContext();
  const Image = useMemo(() => {
    if (
      regionStateIds &&
      rndnum &&
      StateData &&
      // !imageinitizalied.current &&
      paths &&
      emptylands &&
      regionbboxes &&
      regionids &&
      areabboxes &&
      areapaths[0]
    ) {
      // imageinitizalied.current = true;
      // const areabboxes;
      // console.log(areabboxes, rndnum, areabboxes[rndnum[0]]);
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
          {regionids[rndnum[1]].map((provinceid) => {
            return (
              <path
                d={String(paths[provinceid - 1][1])}
                fill={
                  StateData[rndnum[0]].includes(provinceid)
                    ? "rgb(60, 60, 60)"
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
  ]);

  useEffect(() => {
    function getcorrectanswers() {
      if (StateData && rndnum && CardsNames && provincestats) {
        hasinitialized.current = true;
        const tempanswers: string[] = [];

        for (let i = 0; i < 5; i++) {
          if (StateData[rndnum[0]][i] === 0) {
            break;
          } else {
            tempanswers.push(
              provincestats[StateData[rndnum[0]][i] - 1][
                CardsNames.length === 26
                  ? 3
                  : CardsNames.length === 31
                  ? 4
                  : CardsNames.length === 369
                  ? 2
                  : 0
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
      correctanswers.current = getcorrectanswers();
    }
  }, [rndnum, StateData, CardsNames, provincestats]);
  // useEffect(()=>{},[rndnum])
  useEffect(() => {
    correctanswers.current = undefined;
    hasinitialized.current = false;
    setcardguesses(["", "", "", "", "", "", "", "", "", "", "", ""]);
    setiscardopened(false);
  }, [rndnum]);
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
  // const uniquecorrectanswers =
  function handlesubmit() {
    if (CardsNames && cardquery && inputref.current) {
      const temp = [...cardguesses];

      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === cardquery) {
          return;
        } else if (temp[i] === "") {
          temp[i] = cardquery;
          const tempcorrect = findCorrectProvinces(cardquery);

          setcorrectguessedprovinces(() => {
            if (correctguessedprovinces[0] > 0) {
              return [...tempcorrect, ...correctguessedprovinces];
            } else {
              return tempcorrect;
            }
          });
          break;
        }
      }
      setcardguesses(temp);
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
      const temp: number[] = [];
      for (let i = 0; i < correctanswers.current.length; i++) {
        if (correctanswers.current[i] === cardquery) {
          temp.push(StateData[rndnum[0]][i]);
        }
      }
      return temp;
    } else {
      return [-1];
    }
  }
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        <button
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
              : CardsNames.length === 26
              ? "Religion Guesser"
              : CardsNames.length === 369
              ? "Culture Guesser"
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
        </button>
        {rndnum ? (
          <div
            id="card-container"
            className={
              iscardopened
                ? "flex flex-col justify-center items-center border-0 transition-all duration-500 opacity-100 scale-100 max-h-[1000px] overflow-hidden"
                : "flex flex-col justify-center items-center border-0 transition-all duration-500 opacity-0 scale-95 max-h-0 overflow-hidden"
            }
          >
            <div className="flex justify-center w-full border-0 h-21">
              {Image ? Image : ""}
              {/* <img
                src={`onlystates/${rndnum[0]}.png`}
                className=" w-auto fixed h-20 z-0"
              ></img>
              {StateData && correctguessedprovinces[0] !== -1
                ? correctguessedprovinces.map((id, index) => {
                    return (
                      <img
                        key={index}
                        src={`greenprovinces/${id}.png`}
                        className=" fixed w-auto h-20 z-10"
                      ></img>
                    );
                  })
                : ""} */}
            </div>

            {correctanswers &&
            correctanswers.current?.length ===
              correctguessedprovinces.length ? (
              <div className=" w-9/10 h-10 rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100">
                {!CardsNames
                  ? "Development"
                  : CardsNames.length === 31
                  ? "Trade Goods"
                  : CardsNames.length === 26
                  ? "Religions"
                  : CardsNames.length === 369
                  ? "Cultures"
                  : "Province Names"}
                :{" "}
                {uniquecorrectanswers.map((uniquecorrectanswer, index) => {
                  return <span key={index}>{uniquecorrectanswer} </span>;
                })}
              </div>
            ) : CardsNames &&
              cardguesses[
                CardsNames.length === 26
                  ? 3
                  : CardsNames.length === 31
                  ? 5
                  : CardsNames.length === 369
                  ? 4
                  : 9
              ] !== "" ? (
              <div className=" w-9/10  h-10 rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold">
                {!CardsNames
                  ? "Development"
                  : CardsNames.length === 31
                  ? "Trade Goods"
                  : CardsNames.length === 26
                  ? "Religions"
                  : CardsNames.length === 369
                  ? "Cultures"
                  : "Province Names"}
                :{" "}
                {uniquecorrectanswers.map((uniquecorrectanswer, index) => {
                  return <span key={index}>{uniquecorrectanswer} </span>;
                })}
              </div>
            ) : (
              <div className="flex-row flex  justify-evenly">
                <InputandList
                  inputref={inputref}
                  setquery={setcardquery}
                  statenames={CardsNames}
                  filterednames={filteredCardNames ? filteredCardNames : [""]}
                  widthofinput={"5/11"}
                  placeholder={
                    !CardsNames
                      ? "Development"
                      : CardsNames.length === 31
                      ? "Trade Goods"
                      : CardsNames.length === 26
                      ? "Religions"
                      : CardsNames.length === 369
                      ? "Cultures"
                      : "Province Name"
                  }
                ></InputandList>
                <button
                  className=" w-4/11 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 z-50 cursor-pointer transition-all hover:scale-103 active:scale-90"
                  onClick={handlesubmit}
                  // onClick={handlesubmit}
                >
                  GUESS
                </button>
              </div>
            )}
            {CardsNames ? (
              <CardGuesContainer
                cardguesses={cardguesses.slice(
                  0,
                  CardsNames.length === 26
                    ? 4
                    : CardsNames.length === 31
                    ? 6
                    : CardsNames.length === 369
                    ? 5
                    : 10
                )}
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

export default ProvinceGuessCards;

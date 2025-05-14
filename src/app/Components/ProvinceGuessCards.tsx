"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
interface Props {
  rndnum: number[] | undefined;
  CardsNames?: string[];
  provincestats: Array<[string, number, string, string, string]> | undefined;
  StateData: number[][] | undefined;
}
const ProvinceGuessCards = ({
  rndnum,
  CardsNames,
  provincestats,
  StateData,
}: Props) => {
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
          className="w-full h-11 mt-3 bg-[rgb(24,33,103)] rounded-xl cursor-pointer border-5 flex-row flex justify-between items-center border-[rgb(16,21,62)]"
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
          <div className="mr-[2%] w-8 h-8  text-center bg-[rgb(21,26,60)] rounded-full flex justify-center items-center">
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
                ? "flex flex-col justify-center items-center border-2 transition-all duration-500 opacity-100 scale-100 max-h-[1000px] overflow-hidden"
                : "flex flex-col justify-center items-center border-2 transition-all duration-500 opacity-0 scale-95 max-h-0 overflow-hidden"
            }
          >
            <div className="flex justify-center w-full border-2 h-21">
              <img
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
                : ""}
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

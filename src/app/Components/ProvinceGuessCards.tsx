"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import CardGuesses from "./CardGuesses";
import StateGuesses from "./StateGuesses";
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
  const [cardguesses, setcardguesses] = useState(["", "", "", ""]);
  const [correctguessedprovinces, setcorrectguessedprovinces] = useState([-1]);
  const hasinitialized = useRef(false);
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
  const correctanswers = useMemo(() => {
    if (
      StateData &&
      rndnum &&
      CardsNames &&
      provincestats &&
      !hasinitialized.current
    ) {
      hasinitialized.current = true;
      const tempids: number[] = [];
      const tempanswers: string[] = [];
      for (let i = 0; i < 5; i++) {
        if (StateData[rndnum[0]][i] === 0) {
          break;
        } else {
          tempids.push(StateData[rndnum[0]][i]);
        }
      }
      for (let i = 0; i < tempids.length; i++) {
        let tempok = true;
        for (let k = 0; k < tempanswers.length; k++) {
          if (
            provincestats[tempids[i]][
              CardsNames.length === 25 ? 4 : CardsNames.length === 31 ? 3 : 2
            ] ===
            tempanswers[
              CardsNames.length === 25 ? 4 : CardsNames.length === 31 ? 3 : 2
            ]
          ) {
            tempok = false;
            break;
          }
        }
        if (tempok) {
          tempanswers.push(
            provincestats[tempids[i]][
              CardsNames.length === 25 ? 4 : CardsNames.length === 31 ? 3 : 2
            ]
          );
        }
      }
      console.log(tempanswers);
      return tempanswers;
    } else {
      return;
    }
  }, [rndnum, StateData, CardsNames, provincestats]);
  if (correctanswers) {
    console.log(correctanswers);
  }

  function handlesubmit() {
    if (CardsNames && cardquery && inputref.current) {
      const temp = [...cardguesses];

      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === cardquery) {
          return;
        } else if (temp[i] === "") {
          temp[i] = cardquery;
          const tempcorrect = findCorrectProvinces(cardquery);
          setcorrectguessedprovinces(tempcorrect);
          break;
        }
      }
      setcardguesses(temp);
      inputref.current.value = "";
    }
  }
  function findCorrectProvinces(cardquery: string) {
    if (CardsNames && StateData && rndnum && provincestats) {
      const temp: number[] = [];
      for (let i = 0; i < StateData[rndnum[0]].length - 2; i++) {
        if (
          provincestats[StateData[rndnum[0]][i]][
            CardsNames.length === 25 ? 4 : CardsNames.length === 31 ? 3 : 2
          ] === cardquery
        ) {
          temp.push(StateData[rndnum[0]][i]);
        }
      }
      return temp;
    } else {
      return [-1];
    }
  }
  useEffect(() => {}, [cardguesses]);
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        <button
          onClick={() => {
            setiscardopened(!iscardopened);
            setTimeout(() => {
              document.getElementById("card-container")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 200);
          }}
          className="w-full h-11 mt-3 bg-green-500 rounded-xl cursor-pointer"
        ></button>
        {rndnum ? (
          <div
            id="card-container"
            className={
              iscardopened
                ? "flex flex-col justify-center items-center border-2 transition-all duration-500 opacity-100 scale-100 max-h-[1000px] overflow-hidden"
                : "flex flex-col justify-center items-center border-2 transition-all duration-500 opacity-0 scale-95 max-h-0 overflow-hidden"
            }
          >
            <div className="flex justify-center">
              <img
                src={`onlystates/${rndnum[0]}.png`}
                className="border-2 w-auto fixed h-20 z-0"
              ></img>
              {StateData && correctguessedprovinces[0] !== -1
                ? correctguessedprovinces.map((id) => {
                    return (
                      <>
                        <img
                          src={`greenprovinces/${id}.png`}
                          className="border-2 fixed w-auto h-20 z-10"
                        ></img>
                      </>
                    );
                  })
                : ""}
              {/* {StateData ? <img
                src={`greenprovinces/${StateData[rndnum[0]][0]}.png`}
                className="border-2 fixed w-auto h-20 z-10"
              ></img>
              <img
                src={`greenprovinces/${StateData[rndnum[0]][1]}.png`}
                className="border-2 w-auto fixed h-20 z-10"
              ></img>
              <img
                src={`greenprovinces/${StateData[rndnum[0]][2]}.png`}
                className="border-2 w-auto fixed h-20 z-10"
              ></img> } */}
            </div>
            <div className="flex-row flex mt-19 justify-between">
              <InputandList
                inputref={inputref}
                setquery={setcardquery}
                statenames={CardsNames}
                filterednames={filteredCardNames ? filteredCardNames : [""]}
                widthofinput={"8/22"}
                placeholder={
                  !CardsNames
                    ? "Development"
                    : CardsNames.length === 31
                    ? "Trade Good"
                    : CardsNames.length === 25
                    ? "Religion"
                    : "Culture"
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
            <CardGuesContainer cardguesses={cardguesses}></CardGuesContainer>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProvinceGuessCards;

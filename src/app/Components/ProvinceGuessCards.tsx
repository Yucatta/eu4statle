"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import CardGuesses from "./CardGuesses";
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
  const inputref = useRef(null);
  const [cardguesses, setcardguesses] = useState(["", "", "", ""]);
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
  function handlesubmit() {
    if (CardsNames && cardquery) {
      const temp = [...cardguesses]; // create new array
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === "") {
          temp[i] = cardquery;
          break;
        }
      }
      setcardguesses(temp); // React sees new array reference -> re-renders
    }
  }
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

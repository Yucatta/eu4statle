import React, { useEffect, useMemo, useRef, useState } from "react";
import InputandList from "./Input";
import CardGuesContainer from "./CardGuesContainer";
import { stringify } from "querystring";
import { type } from "os";
interface Props {
  rndnum: number[] | undefined;
  Development: number;
  provincestats: Array<[string, number, string, string, string]> | undefined;
  StateData: number[][] | undefined;
}
const DevelopmentCard = ({
  rndnum,
  Development,
  provincestats,
  StateData,
}: Props) => {
  const [iscardopened, setiscardopened] = useState(false);
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
  const [cardguesses, setscardguesses] = useState<number[]>([0, 0, 0, 0]);
  const handlesubmit = (e: number) => {
    if (!cardguesses.includes(e)) {
      setscardguesses([e, ...cardguesses.slice(0, 3)]);

      if (Development + 2 >= e && Development - 2 < e) {
      }
    } else {
    }
  };
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
          className="w-full h-11 mt-3 bg-[rgb(24,33,103)] rounded-xl cursor-pointer border-5 flex-row flex justify-between items-center border-[rgb(16,21,62)]"
        >
          <span className="ml-[15%]">Development Guesser</span>
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
              {/* {StateData && correctguessedprovinces[0] !== -1
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
            `
            {cardguesses.filter((e) => {
              if (
                Development + 2 >= e &&
                Development - 2 < e &&
                Development !== 0
              ) {
                console.log("e", e > Development, Development);
                return e;
              }
            }).length > 0 ? (
              <div className=" w-9/10 h-10 rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100">
                Average Development : {Development}
              </div>
            ) : Development && cardguesses[3] !== 0 ? (
              <div className=" w-9/10  h-10 rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold">
                Development :{" "}
              </div>
            ) : (
              <div className="flex-row flex  justify-evenly">
                <input
                  placeholder="avg Dev range 2"
                  ref={inputref}
                  type="number"
                ></input>
                <button
                  className=" w-4/11 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 z-50 cursor-pointer transition-all hover:scale-103 active:scale-90"
                  onClick={() => {
                    if (
                      inputref.current &&
                      typeof inputref.current.value === "number"
                    ) {
                      handlesubmit(inputref.current.value);
                    }
                  }}
                  // onClick={handlesubmit}
                >
                  GUESS
                </button>
              </div>
            )}
            `
            {
              <CardGuesContainer
                cardguesses={cardguesses.map((guess) => {
                  if (guess) {
                    return String(guess);
                  } else {
                    return "";
                  }
                })}
              ></CardGuesContainer>
            }
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DevelopmentCard;

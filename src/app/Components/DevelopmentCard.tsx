import React, { useRef, useState, useMemo } from "react";
// import InputandList from "./Input";
import { useDataContext } from "@/context/DataContext";
import CardGuesContainer from "./CardGuesContainer";
// import { stringify } from "querystring";
// import { type } from "os";
interface Props {
  rndnum: number[] | undefined;
  Development: number;
  provincestats:
    | Array<[string, number, string, string, string, string]>
    | undefined;
  StateData: number[][] | undefined;
}
const DevelopmentCard = ({
  rndnum,
  Development,
}: // provincestats,
// StateData,
Props) => {
  const [iscardopened, setiscardopened] = useState(false);
  // const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
  const [cardguesses, setscardguesses] = useState<number[]>([0, 0, 0, 0]);
  function handlesubmit(e: number) {
    console.log(e, cardguesses);
    if (!cardguesses.includes(e)) {
      setscardguesses([e, ...cardguesses.slice(0, 3)]);
      if (Development + 1 >= e && Development - 1 < e) {
      }
    } else {
    }
  }
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
          className="w-full h-full  bg-[rgb(50,50,150)]"
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
                    ? "rgb(50, 50, 50)"
                    : // ? "none"
                      "rgb(30,30,30)"
                }
                stroke={
                  StateData[rndnum[0]].includes(provinceid)
                    ? "rgb(150,150,150)"
                    : "rgb(35,35,35)"
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
  // console.log(cardguesses);
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
          className="w-full h-11 mt-3 bg-[rgb(39,39,41)] rounded-xl cursor-pointer border-2 flex-row flex justify-between items-center border-[rgb(98,99,104)]"
        >
          <span className="ml-[15%]">Development Guesser</span>
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
                ? "flex flex-col justify-center items-center transition-all duration-500 opacity-100 scale-100 max-h-[1000px] overflow-hidden"
                : "flex flex-col justify-center items-center  transition-all duration-500 opacity-0 scale-95 max-h-0 overflow-hidden"
            }
          >
            <div className="flex justify-center w-full  h-21">
              {/* <img
                src={`onlystates/${rndnum[0]}.png`}
                className=" w-auto fixed h-20 z-0"
              ></img> */}
              {Image ? Image : ""}
            </div>

            {cardguesses.filter((e) => {
              if (
                Development + 2 >= e &&
                Development - 2 < e &&
                Development !== 0
              ) {
                // console.log("e", e > Development, Development);
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
                  // type="number"
                  className="border-2 h-10 mt-2 border-neutral-300"
                ></input>
                <button
                  className=" w-4/11 rounded-2xl ml-2 mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 z-50 cursor-pointer transition-all hover:scale-103 active:scale-90"
                  onClick={() => {
                    // console.log("aaaaa", Development);
                    if (
                      inputref.current
                      // typeof inputref.current.value === "number"
                    ) {
                      handlesubmit(Number(inputref.current.value));
                    }
                  }}
                  // onClick={handlesubmit}
                >
                  GUESS
                </button>
              </div>
            )}

            {
              <CardGuesContainer
                cardguesses={cardguesses.map((guess) => {
                  if (guess) {
                    return String(guess);
                  } else {
                    return "";
                  }
                })}
                correctsolutions={[`${Development}`]}
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

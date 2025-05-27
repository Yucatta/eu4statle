import React, { useRef, useMemo, useState } from "react";
// import InputandList from "./Input";
import { useDataContext } from "@/context/DataContext";
import CardGuesContainer from "./CardGuesContainer";
import InputandList from "./Input";
// import { stringify } from "querystring";
// import { type } from "os";
interface Props {
  rndnum: number[] | undefined;
  Development: number;
  developmentrgbs?: string[];
  provincestats:
    | Array<[string, number, string, string, string, string]>
    | undefined;
  StateData: number[][] | undefined;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
}
const cardnames = [
  "3 - 5",
  "5 - 7",
  "7 - 9",
  "9 - 11",
  "11 - 13",
  "13 - 15",
  "15 - 17",
  "17 - 19",
  "19 - 21",
  "21 - 23",
];

const DevelopmentCard = ({
  rndnum,
  Development,
  onProvinceGuess,
  developmentrgbs,
  cardguesses,
  provincestats,
}: // provincestats,
// StateData,
Props) => {
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);
  const inputref = useRef<HTMLInputElement>(null);
  function handlesubmit(e: string) {
    if (!cardguesses.includes(String(e))) {
      onProvinceGuess([...cardguesses, String(e)]);
      inputref.current!.value = "";
      setcardquery("");
      // setscardguesses([e, ...cardguesses.slice(0, 3)]);
    }
  }
  const {
    paths,
    regionStateIds,
    // statenames,
    StateData,
    areapaths,
    areabboxes,
    oceania,
    regionids,
    regionbboxes,
    emptylands,
    // areabboxes,
  } = useDataContext();
  const filterednames = useMemo(() => {
    if (cardquery) {
      return cardnames.filter((name) => name.includes(cardquery));
    } else {
      return cardnames;
    }
  }, [cardquery]);
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
          className="w-full h-full"
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
                        ? (cardguesses
                            .map((e) => {
                              if (
                                cardnames.indexOf(e) * 2 + 3 <= Development &&
                                cardnames.indexOf(e) * 2 + 5 >= Development
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            })
                            .includes(true) ||
                            (Development && cardguesses.length === 4)) &&
                          provincestats &&
                          developmentrgbs
                          ? developmentrgbs[
                              provincestats[Number(provinceid[0]) - 1][1] - 3
                            ]
                          : "rgb(60, 60, 60)"
                        : "rgb(45,45,45)"
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
                // console.log(developmentrgbs, provincestats);
                if (
                  StateData[rndnum[0]].includes(provinceid) &&
                  developmentrgbs &&
                  provincestats
                ) {
                  console.log(
                    developmentrgbs,
                    developmentrgbs[provincestats[provinceid - 1][1] - 3],
                    provincestats[provinceid - 1][1] - 3,
                    provinceid,
                    "aaa"
                  );
                  // console.log(
                  //   developmentrgbs[provincestats[provinceid - 1][1] - 3]
                  // );
                }
                return (
                  <path
                    d={String(paths[provinceid - 1][1])}
                    fill={
                      StateData[rndnum[0]].includes(provinceid)
                        ? (cardguesses
                            .map((e) => {
                              if (
                                cardnames.indexOf(e) * 2 + 3 <= Development &&
                                cardnames.indexOf(e) * 2 + 5 >= Development
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            })
                            .includes(true) ||
                            (Development && cardguesses.length === 4)) &&
                          provincestats &&
                          developmentrgbs
                          ? developmentrgbs[
                              provincestats[provinceid - 1][1] - 3
                            ]
                          : "rgb(60, 60, 60)"
                        : "rgb(45,45,45)"
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
    cardguesses,
    provincestats,
    developmentrgbs,
  ]);
  console.log(Development);
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        {rndnum ? (
          <div className="flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden">
            <div className="flex flex-row w-full h-30 items-start justify-evenly">
              <div className="flex justify-center w-1/3 border-0 h-30">
                {Image ? Image : ""}
              </div>

              {cardguesses
                .map((e) => {
                  if (
                    cardnames.indexOf(e) * 2 + 3 <= Development &&
                    cardnames.indexOf(e) * 2 + 5 >= Development
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .includes(true) ? (
                <div className=" w-9/10 h-10 rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100">
                  Average Development : {Development}
                </div>
              ) : Development && cardguesses.length === 4 ? (
                <div className=" w-9/10  h-10 rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold">
                  Average Development : {Development}
                </div>
              ) : (
                <div className="flex-col flex w-auto h-30 justify-center mt-0.5 itms-center">
                  <InputandList
                    inputref={inputref}
                    statenames={cardnames}
                    setquery={setcardquery}
                    widthofinput="45"
                    placeholder="AverageDevelopment"
                    filterednames={filterednames}
                  />
                  <button
                    className=" w-25 rounded-2xl ml-10 mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 z-0 cursor-pointer transition-all hover:scale-103 active:scale-90"
                    onClick={() => {
                      // console.log("aaaaa", Development);
                      if (
                        inputref.current
                        // typeof inputref.current.value === "number"
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
            </div>

            {
              <CardGuesContainer
                cardguesses={[
                  ...cardguesses,
                  ...Array(4 - cardguesses.length).fill(""),
                ]}
                correctsolutions={
                  // Development % 1
                  //   ? Development % 2
                  //     ? [
                  //         `${Development} - ${Development + 2}`,
                  //         `${Development - 2} - ${Development}`,
                  //       ]
                  //     : [`${Development - 1} - ${Development + 1}`]
                  //   :
                  Math.floor(Development) % 2
                    ? [
                        `${Math.floor(Development)} - ${
                          Math.floor(Development) + 2
                        }`,
                        `${Math.floor(Development) - 2} - ${Math.floor(
                          Development
                        )}`,
                      ]
                    : [
                        `${Math.floor(Development) - 1} - ${
                          Math.floor(Development) + 1
                        }`,
                      ]
                }
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

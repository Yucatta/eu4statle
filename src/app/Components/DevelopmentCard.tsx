import React, { useRef, useMemo, useState } from "react";
// import InputandList from "./Input";
import { useDataContext } from "@/context/DataContext";
import CardGuesContainer from "./CardGuesContainer";
import InputandList from "./Input";
import CorrectAnswers from "./Answers";
import { useGameState } from "@/context/gamecontext";
import AreaOutlines from "./AreaPaths";
import SvgPath from "./SvgPath";
// import { stringify } from "querystring";
// import { type } from "os";
interface Props {
  Development: number;
  developmentrgbs?: string[];
  provincestats: Array<[string, number, string, string, string, string]>;
  StateData: number[][];
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
  function handlesubmit() {
    if (
      inputref.current &&
      filterednames &&
      !cardguesses.includes(String(inputref.current.value)) &&
      inputref.current &&
      filterednames.some((cardname) =>
        inputref.current!.value.toLowerCase().includes(cardname.toLowerCase())
      )
    ) {
      onProvinceGuess([...cardguesses, String(inputref.current.value)]);
      inputref.current!.value = "";
      setcardquery("");
    }
  }
  const { rndnum } = useGameState();
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
      return (
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
                  <SvgPath
                    fillcolor={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? (cardguesses.some((e) => {
                            return (
                              cardnames.indexOf(e) * 2 + 3 <= Development &&
                              cardnames.indexOf(e) * 2 + 5 >= Development
                            );
                          }) ||
                            (Development && cardguesses.length === 4)) &&
                          provincestats &&
                          developmentrgbs
                          ? developmentrgbs[
                              provincestats[Number(provinceid[0]) - 1][1] - 3
                            ]
                          : "rgb(80, 80, 80)"
                        : "rgb(40,40,40)"
                    }
                    path={provinceid[1]}
                    provinceid={Number(provinceid[0])}
                    key={Number(provinceid[0])}
                  ></SvgPath>
                );
              })
            : regionids[rndnum[1]].map((provinceid) => {
                return (
                  <SvgPath
                    fillcolor={
                      StateData[rndnum[0]].includes(provinceid)
                        ? (cardguesses.some((e) => {
                            return (
                              cardnames.indexOf(e) * 2 + 3 <= Development &&
                              cardnames.indexOf(e) * 2 + 5 >= Development
                            );
                          }) ||
                            (Development && cardguesses.length === 4)) &&
                          provincestats &&
                          developmentrgbs
                          ? developmentrgbs[
                              provincestats[provinceid - 1][1] - 3
                            ]
                          : "rgb(80,80,80)"
                        : "rgb(50,50,50)"
                    }
                    path={String(paths[provinceid - 1][1])}
                    provinceid={provinceid}
                    key={provinceid}
                  ></SvgPath>
                );
              })}
          <AreaOutlines></AreaOutlines>
        </svg>
      );
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
  // console.log(Development % 1 );
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        {rndnum ? (
          <div className="flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden">
            <div className="flex flex-row w-full h-30 items-center justify-evenly">
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
                .includes(true) ||
              (Development && cardguesses.length === 2) ? (
                <CorrectAnswers
                  correctanswers={<>Average Development : {Development}</>}
                  isitwrong={cardguesses
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
                    .includes(true)}
                ></CorrectAnswers>
              ) : (
                <div className="flex-col flex w-auto h-30 justify-center mt-0.5 itms-center">
                  <div className="w-50">
                    <InputandList
                      inputref={inputref}
                      setquery={setcardquery}
                      onSubmit={handlesubmit}
                      query={cardquery ? cardquery : ""}
                      placeholder="Average Development"
                      filterednames={filterednames}
                    />
                  </div>
                  <button
                    className=" w-25 rounded-2xl ml-10 mt-2 h-11 text-sm border-2 border-[rgb(16,50,35)] bg-[rgb(16,84,80)] z-0 cursor-pointer transition-all hover:scale-103 active:scale-90"
                    onClick={handlesubmit}
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
                  ...Array(2 - cardguesses.length).fill(""),
                ]}
                correctsolutions={
                  !(Development % 1)
                    ? Development % 2
                      ? [
                          `${Development} - ${Development + 2}`,
                          `${Development - 2} - ${Development}`,
                        ]
                      : [`${Development - 1} - ${Development + 1}`]
                    : Math.floor(Development) % 2
                    ? [
                        `${Math.floor(Development)} - ${
                          Math.floor(Development) + 2
                        }`,
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

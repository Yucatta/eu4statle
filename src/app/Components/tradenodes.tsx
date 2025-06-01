import React, { useRef, useMemo, useState } from "react";
// import InputandList from "./Input";
import { useDataContext } from "@/context/DataContext";
import CardGuesContainer from "./CardGuesContainer";
import InputandList from "./Input";
import CorrectAnswers from "./Answers";
import { useGameState } from "@/context/gamecontext";
// import { stringify } from "querystring";
// import { type } from "os";
interface Props {
  tradenodes: string[];
  tradenodemembers: number[][];
  provincestats: Array<[string, number, string, string, string, string]>;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
}

const TradeNodes = ({
  onProvinceGuess,
  cardguesses,
  provincestats,
  tradenodes,
  tradenodemembers,
}: // provincestats,
// StateData,
Props) => {
  const [cardquery, setcardquery] = useState<string | undefined>(undefined);

  const inputref = useRef<HTMLInputElement>(null);
  function handlesubmit() {
    if (
      inputref.current &&
      !cardguesses.includes(String(inputref.current.value))
    ) {
      onProvinceGuess([...cardguesses, String(inputref.current.value)]);
      inputref.current!.value = "";
      setcardquery("");
      // setscardguesses([e, ...cardguesses.slice(0, 3)]);
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
  const correctnode: [string, number] | undefined = useMemo(() => {
    if (tradenodes && tradenodemembers && rndnum && StateData) {
      return [
        tradenodes.filter((_, index) =>
          tradenodemembers[index].includes(StateData[rndnum[0]][0])
        )[0],
        tradenodemembers.findIndex(() => StateData[rndnum[0]]),
      ];
    }
  }, [tradenodes, tradenodemembers, rndnum, StateData]);
  const filterednames = useMemo(() => {
    if (cardquery) {
      return tradenodes.filter((name) =>
        name.toLowerCase().includes(cardquery.toLowerCase())
      );
    } else {
      return tradenodes;
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
                    // fill={
                    //   StateData[rndnum[0]].includes(Number(provinceid[0]))
                    // ? correctnode && cardguesses.includes(correctnode[0])
                    //   ?  "rgb(119, 221, 119)"
                    //       : "rgb(60, 60, 60)"
                    //     : "rgb(45,45,45)"
                    // }
                    fill={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? correctnode && cardguesses.includes(correctnode[0])
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 2
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : // ? "none"
                          "rgb(50,50,50)"
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
                  ></path>
                );
              })
            : regionids[rndnum[1]].map((provinceid) => {
                return (
                  <path
                    d={String(paths[provinceid - 1][1])}
                    fill={
                      StateData[rndnum[0]].includes(provinceid)
                        ? correctnode && cardguesses.includes(correctnode[0])
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 2
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : // ? "none"
                          "rgb(50,50,50)"
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
    tradenodes,
    tradenodemembers,
  ]);
  return (
    <>
      <div className="flex flex-col w-9/10 ">
        {rndnum ? (
          <div className="flex flex-col justify-center items-center border-0 max-h-[1000px] overflow-hidden">
            <div className="flex flex-row w-full h-30 items-center justify-evenly">
              <div className="flex justify-center w-1/3 border-0 h-30">
                {Image ? Image : ""}
              </div>

              {(correctnode && cardguesses.includes(correctnode[0])) ||
              cardguesses.length === 2 ? (
                <CorrectAnswers
                  correctanswers={
                    <>
                      Trade Node :{" "}
                      {tradenodes.filter((_, index) =>
                        tradenodemembers[index].includes(
                          StateData[rndnum[0]][0]
                        )
                      )}
                    </>
                  }
                  isitwrong={
                    !!correctnode && cardguesses.includes(correctnode[0])
                  }
                ></CorrectAnswers>
              ) : (
                <div className="flex-col flex w-auto h-30 justify-center mt-0.5 itms-center">
                  <div className="w-50">
                    <InputandList
                      inputref={inputref}
                      setquery={setcardquery}
                      onSubmit={handlesubmit}
                      query={cardquery ? cardquery : ""}
                      widthofinput="45"
                      placeholder="Trade Node"
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
                correctsolutions={correctnode ? [correctnode[0]] : [""]}
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

export default TradeNodes;

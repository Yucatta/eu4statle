import React, { useRef, useMemo, useState } from "react";
import { useDataContext } from "@/context/DataContext";
import CardGuesContainer from "./CardGuesContainer";
import InputandList from "./Input";
import CorrectAnswers from "./Answers";
import { useGameState } from "@/context/gamecontext";
import AreaOutlines from "./AreaPaths";
import SvgPath from "./SvgPath";
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
}: Props) => {
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
    StateData,
    areapaths,
    areabboxes,
    oceania,
    regionids,
    regionbboxes,
    emptylands,
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
                <SvgPath
                  provinceid={Number(provinceid[0])}
                  fillcolor={
                    StateData[rndnum[0]].includes(Number(provinceid[0]))
                      ? correctnode && cardguesses.includes(correctnode[0])
                        ? "rgb(63,255,0)"
                        : cardguesses.length === 2
                        ? "rgb(177 64 62)"
                        : "rgb(80, 80, 80)"
                      : // ? "none"
                        "rgb(50,50,50)"
                  }
                  path={provinceid[1]}
                ></SvgPath>;
                return (
                  <SvgPath
                    provinceid={Number(provinceid[0])}
                    fillcolor={
                      StateData[rndnum[0]].includes(Number(provinceid[0]))
                        ? correctnode && cardguesses.includes(correctnode[0])
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 2
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : // ? "none"
                          "rgb(50,50,50)"
                    }
                    path={provinceid[1]}
                    key={Number(provinceid[0])}
                  ></SvgPath>
                );
              })
            : regionids[rndnum[1]].map((provinceid) => {
                return (
                  <SvgPath
                    provinceid={provinceid}
                    fillcolor={
                      StateData[rndnum[0]].includes(provinceid)
                        ? correctnode && cardguesses.includes(correctnode[0])
                          ? "rgb(63,255,0)"
                          : cardguesses.length === 2
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : "rgb(50,50,50)"
                    }
                    path={String(paths[provinceid - 1][1])}
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
                <div className="flex-col flex w-auto h-30 justify-center mt-0.5 items-center">
                  <div className="w-50">
                    <InputandList
                      inputref={inputref}
                      setquery={setcardquery}
                      onSubmit={handlesubmit}
                      query={cardquery ? cardquery : ""}
                      placeholder="Trade Node"
                      filterednames={filterednames}
                    />
                  </div>
                  <button
                    className=" w-20 rounded-lg mt-2 h-11 font-semibold text-md to-[rgb(132,3,168)]
             from-[rgb(150,10,175)] shadow-md shadow-[rgba(150,10,175,0.3)] flex justify-center items-center
             bg-gradient-to-b cursor-pointer transition-all hover:bg-gradient-to-t hover:scale-105 active:scale-90"
                    onClick={handlesubmit}
                  >
                    <img src={"/Logo/rightarrow.svg"} className="w-6"></img>
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

import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";
import React, { useEffect, useMemo, useState } from "react";
import AreaOutlines from "./AreaPaths";
interface Props {
  provincestats: Array<[string, number, string, string, string, string]>;
  onProvinceGuess: (e: string[]) => void;
  cardguesses: string[];
  building: number[];
  currentbuilding: number;
}
const ProvinceViewer = ({
  provincestats,
  onProvinceGuess,
  cardguesses,
  currentbuilding,
  building,
}: Props) => {
  const { rndnum } = useGameState();
  const {
    paths,
    regionStateIds,
    statenames,
    StateData,
    areapaths,
    areabboxes,
    oceania,
    regionids,
    regionbboxes,
    emptylands,
  } = useDataContext();
  const [useranswer, setuseranswer] = useState(0);
  const [selectedprovinces, setselectedprovinces] = useState<number[]>([]);
  const guesslimit =
    StateData[rndnum![0]].filter((id) => id && building[id - 1]).length > 2
      ? 3
      : 2;
  const buildingname = currentbuilding
    ? currentbuilding == 1
      ? "Estuary"
      : currentbuilding == 2
      ? "Trade Center"
      : "Monument"
    : "Fort";
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
                      ${areabboxes[rndnum[0]][0]} ${
            areabboxes[rndnum[0]][1]
          }  ${areabboxes[rndnum[0]][2] - areabboxes[rndnum[0]][0]} ${
            areabboxes[rndnum[0]][3] - areabboxes[rndnum[0]][1]
          }
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
                        ? selectedprovinces.includes(Number(provinceid[0])) &&
                          building &&
                          building[Number(provinceid[0]) - 1]
                          ? "rgb(63,255,0)"
                          : selectedprovinces.includes(Number(provinceid[0]))
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : "rgb(50,50,50)"
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
                    onClick={() => {
                      if (
                        StateData[rndnum[0]].includes(Number(provinceid[0])) &&
                        StateData[rndnum[0]].some((id) => {
                          return id && building[id - 1];
                        }) &&
                        !selectedprovinces.includes(Number(provinceid[0]))
                      ) {
                        setselectedprovinces([
                          Number(provinceid[0]),
                          ...selectedprovinces,
                        ]);
                      }
                    }}
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
                        ? (selectedprovinces.includes(provinceid) &&
                            building[provinceid - 1]) ||
                          (selectedprovinces.length === guesslimit &&
                            building[provinceid - 1])
                          ? "rgb(40,40,50)"
                          : selectedprovinces.includes(provinceid)
                          ? "rgb(177 64 62)"
                          : "rgb(80, 80, 80)"
                        : "rgb(50,50,50)"
                    }
                    stroke={
                      StateData[rndnum[0]].includes(provinceid)
                        ? "rgb(150,150,150)"
                        : "rgb(40,40,40)"
                    }
                    onClick={() => {
                      if (
                        StateData[rndnum[0]].includes(provinceid) &&
                        useranswer &&
                        StateData[rndnum[0]].some((id) => {
                          return id && building[id - 1];
                        }) &&
                        !selectedprovinces.includes(provinceid) &&
                        selectedprovinces.length !== guesslimit
                      ) {
                        onProvinceGuess([...cardguesses, String(provinceid)]);
                        setselectedprovinces([
                          provinceid,
                          ...selectedprovinces,
                        ]);
                      }
                    }}
                    className={
                      StateData[rndnum[0]].includes(provinceid) &&
                      useranswer &&
                      StateData[rndnum[0]].some((id) => {
                        return id && building[id - 1];
                      }) &&
                      !selectedprovinces.includes(provinceid) &&
                      selectedprovinces.length !== guesslimit
                        ? "cursor-pointer"
                        : ""
                    }
                    strokeWidth={
                      StateData[rndnum[0]].includes(provinceid) ? "0.5" : "1"
                    }
                    key={provinceid}
                    // }}
                  ></path>
                );
              })}
          <AreaOutlines></AreaOutlines>
        </svg>
      );
      return a;
    }
  }, [
    regionStateIds,
    StateData,
    rndnum,
    selectedprovinces,
    paths,
    emptylands,
    regionbboxes,
    regionids,
    areapaths,
    useranswer,
    cardguesses,
    provincestats,
  ]);
  useEffect(() => {
    setuseranswer(cardguesses.length ? Number(cardguesses[0]) : 0);
    if (cardguesses.length > 1) {
      setselectedprovinces(
        cardguesses.slice(1, cardguesses.length).map((id) => {
          return Number(id);
        })
      );
    }
  }, [cardguesses]);
  return (
    <>
      <div className="flex w-full h-full flex-col items-center justify-center">
        {useranswer && rndnum ? (
          StateData[rndnum[0]].some((id) => {
            return id && building[id - 1];
          }) ? (
            <>
              {useranswer - 1 ? (
                <div className="w-auto p-2 rounded-md font-semibold text-center text-sm mb-1 mt-1.5 bg-red-300 text-black  transition-all break-words">
                  <span>
                    {" "}
                    {statenames[rndnum![0]]} Has {buildingname}
                  </span>{" "}
                  <br />
                  <strong>
                    {" "}
                    Click Province{"(s)"} with {buildingname}
                  </strong>
                </div>
              ) : (
                <div className="w-auto p-2 rounded-md text-center text-sm mb-1 mt-1.5 bg-green-500 text-black font-semibold transition-all break-words">
                  <span>
                    {" "}
                    {statenames[rndnum![0]]} Has {buildingname}
                  </span>{" "}
                  <br />
                  <strong>
                    {" "}
                    Click Province{"(s)"} with {buildingname}
                  </strong>
                </div>
              )}
            </>
          ) : (
            <>
              {useranswer - 1 ? (
                <div className="w-auto p-2 rounded-md text-center text-md mb-2 bg-green-500 text-black font-semibold transition-all break-words">
                  {statenames[rndnum![0]]} {"Doesn't have a"} {buildingname}
                </div>
              ) : (
                <div className="w-auto p-2 rounded-md text-center text-md  mb-2 bg-red-300 text-black font-semibold transition-all break-words">
                  {statenames[rndnum![0]]} {"Doesn't have a"} {buildingname}
                </div>
              )}
            </>
          )
        ) : (
          ""
        )}
        <div className="flex w-11/12 flex-row items-center justify-evenly">
          <div className="w-1/2 h-40">{Image ? Image : ""}</div>

          {!useranswer ? (
            <div className="flex flex-col w-1/3 gap-y-2 justify-center items-center">
              <div className="bg-[rgb(44,44,50)] mb-2 p-2 rounded-md">
                Does {statenames[rndnum![0]]} Have {buildingname} ?
              </div>
              <button
                className="w-30 h-10 bg-[rgb(26,99,63)] cursor-pointer rounded-md"
                onClick={() => {
                  setuseranswer(1);
                  onProvinceGuess(["1"]);
                }}
              >
                Yes
              </button>
              <button
                className="w-30 h-10 bg-[rgb(25,79,96)]  cursor-pointer rounded-md"
                onClick={() => {
                  setuseranswer(2);
                  onProvinceGuess(["2"]);
                }}
              >
                No
              </button>
            </div>
          ) : StateData[rndnum![0]].filter((id) => id && building[id - 1])
              .length ? (
            selectedprovinces.filter((id) => building[id - 1]).length ===
            StateData[rndnum![0]].filter((id) => id && building[id - 1])
              .length ? (
              <div className="flex justify-center items-center text-center rounded-sm w-40 h-14 text-black font-semibold bg-green-600">
                {statenames[rndnum![0]]} Has{" "}
                {
                  StateData[rndnum![0]].filter((id) => id && building[id - 1])
                    .length
                }{" "}
                {buildingname}
              </div>
            ) : selectedprovinces.length === guesslimit ? (
              <div className="flex justify-center items-center text-center rounded-sm w-40 h-14 text-black font-semibold bg-red-400">
                {statenames[rndnum![0]]} Has{" "}
                {
                  StateData[rndnum![0]].filter((id) => id && building[id - 1])
                    .length
                }{" "}
                {buildingname}
              </div>
            ) : (
              <div className="flex justify-center items-center  rounded-sm w-40 h-14 text-white  bg-[rgb(35,77,133)] ">
                Guesses Left:
                {guesslimit - selectedprovinces.length}
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProvinceViewer;

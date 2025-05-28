"use client";
import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import ProvinceGuessCards from "./ProvinceGuessCards";
import DevelopmentCard from "./DevelopmentCard";
import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";
import CultureCard from "./CultureCard";
// interface Props {
//   // areabboxes: number[][];
// }
const CardContainer = () => {
  const [ProvinceStats, setProvinceStats] = useState<
    Array<[string, number, string, string, string, string]> | undefined
  >(undefined);
  const [Religions, setReligions] = useState<string[]>();
  const [Religionrgbs, setReligionrgbs] = useState<string[]>();
  const [TradeGoods, setTradeGoods] = useState<string[]>();
  const [tradegoodrgbs, settradegoodrgbs] = useState<string[]>();
  const [Terrains, setTerrains] = useState<string[]>();
  const [terrainrgbs, setterrainrgbs] = useState<string[]>();
  const [developmentrgbs, setdevelopmentrgbs] = useState<string[]>();
  const [Cultures, SetCultures] = useState<string[][][]>();
  const [developments, setdevelopments] = useState<number[]>();
  const [currentcard, setCurrentCard] = useState(0);
  const { StateData, regionids } = useDataContext();
  const { rndnum, setisgameover } = useGameState();
  const [cardguesses, setcardguesses] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  useEffect(() => {
    setisgameover(currentcard + 1);
  }, [currentcard]);
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/provinces.csv");
        const csvText = await response.text();
        const tempids: Array<[string, number, string, string, string, string]> =
          [];
        // const tempnames: string[] = [];
        Papa.parse<string[]>(csvText, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((element) => {
              //   tempnames.push(element[1]);

              tempids.push([
                element[1],
                +element[2],
                element[3],
                element[4],
                element[5],
                element[6],
              ]);
            });
            setProvinceStats(tempids);
          },
        });
        const religionresponse = await fetch("/religions.json");
        const religiontext: string[] = await religionresponse.json();
        setReligions(
          religiontext.map((line) => {
            return line[0];
          })
        );
        setReligionrgbs(
          religiontext.map((line) => {
            return line[1];
          })
        );

        const TradeGoodsresponse = await fetch("/tradegoods.json");
        const TradeGoodstext: string[] = await TradeGoodsresponse.json();
        setTradeGoods(
          TradeGoodstext.map((line) => {
            return line[0];
          })
        );
        settradegoodrgbs(
          TradeGoodstext.map((line) => {
            return line[1];
          })
        );
        const terrainsresponse = await fetch("/terrains.json");
        const terrainstext: string[] = await terrainsresponse.json();
        setTerrains(
          terrainstext.map((line) => {
            return line[0];
          })
        );
        setterrainrgbs(
          terrainstext.map((line) => {
            return line[1];
          })
        );
        const culturesresponse = await fetch("cultures.json");
        const culturestext: string[][][] = await culturesresponse.json();
        SetCultures(culturestext);

        const developmentresponse = await fetch("developmentrgbs.json");
        const developmenttext = await developmentresponse.json();
        setdevelopmentrgbs(developmenttext);

        // const religionnames[]
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    fetchdata();
  }, []);
  useEffect(() => {
    if (ProvinceStats && StateData) {
      const tempdevs: number[] = [];
      for (let i = 0; i < 823; i++) {
        const statedev = [0, 0];
        for (let j = 0; j < 5; j++) {
          if (!StateData[i][j]) {
            break;
          }
          statedev[1] += 1;
          statedev[0] += ProvinceStats[StateData[i][j] - 1][1];
        }
        tempdevs.push(Number((statedev[0] / statedev[1]).toFixed(2)));
      }
      console.log(Math.max(...tempdevs));
      setdevelopments(tempdevs);
    }
  }, [ProvinceStats, rndnum, StateData]);
  const buttons = [
    "Religion",
    "Terrains",
    "Developments",
    "Cultures",
    "TradeGoods",
    "Names",
  ];
  const cards = useMemo(() => {
    return [
      <ProvinceGuessCards
        key={0}
        Cardrgbs={Religionrgbs}
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        CardsNames={Religions}
        provincestats={ProvinceStats}
      />,
      <ProvinceGuessCards
        key={1}
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        Cardrgbs={terrainrgbs}
        CardsNames={Terrains}
        provincestats={ProvinceStats}
      />,
      <DevelopmentCard
        key={2}
        rndnum={rndnum}
        developmentrgbs={developmentrgbs}
        StateData={StateData}
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        Development={developments && rndnum ? developments[rndnum[0]] : 0}
        provincestats={ProvinceStats}
      />,
      <CultureCard
        key={3}
        rndnum={rndnum}
        CardsNames={Cultures!}
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></CultureCard>,
      <ProvinceGuessCards
        key={4}
        Cardrgbs={tradegoodrgbs}
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        CardsNames={TradeGoods}
        provincestats={ProvinceStats}
      />,
      <ProvinceGuessCards
        key={5}
        CardsNames={
          ProvinceStats && rndnum
            ? regionids[rndnum[1]].map((id) => {
                return ProvinceStats[id - 1][0];
              })
            : [""]
        }
        onProvinceGuess={(e) => {
          const temp = [...cardguesses];
          temp[currentcard] = [...e];
          setcardguesses(temp);
        }}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      />,
    ];
  }, [
    rndnum,
    ProvinceStats,
    Religionrgbs,
    Religions,
    tradegoodrgbs,
    TradeGoods,
    terrainrgbs,
    Terrains,
    developments,
    cardguesses,
    currentcard,
    developments,
    developmentrgbs,
    Cultures,
    StateData,
    regionids,
  ]);
  return (
    <>
      <div className="flex justify-center w-full flex-col items-center ">
        <div className="flex justify-center">
          <div className="flex  w-full h-full flex-wrap pt-2 justify-center space-y-4 pb-5">
            <div className="flex  w-fill   h-full justify-evenly">
              {buttons.slice(0, 3).map((name, index) => {
                return (
                  <button
                    className={
                      currentcard == index
                        ? "h-10 w-25 bg-[rgb(15,25,55)] rounded-xl text-sm cursor-pointer ml-3 transition-all duration-150 scale-90 active:scale-80"
                        : "h-10 w-25 bg-[rgb(23,54,105)] rounded-xl text-sm cursor-pointer ml-3 transition-all duration-150  active:scale-90"
                    }
                    onClick={() => {
                      setCurrentCard(index);
                    }}
                    key={index}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
            <div className="flex  w-fit  h-full justify-evenly">
              {buttons.slice(3, 6).map((name, index) => {
                return (
                  <button
                    className={
                      currentcard == index + 3
                        ? "h-10 w-25 bg-[rgb(15,25,55)] rounded-xl text-sm cursor-pointer ml-3 transition-all duration-150 scale-90 active:scale-80"
                        : "h-10 w-25 bg-[rgb(23,54,105)] rounded-xl text-sm cursor-pointer ml-3 transition-all duration-150  active:scale-90"
                    }
                    onClick={() => {
                      setCurrentCard(index + 3);
                    }}
                    key={index}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="w-full h-full flex duration-200 transition-all scale-100"> */}
        {cards[currentcard]}
        {/* </div> */}
      </div>
    </>
  );
};

export default CardContainer;

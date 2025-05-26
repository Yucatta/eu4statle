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
  const [provinceNames, setProvinceNames] = useState<string[]>();
  const [developments, setdevelopments] = useState<number[]>();
  const [currentcard, setCurrentCard] = useState(0);
  const { StateData } = useDataContext();
  const { rndnum } = useGameState();
  const [cardguesses, setcardguesses] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
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
    const tempnames: string[] = [];
    if (ProvinceStats && StateData) {
      for (let i = 0; i < ProvinceStats.length; i++) {
        if (ProvinceStats[i][4] !== "a" && ProvinceStats[i][4] !== "") {
          tempnames.push(ProvinceStats[i][0]);
        }
      }
      setProvinceNames(tempnames);
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
        rndnum={rndnum}
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
        rndnum={rndnum}
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
        rndnum={rndnum}
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
        rndnum={rndnum}
        CardsNames={provinceNames}
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
    provinceNames,
    developments,
    cardguesses,
    currentcard,
    developments,
    developmentrgbs,
    Cultures,
    StateData,
  ]);
  return (
    <>
      <div className="flex justify-center w-full flex-col items-center">
        <div className="flex  w-full h-full flex-wrap  justify-evenly pb-5">
          <div className="flex  w-fill   h-full justify-evenly">
            {buttons.slice(0, 3).map((name, index) => {
              return (
                <button
                  className={
                    currentcard == index
                      ? "h-10 w-25 bg-neutral-800 rounded-xl cursor-pointer ml-2 transition-all duration-150 hover:scale-105 active:scale-90"
                      : "h-10 w-25 bg-neutral-600 rounded-xl cursor-pointer ml-2 transition-all duration-150  active:scale-90"
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
                      ? "h-10 w-25 bg-neutral-800 rounded-xl cursor-pointer ml-2 transition-all duration-150 hover:scale-105 active:scale-90"
                      : "h-10 w-25 bg-neutral-600 rounded-xl cursor-pointer ml-2 transition-all duration-150  active:scale-90"
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
        <div className="w-full h-full">
          <div>{cards[currentcard]}</div>
        </div>
      </div>
    </>
  );
};

export default CardContainer;

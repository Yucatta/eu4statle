"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProvinceGuessCards from "./ProvinceGuessCards";
import DevelopmentCard from "./DevelopmentCard";
import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";
import CultureCard from "./CultureCard";
import TradeNodes from "./tradenodes";
import ProvinceViewer from "./Provinceviewer";
import { useProvinceDataContext } from "@/context/ProvinceDataContext";
const CardContainer = () => {
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
    [],
    [],
    [],
    [],
  ]);
  useEffect(() => {
    setisgameover(currentcard + 1);
  }, [currentcard]);
  const {
    ProvinceStats,
    Religions,
    Religionrgbs,
    developmentrgbs,
    tradegoodrgbs,
    TradeGoods,
    fortestuarycentermonument,
    tradenodes,
    terrainrgbs,
    Terrains,
    Cultures,
  } = useProvinceDataContext();

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
      setdevelopments(tempdevs);
    }
  }, [ProvinceStats, rndnum, StateData]);
  function handleSubmit(e: string[]) {
    const temp = [...cardguesses];
    temp[currentcard] = [...e];
    setcardguesses(temp);
  }
  const buttons = [
    "Religion",
    "Terrains",
    "Developments",
    "Cultures",
    "Trade Node",
    "Trade Goods",
    "Names",
    "Forts",
    "Trade Centers",
    "Monuments",
    "Estuarys",
  ];
  useEffect(() => {
    setcardguesses([[], [], [], [], [], [], [], [], [], [], []]);
    setCurrentCard(0);
  }, [rndnum]);
  const cards = useMemo(() => {
    return [
      <ProvinceGuessCards
        key={0}
        Cardrgbs={Religionrgbs}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        CardsNames={Religions}
        provincestats={ProvinceStats}
      />,
      <ProvinceGuessCards
        key={1}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        Cardrgbs={terrainrgbs}
        CardsNames={Terrains}
        provincestats={ProvinceStats}
      />,
      <DevelopmentCard
        key={2}
        developmentrgbs={developmentrgbs}
        StateData={StateData}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        Development={developments && rndnum ? developments[rndnum[0]] : 0}
        provincestats={ProvinceStats}
      />,
      <CultureCard
        key={3}
        CardsNames={Cultures!}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></CultureCard>,
      <TradeNodes
        key={4}
        tradenodes={tradenodes.map((node) => node[0])}
        provincestats={ProvinceStats}
        cardguesses={cardguesses[currentcard]}
        tradenodemembers={tradenodes ? tradenodes.map((node) => node[1]) : []}
        onProvinceGuess={handleSubmit}
      ></TradeNodes>,
      <ProvinceGuessCards
        key={5}
        Cardrgbs={tradegoodrgbs}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        CardsNames={TradeGoods}
        provincestats={ProvinceStats}
      />,
      <ProvinceGuessCards
        key={6}
        CardsNames={
          rndnum
            ? regionids[rndnum[1]].map((id) => {
                return ProvinceStats[id - 1][0];
              })
            : [""]
        }
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      />,
      <ProvinceViewer
        key={7}
        building={fortestuarycentermonument.map((row) => row[0])}
        currentbuilding={0}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={8}
        building={fortestuarycentermonument.map((row) => row[2])}
        currentbuilding={2}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={9}
        building={fortestuarycentermonument.map((row) => row[3])}
        currentbuilding={3}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={10}
        building={fortestuarycentermonument.map((row) => row[1])}
        currentbuilding={1}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
    ];
  }, [
    rndnum,
    fortestuarycentermonument,
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
            {buttons.slice(0, 11).map((name, index) => {
              return (
                <button
                  className={
                    currentcard == index
                      ? "h-10 w-25 bg-[rgb(15,25,55)] rounded-xl text-sm  cursor-pointer ml-3 transition-all duration-150 scale-90 active:scale-80"
                      : "h-10 w-25 bg-[rgb(23,54,105)] rounded-xl text-sm  cursor-pointer ml-3 transition-all duration-150  active:scale-90"
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
        </div>
        {cards[currentcard]}
      </div>
    </>
  );
};

export default CardContainer;

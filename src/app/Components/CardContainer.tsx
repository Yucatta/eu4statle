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
import CountryGuesser from "./CountryGuesser";

const CardContainer = () => {
  const [developments, setdevelopments] = useState<number[]>();
  const [currentcard, setCurrentCard] = useState(0);
  const { StateData, regionids } = useDataContext();
  const { rndnum, diffuculty, isgameover, selectedDate } = useGameState();
  const [cardguesses, setcardguesses] = useState<string[][][]>(() =>
    Array(3).fill(Array(12).fill([]))
  );
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
    countries,
    countryprovinces,
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

  useEffect(() => {
    setcardguesses(Array(3).fill(Array(12).fill([])));
    if (!selectedDate) {
      const localstorage = localStorage.getItem("CardGuesses");
      if (localstorage) {
        const temp = JSON.parse(localstorage);
        const epochTime = new Date().setHours(0, 0, 0, 0);
        if (epochTime - temp[1] < 86400000) {
          setcardguesses(temp[0]);
        }
      }
    }
  }, [selectedDate]);

  function handleSubmit(e: string[]) {
    const temp = cardguesses.map((card) => [...card]);
    temp[diffuculty][currentcard] = [...e];
    setcardguesses(temp);
    localStorage.setItem(
      "CardGuesses",
      JSON.stringify([temp, new Date().setHours(0, 0, 0, 0)])
    );
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
    "Countries",
  ];
  useEffect(() => {
    if (currentcard) {
      setCurrentCard(0);
    } else {
      setCurrentCard(11);
      setTimeout(() => {
        setCurrentCard(0);
      }, 20);
    }
  }, [rndnum]);
  const cards = useMemo(() => {
    return [
      <ProvinceGuessCards
        key={0}
        Cardrgbs={Religionrgbs}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        CardsNames={Religions}
        provincestats={ProvinceStats}
      />,
      <ProvinceGuessCards
        key={1}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        Cardrgbs={terrainrgbs}
        CardsNames={Terrains}
        provincestats={ProvinceStats}
      />,
      <DevelopmentCard
        key={2}
        developmentrgbs={developmentrgbs}
        StateData={StateData}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        Development={developments && rndnum ? developments[rndnum[0]] : 0}
        provincestats={ProvinceStats}
      />,
      <CultureCard
        key={3}
        CardsNames={Cultures!}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      ></CultureCard>,
      <TradeNodes
        key={4}
        tradenodes={tradenodes.map((node) => node[0])}
        provincestats={ProvinceStats}
        cardguesses={cardguesses[diffuculty][currentcard]}
        tradenodemembers={tradenodes ? tradenodes.map((node) => node[1]) : []}
        onProvinceGuess={handleSubmit}
      ></TradeNodes>,
      <ProvinceGuessCards
        key={5}
        Cardrgbs={tradegoodrgbs}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
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
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      />,
      <ProvinceViewer
        key={7}
        building={fortestuarycentermonument.map((row) => row[0])}
        currentbuilding={0}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={8}
        building={fortestuarycentermonument.map((row) => row[2])}
        currentbuilding={2}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={9}
        building={fortestuarycentermonument.map((row) => row[3])}
        currentbuilding={3}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <ProvinceViewer
        key={10}
        building={fortestuarycentermonument.map((row) => row[1])}
        currentbuilding={1}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        provincestats={ProvinceStats}
      ></ProvinceViewer>,
      <CountryGuesser
        key={11}
        Cardrgbs={countries.map((country) => country[0])}
        onProvinceGuess={handleSubmit}
        cardguesses={cardguesses[diffuculty][currentcard]}
        countryprovinces={countryprovinces}
        CardsNames={countries.map((country) => country[1])}
        provincestats={ProvinceStats}
      ></CountryGuesser>,
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
      {isgameover ? (
        <div className="flex justify-center w-full flex-col items-center ">
          <div className="flex sm:w-11/12 w-[95%] justify-center">
            <div className="flex  w-full h-full flex-wrap pt-2 justify-evenly space-y-4 pb-5">
              {buttons.slice(0, 12).map((name, index) => {
                return (
                  <button
                    className={
                      currentcard == index
                        ? "h-10 w-25 bg-[rgb(89,15,153)] rounded-xl text-md  cursor-pointer  transition-all duration-150 scale-90 active:scale-80"
                        : "h-10 w-25 bg-[rgb(103,50,191)] rounded-xl text-md  cursor-pointer  transition-all duration-150  active:scale-90"
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
      ) : (
        ""
      )}
    </>
  );
};

export default CardContainer;

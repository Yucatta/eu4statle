"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProvinceGuessCards from "./ProvinceGuessCards";
import DevelopmentCard from "./DevelopmentCard";
interface Props {
  StateGuesses: [string | number, number][];
  StateData: number[][] | undefined;
  guessid: number[];
  rndnum: number[] | undefined;
}
const CardGuessContainer = ({ rndnum, StateData }: Props) => {
  const [ProvinceStats, setProvinceStats] = useState<
    Array<[string, number, string, string, string]> | undefined
  >(undefined);
  const [Religions, setReligions] = useState<string[]>();
  const [TradeGoods, setTradeGoods] = useState<string[]>();
  const [Cultures, SetCultures] = useState<string[]>();
  const [provinceNames, setProvinceNames] = useState<string[]>();
  const [developments, setdevelopments] = useState<number[]>();

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch("/provinces.csv");
        const csvText = await response.text();
        const tempids: Array<[string, number, string, string, string]> = [];
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
              ]);
            });
            setProvinceStats(tempids);
          },
        });
      } catch (error) {
        console.error("Error loading CSV file:", error);
      }
    }
    fetchdata();
  }, []);
  useEffect(() => {
    const tempreligions: string[] = [];
    const temptradegoods: string[] = [];
    const tempcultures: string[] = [];
    const tempnames: string[] = [];
    if (ProvinceStats && StateData) {
      for (let i = 0; i < ProvinceStats.length; i++) {
        for (let j = 2; j < 5; j++) {
          if (ProvinceStats[i][j] === "" || ProvinceStats[i][j] === "a") {
            break;
          } else {
            if (j === 2) {
              let tempok = true;
              for (let k = 0; k < tempcultures.length; k++) {
                if (ProvinceStats[i][j] === tempcultures[k]) {
                  tempok = false;
                  break;
                }
              }
              if (tempok) {
                tempcultures.push(ProvinceStats[i][j]);
              }
            } else if (j === 3) {
              let tempok = true;
              for (let k = 0; k < tempreligions.length; k++) {
                if (ProvinceStats[i][j] === tempreligions[k]) {
                  tempok = false;
                  break;
                }
              }
              if (tempok) {
                tempreligions.push(ProvinceStats[i][j]);
              }
            } else if (j === 4) {
              let tempok = true;
              for (let k = 0; k < temptradegoods.length; k++) {
                if (ProvinceStats[i][j] === temptradegoods[k]) {
                  tempok = false;
                  break;
                }
              }
              if (tempok) {
                temptradegoods.push(ProvinceStats[i][j]);
              }
            }
          }
        }
      }
      for (let i = 0; i < ProvinceStats.length; i++) {
        if (ProvinceStats[i][4] !== "a" && ProvinceStats[i][4] !== "") {
          tempnames.push(ProvinceStats[i][0]);
        }
      }
      setReligions(tempreligions);
      SetCultures(tempcultures);
      setTradeGoods(temptradegoods);
      setProvinceNames(tempnames);
      const tempdevs: number[] = [];
      for (let i = 0; i < 823; i++) {
        let statedev = [0, 0];
        for (let j = 0; j < 5; j++) {
          if (!StateData[i][j]) {
            break;
          }
          statedev[1] += 1;
          statedev[0] += ProvinceStats[StateData[i][j]][1];
        }
        tempdevs.push(statedev[0] / statedev[1]);
      }
      setdevelopments(tempdevs);
      //   console.log(temptradegoods, tempcultures, tempreligions);
    }
  }, [ProvinceStats, rndnum]);
  // useEffect(()=>{},[ProvinceStats,rndnum])
  //   console.log(TradeGoods, Cultures, Religions);
  return (
    <>
      <div className="flex justify-center w-full items-center">
        <div className="flex flex-wrap w-full justify-evenly  ">
          <div className="flex flex-col w-1/2 min-w-60 items-center ">
            <ProvinceGuessCards
              rndnum={rndnum}
              CardsNames={Religions}
              provincestats={ProvinceStats}
              StateData={StateData}
            ></ProvinceGuessCards>
            <ProvinceGuessCards
              rndnum={rndnum}
              CardsNames={TradeGoods}
              StateData={StateData}
              provincestats={ProvinceStats}
            ></ProvinceGuessCards>
          </div>

          <div className="flex flex-col w-1/2 min-w-60 items-center">
            <ProvinceGuessCards
              rndnum={rndnum}
              StateData={StateData}
              CardsNames={Cultures}
              provincestats={ProvinceStats}
            ></ProvinceGuessCards>
            <DevelopmentCard
              rndnum={rndnum}
              Development={developments && rndnum ? developments[rndnum[0]] : 0}
              provincestats={ProvinceStats}
              StateData={StateData}
            ></DevelopmentCard>
          </div>
          <ProvinceGuessCards
            rndnum={rndnum}
            StateData={StateData}
            provincestats={ProvinceStats}
            CardsNames={provinceNames}
          ></ProvinceGuessCards>
        </div>
      </div>
    </>
  );
};

export default CardGuessContainer;

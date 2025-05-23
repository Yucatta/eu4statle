"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ProvinceGuessCards from "./ProvinceGuessCards";
import DevelopmentCard from "./DevelopmentCard";
import { useDataContext } from "@/context/DataContext";
interface Props {
  StateGuesses: [string | number, number][];
  // StateData: number[][] | undefined;
  // guessid: number[];
  // paths: string[][];
  // areapaths: string[][];
  // oceania: string[][];
  // regionids: Array<[string, number[]]>;
  // areabboxes: number[][];
  rndnum: number[] | undefined;
}
const CardContainer = ({
  rndnum,
}: // StateData,
// paths,
// areapaths,
// oceania,
// regionids,
// areabboxes,
Props) => {
  const [ProvinceStats, setProvinceStats] = useState<
    Array<[string, number, string, string, string, string]> | undefined
  >(undefined);
  const [Religions, setReligions] = useState<string[]>();
  const [Religionrgbs, setReligionrgbs] = useState<string[]>();
  const [TradeGoods, setTradeGoods] = useState<string[]>();
  const [tradegoodrgbs, settradegoodrgbs] = useState<string[]>();
  const [Terrains, setTerrains] = useState<string[]>();
  const [terrainrgbs, setterrainrgbs] = useState<string[]>();
  // const [Cultures, SetCultures] = useState<string[][][]>();
  const [provinceNames, setProvinceNames] = useState<string[]>();
  const [developments, setdevelopments] = useState<number[]>();
  const { StateData } = useDataContext();
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
        // const culturesresponse = await fetch("cultures.json");
        // const culturestext: string[][][] = await culturesresponse.json();
        // SetCultures(culturestext);

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
  }, [ProvinceStats, rndnum]);

  return (
    <>
      <div className="flex justify-center w-full items-center">
        <div className="flex flex-wrap w-full justify-evenly  ">
          <div className="flex flex-col w-1/2 min-w-60 items-center ">
            <ProvinceGuessCards
              rndnum={rndnum}
              Cardrgbs={Religionrgbs}
              CardsNames={Religions}
              provincestats={ProvinceStats}
            ></ProvinceGuessCards>
            <ProvinceGuessCards
              rndnum={rndnum}
              Cardrgbs={tradegoodrgbs}
              CardsNames={TradeGoods}
              provincestats={ProvinceStats}
            ></ProvinceGuessCards>
          </div>

          <div className="flex flex-col w-1/2 min-w-60 items-center">
            <ProvinceGuessCards
              CardsNames={Terrains}
              Cardrgbs={terrainrgbs}
              rndnum={rndnum}
              provincestats={ProvinceStats}
            ></ProvinceGuessCards>
            <DevelopmentCard
              rndnum={rndnum}
              StateData={StateData}
              Development={developments && rndnum ? developments[rndnum[0]] : 0}
              provincestats={ProvinceStats}
            ></DevelopmentCard>
          </div>
          <ProvinceGuessCards
            rndnum={rndnum}
            provincestats={ProvinceStats}
            CardsNames={provinceNames!}
          ></ProvinceGuessCards>
        </div>
      </div>
    </>
  );
};

export default CardContainer;

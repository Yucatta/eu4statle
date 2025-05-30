import Papa from "papaparse";
import { cache as reactCache } from "react";
import fs from "fs";
import path from "path";

interface AppData {
  ProvinceStats: [string, number, string, string, string, string][];
  Religions: string[];
  Religionrgbs: string[];
  TradeGoods: string[];
  tradegoodrgbs: string[];
  Terrains: string[];
  terrainrgbs: string[];
  developmentrgbs: string[];
  Cultures: string[][][];
  fortestuarycentermonument: number[][];
  tradenodes: [string, number[]][];
  countries: string[][];
  countryprovinces: number[][];
}

function loadAllDataOnce(): AppData {
  console.log("Loading and parsing application data from files...");
  try {
    const root = process.cwd() + "/public";

    const csvText = fs.readFileSync(path.join(root, "provinces.csv"), "utf-8");
    const tempids: Array<[string, number, string, string, string, string]> = [];
    const tempfortstuff: number[][] = [];
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
          tempfortstuff.push([
            element[7] === "yes" ? 1 : 0,
            element[8] === "yes" ? 1 : 0,
            +element[9],
            +element[10],
          ]);
        });
      },
    });
    const religion: string[][] = JSON.parse(
      fs.readFileSync(path.join(root, "religions.json"), "utf-8")
    );
    const tradegoods: string[][] = JSON.parse(
      fs.readFileSync(path.join(root, "tradegoods.json"), "utf-8")
    );
    const terrains: string[][] = JSON.parse(
      fs.readFileSync(path.join(root, "terrains.json"), "utf-8")
    );
    const cultures = JSON.parse(
      fs.readFileSync(path.join(root, "cultures.json"), "utf-8")
    );
    const development = JSON.parse(
      fs.readFileSync(path.join(root, "developmentrgbs.json"), "utf-8")
    );
    const tradenodes = JSON.parse(
      fs.readFileSync(path.join(root, "tradenodes.json"), "utf-8")
    );
    const countries: Array<[string, string, string, number[]]> = JSON.parse(
      fs.readFileSync(path.join(root, "countryprovinces.json"), "utf-8")
    );
    return {
      ProvinceStats: tempids,
      fortestuarycentermonument: tempfortstuff,
      Religions: religion.map((line) => {
        return line[0];
      }),
      Religionrgbs: religion.map((line) => {
        return line[1];
      }),
      TradeGoods: tradegoods.map((line) => {
        return line[0];
      }),
      tradegoodrgbs: tradegoods.map((line) => {
        return line[1];
      }),
      Terrains: terrains.map((line) => {
        return line[0];
      }),
      terrainrgbs: terrains.map((line) => {
        return line[1];
      }),
      Cultures: cultures,
      developmentrgbs: development,
      tradenodes: tradenodes,
      countries: countries.map((country) => country.slice(1, 3) as string[]),
      countryprovinces: countries.map((country) => country[3]),
    };
  } catch (error) {
    console.error("Error loading application data:", error);
    throw new Error(
      `Failed to load application data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

const appDataInstance = loadAllDataOnce();

export const loadProvinceData = reactCache(async (): Promise<AppData> => {
  if (!appDataInstance) {
    throw new Error("Application data not initialized.");
  }
  return appDataInstance;
});

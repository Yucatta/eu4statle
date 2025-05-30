import Papa from "papaparse";
import { cache as reactCache } from "react";
import fs from "fs";
import path from "path";

interface AppData {
  stateData: number[][];
  regionStateIds: number[][];
  emptylands: number[];
  regionbboxes: number[][];
  statenames: string[];
  areapaths: string[][];
  oceania: string[][];
  regionids: number[][];
  areabboxes: number[][];
  paths: string[][];
  diffuculty: number[][];
}

function loadAllDataOnce(): AppData {
  console.log("Loading and parsing application data from files...");
  try {
    const root = process.cwd() + "/public";

    const csvText = fs.readFileSync(path.join(root, "areaids.csv"), "utf-8");
    const tempids: number[][] = [];
    const tempnames: string[] = [];
    Papa.parse<string[]>(csvText, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempnames.push(element[0]);
          tempids.push([
            +element[1],
            +element[2],
            +element[3],
            +element[4],
            +element[5],
            +element[6],
            +element[7],
          ]);
        });
      },
    });

    const csvText2 = fs.readFileSync(path.join(root, "regionids.csv"), "utf-8");
    const tempids2: number[][] = [];
    const tempnames2: string[] = [];
    Papa.parse<string[]>(csvText2, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempnames2.push(element[0]);
          tempids2.push([
            +element[1],
            +element[2],
            +element[3],
            +element[4],
            +element[5],
            +element[6],
            +element[7],
            +element[8],
            +element[9],
            +element[10],
            +element[11],
            +element[12],
            +element[13],
            +element[14],
            +element[15],
            +element[16],
            +element[17],
            +element[18],
            +element[19],
            +element[20],
            +element[21],
            +element[22],
            +element[23],
          ]);
        });
      },
    });

    const csvText4 = fs.readFileSync(path.join(root, "seatiles.csv"), "utf-8");
    const tempids4: number[] = [];
    Papa.parse<string[]>(csvText4, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempids4.push(+element[0]);
        });
      },
    });

    const csvText5 = fs.readFileSync(
      path.join(root, "regionbboxes.csv"),
      "utf-8"
    );
    const tempids5: number[][] = [];
    Papa.parse<string[]>(csvText5, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempids5.push([+element[0], +element[1], +element[2], +element[3]]);
        });
      },
    });
    const csvText6 = fs.readFileSync(
      path.join(root, "areabboxes.csv"),
      "utf-8"
    );
    const tempids6: number[][] = [];
    Papa.parse<string[]>(csvText6, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempids6.push([+element[0], +element[1], +element[2], +element[3]]);
        });
      },
    });

    const oceania = JSON.parse(
      fs.readFileSync(path.join(root, "oceania.json"), "utf-8")
    );
    const areapaths = JSON.parse(
      fs.readFileSync(path.join(root, "stateoutlines.json"), "utf-8")
    );
    const regionidsJson: number[][] = JSON.parse(
      fs.readFileSync(path.join(root, "regionids.json"), "utf-8")
    );
    const pathsJson = JSON.parse(
      fs.readFileSync(path.join(root, "completemap.json"), "utf-8")
    );
    const diffuculty = JSON.parse(
      fs.readFileSync(path.join(root, "areasbydiffuculty.json"), "utf-8")
    );
    return {
      stateData: tempids,
      regionStateIds: tempids2,
      emptylands: tempids4,
      regionbboxes: tempids5,
      statenames: [...tempnames, ...tempnames2],
      areapaths: Object.entries(areapaths),
      oceania: Object.entries(oceania),
      regionids: regionidsJson,
      paths: Object.entries(pathsJson),
      areabboxes: tempids6,
      diffuculty: diffuculty,
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

export const loadAppData = reactCache(async (): Promise<AppData> => {
  if (!appDataInstance) {
    throw new Error("Application data not initialized.");
  }
  return appDataInstance;
});

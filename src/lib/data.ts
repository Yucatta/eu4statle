import Papa from "papaparse";
import { cache } from "react";
import fs from "fs";
import path from "path";

export const loadAppData = cache(() => {
  async function fetchdata() {
    try {
      const root = process.cwd() + "/public";
      const csvText = fs.readFileSync(path.join(root, "areaids.csv"), "utf-8");

      // const response = await fetch(path.join(root, "/areaids.csv"));
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
      const csvText2 = fs.readFileSync(
        path.join(root, "regionids.csv"),
        "utf-8"
      );
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
      const csvText4 = fs.readFileSync(
        path.join(root, "seatiles.csv"),
        "utf-8"
      );
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
      // const jsonresponse2 = await fetch(path.join(root, "stateoutlines.json"));
      // const areapaths: string[][] = await jsonresponse2.json();
      // const jsonresponse3 = await fetch(path.join(root, "oceania.json"));
      const oceania: string[][] = JSON.parse(
        await fs.promises.readFile(path.join(root, "oceania.json"), "utf-8")
      );
      const areapaths: string[][] = JSON.parse(
        await fs.promises.readFile(
          path.join(root, "stateoutlines.json"),
          "utf-8"
        )
      );
      const regionids: number[][] = JSON.parse(
        await fs.promises.readFile(path.join(root, "regionids.json"), "utf-8")
      );
      const paths: string[][] = JSON.parse(
        await fs.promises.readFile(path.join(root, "completemap.json"), "utf-8")
      );
      console.log(paths);
      // const jsonresponse4 = await fetch(path.join(root, "regionids.json"));
      // const regionids: Array<[string, number]> = await jsonresponse4.json();
      // const jsonresponse = await fetch(path.join(root, "completemap.json"));
      // const paths: string[][] = await jsonresponse.json();
      return {
        stateData: tempids,
        regionStateIds: tempids2,
        emptylands: tempids4,
        regionbboxes: tempids5,
        statenames: [...tempnames, ...tempnames2],
        areapaths: areapaths,
        oceania: oceania,
        regionids: regionids,
        paths: paths,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  return fetchdata();
});

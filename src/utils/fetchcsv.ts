import Papa from "papaparse";

export default async function fetchCsvData() {
  try {
    const response = await fetch("/areaids.csv");
    const csvText = await response.text();
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
    const response2 = await fetch("/regionids.csv");
    const csvText2 = await response2.text();
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
    const response3 = await fetch("/locations.csv");
    const csvText3 = await response3.text();
    const tempids3: number[][] = [];
    Papa.parse<string[]>(csvText3, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempids3.push([+element[0], +element[1]]);
        });
      },
    });
    const response4 = await fetch("/seatiles.csv");
    const csvText4 = await response4.text();
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
    const a = [tempids, tempids2, tempids3, tempids4, tempnames, tempnames2];
    return a;
  } catch (error) {
    console.error("Error loading CSV file:", error);
  }
}

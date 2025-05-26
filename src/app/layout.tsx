import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { GameStateProvider } from "@/context/gamecontext";

import { DataProvider } from "@/context/DataContext";
import { loadAppData } from "@/lib/data";

// export async function getStaticProps() {
//   const root = process.cwd() + "/public";

//   const loadJson = (filename: string) => {
//     Object.entries(
//       JSON.parse(fs.readFileSync(path.join(root, filename), "utf-8"))
//     );
//   };

//   const parseCsv = (filename: string) => {
//     const text = fs.readFileSync(path.join(root, filename), "utf-8");
//     return Papa.parse(text, { header: false, skipEmptyLines: true }).data;
//   };
//   const paths = loadJson("completemap.json");
//   const areapaths = loadJson("stateoutlinesjson");
//   const oceania = loadJson("oceania.json");
//   const regionIds = loadJson("regionids.json");
//   const StateData = parseCsv("areaids.csv");
//   const regionbboxes = parseCsv("areaids.csv");
//   const emptylands = parseCsv("areaids.csv");
//   const statenames = parseCsv("areaids.csv");
//   const regionStateIds = parseCsv("areaids.csv");
//   console.log(paths, StateData);
//   console.log(paths);
//   return {
//     props: {
//       StateData,
//       regionbboxes,
//       emptylands,
//       statenames,
//       regionStateIds,
//       paths,
//       areapaths,
//       oceania,
//       regionIds,
//     },
//   };
// }
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EU4Statle",
  description: "EU4 State Guesser",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetcheddata = await loadAppData();
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8380618516555441"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StrictMode>
          <DataProvider
            value={{
              StateData: fetcheddata.stateData,
              regionStateIds: fetcheddata.regionStateIds,
              emptylands: fetcheddata.emptylands,
              regionbboxes: fetcheddata.regionbboxes,
              statenames: fetcheddata.statenames,
              areapaths: fetcheddata.areapaths,
              oceania: fetcheddata.oceania,
              regionids: fetcheddata.regionids,
              paths: fetcheddata.paths,
              areabboxes: fetcheddata.areabboxes,
            }}
          >
            <GameStateProvider>{children}</GameStateProvider>
          </DataProvider>
        </StrictMode>
      </body>
    </html>
  );
}

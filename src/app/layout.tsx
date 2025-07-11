import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";
import { GameStateProvider } from "@/context/gamecontext";
import { DataProvider } from "@/context/DataContext";
import { loadAppData } from "@/lib/data";
import { loadProvinceData } from "@/lib/provinces";
import { ProvinceDataProvider } from "@/context/ProvinceDataContext";
import { Analytics } from "@vercel/analytics/next";
import Header from "./Components/Header";

const jost = Jost({
  variable: "--font-jost",
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
  const fetcheddata2 = await loadProvinceData();
  return (
    <html lang="en">
      <head></head>
      <body className={jost.variable}>
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
              diffuculty: fetcheddata.diffuculty,
            }}
          >
            <ProvinceDataProvider
              value={{
                ProvinceStats: fetcheddata2.ProvinceStats,
                fortestuarycentermonument:
                  fetcheddata2.fortestuarycentermonument,
                Religions: fetcheddata2.Religions,
                Religionrgbs: fetcheddata2.Religionrgbs,
                Terrains: fetcheddata2.Terrains,
                terrainrgbs: fetcheddata2.terrainrgbs,
                TradeGoods: fetcheddata2.TradeGoods,
                developmentrgbs: fetcheddata2.developmentrgbs,
                tradegoodrgbs: fetcheddata2.tradegoodrgbs,
                tradenodes: fetcheddata2.tradenodes,
                Cultures: fetcheddata2.Cultures,
                countries: fetcheddata2.countries,
                countryprovinces: fetcheddata2.countryprovinces,
              }}
            >
              <GameStateProvider>
                <div className=" h-screen  flex justify-center items-start">
                  <div
                    className={
                      "w-[clamp(0px,977px,100vw)] mt-15 h-auto min-h-screen bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
                    }
                  >
                    <Header></Header>
                    {children}
                  </div>
                </div>
              </GameStateProvider>
            </ProvinceDataProvider>
          </DataProvider>
          <Analytics />
        </StrictMode>
      </body>
    </html>
  );
}

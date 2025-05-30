"use client";
import { createContext, useContext } from "react";

type DataContextType = {
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
};

const DataContext = createContext<DataContextType | null>(null);

export function useProvinceDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("no context");
  }
  return context;
}

export const ProvinceDataProvider = ({
  value,
  children,
}: {
  value: DataContextType;
  children: React.ReactNode;
}) => {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

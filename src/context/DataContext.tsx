"use client";
import { createContext, useContext } from "react";

type DataContextType = {
  StateData: number[][];
  regionbboxes: number[][];
  emptylands: number[];
  statenames: string[];
  regionStateIds: number[][];
  paths: string[][];
  areapaths: string[][];
  oceania: string[][];
  regionids: number[][];
  areabboxes: number[][];
  diffuculty: number[][];
};

const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("no context");
  }
  return context;
}

export const DataProvider = ({
  value,
  children,
}: {
  value: DataContextType;
  children: React.ReactNode;
}) => {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

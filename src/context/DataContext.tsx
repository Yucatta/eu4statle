"use client";
import { createContext, useContext } from "react";

type DataContextType = {
  //   const [StateData, setStateData] = useState<number[][]>();
  //   const [regionbboxes, setregionbboxes] = useState<number[][]>();
  //   const [emptylands, setemptylands] = useState<number[]>();
  //   const [statenames, setstatenames] = useState<string[]>();
  //   const [regionStateIds, setregionStateIds] = useState<number[][]>();
  //   const paths = useRef<Array<[string, unknown]>>([]);
  //   const areapaths = useRef<Array<[string, unknown]>>([]);
  //   const oceanea = useRef<Array<[string, unknown]>>([]);
  //   const regionids = useRef<Array<[string, number[]]>>([]);
  StateData: number[][];
  regionbboxes: number[][];
  emptylands: number[];
  statenames: string[];
  regionStateIds: number[][];
  paths: string[][];
  areapaths: string[][];
  oceania: string[][];
  regionids: Array<[string, number]>;
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

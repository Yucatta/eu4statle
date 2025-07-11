"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";

type gamecontexttype = {
  rndnum: number[] | undefined;
  setrndnum: React.Dispatch<React.SetStateAction<number[] | undefined>>;
  isgameover: number;
  setisgameover: React.Dispatch<React.SetStateAction<number>>;
  diffuculty: number;
  setdiffuclty: React.Dispatch<React.SetStateAction<number>>;
  diffucultyindex: number;
  setdiffucltyindex: React.Dispatch<React.SetStateAction<number>>;
};

const Gamecontext = createContext<gamecontexttype | null>(null);
// const initialrndnum = Math.floor(Math.random() * 824);
export function GameStateProvider({ children }: { children: ReactNode }) {
  const [rndnum, setrndnum] = useState<number[] | undefined>(undefined);
  const [diffuculty, setdiffuclty] = useState(0);
  const [isgameover, setisgameover] = useState(0);
  const [diffucultyindex, setdiffucltyindex] = useState(0);
  return (
    <Gamecontext.Provider
      value={{
        rndnum,
        setrndnum,
        diffuculty,
        setdiffuclty,
        isgameover,
        setisgameover,
        setdiffucltyindex,
        diffucultyindex,
      }}
    >
      {children}
    </Gamecontext.Provider>
  );
}

export function useGameState() {
  const context = useContext(Gamecontext);
  if (!context) {
    throw new Error("aaaa");
  }
  return context;
}

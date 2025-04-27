"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";

type gamecontexttype = {
  rndnum: number | undefined;
  setrndnum: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Gamecontext = createContext<gamecontexttype | null>(null);
// const initialrndnum = Math.floor(Math.random() * 824);
export function GameStateProvider({ children }: { children: ReactNode }) {
  const [rndnum, setrndnum] = useState<number | undefined>(undefined);

  return (
    <Gamecontext.Provider value={{ rndnum, setrndnum }}>
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

"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";

export default function useGameFunction() {
  const { setrndnum } = useGameState();
  const { regionStateIds, diffuculty } = useDataContext();
  function ChangeRndNum(e: number) {
    const today = new Date();
    const start = new Date(2025, 4, 29);
    const temp =
      diffuculty[e][
        Math.floor(
          ((Number(today) - Number(start)) / 24 / 60 / 60 / 1000) %
            diffuculty[e].length
        )
      ];
    setrndnum([temp, findRegion(temp, temp)]);
  }
  function findRegion(stateid: number, correctid: number) {
    if (regionStateIds) {
      if (stateid > 822) {
        return stateid - 823;
      } else {
        for (let k = 0; k < regionStateIds.length; k++) {
          for (let j = 0; j < regionStateIds[k].length; j++) {
            if (regionStateIds[k][j] === correctid) {
              return k;
            }
          }
        }
      }
    }
    return -1;
  }
  function handlesubmit(
    inputref: React.RefObject<HTMLInputElement | null>,
    filterednames: string[],
    setcardquery: (value: React.SetStateAction<string | undefined>) => void,
    onProvinceGuess: (e: string[]) => void,
    cardguesses: string[]
  ) {
    if (
      inputref.current &&
      filterednames &&
      !cardguesses.includes(String(inputref.current.value)) &&
      filterednames.length > 0
    ) {
      onProvinceGuess([...cardguesses, String(inputref.current.value)]);
      inputref.current!.value = "";
      setcardquery("");
    }
  }
  return { ChangeRndNum, findRegion, handlesubmit };
}

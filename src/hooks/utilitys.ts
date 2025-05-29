"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";

export default function useGameFunction() {
  const { setrndnum } = useGameState();
  const { regionStateIds } = useDataContext();
  function ChangeRndNum() {
    setrndnum([39, 3]);
    // const temp = Math.floor(Math.random() * 824);
    // setrndnum([temp, findRegion(temp, temp)]);
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
  return { ChangeRndNum, findRegion };
}

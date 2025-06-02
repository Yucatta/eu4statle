import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";
import React from "react";
interface Props {
  strokewidth?: string;
}
const AreaOutlines = ({}: Props) => {
  const { rndnum } = useGameState();
  const { regionStateIds, areapaths } = useDataContext();
  return (
    <>
      {areapaths.map((path, index) => {
        const areasplace = regionStateIds[rndnum![1]].indexOf(index);
        if ((index !== 0 && areasplace + 1) || areasplace === 0) {
          return (
            <path
              d={String(path[1])}
              fill={"none"}
              stroke={index === rndnum![0] ? "rgb(80, 0, 100)" : "none"}
              strokeWidth="1.2"
              key={index}
            ></path>
          );
        }
      })}
    </>
  );
};

export default AreaOutlines;

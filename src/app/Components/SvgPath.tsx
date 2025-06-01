import { useDataContext } from "@/context/DataContext";
import { useGameState } from "@/context/gamecontext";
import React from "react";
interface Props {
  provinceid: number;
  fillcolor: string;
  path: string;
}

const SvgPath = ({ provinceid, fillcolor, path }: Props) => {
  const { rndnum } = useGameState();
  const { StateData } = useDataContext();
  return (
    <>
      {rndnum ? (
        <path
          d={path}
          fill={fillcolor}
          stroke={
            StateData[rndnum[0]].includes(provinceid)
              ? "rgb(150,150,150)"
              : "rgb(40,40,40)"
          }
          strokeWidth={StateData[rndnum[0]].includes(provinceid) ? "0.5" : "1"}
          key={provinceid}
          // }}
        ></path>
      ) : (
        ""
      )}
    </>
  );
};

export default SvgPath;

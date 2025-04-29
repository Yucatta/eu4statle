import React from "react";
import Guesses from "./Guesses";
interface Props {
  StateGuesses: [string | number, number][];
  StateData: number[][] | undefined;
  guessid: number[];
  rndnum: number[] | undefined;
}
const GuessContainer = ({
  StateGuesses,
  StateData,
  guessid,
  rndnum,
}: Props) => {
  return (
    <ol className="w-3/4  border-gray-300 border-1 h-2/5 flex items-center z-1 flex-col mt-2">
      {StateGuesses.map((stateguess, index) => (
        <Guesses
          thisguess={[stateguess[0], guessid[0]]}
          coordinates={
            typeof rndnum === "number" &&
            StateData &&
            stateguess[1] > -1 &&
            stateguess[1] < 823
              ? [
                  StateData[stateguess[1]][5],
                  StateData[stateguess[1]][6],
                  StateData[rndnum][5],
                  StateData[rndnum][6],
                ]
              : typeof rndnum === "number" &&
                StateData &&
                stateguess[1] > -1 &&
                stateguess[1] < 823
              ? [
                  StateData[stateguess[1]][5],
                  StateData[stateguess[1]][6],
                  StateData[rndnum][5],
                  StateData[rndnum][6],
                ]
              : []
          }
          key={index}
        ></Guesses>
      ))}
    </ol>
    // <GuessContainer
    //         StateData={StateData}
    //         rndnum={rndnum}
    //         guessid={guessid.current}
    //         StateGuesses={StateGuesses}
    //       ></GuessContainer>
  );
};

export default GuessContainer;

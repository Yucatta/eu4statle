import Guesses from "./Guesses";
interface Props {
  StateGuesses: [string, number][];
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
    <ol className="sm:w-5/6 w-[95%]   flex items-center z-1 flex-col mt-2">
      {StateGuesses.map((stateguess, index) => (
        <Guesses
          thisguess={[stateguess[0], guessid[0]]}
          coordinates={
            rndnum && StateData && stateguess[1] > -1 && stateguess[1] < 823
              ? [
                  StateData[stateguess[1]][5],
                  StateData[stateguess[1]][6],
                  StateData[rndnum[0]][5],
                  StateData[rndnum[0]][6],
                ]
              : rndnum && StateData && stateguess[1] > -1 && stateguess[1] < 823
              ? [
                  StateData[stateguess[1]][5],
                  StateData[stateguess[1]][6],
                  StateData[rndnum[0]][5],
                  StateData[rndnum[0]][6],
                ]
              : []
          }
          key={index}
        ></Guesses>
      ))}
    </ol>
  );
};

export default GuessContainer;

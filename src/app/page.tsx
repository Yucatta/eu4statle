"use client";
import StateGuesses from "./Components/StateGuesses";
import CardContainer from "./Components/CardContainer";
import { useGameState } from "@/context/gamecontext";
import Button from "./Components/Button";
export default function Home() {
  const { isgameover } = useGameState();
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div
          className={
            isgameover
              ? "w-[clamp(100vh,50vw,60vw)] h-max bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
              : "w-[clamp(100vh,50vw,60vw)] h-screen bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
          }
        >
          <header className="h-10 w-full font-bold  bg-[rgb(4,5,9)] flex items-center justify-center border-b-2  ">
            EU4 STATLE
          </header>
          <StateGuesses></StateGuesses>
          <CardContainer></CardContainer>
          <div>
            {[0, 1, 2].map((index) => (
              <Button index={index} key={index}></Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

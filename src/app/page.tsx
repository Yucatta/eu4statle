"use client";
import StateGuesses from "./Components/StateGuesses";
import CardContainer from "./Components/CardContainer";
import Button from "./Components/Button";
export default function Home() {
  return (
    <>
      <div className="w-[clamp(0px,700px,100vw)] items-center flex justify-center flex-col">
        <StateGuesses></StateGuesses>
        <CardContainer></CardContainer>
        <div className="flex flex-row w-full sm:w-5/6 items-center justify-evenly gap-x-[2px]">
          {[0, 1, 2].map((index) => (
            <Button index={index} key={index}></Button>
          ))}
        </div>
      </div>
    </>
  );
}

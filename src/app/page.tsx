"use client";
import StateGuesses from "./Components/StateGuesses";
import CardContainer from "./Components/CardContainer";
import Button from "./Components/Button";
export default function Home() {
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div
          className={
            "w-[clamp(0px,977px,100vw)] h-auto min-h-screen bg-[rgb(29,29,29)] flex flex-col items-center  pb-20  "
          }
        >
          <div className=" border-b-4 w-full font-bold  border-[rgb(64,31,128)] flex flex-col items-center h-15 top-0">
            <div
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
              className="flex cursor-pointer  w-auto px-10 font-bold text-2xl h-10 mt-2.5 border-0 items-center z-80 text-center"
            >
              EU4 Statle
            </div>
          </div>
          <div className="w-[clamp(0px,700px,100vw)] items-center flex justify-center flex-col">
            <StateGuesses></StateGuesses>
            <CardContainer></CardContainer>
            <div>
              {[0, 1, 2].map((index) => (
                <Button index={index} key={index}></Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

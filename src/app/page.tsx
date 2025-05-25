"use client";
// import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";
import CardContainer from "./Components/CardContainer";
export default function Home() {
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div className="w-[clamp(100vh,50vw,60vw)] h-max bg-[rgb(29,29,29)] flex flex-col items-center   ">
          <header className="h-1/14 w-full font-bold  bg-[rgb(19,19,19)] flex items-center justify-center border-b-2  ">
            EU4 STATELE
          </header>
          {/* <States></States> */}
          <StateGuesses></StateGuesses>
          <CardContainer></CardContainer>
          {/* <button
            className=" w-50 rounded-2xl mt-2 h-11 text-sm border-5 border-gray-800 bg-gray-700 cursor-pointer transition-all hover:scale-105 active:scale-90"
            onClick={() => {
              ChangeRndNum();
            }}
          >
            Retry
          </button> */}
        </div>
      </div>
    </>
  );
}

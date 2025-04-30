import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-950 flex justify-center items-center ">
        <div className="w-[clamp(100vh,50vw,60vw)] h-screen bg-[rgb(29,29,29)] flex flex-col items-center ">
          <header className="h-1/12 w-full  bg-[rgb(19,19,19)] flex items-center justify-center border-b-2 ">
            EU4 Statle
          </header>
          <States></States>
          <StateGuesses></StateGuesses>
        </div>
      </div>
    </>
  );
}

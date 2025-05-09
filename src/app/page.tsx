import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";

export default function Home() {
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div className="w-[clamp(100vh,50vw,60vw)] h-auto bg-[rgb(29,29,29)] flex flex-col items-center   ">
          <header className="h-1/14 w-full font-bold  bg-[rgb(19,19,19)] flex items-center justify-center border-b-2  ">
            EU4 STATELE
          </header>
          <States></States>
          <StateGuesses></StateGuesses>
        </div>
      </div>
    </>
  );
}

import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-950 flex justify-center items-center ">
        <div className="w-[clamp(100vh,60vw,60vw)] h-screen bg-neutral-900 flex flex-col items-center ">
          <States></States>
          <StateGuesses></StateGuesses>
        </div>
      </div>
    </>
  );
}

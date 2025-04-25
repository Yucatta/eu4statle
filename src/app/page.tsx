import Image from "next/image";
import States from "./Components/States";
import StateGuesses from "./Components/StateGuesses";

export default function Home() {
  setTimeout(() => {}, 5);
  return (
    <>
      <div className="w-screen h-screen bg-neutral-950 flex justify-center items-center ">
        <div className="w-2/4 h-screen bg-neutral-900 flex flex-col items-center ">
          <States></States>
          <StateGuesses></StateGuesses>
        </div>
      </div>
    </>
  );
}

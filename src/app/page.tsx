import Image from "next/image";

export default function Home() {
  setTimeout(() => {}, 5);
  return (
    <>
      <div className="w-screen h-screen bg-[rgba(5,5,5)] flex justify-center items-center ">
        <div className="w-3/4 h-screen bg-[rgb(24,24,24)] flex justify-center  ">
          <img src={"states/01.png"}></img>
        </div>
      </div>
    </>
  );
}

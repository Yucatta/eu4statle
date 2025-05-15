import React from "react";
interface Props {
  thisguess: string;
  correctsolutions: string[];
}
const CardGuesses = ({ thisguess, correctsolutions }: Props) => {
  return (
    // ❌
    <>
      {thisguess === "" ? (
        <div className="w-3/4 h-9  rounded-lg  mb-1 bg-neutral-700 text flex justify-center items-center"></div>
      ) : correctsolutions.includes(thisguess) ||
        (correctsolutions.length === 1 &&
          Number(correctsolutions[0]) + 1 > Number(thisguess) &&
          Number(correctsolutions[0]) - 1 < Number(thisguess)) ? (
        <div className="flex flex-row justify-between w-3/4 items-center">
          <div className="w-8/12 self-center h-9  rounded-full mb-1  border-neutral-300  bg-gray-900 border-3 text flex justify-center items-center">
            {thisguess}
          </div>
          <div className="w-3/12 self-center h-9  rounded-full mb-1  border-neutral-300  bg-gray-900 border-3 text flex justify-center items-center">
            {"✔️"}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between w-3/4 items-center">
          <div className="w-8/12 self-center h-9  rounded-full mb-1  border-neutral-300  bg-gray-900 border-3 text flex justify-center items-center">
            {thisguess}
          </div>
          <div className="w-3/12 self-center h-9  rounded-full mb-1  border-neutral-300  bg-gray-900 border-3 text flex justify-center items-center">
            {"❌"}
          </div>
        </div>
      )}
    </>
  );
};

export default CardGuesses;

import React from "react";
interface Props {
  thisguess: string;
}
const CardGuesses = ({ thisguess }: Props) => {
  return (
    <>
      {thisguess === "" ? (
        <div className="w-3/4 h-9  rounded-full mb-1 bg-neutral-700 text flex justify-center items-center"></div>
      ) : (
        <div className="w-3/4 self-center h-9  rounded-full mb-1  border-neutral-300  bg-gray-900 border-3 text flex justify-center items-center">
          {thisguess}
        </div>
      )}
    </>
  );
};

export default CardGuesses;

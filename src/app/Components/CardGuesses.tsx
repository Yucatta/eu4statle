import React from "react";
interface Props {
  thisguess: string;
}
const CardGuesses = ({ thisguess }: Props) => {
  return (
    <>
      {thisguess === "" ? (
        <div className="w-full h-9  rounded-full mb-1 bg-neutral-700 text flex justify-center items-center"></div>
      ) : (
        <div className="w-full h-9  rounded-full mb-1 bg-neutral-700 text flex justify-center items-center">
          {thisguess}
        </div>
      )}
    </>
  );
};

export default CardGuesses;

import React from "react";
import CardGuesses from "./CardGuesses";
interface Props {
  cardguesses: string[];
  correctsolutions: string[];
}
const CardGuesContainer = ({ cardguesses, correctsolutions }: Props) => {
  return (
    <div className="w-full z-0 flex flex-col mt-2 justify-center items-center">
      {cardguesses.map((cardguess, index) => {
        return (
          <CardGuesses
            key={index}
            thisguess={cardguess}
            correctsolutions={correctsolutions}
          ></CardGuesses>
        );
      })}
    </div>
  );
};

export default CardGuesContainer;

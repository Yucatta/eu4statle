import React from "react";
import CardGuesses from "./CardGuesses";
interface Props {
  cardguesses: string[];
}
const CardGuesContainer = ({ cardguesses }: Props) => {
  return (
    <div className="w-full z-0 flex flex-col justify-center items-center">
      {cardguesses.map((cardguess, index) => {
        return <CardGuesses key={index} thisguess={cardguess}></CardGuesses>;
      })}
    </div>
  );
};

export default CardGuesContainer;

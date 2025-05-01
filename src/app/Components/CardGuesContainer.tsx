import React from "react";
import CardGuesses from "./CardGuesses";
interface Props {
  cardguesses: string[];
}
const CardGuesContainer = ({ cardguesses }: Props) => {
  return (
    <div className="w-full z-0">
      <CardGuesses thisguess={cardguesses[0]}></CardGuesses>
      <CardGuesses thisguess={cardguesses[1]}></CardGuesses>
      <CardGuesses thisguess={cardguesses[2]}></CardGuesses>
      <CardGuesses thisguess={cardguesses[3]}></CardGuesses>
    </div>
  );
};

export default CardGuesContainer;

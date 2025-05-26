import React from "react";
interface Props {
  correctanswers: React.JSX.Element;
  isitwrong: boolean;
  width?: string;
  height?: string;
  // correctanswers:string;
}
const CorrectAnswers = ({
  isitwrong,
  correctanswers,
  width,
  height,
}: Props) => {
  return (
    <>
      {isitwrong ? (
        <div
          className={`w-${width ? width : "1/2"} h-${
            height ? height : "3/4"
          } justify-self-center rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100`}
        >
          {correctanswers}
        </div>
      ) : (
        <div
          className={`w-${width ? width : "1/2"}  h-${
            height ? height : "3/4"
          } rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold`}
        >
          {correctanswers}
        </div>
      )}
    </>
  );
};

export default CorrectAnswers;

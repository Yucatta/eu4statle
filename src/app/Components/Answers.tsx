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
}: // width,
// height,
Props) => {
  const greenclassname = `w-1/3 h-1/3 justify-self-center rounded-xl text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100`;
  const redclassname = `w-1/3 h-1/3 rounded-xl  mb-1 text-sm mt-1.5  bg-red-300 text-black items-center flex justify-evenly font-semibold`;
  return (
    <>
      {isitwrong ? (
        <div className={greenclassname}>{correctanswers}</div>
      ) : (
        <div className={redclassname}>{correctanswers}</div>
      )}
    </>
  );
};

export default CorrectAnswers;

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
  // const greenclassname = `w-auto h-15 px-2  justify-self-center  flex-wrap rounded-xl text-center text-sm mb-1  mt-1.5 bg-green-500 text-black items-center flex justify-evenly font-semibold transition-all scale-100`;
  // const redclassname = `w-auto h-15 px-2  justify-self-center  flex-wrap rounded-xl text-center text-sm mb-1  mt-1.5 bg-red-300 text-black items-center flex justify-evenly font-semibold transition-all scale-100`;
  return (
    <>
      {isitwrong ? (
        <div className="w-auto p-2 rounded-md text-center text-md mb-1 mt-1.5 bg-green-500 text-black font-semibold transition-all break-words">
          <span>{correctanswers}</span>
        </div>
      ) : (
        <div className="w-auto p-2 rounded-md text-center text-md mb-1 mt-1.5 bg-red-300 text-black font-semibold transition-all break-words">
          {correctanswers}
        </div>
      )}
    </>
  );
};

export default CorrectAnswers;

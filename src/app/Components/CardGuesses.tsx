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
          <div className="w-8/12 self-center h-9  rounded-lg mb-1.5   border-neutral-300  bg-gray-900 border-2 text flex justify-center items-center">
            {thisguess}
          </div>
          <div className="w-3/12 self-center h-9  rounded-lg mb-1.5  border-neutral-300  bg-gray-900 border-2 text flex justify-center items-center">
            <svg
              viewBox="-3.2 -3.2 38.40 38.40"
              xmlns="http://www.w3.org/2000/svg"
              fill="#175e29"
              stroke="#175e29"
              strokeWidth="1.728"
              className="h-8.5"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.832"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    className="fill-[rgb(32,164,65)]"
                    d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between w-3/4 items-center">
          <div className="w-8/12 self-center h-9  rounded-lg mb-1.5  border-neutral-300  bg-gray-900 border-2 text flex justify-center items-center">
            {thisguess}
          </div>
          <div className="w-3/12 self-center h-9  rounded-lg mb-1.5  border-neutral-300  bg-gray-900 border-2 text flex justify-center items-center">
            <svg
              fill="#c12525"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#c12525"
              strokeWidth="5"
              className="h-8.5"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <title></title>
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"></path>
              </g>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default CardGuesses;

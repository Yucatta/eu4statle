"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className=" border-b-4 w-[clamp(0px,977px,100vw)] bg-[rgb(29,29,29)] font-bold absolute  border-[rgb(64,31,128)] flex flex-col items-center h-15 top-0">
      <div className="flex items-center justify-center w-full absolute  sm:w-5/6">
        <Link
          href={"/"}
          style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
          className="flex cursor-pointer  w-auto px-10 font-bold text-2xl h-10 mt-2.5 border-0 items-center z-80 text-center"
        >
          EU4 Statle
        </Link>
        <Link href={pathname === "/statistics" ? "/" : "/statistics"}>
          <svg
            viewBox="-10 -170 220 170"
            style={{ right: "clamp(0px,40px,4vw)" }}
            className="w-8 h-8 z-80 top-3.5 absolute cursor-pointer  rounded-md bg-neutral-300 "
          >
            <path
              d="M 0 0 L 68 -96 L 126 -56 L 200 -170"
              strokeWidth={20}
              stroke="red"
              fill="none"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Header;

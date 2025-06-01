import React, { useEffect, useRef, useState } from "react";
interface Props {
  inputref: React.RefObject<HTMLInputElement | null>;
  setquery: (value: React.SetStateAction<string | undefined>) => void;
  filterednames: string[];
  placeholder: string;
  query: string;
  onSubmit?: () => void;
}
const InputandList = ({
  inputref,
  filterednames,
  setquery,
  onSubmit,
  query,
  placeholder,
}: Props) => {
  const [focusedelement, setfocusedelement] = useState(0);
  const [update, setupdate] = useState(0);
  const listref = useRef<Array<HTMLLIElement | null>>([]);
  useEffect(() => {
    function controlkey(e: KeyboardEvent) {
      if (e.code === "ArrowUp" && focusedelement > 0) {
        setfocusedelement(focusedelement - 1);
      } else if (
        e.code === "ArrowDown" &&
        focusedelement + 1 < filterednames.length
      ) {
        setfocusedelement(focusedelement + 1);
      } else if (
        (e.code === "Enter" || e.code === "Tab") &&
        filterednames &&
        filterednames.length > 0
      ) {
        if (
          filterednames.filter((statename) => {
            return query.includes(statename);
          })[0]
        ) {
          if (onSubmit) {
            onSubmit();
          }
          inputref.current!.blur();
        } else {
          setquery(filterednames[focusedelement]);
          inputref.current!.value = filterednames[focusedelement];
        }
      } else if (e.code === "Escape") {
        inputref.current!.blur();
      }
    }
    if (document.activeElement === inputref.current) {
      addEventListener("keydown", controlkey);
    }
    if (focusedelement >= filterednames.length && focusedelement != 0) {
      setfocusedelement(filterednames.length - 1);
    }
    return () => {
      removeEventListener("keydown", controlkey);
    };
  }, [focusedelement, inputref.current, filterednames, query, update]);
  useEffect(() => {
    listref.current[focusedelement]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [focusedelement, listref]);
  return (
    <div className="w-full pt-0 relative group">
      <input
        type="search"
        ref={inputref}
        onChange={() => {
          setquery(inputref.current?.value);
        }}
        onClick={() => {
          setupdate(update + 1);
          setfocusedelement(0);
        }}
        onFocus={() => {
          setupdate(update + 1);
          setfocusedelement(0);
        }}
        // onMouseEnter={}
        className="w-full mt-3 h-10 border-2 bg-neutral-900 border-neutral-400 focus-within:"
        placeholder={placeholder}
      />

      <ul className="absolute top-full left-0  w-full bg-neutral-900 justify-center  border-2 overflow-y-auto  transition hidden  text-sm z-10 max-h-40 group-focus-within:block">
        {filterednames
          ? filterednames.map((item, index) => (
              <li
                className={
                  typeof window !== "undefined" && window.innerWidth < 550
                    ? focusedelement === index
                      ? "py-1 border-y-1 bg-neutral-600 text-center h-7 text-xs cursor-pointer "
                      : "py-1 border-y-1  text-center h-7 text-xs cursor-pointer "
                    : focusedelement === index
                    ? "py-1 border-y-1 bg-neutral-600 text-center h-7 text-md font-semibold cursor-pointer "
                    : "py-1 border-y-1  text-center h-7 text-md cursor-pointer "
                }
                key={index}
                ref={(el) => {
                  listref.current[index] = el;
                }}
                onMouseEnter={() => {
                  setfocusedelement(index);
                }}
                onMouseDown={() => {
                  setquery(item);
                  if (inputref.current) {
                    inputref.current.value = item;
                  }
                }}
              >
                {item}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default InputandList;

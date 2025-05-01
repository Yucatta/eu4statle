import React from "react";
interface Props {
  inputref: React.RefObject<HTMLInputElement | null>;
  setquery: (value: React.SetStateAction<string | undefined>) => void;
  statenames: string[] | undefined;
  filterednames: string[];
  statesquery?: string | undefined;
  widthofinput: string;
  placeholder: string;
}
const InputandList = ({
  inputref,
  statenames,
  statesquery,
  filterednames,
  setquery,
  widthofinput,
  placeholder,
}: Props) => {
  return (
    <div className={`w-${widthofinput} relative group`}>
      <input
        type="search"
        ref={inputref}
        onChange={() => {
          setquery(inputref.current?.value);
        }}
        className="w-full mt-3 h-10 border-2 border-white focus-within:"
        placeholder={placeholder}
      />

      <ul className="absolute top-full left-0  w-full bg-neutral-800  border-2 overflow-y-auto  transition hidden  text-sm z-10 max-h-40 group-focus-within:block">
        {statenames && statesquery && filterednames
          ? filterednames.map((item, index) => (
              <li
                className="py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                key={index}
                onMouseDown={() => {
                  setquery(item);
                  //   console.log(inputref.current.value, "clicked");
                  if (inputref.current) {
                    inputref.current.value = item;
                  }
                }}
              >
                {item}
              </li>
            ))
          : statenames && filterednames
          ? filterednames.map((item, index) => (
              <li
                className="py-1 border-y-1 hover:bg-neutral-600 cursor-pointer "
                key={index}
                onMouseDown={() => {
                  console.log("a");

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

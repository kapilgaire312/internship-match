"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchBar({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue === "") return;
    router.replace(`${pathname}?search=${inputValue}`);
    setInputValue("");
    inputRef?.current?.blur();
  }

  return (
    <div className="w-full">
      {" "}
      <div className="shadow-xs rounded-2xl bg-white">
        {" "}
        <form
          className="flex justify-between gap-4 px-2 py-1"
          onSubmit={handleSubmit}
        >
          {" "}
          <input
            ref={inputRef}
            className="w-full focus:outline-none focus:ring-0"
            placeholder={`${placeholder}`}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-[#2762ea] text-white py-2 px-6 rounded-2xl"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

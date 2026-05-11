"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function AdminSearchBar({ placeholder }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    e.target.elements[0]?.blur();
    if (!searchValue || searchValue.length === 0)
      return router.replace(pathname);
    const newUrl = `${pathname}?search=${searchValue}`;
    router.replace(newUrl);
  }
  return (
    <div className="border bg-gray-200 h-10 rounded flex items-center gap-1 px-2 w-84">
      <div className="relative h-6 w-6">
        <Image src="/search-icon.svg" fill alt="search" />
      </div>
      <form className="w-full" onSubmit={handleSearch}>
        {" "}
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="w-full focus:outline-none focus:ring-0 px-1 py-1  "
          placeholder={placeholder}
        />
      </form>
      {searchValue.length !== 0 && (
        <button
          onClick={() => {
            setSearchValue("");
            router.replace(pathname);
          }}
          className="bg-gray-500 flex items-center cursor-pointer hover:opacity-80 active:opacity-60 rounded-full px-2 text-white"
        >
          x
        </button>
      )}
    </div>
  );
}

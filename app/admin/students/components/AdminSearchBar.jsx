"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function AdminSearchBar({ placeholder }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter");
  const [searchValue, setSearchValue] = useState(search || "");

  function handleSearch(e) {
    e.preventDefault();
    e.target.elements[0]?.blur();
    let currentSearchParams = new URLSearchParams();
    if (filter) {
      currentSearchParams.set("filter", filter);
    }
    if (searchValue && searchValue.length !== 0)
      currentSearchParams.set("search", searchValue);
    const newSearchString = currentSearchParams.toString();
    const newUrl = `${pathname}${newSearchString ? `?${newSearchString}` : ""}`;
    router.replace(newUrl);
  }
  function clearSearch() {
    setSearchValue("");
    let currentSearchParams = new URLSearchParams();
    if (filter) {
      currentSearchParams.set("filter", filter);
    }
    const newSearchString = currentSearchParams.toString();
    const newUrl = `${pathname}${newSearchString ? `?${newSearchString}` : ""}`;
    return router.replace(newUrl);

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

            clearSearch();
          }}
          className="bg-gray-500 flex items-center cursor-pointer hover:opacity-80 active:opacity-60 rounded-full px-2 text-white"
        >
          x
        </button>
      )}
    </div>
  );
}

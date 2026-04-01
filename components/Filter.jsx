"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterVal = searchParams.get("filter") || "matchScore";

  function handleSelect(e) {
    e.preventDefault();
    const value = e.target.value;
    const searchValue = searchParams.get("search");
    if (value === "newest") {
      if (searchValue) {
        router.replace(`${pathname}?search=${searchValue}&filter=${value}`);
        return;
      }
      router.replace(`${pathname}?filter=${value}`);
      return;
    } else {
      if (searchValue) {
        router.replace(`${pathname}?search=${searchValue}`);
        return;
      }
      router.replace(`${pathname}`);
      return;
    }
  }

  return (
    <form className="flex w-full items-center bg-white rounded-xl px-2 h-[80%] ">
      <label htmlFor="filter" className="w-full">
        Sort By:
      </label>
      <select
        name="filter"
        id="filter"
        onChange={handleSelect}
        defaultValue={filterVal}
        className="text-center  focus:outline-none focus:ring-0"
      >
        <option value="matchScore">Match Score</option>
        <option value="newest">Newest</option>
      </select>
    </form>
  );
}

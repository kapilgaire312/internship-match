"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectFilter({ filterValue }) {
  const [selectValue, setSelectValue] = useState(filterValue || "1m");
  const router = useRouter();
  const pathname = usePathname();
  function handleOnSelect(e) {
    setSelectValue(e.target.value);
    let newUrl;
    if (e.target.value !== "1m")
      newUrl = `${pathname}?filter=${e.target.value}`;
    else newUrl = pathname;
    router.replace(newUrl);
  }

  return (
    <select
      className="border-none rounded pr-3 py-2 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 transition-all duration-75"
      value={selectValue}
      onChange={handleOnSelect}
    >
      <option value="1m">Last 1 month</option>
      <option value="3m">Last 3 months</option>
      <option value="6m">Last 6 months</option>
      <option value="all">All time</option>
    </select>
  );
}

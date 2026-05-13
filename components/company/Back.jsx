"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Back({ message, path = "/company/internships" }) {
  const router = useRouter();

  function handleClick() {
    router.replace(path);
  }

  return (
    <div
      className="cursor-pointer flex text-gray-600 font-medium  hover:underline"
      onClick={handleClick}
    >
      <button className="flex">
        <div className="relative w-8 h-6 hover:opacity-70 active:opacity-50 transition-all duration-100 ease-in-out">
          <Image src="/back-arrow-logo.svg" fill alt="back-icon" />
        </div>
      </button>
      {message}
    </div>
  );
}

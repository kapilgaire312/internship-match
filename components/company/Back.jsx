"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Back({ message }) {
  const router = useRouter();

  function handleClick() {
    router.replace("/company/internships");
  }

  return (
    <div className="cursor-pointer flex " onClick={handleClick}>
      <button className="flex">
        <div className="relative w-8 h-6">
          <Image src="/back-arrow-logo.svg" fill alt="back-icon" />
        </div>
      </button>
      {message}
    </div>
  );
}

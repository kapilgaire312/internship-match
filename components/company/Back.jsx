"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  function handleClick() {
    router.replace("/company/internships");
  }

  return (
    <div>
      <button onClick={handleClick} className="flex">
        <div className="relative w-8 h-6">
          <Image src="/back-arrow-logo.svg" fill alt="back-icon" />
        </div>
      </button>
    </div>
  );
}

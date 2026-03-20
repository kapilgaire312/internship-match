"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() => {
          router.replace(pathname);
        }}
        className="flex"
      >
        <div className="relative w-8 h-8">
          <Image src="/back-arrow-logo.svg" fill alt="back-icon" />
        </div>
      </button>
    </div>
  );
}

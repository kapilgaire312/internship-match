"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick() {
    //check for filter
    const filter = searchParams.get("filter");
    if (filter) {
      router.replace(`${pathname}?filter=${filter}`);
      return;
    }
    router.replace(pathname);
  }

  return (
    <div>
      <button onClick={handleClick} className="flex cursor-pointer">
        <div className="relative w-8 h-8">
          <Image src="/back-arrow-logo.svg" fill alt="back-icon" />
        </div>
      </button>
    </div>
  );
}

"use client";
import Image from "next/image";

export default function ApplyNowButton({ internshipId, blockApply }) {
  console.log(internshipId);
  return (
    <button
      className={`${blockApply ? "bg-gray-400" : "bg-[#2762ea]"} text-white py-2 px-6 rounded flex  items-center w-full justify-center `}
    >
      <div className="w-8 h-5 relative">
        {" "}
        <Image src="/apply-icon.svg" fill alt="apply-icon" />
      </div>
      Apply Now
    </button>
  );
}

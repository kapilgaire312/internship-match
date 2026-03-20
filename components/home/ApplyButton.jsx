"use client";

import { useRouter } from "next/navigation";

export default function ApplyButton({ internshipId }) {
  const router = useRouter();
  function handleClick() {
    router.push(`/student/internships/${internshipId}`);
  }
  return (
    <button
      onClick={handleClick}
      className="bg-[#2762ea] text-white px-3 py-2 rounded-xl select-none"
    >
      Apply Now
    </button>
  );
}

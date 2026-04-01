"use client";

import { useRouter } from "next/navigation";

export default function ViewButton({ internshipId }) {
  const router = useRouter();
  function handleClick() {
    router.push(`/student/internships/${internshipId}`);
  }
  return (
    <button
      onClick={handleClick}
      className="bg-[#f5f6fc] border px-1.5 py-0.5 rounded select-none"
    >
      View Details{" "}
    </button>
  );
}

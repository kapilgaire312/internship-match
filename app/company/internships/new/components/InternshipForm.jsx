"use client";

import Link from "next/link";
import DetailedInfoSection from "./DetailedInfoSection";
import SummaryInfoSection from "./SummaryInfoSection";
import { useActionState, useEffect } from "react";
import handlePostNewInternshipAction from "@/actions/handlePostNewInternhsipAction";

export default function InternshipForm({ allSectors }) {
  const [state, formAction, isPending] = useActionState(
    handlePostNewInternshipAction,
    null,
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };
  return (
    <form
      className="flex flex-col gap-8"
      onKeyDown={handleKeyDown}
      action={formAction}
    >
      <SummaryInfoSection
        rawData={state?.rawData}
        errorMessageArray={state?.messageArray}
      />
      <DetailedInfoSection
        allSectors={allSectors}
        errorMessage={state?.message}
        rawData={state?.rawData}
        errorMessageArray={state?.messageArray}
      />
      <div className="flex justify-end gap-8 px-7 items-center">
        <Link href={"/company/internships"}>
          <button
            type="button"
            className="bg-white  py-2 px-6 rounded cursor-pointer"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="bg-[#2762ea] text-white py-2 px-6 rounded cursor-pointer"
        >
          Post Internship
        </button>
      </div>
    </form>
  );
}

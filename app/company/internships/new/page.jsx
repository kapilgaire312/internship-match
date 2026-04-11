import Back from "@/components/company/Back";
import Link from "next/link";
import SummaryInfoSection from "./components/SummaryInfoSection";
import DetailedInfoSection from "./components/DetailedInfoSection";

export default async function NewInternship() {
  return (
    <div className="felx justify-center px-10 py-4">
      <div className="flex flex-col gap-5">
        {" "}
        <div className="flex flex-col gap-2">
          <div className="flex text-gray-500 font-medium items-center">
            <Back />
            Back to internships
          </div>
          <div className="flex justify-start">
            <div className="text-3xl font-semibold">Post New Internship</div>
          </div>
        </div>
        <SummaryInfoSection />
        <DetailedInfoSection />
      </div>
    </div>
  );
}

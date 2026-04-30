import Image from "next/image";
import TitleSection from "./components/TitleSection";
import BodySection from "./components/BodySection";
import Link from "next/link";
import InternshipInfo from "./components/InternshipInfo";

import getInternshipData from "@/lib/utils/getInternshipData";
import ApplicationDetailsSection from "./components/ApplicationDetailsSection";

export default async function InternshipPage({ params }) {
  const { internshipId } = await params;

  // const headersList = await headers();
  // const referer = headersList.get("referer") || "";
  // const previousPage = referer.includes("matches")
  //   ? "matches"
  //   : referer.includes("applied")
  //     ? "applied"
  //     : "home";
  //
  const previousPage = "matches";
  const internshipData = await getInternshipData(internshipId);

  console.log("internwalaa", internshipData);

  return (
    <div className="px-10 flex flex-col gap-5">
      <Link href={`/student/${previousPage}`}>
        {" "}
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-5 relative">
            <Image src="/back-arrow-logo.svg" fill alt="back-arrow" />
          </div>
          <div className="font-medium text-gray-500">
            {" "}
            Back to {previousPage[0].toUpperCase() + previousPage.slice(1)}
          </div>
        </div>
      </Link>
      <div className="flex gap-5">
        <div className="w-[70vw]  bg-white  px-[2vw] rounded py-8 gap-8 flex flex-col overflow-hidden">
          <TitleSection internshipData={internshipData} />
          <BodySection internshipData={internshipData} />
        </div>
        <div className="flex w-110 flex-col gap-5">
          {internshipData.isApplied && (
            <ApplicationDetailsSection
              internshipData={{
                status: internshipData.status,
                appliedDate: internshipData.appliedDate,
                internshipId: internshipData._id.toString(),
                isClosed: internshipData.isClosed,
              }}
            />
          )}
          <InternshipInfo internshipData={internshipData} />
        </div>
      </div>
    </div>
  );
}

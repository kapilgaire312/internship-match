import Image from "next/image";
import TitleSection from "./components/TitleSection";
import BodySection from "./components/BodySection";
import Link from "next/link";
import InternshipInfo from "./components/InternshipInfo";

import getInternshipData from "@/lib/utils/getInternshipData";
import ApplicationDetailsSection from "./components/ApplicationDetailsSection";

export default async function InternshipPage({ params }) {
  const { internshipId, isAdmin } = await params;

  const previousPage = "matches";
  const internshipData = await getInternshipData(internshipId);

  if (!internshipData || internshipData.error) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-20">
        <div className="text-xl text-gray-500 font-semibold">Internship Not Found</div>
      </div>
    )
  }

  const adminLayout = isAdmin ? "flex-col" : "md:flex-row";


  return (
    <div className="px-4 md:px-10 flex flex-col gap-5">
      {!isAdmin && <Link href={`/student/${previousPage}`}>
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
      </Link>}
      <div className={`flex flex-col ${adminLayout} gap-5`}>
        <div className="w-full md:w-[70vw]  bg-white px-2 md:px-[2vw] rounded py-8 gap-8 flex flex-col overflow-hidden">
          <TitleSection internshipData={internshipData} isAdmin={isAdmin} />
          <BodySection internshipData={internshipData} />
        </div>
        <div className="flex w-full md:w-110 flex-col gap-5">
          {!isAdmin && internshipData.isApplied && (
            <ApplicationDetailsSection
              internshipData={{
                status: internshipData.status,
                appliedDate: internshipData.appliedDate,
                internshipId: internshipData._id.toString(),
                isClosed: internshipData.isClosed,
              }}
            />
          )}
          <InternshipInfo internshipData={internshipData} isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}

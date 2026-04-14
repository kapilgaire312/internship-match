import { formatSalary } from "@/utils/formatSalary";
import Image from "next/image";
import ApplyButton from "./ApplyButton";
import { mapSkills } from "@/utils/mapSkills";
import { getRemainingTime } from "@/utils/getTimeAgo";
import closeInternship from "@/lib/utils/closeInternship";

export default function InternshipsCard({ internshipInfo }) {
  const internshipId = internshipInfo._id?.toString();
  let timeRemaining = getRemainingTime(internshipInfo.application_date);
  let isClosed = false;
  if (timeRemaining === "Closed") {
    isClosed = true;
    closeInternship(internshipId);
  }
  if (internshipInfo.isClosed) {
    timeRemaining = "Closed";
    isClosed = true;
  }

  return (
    <div className="flex justify-between border-b-2 border-gray-200 pt-4 pb-8  pl-4 pr-8 bg-white rounded-xl">
      <div className="flex justify-start gap-4">
        {" "}
        <div className="relative w-16 h-16 rounded-full  select-none">
          <Image src="/demoImage.webp" fill alt="logo" />{" "}
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-xl ">{internshipInfo.title}</div>
          <div className="flex gap-4 text-gray-600 select-none">
            <div className="flex gap-1">
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/company.svg" fill alt="company" />
              </div>
              {internshipInfo.company_name}
            </div>
            <div className="flex gap-1">
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/location.svg" fill alt="company" />
              </div>
              {internshipInfo.type === "remote"
                ? "remote"
                : `${internshipInfo.company_location} (${internshipInfo.type})`}
            </div>
            <div className="flex gap-1">
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/money-icon.svg" fill alt="company" />
              </div>
              {formatSalary(internshipInfo.salary)} / month
            </div>
            <div
              className={`flex gap-1 ${timeRemaining === "Closed" && "bg-gray-300 px-1.5 rounded-xl"}`}
            >
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/time-period.svg" fill alt="company" />
              </div>
              {timeRemaining}{" "}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {internshipInfo.matchedSkills && (
              <div className="text-gray-600">Matched skills:</div>
            )}
            {internshipInfo.matchedSkills
              ? internshipInfo.matchedSkills.map(mapSkills)
              : internshipInfo?.required_skills?.map(mapSkills)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {!isNaN(internshipInfo.matchScore) && (
          <div
            className={`rounded-2xl text-sm text-center py-0.5`}
            style={{ backgroundColor: internshipInfo.matchColour }}
          >
            {internshipInfo.matchScore}% Match
          </div>
        )}
        <ApplyButton
          internshipId={internshipId}
          isApplied={internshipInfo.isApplied}
          isClosed={isClosed}
        />
      </div>
    </div>
  );
}

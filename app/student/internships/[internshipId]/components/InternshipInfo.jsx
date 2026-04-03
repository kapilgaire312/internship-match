import { formatSalary } from "@/utils/formatSalary";
import InternshipInfoSections from "./InternshipInfoSections";
import ApplyNowButton from "./ApplyNowButton";

export default function InternshipInfo({ internshipData }) {
  const dataArray = [
    {
      name: "Offered Salary",
      value: `${formatSalary(internshipData.salary)} / month`,
      iconSrc: "/money-icon.svg",
    },
    {
      name: "Location",
      value: internshipData.company_location,
      iconSrc: "/location.svg",
    },
    {
      name: "Work Model",
      value: internshipData.type,
      iconSrc: "/work-model-icon.svg",
    },
    {
      name: "Level",
      value: internshipData.level,
      iconSrc: "/level-icon.svg",
    },
    {
      name: "Openings",
      value: internshipData.openings + " Positions",
      iconSrc: "/openings-icon.svg",
    },

    {
      name: "Application Ends",
      value: internshipData.application_date?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),

      iconSrc: "/time-period.svg",
    },
  ];
  return (
    <div className="bg-white p-5 rounded flex flex-col gap-4">
      <div className="text-xl font-semibold">Internship Info</div>
      <div className="flex flex-col gap-3">
        {dataArray.map((item, index) => (
          <InternshipInfoSections key={index} item={item} />
        ))}
      </div>
      <div className=" flex justify-center mt-2">
        <ApplyNowButton
          internshipId={internshipData._id?.toString()}
          blockApply={internshipData.blockApply}
          isApplied={internshipData.isApplied}
        />
      </div>
    </div>
  );
}

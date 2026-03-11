import { filterInternshipsBySector } from "@/lib/utils/filterInternshipsBySector";
import { formatSalary } from "@/utils/formatSalary";
import Image from "next/image";

export default function InternshipsCard({ internshipInfo }) {
  return (
    <div className="flex justify-between border-b-2 border-gray-200 pt-4 pb-8 ">
      <div className="flex justify-start gap-4">
        {" "}
        <div className="relative w-16 h-16 rounded-full  select-none">
          <Image src="/demoImage.webp" fill alt="logo" />{" "}
        </div>
        <div className="flex flex-col gap-2">
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
              {internshipInfo.company_location}
            </div>
            <div className="flex gap-1">
              {" "}
              <div className="relative h-4 w-4 top-1">
                {" "}
                <Image src="/time-period.svg" fill alt="company" />
              </div>
              {internshipInfo.intern_period}
            </div>
            <div>{formatSalary(internshipInfo.salary)} / month</div>
          </div>
          <div className="flex gap-3">
            {internshipInfo?.required_skills?.map((item, index) => (
              <div
                className="bg-[#f5f6fc] rounded-xl py-1 px-2 text-gray-600 select-none"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className="bg-[#2762ea] text-white px-3 py-2 rounded-xl select-none">
          Apply Now
        </button>
      </div>
    </div>
  );
}

import { mapSkills } from "@/utils/mapSkills";

export default function BodySection({ internshipData }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-[1.2rem]">Job Description</div>
        <div className="text-gray-600">{internshipData?.job_description}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-medium text-[1.2rem]">Eligibility</div>
        <div className="text-gray-600">{internshipData?.eligibility}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-medium text-[1.2rem]">What You&apos;ll Do</div>
        <div className="text-gray-600">{internshipData?.responsibilities}</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-medium text-[1.2rem]">Required Skills</div>
        <div className="flex gap-3 items-center">
          {internshipData?.required_skills?.map(mapSkills)}
        </div>
      </div>
    </div>
  );
}

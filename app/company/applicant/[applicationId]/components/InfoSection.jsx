import ResponseSection from "@/app/company/internships/[internshipId]/components/ResponseSection";
import { getMatchColour } from "@/lib/utils/getInternshipsWithMatchScore";
import Image from "next/image";

export default function InfoSection({ applicantInfo }) {
  const matchColour = getMatchColour(applicantInfo?.match_score);
  const applicantInfoForResponse = {
    status: applicantInfo?.status,
    _id: applicantInfo?._id,
    name: applicantInfo?.name,
  };

  return (
    <div className="w-full">
      {" "}
      <div className="flex w-full gap-5 items-start bg-white rounded py-4 px-6 justify-between ">
        {" "}
        <div className="flex gap-5 items-start">
          {" "}
          <div>
            <div className="relative w-18 h-18 rounded-full overflow-hidden">
              <Image
                src={applicantInfo?.profilePicUrl}
                fill
                alt="profile_pic"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <div className="text-xl font-medium">{applicantInfo?.name}</div>
              <div
                className={` px-2 rounded-xl py-1 font-medium`}
                style={{ backgroundColor: matchColour }}
              >
                {applicantInfo?.match_score || "0"}% Match
              </div>
            </div>
            <div className="flex gap-6 items-center text-gray-500 font-medium">
              <div className="flex gap-1 items-center">
                <div className="relative w-5 h-5 ">
                  <Image src={"/email-logo.svg"} fill alt="email-icon" />
                </div>
                {applicantInfo?.email || "--"}
              </div>
              <div className="flex items-center gap-1">
                {" "}
                <div className="relative w-4 h-5 ">
                  <Image src={"/location.svg"} fill alt="location-icon" />
                </div>
                {applicantInfo?.address || "--"}
              </div>
            </div>
          </div>
        </div>
        <ResponseSection
          applicantInfo={applicantInfoForResponse}
          noRedirect={true}
        />
      </div>
    </div>
  );
}

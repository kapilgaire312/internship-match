import { getFileSizeKB, getFileSizeMB } from "@/utils/getFileSizeKb";
import Image from "next/image";

export default function ResumeSection({ resumeDetails }) {
  if (!resumeDetails) {
    return (
      <div className="flex flex-col bg-white p-5 rounded-lg  shadow-sm gap-4 w-full">
        <h2 className="text-xl font-semibold">Resume</h2>
        <p className="w-full bg-white rounded text-xl  text-gray-400 flex justify-center items-center h-[20vh]">No resume uploaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white p-5 rounded-lg  shadow-sm gap-4 w-full">
      <h2 className="text-xl font-semibold">Resume</h2>
      <div className="flex px-4 py-2 bg-gray-100 rounded-lg items-center gap-3 ">
        <div>
          <Image
            src="/file-logo.svg"
            alt="resume_icon"
            width={34}
            height={34}
          />
        </div>
        <div className="flex flex-col ">
          <p>{resumeDetails.file_name}</p>
          <div className="flex gap-2  text-sm text-gray-400"> <p>Uploaded {resumeDetails.uploaded_at?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) || "--"}</p>
            <p>{getFileSizeKB(resumeDetails.file_size)}</p></div>

        </div>

      </div>
      <div className="w-full flex justify-center my-4">
        {resumeDetails.url ? (
          <iframe
            className="w-full h-[110vh]"
            src={`${resumeDetails.url}`}
          ></iframe>
        ) : (
          <div className="w-full bg-white rounded text-xl text-gray-400 flex justify-center items-center h-[20vh]">
            Failed to get student&apos;s resume
          </div>
        )}
      </div>


    </div>
  );
}
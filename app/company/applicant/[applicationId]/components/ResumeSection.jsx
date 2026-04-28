import Image from "next/image";
import ResumeDownloadButton from "./ResumeDownloadButton";

export default function ResumeSection({ applicantInfo }) {
  const resumeUrl = applicantInfo.resumeUrl;
  const fileName = applicantInfo.fileName;
  const resumeUrlDownload = applicantInfo.resumeUrlDownload;
  console.log("resumeurlis", resumeUrlDownload);

  return (
    <div className="w-full">
      {" "}
      <div className="flex w-full gap-5 items-center bg-white rounded py-4 px-6 justify-between ">
        {" "}
        <div
          className="flex gap-2 items-center
          "
        >
          {" "}
          <div className="relative h-8 w-8 ">
            <Image src="/file-logo.svg" fill alt="file-icon" />
          </div>
          <p className="font-medium">{fileName}</p>
        </div>
        <div>
          <ResumeDownloadButton
            resumeUrl={resumeUrlDownload}
            fileName={fileName}
          />
        </div>
      </div>
      <div className="w-full flex justify-center my-4">
        {resumeUrl ? (
          <iframe
            className="w-[50%] h-[110vh]"
            src={`${resumeUrl}#toolbar=0`}
          ></iframe>
        ) : (
          <div className="w-full bg-white rounded text-xl font-medium text-gray-400 flex justify-center items-center h-[20vh]">
            Failed to get applicant&apos;s resume
          </div>
        )}
      </div>
    </div>
  );
}

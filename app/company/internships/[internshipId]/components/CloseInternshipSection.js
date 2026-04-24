import CloseInternshipButton from "./CloseInternshipButton";

export default function CloseInternshipSection({ internshipId }) {
  return (
    <div className="flex flex-col gap-5 items-start bg-white rounded py-4 px-6 w-full">
      <div className="w-full flex flex-col gap-2">
        <p className="text-xl font-medium">Close Internship</p>
        <CloseInternshipButton internshipId={internshipId} />
      </div>
    </div>
  );
}

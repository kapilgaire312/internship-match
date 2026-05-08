import NewApplicantCard from "./NewApplicantCard";

export default function NewApplicantsSection({ applicantsInfo }) {
  return (
    <div className="bg-white flex flex-col justify-center  rounded-xl p-6 gap-4">
      <div>
        <p className="text-xl font-semibold">New Applicants</p>{" "}
        <p className="text-gray-500 text-sm">
          Recent applicants across your open listings.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {!applicantsInfo || applicantsInfo.length === 0 ? (
          <div className="flex w-full h-[20vh] text-gray-500 font-medium items-center justify-center">
            No new applicants found for the selected time period.
          </div>
        ) : (
          applicantsInfo.map((item, index) => {
            return <NewApplicantCard key={index} applicantInfo={item} />;
          })
        )}
      </div>
    </div>
  );
}

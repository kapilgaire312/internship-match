import Image from "next/image";

export default function StudentCard({ studentDetails }) {
  console.log("Student Details in Card:", studentDetails.profilePicUrl);
  return (
    <div className=" flex flex-col  bg-white px-4 py-6 rounded-lg shadow-sm gap-6">
      <div className="flex flex-col items-center ">
        <div>
          <Image
            src={studentDetails.profilePicUrl}
            className="rounded-full object-cover"
            width={96}
            height={96}
            alt="profile_pic"
            sizes="96px"
          />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold">{studentDetails.name}</h1>
          <p className="text-gray-600">{studentDetails.major || "--"}</p>
          <p className="text-gray-600">
            Batch {studentDetails.batch_year || "--"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center gap-4 border-b py-2 w-full ">
          <div className="flex gap-1 text-gray-500">
            <Image
              src="/email-logo.svg"
              alt="email_icon"
              width={16}
              height={16}
            />
            Email
          </div>
          <p className="break-all text-wrap">{studentDetails.email}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 w-full  ">
          <div className="flex gap-1 text-gray-500">
            <Image
              src="/location-logo.svg"
              alt="location_icon"
              width={14}
              height={12}
            />
            Location
          </div>
          <p className="break-all text-wrap">
            {studentDetails.address || "--"}
          </p>
        </div>
        <div className="flex justify-between items-center border-b py-2 w-full ">
          <div className="flex gap-1 text-gray-500">
            <Image
              src="/university-logo.svg"
              alt="university_icon"
              width={18}
              height={18}
            />
            University
          </div>
          <p className="break-all text-wrap">
            {studentDetails.university || "--"}
          </p>
        </div>
        <div className="flex justify-between items-center border-b py-2 w-full">
          <div className="flex gap-1 text-gray-500">
            <Image
              src="/calendar-icon.svg"
              alt="calendar_icon"
              width={14}
              height={14}
            />
            Joined
          </div>
          <p className="break-all text-wrap">
            {studentDetails.joined_at?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}


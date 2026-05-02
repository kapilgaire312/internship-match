import handleSignOutAction from "@/actions/handleSignOutAction";
import Image from "next/image";
import EditProfilePicButton from "./EditProfilePicButton";

export default function BasicInfoCard({ basicInfo }) {
  return (
    <div className="bg-white py-6 px-10 rounded min-w-80 max-w-100 max-h-fit">
      <div className="flex flex-col gap-3">
        {" "}
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="">
            {" "}
            <div className="relative w-[8rem] h-[8rem] rounded-full overflow-hidden">
              <EditProfilePicButton profilePicSrc={basicInfo?.profile_pic} />
              <Image
                src={basicInfo?.profile_pic}
                alt="profile_pic"
                fill
                className="object-cover"
              />{" "}
            </div>{" "}
          </div>
          <div className="font-semibold text-xl"> {basicInfo?.name}</div>
          <div className="text-gray-600">{basicInfo?.major}</div>
        </div>
        <div className="text-gray-600 flex flex-col gap-1">
          <div className="flex items-center gap-2 ">
            {" "}
            <div className="w-4 h-4 relative">
              {" "}
              <Image src="/email-logo.svg" fill alt="email-logo" />
            </div>{" "}
            {basicInfo?.email}
          </div>
          <div className="flex items-center gap-2 ">
            {" "}
            <div className="w-4 h-4 relative">
              {" "}
              <Image src="/location-logo.svg" fill alt="email-logo" />
            </div>{" "}
            {basicInfo?.address ? basicInfo.address : "--"}
          </div>
          <div className="flex items-center gap-2 ">
            {" "}
            <div className="w-4 h-4 relative">
              {" "}
              <Image src="/university-logo.svg" fill alt="email-logo" />
            </div>{" "}
            {basicInfo?.university ? basicInfo.university : "--"}
          </div>
        </div>
        <div>
          <form action={handleSignOutAction}>
            {" "}
            <button
              type="submit"
              className="bg-[#f5f6fc] flex justify-center items-center w-full py-2 border border-gray-300 rounded-xl hover:opacity-70 cursor-pointer active:opacity-40"
            >
              {" "}
              <div className="relative h-6 w-5">
                <Image src={"/logout-logo.svg"} fill alt="logout-logo" />
              </div>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

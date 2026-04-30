import EditProfilePicButton from "@/app/student/profile/components/EditProfilePicButton";
import Image from "next/image";

export default function LogoSection({ logoUrl }) {
  const logoTest = "/default_logo.png";
  return (
    <div className="bg-white p-6 rounded flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xl font-medium">Company Logo</p>
          <p className="text-gray-500">
            This logo will appear on your internship listings.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <div className="relative w-50 h-50 rounded-full overflow-hidden border-2 border-gray-300 ">
              <Image src={logoUrl} alt="company_logo" fill />{" "}
            </div>
            <div>
              <EditProfilePicButton
                profilePicSrc={logoUrl}
                companyLogo={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col  text-sm text-gray-500 items-center">
          <p>Recommended size: 512 x 512px</p>
          <p>Maximum file size: 2MB(JPG)</p>
        </div>
      </div>
    </div>
  );
}

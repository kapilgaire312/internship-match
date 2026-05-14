import getCompanyLogoUrl from "@/lib/utils/getCompanyLogoUrl";
import BasicInfoSection from "./BasicInfoSection";
import Image from "next/image";
import LocationContactSection from "./LocationContactSection";
import SocialLinksSection from "./SocialLinksSection";

export default function CompanyDescription({ companyDetails }) {

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <BasicInfoSection companyDetails={companyDetails} />

      </div>
      <div className="flex gap-6 w-full">

        <div className="bg-white p-4    rounded-lg flex flex-col  gap-2" style={{ width: "190%" }}>

          <div className="flex items-center gap-2 border-b pt-2 pb-4">
            <Image
              src="/status-icon.svg"
              alt="description_icon"
              width={26}
              height={26}
            />
            <h2 className="text-xl font-semibold ">About Company</h2>
          </div>


          <div className="w-full">
            {companyDetails.about_company ? (
              <p className="bg-white p-4 rounded-lg min-h-[20vh] w-full"
                style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                {companyDetails.about_company}</p>
            ) : (
              <p className="bg-white p-4 rounded-lg min-h-[20vh] text-gray-500">No description provided.</p>
            )}

          </div>
        </div>
        <div className="w-full">
          {<LocationContactSection companyDetails={companyDetails} />}
          {<SocialLinksSection companySocialLinks={companyDetails.social_links} />}
        </div>

      </div>

    </div>
  );
}

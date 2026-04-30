import getProfileInfo from "@/lib/utils/company/getProfileInfo";
import BasicInfoSection from "./components/BasicInfoSection";
import LocationAndContactSection from "./components/LocationAndContactSection";
import LogoSection from "./components/LogoSection";
import SocialLinksSeciton from "./components/SocialLinksSection";

export default async function CompanyProfile() {
  const companyInfo = await getProfileInfo();
  if (!companyInfo || companyInfo.error)
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl bg-white w-[60vw] text-center rounded py-20 px-10 font-medium text-gray-400">
          {companyInfo.error}
        </p>
      </div>
    );
  const { basicInfoData, locationContactData, socialLinksData, logoUrl } =
    companyInfo;

  console.log(logoUrl);

  return (
    <div className="px-10 py-4 ">
      <div className="grid grid-cols-[65vw_1fr] gap-6">
        <BasicInfoSection basicInfoData={basicInfoData} />
        <LogoSection logoUrl={logoUrl} />
        <LocationAndContactSection locationContactData={locationContactData} />
        <SocialLinksSeciton socialLinksData={socialLinksData} />
      </div>
    </div>
  );
}

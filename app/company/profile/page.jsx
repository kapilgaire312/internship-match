import getProfileInfo from "@/lib/utils/company/getProfileInfo";
import BasicInfoSection from "./components/BasicInfoSection";

export default async function CompanyProfile() {
  const companyInfo = await getProfileInfo();

  return (
    <div className="px-20 py-4 gap-4">
      <div className="grid grid-cols-[70vw_1fr]">
        <BasicInfoSection companyInfo={companyInfo} />
        <div>ho</div>
        <div>thhis</div>
        <div>is</div>
      </div>
    </div>
  );
}

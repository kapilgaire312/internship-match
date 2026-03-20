import getStudentProfileInfo from "@/lib/utils/getStudentProfileInfo";
import BasicInfoCard from "./components/BasicInfoCard";
import BasicInfoSection from "./components/BasicInfoSection";
import ResumeSection from "./components/ResumeSection";
import SectorSection from "./components/SectorSection";
import SkillsSection from "./components/SkillsSection";

export default async function ProfilePage() {
  const data = await getStudentProfileInfo();
  //  console.log(data);

  let { basicInfo, currentSectors, allSectors, currentSkills } = data;
  console.log(currentSectors);

  if (basicInfo) basicInfo.profile_pic = "/my_profile.jpg";
  return (
    <div className="flex flex-col sm:flex-row px-[5vw] gap-10 mt-7">
      <BasicInfoCard basicInfo={basicInfo} />
      <div className="flex flex-col gap-5 w-full overflow-x-auto">
        <BasicInfoSection basicInfo={basicInfo} />
        <SectorSection
          currentSectors={currentSectors}
          allSectors={allSectors}
        />

        <SkillsSection currentSkills={currentSkills} />
        <ResumeSection />
      </div>
    </div>
  );
}

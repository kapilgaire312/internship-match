import getStudentProfileInfo from "@/lib/utils/getStudentProfileInfo";
import BasicInfoCard from "./components/BasicInfoCard";
import BasicInfoSection from "./components/BasicInfoSection";
import ResumeSection from "./components/ResumeSection";
import SectorSection from "./components/SectorSection";
import SkillsSection from "./components/SkillsSection";

export default async function ProfilePage() {
  const data = await getStudentProfileInfo();
  //  console.log(data);

  let {
    basicInfo,
    currentSectors,
    allSectors,
    currentSkills,
    studentResumeDetails,
  } = data;
  console.log(studentResumeDetails);

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
        <ResumeSection studentResumeDetails={studentResumeDetails} />
      </div>
    </div>
  );
}

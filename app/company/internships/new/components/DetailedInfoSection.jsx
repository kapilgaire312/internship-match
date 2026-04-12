"use client";

import { AddSkillsPopup } from "@/app/student/profile/components/AddSkillsPopup";
import SectorSelector from "@/app/student/profile/components/SectorSelector";
import { useState } from "react";

export default function DetailedInfoSection({ allSectors }) {
  console.log(allSectors);
  const [selectedSector, setSelectedSector] = useState({ _id: "", name: "" });
  const [skills, setSkills] = useState([]);

  function handleSectorSelect(sectorId) {
    const sector = allSectors.find((item) => item._id === sectorId);
    setSelectedSector(sector);
  }
  function handleRemoveSector() {
    setSelectedSector({ _id: "", name: "" });
  }

  function handleAddSkill(value) {
    setSkills([...skills, value]);
  }
  function handleDeleteSkill(skillIndex) {
    const updatedSkills = skills.filter((item, index) => index != skillIndex);
    setSkills(updatedSkills);
  }
  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl px-5 mr-5 py-4 ">
      {" "}
      <div className="border-b pb-2 border-gray-200 ">
        <div></div>
        <div className="text-xl font-semibold">Detailed Information</div>
      </div>{" "}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">Job Description</div>
          <textarea
            className="border py-1.5 px-2 rounded text-md h-[20vh]"
            placeholder="Describe the internship..."
            name="jobDescription"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">Eligibility</div>
          <textarea
            className="border py-1.5 px-2 rounded text-md h-[14vh]"
            placeholder="e.g. Final year students or recent graduates with a CS degree."
            name="eligibility"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">What You&apos;ll do</div>
          <textarea
            className="border py-1.5 px-2 rounded text-md h-[18vh]"
            placeholder="Describe the day-to-day responsibilities and projects the intern will work on..."
            name="responsibilities"
          />
        </div>{" "}
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">Sector</div>
          <div className="flex justify-between gap-2 border py-1 pl-2 pr-5">
            <input type="hidden" name="sectorId" value={selectedSector._id} />
            <div className="flex items-center">
              {" "}
              {selectedSector.name.length === 0 ? (
                <div className="text-gray-400 ">
                  Select the sector of the internship.
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-[#f5f6fc] rounded-xl px-2 py-1 font-medium">
                  {selectedSector.name}
                  <button
                    onClick={() => handleRemoveSector()}
                    className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
                  >
                    {" "}
                    x
                  </button>
                </div>
              )}
            </div>

            <SectorSelector
              availableSectors={allSectors}
              handleSectorSelect={handleSectorSelect}
              choose={true}
            />
          </div>
        </div>{" "}
        <div className="flex flex-col gap-1 ">
          <div className="text-[1.1rem] font-semibold">Skills</div>
          <div className="flex justify-between gap-2 border py-1 pl-2 pr-5">
            <input
              type="hidden"
              name="requiredSkills"
              value={JSON.stringify(skills)}
            />
            <div className="flex items-center">
              {" "}
              {skills.length === 0 ? (
                <div className="text-gray-400 ">
                  Add required skills for the internship.
                </div>
              ) : (
                skills.map((item, index) => (
                  <div
                    className="flex items-center gap-2 bg-[#f5f6fc] rounded-xl px-2 py-1 font-medium"
                    key={index}
                  >
                    {item}
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
                    >
                      {" "}
                      x
                    </button>
                  </div>
                ))
              )}
            </div>

            <AddSkillsPopup
              handleAddSkill={handleAddSkill}
              currentSkills={skills}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

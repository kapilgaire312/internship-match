"use client";

import { AddSkillsPopup } from "@/app/student/profile/components/AddSkillsPopup";
import SectorSelector from "@/app/student/profile/components/SectorSelector";
import { useEffect, useState } from "react";
import DetailedInfoInputs from "./DetailedInfoInputs";
import { errorMessageHandler, getDetailedSectionInfo } from "../utils";
import SectorSection from "./SectorSection";
import SkillsSection from "./SkillsSection";

export default function DetailedInfoSection({
  allSectors,
  errorMessage,
  rawData,
  errorMessageArray,
}) {
  console.log(allSectors);

  const [originalErrors, setOriginalErrors] = useState(new Map());
  const [error, setError] = useState(new Map());
  const handleOnChange = errorMessageHandler(
    error,
    setError,
    originalErrors,
    rawData,
  );

  useEffect(() => {
    if (errorMessageArray) {
      const errors = new Map(
        errorMessageArray?.map((item) => {
          return [item.field, item.message];
        }),
      );
      setError(errors);
      setOriginalErrors(errors);
    }
  }, [errorMessageArray]);

  const inputInfo = getDetailedSectionInfo();
  const changeHandler = {
    rawData,
    handleOnChange,
    error,
  };
  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl px-5 mr-5 py-4 ">
      {" "}
      <div className="border-b pb-2 border-gray-200 ">
        <div></div>
        <div className="text-xl font-semibold">Detailed Information</div>
      </div>{" "}
      <div className="flex flex-col gap-4">
        <DetailedInfoInputs
          inputInfo={inputInfo.jobDescription}
          changeHandler={changeHandler}
        />
        <DetailedInfoInputs
          inputInfo={inputInfo.eligibility}
          changeHandler={changeHandler}
        />
        <DetailedInfoInputs
          inputInfo={inputInfo.responsibilities}
          changeHandler={changeHandler}
        />
        <SectorSection allSectors={allSectors} error={error} />
        <SkillsSection error={error} />
        <div className="text-sm text-red-400 flex justify-center">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

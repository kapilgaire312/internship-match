"use client";

import { useState, useEffect } from "react";
import EditSection from "./EditSection";
import { AddSkillsPopup } from "./AddSkillsPopup";
import saveSkillInfoAction from "@/actions/student/saveSkillInfoAction";

export default function SkillsSection({ currentSkills }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(currentSkills);
  const [isPending, setIsPending] = useState(null);
  const [returnState, setReturnState] = useState(null);

  function handleCancel() {
    setValues(currentSkills);
    setEditing(false);
    if (returnState?.error) {
      setReturnState(null);
    }
  }

  async function handleSave() {
    if (returnState?.error) {
      setReturnState(null);
    }
    if (values.length === 0) {
      setReturnState({ error: "Add atleast one skill." });
      return;
    }

    setIsPending(true);
    const response = await saveSkillInfoAction(values);
    console.log(response);
    setReturnState(response);
    setIsPending(null);
  }

  function handleAddSkill(value) {
    setValues([...values, value]);
  }

  function handleDeleteSkill(skillIndex) {
    const updatedSkills = values.filter((item, index) => index != skillIndex);
    setValues(updatedSkills);
  }
  useEffect(() => {
    if (returnState?.success) {
      setEditing(false);
      setReturnState(null);
    }
  }, [returnState]);

  return (
    <div className="bg-white p-5 rounded w-full flex flex-col gap-4">
      <div>
        <EditSection
          editingInfo={{ editing, setEditing }}
          isPending={isPending}
          handleCancel={handleCancel}
          handleSave={handleSave}
          titleInfo={{
            title: "Skills",
            text: "Manage your technical skills",
          }}
        />
      </div>{" "}
      <div className="flex flex-col gap-2 ">
        {currentSkills?.length === 0 && !editing ? (
          <div className="flex justify-center text-gray-600">
            Click edit to add new skill.
          </div>
        ) : (
          <div className="text-gray-600">Current Sectors</div>
        )}
        <div className="flex gap-2 flex-wrap">
          {values?.map((item, index) => {
            return (
              <div
                className="flex items-center gap-2 bg-[#f5f6fc] border border-gray-300 rounded-xl px-2 py-1 font-medium"
                key={index}
              >
                {" "}
                {item}
                {editing && (
                  <button
                    onClick={() => handleDeleteSkill(index)}
                    className="hover:opacity-70  cursor-pointer text-gray-600 rounded-full bg-gray-500 w-5 text-xs h-5 flex justify-center items-center text-white"
                  >
                    {" "}
                    x
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {editing && (
          <AddSkillsPopup
            handleAddSkill={handleAddSkill}
            currentSkills={values}
          />
        )}
        {returnState?.error && (
          <p className="text-red-400 text-center mt-2">{returnState.error}</p>
        )}
      </div>
    </div>
  );
}

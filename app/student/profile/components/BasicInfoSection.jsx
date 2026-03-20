"use client";

import saveBasicInfoAction from "@/actions/student/saveBasicInfoAction";
import { useActionState, useEffect, useState } from "react";
import BasicInfoEditSection from "./BasicInfoEditSection";

export default function BasicInfoSection({ basicInfo }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(basicInfo);
  const [state, formAction, isPending] = useActionState(
    saveBasicInfoAction,
    null,
  );
  const [error, setError] = useState(null);
  const fields = [
    "name",
    "email",
    "address",
    "university",
    "major",
    "batch_year",
  ];
  const fieldsMap = {
    name: "Full Name",
    email: "Email",
    address: "Address",
    university: "University",
    major: "Major",
    batch_year: "Batch Year",
  };
  useEffect(() => {
    console.log(state);
    if (state?.success) {
      setEditing(false);
      if (error) setError(null);
    }
    if (state?.error) {
      setError(state.error);
    }
  }, [state]);
  function handelCancel() {
    setEditing(false);
    setValues(basicInfo);
    if (error) {
      setError(null);
    }
  }
  return (
    <div className="bg-white p-5 rounded w-full">
      <form action={formAction}>
        {" "}
        <BasicInfoEditSection
          editingInfo={{ editing, setEditing }}
          isPending={isPending}
          handleCancel={handelCancel}
        />
        <div className="flex flex-wrap gap-4 justify-between mt-3 ">
          {fields.map((item, index) => {
            return (
              <div key={index} className="flex flex-col ">
                <label htmlFor={item} className="text-gray-600">
                  {fieldsMap[item]}
                  {editing && <span className="text-red-600">*</span>}
                </label>
                <input
                  type={item === "batch_year" ? "number" : "text"}
                  id={item}
                  name={item}
                  className={`border ${item != "email" && editing ? "bg-white" : ""} bg-[#f5f6fc] rounded py-1 px-2 text-xl w-[28vw]`}
                  disabled={item === "email" ? true : !editing || isPending}
                  value={values[item]}
                  onChange={(e) => {
                    setValues({ ...values, [item]: e.target.value });
                  }}
                  placeholder="--"
                />
              </div>
            );
          })}
        </div>
      </form>
      {error && <p className="text-red-400 text-center mt-2">{error}</p>}
    </div>
  );
}

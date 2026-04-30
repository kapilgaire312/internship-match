"use client";

import saveBasicInfoAction from "@/actions/company/saveBasicInfoAction";
import saveSocialLinksAction from "@/actions/company/saveSocialLinksAction";
import BasicInfoEditSection from "@/app/student/profile/components/BasicInfoEditSection";
import { useActionState, useEffect, useState } from "react";

export default function SocialLinksSeciton({ socialLinksData }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(socialLinksData);

  const editingInfo = { editing, setEditing };
  const [error, setError] = useState(null);
  const [errorsMap, setErrorsMap] = useState(new Map());
  const [state, formAction, isPending] = useActionState(
    saveSocialLinksAction,
    null,
  );

  const fields = ["linkedin", "x", "facebook"];

  function handleCancel() {
    setEditing(false);
    setValues(socialLinksData);
    if (error) {
      setError(null);
    }
    setErrorsMap(new Map());
  }

  function handleOnchange(e, item) {
    setValues({ ...values, [item]: e.target.value });
    if (errorsMap.has(item)) {
      const errors = new Map(errorsMap);
      errors.delete(item);
      setErrorsMap(errors);
    }
    if (errorsMap.size === 0) setError(null);
  }
  useEffect(() => {
    if (state?.error) {
      setError(state);
      if (state.errors) {
        const newErrors = new Map();
        state.errors.map((error) => newErrors.set(error.path, error.message));
        setErrorsMap(newErrors);
      }
    } else {
      setEditing(false);
      setError(null);
    }
  }, [state]);

  return (
    <div>
      <div className="bg-white p-6 rounded flex flex-col gap-3">
        <form className="contents" action={formAction}>
          {" "}
          <BasicInfoEditSection
            editingInfo={editingInfo}
            handleCancel={handleCancel}
            isPending={isPending}
            title={"Social Links"}
          />
          <div className="flex flex-col gap-3">
            {fields.map((item, key) => {
              return (
                <div key={key} className="flex flex-col gap-1">
                  <label htmlFor={item} className="font-medium">
                    {item[0].toUpperCase() + item.slice(1)}
                    {item === "linkedin" && editing && (
                      <span className="text-red-400">*</span>
                    )}
                  </label>
                  <input
                    disabled={!editing || isPending}
                    placeholder="--"
                    id={item}
                    name={item}
                    className={`border w-full py-1 px-2 rounded ${!editing && "bg-[#f5f6fc]"} ${errorsMap.has(item) && "border-red-400 "}`}
                    value={values[item]}
                    onChange={(e) => {
                      handleOnchange(e, item);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div></div>
          <div></div>
        </form>
        {error && (
          <p className="text-red-400 text-center ">{error.error}</p>
        )}{" "}
      </div>
    </div>
  );
}

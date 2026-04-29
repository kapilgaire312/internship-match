"use client";
import BasicInfoEditSection from "@/app/student/profile/components/BasicInfoEditSection";
import { useState } from "react";

export default function BasicInfoSection({ companyInfo }) {
  const [editing, setEditing] = useState(false);

  const editingInfo = { editing, setEditing };
  console.log(companyInfo);

  function handleCancel() {
    setEditing(false);
  }

  return (
    <div className="bg-white p-6 rounded flex flex-col gap-3">
      <div>
        <BasicInfoEditSection
          editingInfo={editingInfo}
          handleCancel={handleCancel}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Company Name</label>
          <input
            className="border w-full rounded py-1 px-2"
            disabled={!editing}
            defaultValue={companyInfo.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Industry</label>
          <input
            className="border w-full rounded py-1 px-2"
            disabled={!editing}
            defaultValue={companyInfo.industry}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Website URL</label>
          <input
            disabled={!editing}
            className="border w-full rounded py-1 px-2"
            defaultValue={companyInfo.website}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Company Size</label>
          <input
            disabled={!editing}
            className={`border w-full rounded py-1 px-2 ${!editing && "bg-[#f5f6fc] "}`}
            placeholder="--"
            defaultValue={companyInfo.company_size}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">About Company</label>
        <textarea
          disabled={!editing}
          className="border h-25 w-full py-1 px-2"
        />
      </div>
    </div>
  );
}

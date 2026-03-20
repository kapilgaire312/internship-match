"use client";

import { useState } from "react";

export default function ResumeSection() {
  const [uploadPopup, setUploadPopup] = useState(false);
  return (
    <div className="bg-white p-5 rounded w-full flex flex-col gap-4">
      <div>Resume</div>
      <div className="flex justify-between">
        {uploadPopup && (
          <div className="absolute z-5 bottom-10  bg-red-200 w-200 h-100">
            this
          </div>
        )}
        <div>name</div>
        <div className="flex gap-2">
          <div>Delete</div>
          <div>View</div>
          <div>Upload New</div>
        </div>
      </div>
    </div>
  );
}

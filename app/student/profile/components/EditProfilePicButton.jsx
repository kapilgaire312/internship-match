"use client";

import Image from "next/image";
import { useState } from "react";

export default function EditProfilePicButton() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="absolute z-10 right-5 top-2 bg-white  rounded-full p-1 flex">
      <button className="relative w-5 h-5 flex cursor-pointer hover:opacity-70 active:opacity-50 ">
        {" "}
        <Image src="/edit-logo.svg" alt="edit-icon" fill />{" "}
      </button>
    </div>
  );
}

"use client";

import handleSignOutAction from "@/actions/handleSignOutAction";
import Image from "next/image";

export default function LogoutButton() {
  return (
    <button
      className="bg-gray-200 flex gap-1 px-4 items-center py-2 border border-gray-300 rounded-xl hover:opacity-70 cursor-pointer active:opacity-40 hover:underline transition-all duration-100 ease-in-out "
      onClick={() => {
        handleSignOutAction();
      }}
    >
      <div className="relative h-5 w-5">
        <Image src={"/logout-logo.svg"} fill alt="logout-logo" />
      </div>
      Logout
    </button>
  );
}

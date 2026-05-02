"use client";

import handleSignOutAction from "@/actions/handleSignOutAction";

export default function LogoutButton() {
  return (
    <button
      className="bg-gray-200 px-4 py-2 border border-gray-300 rounded-xl hover:opacity-70 cursor-pointer active:opacity-40"
      onClick={() => {
        handleSignOutAction();
      }}
    >
      Logout
    </button>
  );
}

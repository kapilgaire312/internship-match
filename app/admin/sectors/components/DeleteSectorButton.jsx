"use client";

import ConfirmPopup from "@/components/admin/ConfirmPopup";
import { useState } from "react";

export default function DeleteSectorButton({ sectorId, sectorName }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const message = {
    title: `Confirm Delete?`,
    value: `Are you sure you want to delete this sector`,
    unit: sectorName ? `"${sectorName}"` : "",
  };
  const trigger = { value: "Delete", color: "#FECACA" };
  const errorInfo = { error, setError };
  const pendingInfo = { isPending, setIsPending };

  async function handleResponse() {
    console.log("handling response");
    //call the serverAction to delete sector.
  }

  return (
    <div>
      <ConfirmPopup
        handleResponse={handleResponse}
        message={message}
        pendingInfo={pendingInfo}
        errorInfo={errorInfo}
        trigger={trigger}
      />
    </div>
  );
}

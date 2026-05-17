"use client";

import handleDeleteInternshipAction from "@/actions/admin/handleDeleteInternshipAction";
import ConfirmPopup from "@/components/admin/ConfirmPopup";
import { useState } from "react";

export default function DeleteInternshipButton({ internshipId, internshipTitle }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const message = {
    title: `Confirm Delete?`,
    value: `Are you sure you want to delete this internship`,
    unit: `${internshipTitle}`
  };
  const trigger = { value: "Delete", color: "#FECACA" };
  const errorInfo = { error, setError };
  const pendingInfo = { isPending, setIsPending };

  const handleResponse = async () => {
    setIsPending(true);
    const res = await handleDeleteInternshipAction(internshipId);
    setIsPending(false);
    if (res.error) {
      setError(res.error);
      return false;
    }
    else {
      setError(null);
      return true
    }
  }


  return (
    <div><ConfirmPopup
      trigger={trigger}
      message={message}
      handleResponse={handleResponse}
      errorInfo={errorInfo}
      pendingInfo={pendingInfo}
    />
    </div>
  );
}
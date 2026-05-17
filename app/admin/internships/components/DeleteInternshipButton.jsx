"use client";

import handleDeleteInternshipAction from "@/actions/admin/handleDeleteInternshipAction";
import ConfirmPopup from "@/components/admin/ConfirmPopup";
import { useEffect, useRef, useState } from "react";
import SuccessPopup from "./SuccessPopup";
import { useRouter } from "next/navigation";


export default function DeleteInternshipButton({ internshipId, internshipTitle }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const router = useRouter();

  const message = {
    title: `Confirm Delete?`,
    value: `Are you sure you want to delete this internship`,
    unit: internshipTitle ? `"${internshipTitle}"` : ""
  };
  const trigger = { value: "Delete", color: "#FECACA" };
  const errorInfo = { error, setError };
  const pendingInfo = { isPending, setIsPending };
  const initialOpen = useRef(false);

  const handleResponse = async () => {
    setIsPending(true);
    const res = await handleDeleteInternshipAction(internshipId);
    setIsPending(false);
    if (res.error) {
      setError(res.error);

      setOpenSuccessPopup(false);
      return false;
    }
    else {
      setError(null);
      initialOpen.current = true;
      setOpenSuccessPopup(true);
      return true
    }
  }

  useEffect(() => {

    if (initialOpen.current && !openSuccessPopup) {
      router.replace("/admin/internships")

    }
  })


  return (
    <div><ConfirmPopup
      trigger={trigger}
      message={message}
      handleResponse={handleResponse}
      errorInfo={errorInfo}
      pendingInfo={pendingInfo}
    />
      <SuccessPopup open={openSuccessPopup} setOpen={setOpenSuccessPopup} />
    </div>
  );
}
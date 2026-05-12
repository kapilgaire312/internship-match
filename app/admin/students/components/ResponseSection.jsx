"use client";

import handleBlockStudentAction from "@/actions/admin/handleBlockStudentAction";
import ConfirmPopup from "@/components/admin/ConfirmPopup";
import Link from "next/link";
import { useState } from "react";

export default function ResponseSection({ studentId, studentName, isBlocked, disableView }) {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const message = {
    title: `Confirm ${isBlocked ? 'Unblock' : 'Block'}?`,
    value: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'}`,
    unit: `${studentName}`
  };
  const trigger = { value: isBlocked ? "Unblock" : "Block", color: isBlocked ? "#d1fae5" : "#fee2e2" };
  const errorInfo = { error, setError };
  const pendingInfo = { isPending, setIsPending };


  const handleResponse = async () => {
    setIsPending(true);
    const res = await handleBlockStudentAction(studentId, !isBlocked);
    setIsPending(false);
    if (res.error) {
      setError(res.error);
      return false;
    } else if (res.success) {
      setError(null);
      return true;
    }



  }

  return (
    <div className="flex justify-center ">
      <div className="flex  justify-between items-center gap-10">
        {!disableView && <div className="border flex items-center hover:opacity-70 active:opacity-50 transition-all duration-100 ease-in-out h-10  cursor-pointer rounded px-6 py-1 max-w-fit">
          <Link href={`/admin/students/${studentId}`}>View</Link>
        </div>}
        <div>
          <ConfirmPopup
            trigger={trigger}
            message={message}
            handleResponse={handleResponse}
            errorInfo={errorInfo}
            pendingInfo={pendingInfo}
          />
        </div>
      </div></div>

  );
}

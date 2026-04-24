"use client";

import handleCloseInternshipAction from "@/actions/company/handleCloseInternshipAction";
import LoadingButton from "@/components/ui/LoadingButton";
import { useActionState } from "react";

export default function CloseInternshipButton({ internshipId }) {
  const handleClose = handleCloseInternshipAction.bind(null, internshipId);
  const [state, formAction, isPending] = useActionState(handleClose, null);
  return (
    <div className="flex flex-col gap-2">
      {" "}
      <div className="flex justify-between items-center ">
        <p> Close to new applicants.</p>
        <form action={formAction}>
          {" "}
          <button
            type="submit"
            className="py-1.5 rounded px-6 border cursor-pointer "
            style={{ backgroundColor: "#ef8686 " }}
          >
            <LoadingButton
              initialValue={"Close"}
              pendingValue={"Closing"}
              isPending={isPending}
            />
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        {" "}
        {state?.error && <p className="text-red-400 text-md">{state.error}</p>}
      </div>
    </div>
  );
}

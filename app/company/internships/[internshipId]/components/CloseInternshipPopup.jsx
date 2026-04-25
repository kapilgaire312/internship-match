"use client";
import handleCloseInternshipAction from "@/actions/company/handleCloseInternshipAction";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import { useActionState, useEffect, useState } from "react";

export default function CloseInternshipPopup({ internshipId }) {
  const [open, setOpen] = useState(false);
  const message = "Close this internship to new apllicants?";
  const handleClose = handleCloseInternshipAction.bind(null, internshipId);
  const [state, formAction, isPending] = useActionState(handleClose, null);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (state?.error) setError(state.error);
  }, [state]);

  useEffect(() => {
    if (!open) setError(null);
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogTrigger>
        <div
          className="py-1.5 rounded px-6 border cursor-pointer "
          style={{ backgroundColor: "#ef8686 " }}
        >
          Close
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium"> {message}</div>
          </div>
          <div>
            {error && (
              <p className="text-red-400 flex justify-center">{error}</p>
            )}
          </div>
          <div className="flex justify-end gap-8 select-none">
            <button
              disabled={isPending}
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded border cursor-pointer bg-white  hover:opacity-70 active:opacity-50"
            >
              No
            </button>
            <form action={formAction}>
              <button
                disabled={isPending}
                className="px-6 py-2 rounded cursor-pointer hover:opacity-70 active:opacity-50"
                type="submit"
                style={{ backgroundColor: "#ef8686" }}
              >
                <LoadingButton
                  initialValue="Yes"
                  pendingValue="."
                  isPending={isPending}
                />
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

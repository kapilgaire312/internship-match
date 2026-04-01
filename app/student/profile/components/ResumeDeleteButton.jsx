"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/LoadingButton";
import handleDeleteResumeAction from "@/actions/student/handleDeleteResumeAction";

export default function ResumeDeleteButton() {
  const [open, setOpen] = useState(false); // controlled open state
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    try {
      setError(null);
      setIsPending(true);
      const res = await handleDeleteResumeAction();
      setIsPending(false);

      if (res.success) {
        setOpen(false);
        router.refresh();
        return;
      }

      setError(res.error);
    } catch (error) {
      console.log(error);
      setError("Failed to delete the resume.");
    }
  }

  useEffect(() => {
    if (open) {
      setError(null);
      setIsPending(false);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="border text-gray-600 px-2 py-1 rounded">Delete</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
          <DialogHeader>
            <DialogTitle className="">Delete your uploaded resume?</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-around">
            <button
              className="px-2 py-1.5  rounded select-none border cursor-pointer text-gray-600 hover:bg-gray-200 transition"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1.5  rounded select-none border cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition"
              onClick={handleDelete}
            >
              <LoadingButton
                initialValue="Delete"
                pendingValue="Deleting"
                isPending={isPending}
              />
            </button>
          </div>
          {error && (
            <div className="text-center text-red-300 text-sm">{error}</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

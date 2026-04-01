"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import getResumeViewLink from "@/actions/student/getResumeViewLink";

export default function ResumeViewButton({ resumeName }) {
  const [open, setOpen] = useState(false); // controlled open state

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  const handleView = async () => {
    const res = await getResumeViewLink();
    setIsPending(false);
    if (!res) {
      setError("Failed getting the resume.");
    }
    console.log(res);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.success) {
      setResumeUrl(res.signedUrl);
    }
  };

  useEffect(() => {
    if (open) {
      setError(null);
      setIsPending(false);
      setResumeUrl(null);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div
            className="border bg-white  px-2 py-1 rounded"
            onClick={handleView}
          >
            View{" "}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl w-full h-[80vh] max-w-5xl bg-[#f5f6fc] flex flex-col gap-2 pt-3">
          <DialogTitle>{resumeName}</DialogTitle>
          <div className=" h-full  w-full">
            {isPending ? (
              <LoadingSpinner />
            ) : (
              resumeUrl && (
                <div className="w-full h-full ">
                  <iframe className="w-full h-full" src={resumeUrl}></iframe>
                </div>
              )
            )}
          </div>
          {error && (
            <div className="text-center text-red-300 text-sm">{error}</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

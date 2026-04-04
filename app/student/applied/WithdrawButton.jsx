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
import handleWithdrawAction from "@/actions/student/handleWithdrawAction";
import LoadingButton from "@/components/ui/LoadingButton";

export default function WithdrawButton({ internshipId, isClosed }) {
  const [open, setOpen] = useState(false); // controlled open state
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleWithdraw() {
    try {
      setError(null);
      setIsPending(true);
      const res = await handleWithdrawAction(internshipId);
      setIsPending(false);

      if (res.success) {
        setOpen(false);
        router.refresh();
        return;
      }

      setError(res.error);
    } catch (error) {
      console.log(error);
      setError("Failed to withdraw from application.");
    }
  }

  useEffect(() => {
    if (open) {
      setError(null);
      setIsPending(false);
    }
  }, [open]);

  if (isClosed) return <></>;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="px-1.5 py-1 text-gray-600 rounded select-none border bg-[#f5f6fc]">
            Withdraw{" "}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
          <DialogHeader>
            <DialogTitle className="">
              Withdraw your application from this internship?
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-around">
            <button
              className="px-2 py-1.5  rounded select-none border cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1.5  rounded select-none border cursor-pointer bg-[#eef2ff] text-[#4f46e5] hover:bg-[#e0e7ff] transition"
              onClick={handleWithdraw}
            >
              <LoadingButton
                initialValue="Withdraw"
                pendingValue="Withdrawing"
                isPending={isPending}
              />
            </button>
          </div>
          {error && (
            <div className="text-center text-red-400 text-sm">{error}</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

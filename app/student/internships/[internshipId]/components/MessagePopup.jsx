import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
export default function MessagePopup({ response, setResponse }) {
  const imgSrc = response.success ? "/success-icon.svg" : "/error-icon.svg";
  const colour = response.success ? "#55ab67" : "#df433a";
  const headMessage = response.success ? "SUCCESS" : "ERROR";

  const bodyTopMessage = response.success
    ? "Your application was submitted."
    : "Unable to process the application.";

  const bodyMessage = response.success
    ? "Please wait while the company reviews your application."
    : response.error;

  return (
    <Dialog
      open={response}
      onOpenChange={(val) => {
        if (!val) {
          setResponse(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-[#f5f6fc]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 relative">
              <Image src={imgSrc} fill alt="message-icon" />
            </div>
            <div className=" font-semibold text-xl" style={{ color: colour }}>
              {headMessage}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-medium">{bodyTopMessage}</p>
            <p className="text-gray-500">{bodyMessage}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

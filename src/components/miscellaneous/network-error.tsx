"use client";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { ReusableDialog } from "../common/dialog/Dialog";

export const NetworkStatusModal = () => {
  const [, setIsOnline] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      setIsOpen(!navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        setIsOpen(false);
        window.location.reload();
      };

      const handleOffline = () => {
        setIsOnline(false);
        setIsOpen(true);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="No Internet Connection"
      description="Your device is currently offline. Please check your network connection."
      className="text-center"
      wrapperClassName="flex flex-col items-center gap-4 text-center"
      headerClassName="flex flex-col items-center text-center gap-2"
      trigger={undefined}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <AlertCircle className="h-12 w-12 text-mid-danger" />
        <p className="text-sm text-mid-grey-III">Some features may not be available while offline.</p>
        <div className="mt-4 h-[1px] w-full bg-mid-grey-II" />
        <button
          onClick={() => setIsOpen(false)}
          className="w-full rounded-md bg-mid-danger px-4 py-2 text-sm font-medium text-white hover:bg-mid-danger focus:outline-none focus:ring-2 focus:ring-mid-danger focus:ring-offset-2"
        >
          Dismiss
        </button>
      </div>
    </ReusableDialog>
  );
};

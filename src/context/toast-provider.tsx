"use client";

import { ToastProviderProps } from "@radix-ui/react-toast";
import React, { useEffect } from "react";

import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { Toast } from "~/utils/notificationManager";

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const { toast } = useToast();

  useEffect(() => {
    const toastInstance = Toast.getInstance();
    toastInstance.initialize(toast);
  }, [toast]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToastProvider;

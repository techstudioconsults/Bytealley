"use client";

import { useContext } from "react";

export const useNotification = () => {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

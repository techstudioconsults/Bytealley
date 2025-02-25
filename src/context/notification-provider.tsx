"use client";

import Pusher from "pusher-js";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { getSession } from "~/lib/session/session";
import { PushService } from "~/services/push-service";
import { Toast } from "~/utils/notificationManager";

interface Notification {
  type: string;
  data: {
    message: string;
    product?: {
      title: string;
      thumbnail?: string;
    };
    account?: {
      name: string;
      bank_name: string;
    };
  };
  created_at: string;
  read?: boolean; // Optional field to track read status
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pushService] = useState(new PushService(new HttpAdapter()));

  // Fetch notifications from the backend
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await pushService.getNotification();
      if (response?.data) {
        setNotifications(response.data.map((notification: Notification) => ({ ...notification, read: false })));
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [pushService]);

  // Add a new notification
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [{ ...notification, read: false }, ...prev]);
    Toast.getInstance().showToast({
      title: "New Notification",
      description: notification.data.message,
      variant: "success",
    });
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await pushService.readAllNotification();
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Initialize Pusher and bind events
  useEffect(() => {
    const initializePusher = async () => {
      const session = await getSession();

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        forceTLS: false,
        authEndpoint: `${process.env.NEXT_PUBLIC_CLEAN_BASE_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      });

      pusher.connection.bind("error", (error: Error) => {
        console.error("Pusher connection error:", error);
      });

      pusher.connection.bind("connected", () => {
        console.log("Pusher connected!");
      });

      const channel = pusher.subscribe(`private-users.${session?.user.id}`);

      const events = [
        "first.product.created",
        "product.published",
        "payout.card.added",
        "free.trial.ended",
        "order.created",
        "product.purchased",
        "subscription.cancelled",
        "subscription.payment.failed",
        "withdraw.reversed",
        "withdraw.successful",
      ];

      events.forEach((event) => {
        channel.bind(event, (data: Notification) => {
          addNotification(data);
        });
      });

      return () => {
        pusher.unsubscribe(`private-users.${session?.user.id}`);
        pusher.disconnect();
      };
    };

    initializePusher();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

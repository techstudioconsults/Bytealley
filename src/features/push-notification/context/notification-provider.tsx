/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
"use client";

import Pusher from "pusher-js";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import { WithDependency } from "~/HOC/withDependencies";
import { dependencies } from "~/utils/dependencies";
import { Toast } from "~/utils/notificationManager";
import { PushService } from "../services/notification.service";
import { NotificationContextType, PushNotification } from "../types";

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const BaseNotificationProvider = ({
  pushService,
  children,
  session,
}: {
  children: ReactNode;
  pushService: PushService;
  session: any;
}) => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);

  // Fetch notifications from the backend
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await pushService.getNotification();
      if (response?.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [pushService]);

  const unreadCount = notifications.length;

  const addNotification = (notification: PushNotification) => {
    setNotifications((previous) => [{ ...notification }, ...previous]);
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
      setNotifications([]);
      // setNotifications((previous) => previous.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Initialize Pusher and bind events
  useEffect(() => {
    const initializePusher = async () => {
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
      Pusher.logToConsole = true;

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

      for (const event of events) {
        channel.bind(event, (data: any) => {
          console.log("Received event:", event, data);
          const formattedNotication = {
            id: data.id,
            type: event,
            notifiable_type: "",
            notifiable_id: session?.user.id,
            data,
            read_at: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          addNotification(formattedNotication as PushNotification);
        });
      }

      return () => {
        pusher.unsubscribe(`private-users.${session?.user.id}`);
        pusher.disconnect();
      };
    };

    if (session) {
      initializePusher();
    }
  }, [session, session?.user.id, session?.user.token]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAllAsRead, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const NotificationProvider = WithDependency(BaseNotificationProvider, {
  pushService: dependencies.PUSH_SERVICES,
});

export default NotificationProvider;

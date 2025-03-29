/* eslint-disable @typescript-eslint/no-explicit-any */

export type NotificationContextType = {
  notifications: PushNotification[];
  addNotification: (notification: PushNotification) => void;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  unreadCount: number;
};

export type PushNotification = {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: string;
  data: any;
  read_at: string;
  created_at: string;
  updated_at: string;
};

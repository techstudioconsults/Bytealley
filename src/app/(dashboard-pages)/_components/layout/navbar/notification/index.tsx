"use client";

import { FC } from "react";
import { LuBell } from "react-icons/lu";

import CustomButton from "~/components/common/common-button/common-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { useNotifications } from "~/hooks/use-notification";
import { cn } from "~/utils/utils";

interface CardProperties extends React.ComponentProps<typeof Card> {}

export const UnreadNotificationCard: FC<CardProperties> = ({ className, ...properties }) => {
  const { notifications, markAllAsRead } = useNotifications();

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <Card data-testid="cardContainer" className={cn("h-fit w-fit sm:w-[380px]", className)} {...properties}>
      <CardHeader className="px-4 sm:p-6">
        <CardTitle>Notifications</CardTitle>
        <CardDescription data-testid="unreadMessageCount">
          You have {unreadCount === 0 ? 0 : unreadCount} unread message
          {unreadCount === 1 ? "" : "s"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex items-center space-x-4 rounded-md border p-2 sm:p-4">
          <LuBell size={16} />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch name="mobile_push_notifications" />
        </div>
        <div data-testid="previewBody">
          {notifications.map((notification, index) => (
            <div key={index} className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 sm:mb-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <div className={"flex items-center justify-between"}>
                  <p data-testid={`previewHeader${index}`} className="text-sm font-medium leading-none">
                    {notification.data.message}
                  </p>
                  <p data-testid={`previewTime${index}`} className="text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleTimeString()}
                  </p>
                </div>
                {notification.data.product && (
                  <p className="text-sm text-muted-foreground">Product: {notification.data.product.title}</p>
                )}
                {notification.data.account && (
                  <>
                    <p className="text-sm text-muted-foreground">Account: {notification.data.account.name}</p>
                    <p className="text-sm text-muted-foreground">{notification.data.account.bank_name}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <div className="item-center flex w-full">
          <CustomButton
            variant="primary"
            isDisabled={unreadCount === 0}
            className="w-full bg-primary"
            onClick={markAllAsRead}
          >
            Mark all as read
          </CustomButton>
        </div>
      </CardFooter>
    </Card>
  );
};

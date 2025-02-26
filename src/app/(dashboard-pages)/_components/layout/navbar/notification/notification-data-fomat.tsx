import { useNotifications } from "~/hooks/use-notification";

export const NotificationDataFormat = () => {
  const { notifications } = useNotifications();

  const renderNotificationContent = (notification: Notification) => {
    const { type, data } = notification;

    switch (type) {
      case "withdraw.successful": {
        return (
          <div className={"flex items-center justify-between"}>
            <p className="text-sm font-medium leading-none">{data.message}</p>
            <p className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleTimeString()}</p>
          </div>
        );
      }

      case "order.created":
      case "product.published":
      case "product.created":
      case "first.product.created": {
        return (
          <div className={"flex items-center justify-between"}>
            <p className="text-sm font-medium leading-none">{data.message}</p>
            <p className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleTimeString()}</p>
          </div>
        );
      }

      case "payout.card.added": {
        return (
          <div className={"flex items-center justify-between"}>
            <p className="text-sm font-medium leading-none">{data.message}</p>
            <p className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleTimeString()}</p>
          </div>
        );
      }

      default: {
        return (
          <div className={"flex items-center justify-between"}>
            <p className="text-sm font-medium leading-none">{data.message}</p>
            <p className="text-xs text-muted-foreground">{new Date(notification.created_at).toLocaleTimeString()}</p>
          </div>
        );
      }
    }
  };

  return (
    <>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 sm:mb-4"
        >
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">{renderNotificationContent(notification)}</div>
        </div>
      ))}
    </>
  );
};

{
  /* <div key={index} className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 sm:mb-4">
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
</div>; */
}

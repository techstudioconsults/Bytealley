import { BlurImage } from "~/components/miscellaneous/blur-image";
import { useNotifications } from "../../hooks/use-notification";
import { PushNotification } from "../../types";

const NotificationTime = ({ time }: { time: string }) => (
  <p className="text-[10px] text-muted-foreground">
    {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
  </p>
);

const NotificationMessage = ({ message }: { message: string }) => (
  <p className="max-w-[70%] text-xs font-medium leading-none">{message}</p>
);

const ProductDetails = ({ product }: { product: { title: string; thumbnail: string } }) => (
  <div className="mt-2 flex items-center gap-2">
    <div className="relative h-6 w-6 overflow-hidden rounded-[4px] sm:h-10 sm:w-10">
      <BlurImage
        src={product.thumbnail}
        alt={product.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 1.5rem, 3rem"
      />
    </div>
    <p className="text-xs text-muted-foreground">{product.title}</p>
  </div>
);

const AccountDetails = ({ account }: { account: { name: string; bank_name: string } }) => (
  <div className="mt-2 space-y-1">
    <p className="text-[10px] text-muted-foreground">Account: {account.name}</p>
    <p className="text-[10px] text-muted-foreground">{account.bank_name}</p>
  </div>
);

export const NotificationDataFormat = () => {
  const { notifications } = useNotifications();

  const renderNotificationContent = (notification: PushNotification) => {
    const { type, data, created_at } = notification;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <NotificationMessage message={data.message} />
          <NotificationTime time={created_at} />
        </div>

        {["order.created", "product.published", "product.created", "first.product.created"].includes(type) && (
          <ProductDetails product={data.product} />
        )}

        {type === "payout.card.added" && <AccountDetails account={data.account} />}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="grid grid-cols-[25px_1fr] items-start gap-3 rounded-lg border p-3 transition-all hover:bg-accent/50 sm:p-4"
        >
          <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500" />
          <div className="w-full overflow-hidden">{renderNotificationContent(notification)}</div>
        </div>
      ))}
    </div>
  );
};

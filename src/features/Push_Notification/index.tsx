import { useEffect, useState } from "react";

import { WithDependency } from "~/HOC/withDependencies";
import { dependencies } from "~/utils/dependencies";
import { initializePusher } from "./config";
import { PushService } from "./push.service";

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
}

interface NotificationItemProperties {
  notice: Notification;
}

const NotificationItem = ({ notice }: NotificationItemProperties) => {
  const { type, data, created_at } = notice;

  const renderContent = () => {
    switch (type) {
      case "withdraw.successful": {
        return <p className="text-sm font-bold">{data.message}</p>;
      }

      case "order.created": {
        return (
          <>
            <p className="text-sm font-bold">{data.message}</p>
            <p className="text-xs text-gray-500">Product: {data.product?.title}</p>
          </>
        );
      }

      case "product.published":
      case "product.created":
      case "first.product.created": {
        return (
          <>
            <p className="text-sm font-bold">{data.message}</p>
            <p className="text-xs text-gray-500">Product: {data.product?.title}</p>
          </>
        );
      }

      case "payout.card.added": {
        return (
          <>
            <p className="text-sm font-bold">{data.message}</p>
            <p className="text-xs text-gray-500">Account: {data.account?.name}</p>
            <p className="text-xs text-gray-500">Bank: {data.account?.bank_name}</p>
          </>
        );
      }

      default: {
        return <p className="text-sm font-bold">Unknown notification type</p>;
      }
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-4">
      <div className="flex-1 border-l border-gray-300 pl-4">
        {renderContent()}
        <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

interface BasePushNoticeProperties {
  pushService: PushService;
}

const BasePushNotice = ({ pushService }: BasePushNoticeProperties) => {
  const [notice, setNotice] = useState<Notification[]>([]);

  useEffect(() => {
    const getNotice = async () => {
      const response = await pushService.getNotification();
      console.log(response);
      if (response) {
        setNotice(response.data);
      }
    };
    const initialize = async () => {
      await initializePusher(getNotice);
    };
    getNotice();
    initialize();
  }, [pushService]);

  return (
    <div>
      {notice?.length > 0 ? (
        <div className="space-y-4">
          {notice.map((notice, index) => (
            <NotificationItem key={index} notice={notice} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xs font-medium text-gray-400">No new notifications at the moment. Check back later!</p>
        </div>
      )}
    </div>
  );
};

const PushNotice = WithDependency(BasePushNotice, {
  pushService: dependencies.PUSH_SERVICES,
});

export default PushNotice;

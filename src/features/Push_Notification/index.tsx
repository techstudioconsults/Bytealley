import { useEffect } from "react";

import { WithDependency } from "~/HOC/withDependencies";
import { dependencies } from "~/utils/dependencies";
import { initializePusher } from "./config";
import { PushService } from "./push.service";

const BasePushNotice = ({ pushService }: { pushService: PushService }) => {
  useEffect(() => {
    const getNotice = async () => {
      await pushService.getNotification();
      // Handle notifications logic here
    };
    const initialize = async () => {
      await initializePusher(getNotice);
    };
    initialize();
    // return () => {
    //   cleanupPusher();
    // };
    // getNotice();
  }, [pushService]);

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <h1 className="text-xl font-bold">Notifications</h1>
      <div className="mt-4">{/* Render notifications here */}</div>
    </div>
  );
};

const PushNotice = WithDependency(BasePushNotice, {
  pushService: dependencies.PUSH_SERVICES,
});

export default PushNotice;

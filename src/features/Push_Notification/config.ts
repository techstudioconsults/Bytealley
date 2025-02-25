/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Pusher from "pusher-js";

import { getSession } from "~/lib/session/session";
import { Toast } from "~/utils/notificationManager";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;
const CLEAN_BASE_URL = process.env.NEXT_PUBLIC_CLEAN_BASE_URL as string;

export const initializePusher = async (getNotice: () => Promise<any>) => {
  const session = await getSession();

  //   console.log(PUSHER_CLUSTER, PUSHER_KEY, CLEAN_BASE_URL);

  const pusher = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTER,
    forceTLS: false,
    authEndpoint: `${CLEAN_BASE_URL}/broadcasting/auth`,
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

  const eventHandler = async (data: any) => {
    Toast.getInstance().showToast({
      title: "Success",
      description: data.message,
      variant: "success",
    });
    getNotice();
  };

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
    channel.bind(event, eventHandler);
  }

  return () => {
    pusher.unsubscribe(`private-users.${session?.user.id}`);
  };
};

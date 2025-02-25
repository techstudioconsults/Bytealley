/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Pusher from "pusher-js";

import { getSession } from "~/lib/session/session";
import { Toast } from "~/utils/notificationManager";

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string;
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;
const CLEAN_BASE_URL = process.env.NEXT_PUBLIC_CLEAN_BASE_URL as string;

export const initializePusher = async (
  getNotice: () => Promise<any>,
  //   playNotificationSound?: () => void,
  //   toast?: (options: any) => void,
  //   close?: () => void,
  //   toastIdReference?: React.MutableRefObject<string | undefined>,
) => {
  const session = await getSession();

  console.log(PUSHER_CLUSTER, PUSHER_KEY, CLEAN_BASE_URL);

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

  const eventHandler = (data: any) => {
    // playNotificationSound();
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-console */
// import Pusher from "pusher-js";

// import { getSession } from "~/lib/session/session";
// import { Toast } from "~/utils/notificationManager";

// // Environment variables
// const APP_KEY = process.env.NEXT_PUBLIC_BASE_URL as string;
// const APP_CLUSTER = process.env.NEXT_PUBLIC_BASE_URL as string;
// const CLEAN_BASE_URL = process.env.NEXT_PUBLIC_CLEAN_BASE_URL;

// // Pusher event data type
// interface PusherEventData {
//   type: string;
//   message: string;
// }

// // Initialize Pusher and configure event listeners
// export const initializePusher = async (
//   playNotificationSound: () => void,
//   toast: (options: any) => void,
//   close: () => void,
//   toastIdReference: React.MutableRefObject<string | undefined>,
//   getNotice: () => Promise<any>,
// ) => {
//   const session = await getSession();

//   const pusher = new Pusher(APP_KEY, {
//     cluster: APP_CLUSTER,
//     forceTLS: false,
//     authEndpoint: `${CLEAN_BASE_URL}/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${session?.user.token}`,
//       },
//     },
//   });

//   // Handle Pusher connection errors
//   pusher.connection.bind("error", (error: Error) => {
//     console.error("Pusher connection error:", error);
//   });

//   // Handle Pusher connection success
//   pusher.connection.bind("connected", () => {
//     console.log("Pusher connected!");
//   });

//   // Subscribe to the user's private channel
//   const channel = pusher.subscribe(`private-users.${session?.user.id}`);

//   // Event handler for Pusher events
//   const eventHandler = (data: PusherEventData) => {
//     // use push service here i think
//     Toast.getInstance().showToast({
//       title: "Success",
//       description: data.message,
//       variant: "success",
//     });
//   };

//   // Bind events to the handler
//   const events = [
//     "first.product.created",
//     "product.published",
//     "payout.card.added",
//     "free.trial.ended",
//     "order.created",
//     "product.purchased",
//     "subscription.cancelled",
//     "subscription.payment.failed",
//     "withdraw.reversed",
//     "withdraw.successful",
//   ];

//   for (const event of events) {
//     channel.bind(event, eventHandler);
//   }

//   // Cleanup function
//   return () => {
//     pusher.unsubscribe(`private-users.${session?.user.id}`);
//   };
// };

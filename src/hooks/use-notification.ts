import { useContext } from "react";

import { NotificationContext } from "~/context/notification-provider";

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

// const NotificationItem = ({ notice }: NotificationItemProperties) => {
//   const { type, data, created_at } = notice;

//   const renderContent = () => {
//     switch (type) {
//       case "withdraw.successful": {
//         return <p className="text-sm font-bold">{data.message}</p>;
//       }

//       case "order.created": {
//         return (
//           <>
//             <p className="text-sm font-bold">{data.message}</p>
//             <p className="text-xs text-gray-500">Product: {data.product?.title}</p>
//           </>
//         );
//       }

//       case "product.published":
//       case "product.created":
//       case "first.product.created": {
//         return (
//           <>
//             <p className="text-sm font-bold">{data.message}</p>
//             <p className="text-xs text-gray-500">Product: {data.product?.title}</p>
//           </>
//         );
//       }

//       case "payout.card.added": {
//         return (
//           <>
//             <p className="text-sm font-bold">{data.message}</p>
//             <p className="text-xs text-gray-500">Account: {data.account?.name}</p>
//             <p className="text-xs text-gray-500">Bank: {data.account?.bank_name}</p>
//           </>
//         );
//       }

//       default: {
//         return <p className="text-sm font-bold">Unknown notification type</p>;
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-4">
//       <div className="flex-1 border-l border-gray-300 pl-4">
//         {renderContent()}
//         <p className="text-xs text-gray-500">{new Date(created_at).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// };

import { Toast } from "./notificationManager";

export const handleError = (error: unknown): void => {
  let message = "An unknown error occurred";

  if (typeof error === "object" && error !== null && "response" in error) {
    //  handle axios errors
    const axiosError = error as { response?: { data?: { message?: string } } };
    message =
      axiosError.response?.data?.message || "An unknown Axios error occurred";
    // handle generic error
  } else if (error instanceof Error) {
    // General Error handling
    message = error.message;
  }

  Toast.getInstance().showToast({
    title: `Error`,
    description: message,
    variant: `error`,
  });
};

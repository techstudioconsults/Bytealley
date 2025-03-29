import { Toast } from "./notificationManager";

export const handleError = (error: unknown): void => {
  let message = "An unknown error occurred";

  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as { response?: { status?: number; data?: { message?: string } } };

    if (axiosError.response?.status === 401) {
      window.location.href = "/auth/login";
      return;
    }

    message = axiosError.response?.data?.message || "An unknown Axios error occurred";
  } else if (error instanceof Error) {
    message = error.message;
  }

  Toast.getInstance().showToast({
    title: `Error`,
    description: message,
    variant: `error`,
  });
};

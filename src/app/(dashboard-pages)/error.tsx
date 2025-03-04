/* eslint-disable no-console */
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()} // Retry logic
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}

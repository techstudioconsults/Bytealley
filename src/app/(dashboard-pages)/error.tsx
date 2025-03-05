/* eslint-disable no-console */
"use client";

import { useEffect } from "react";

import { Wrapper } from "~/components/layout/wrapper";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <Wrapper className={`flex h-screen flex-col items-center justify-center text-center`}>
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()} // Retry logic
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </Wrapper>
  );
}

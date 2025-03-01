"use client";

import { StudioWrapper, useGrapesJS } from "~/features/funnel";

export default function Funnel() {
  const { onReady } = useGrapesJS();

  return (
    <main className="flex h-screen flex-col justify-between gap-2">
      <StudioWrapper onReady={onReady} />
    </main>
  );
}

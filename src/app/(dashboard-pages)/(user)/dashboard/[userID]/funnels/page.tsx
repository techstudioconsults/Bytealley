"use client";

import { StudioWrapper, useGrapesJS } from "~/features/funnel";

export default function Funnel() {
  const { onReady, getExportData, getProjectData } = useGrapesJS();

  return (
    <main className="flex h-screen flex-col justify-between gap-2 p-5">
      <div className="flex gap-5 p-1">
        <div className="font-bold">SDK example Next.js</div>
        <button className="rounded border px-2" onClick={getProjectData}>
          Log Project Data
        </button>
        <button className="rounded border px-2" onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <StudioWrapper onReady={onReady} />
    </main>
  );
}

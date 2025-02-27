"use client";

import { StudioWrapper, useGrapesJS } from "~/features/funnel";

export default function Funnel() {
  const { onReady, getExportData, getProjectData } = useGrapesJS();

  return (
    <main className="flex h-screen flex-col justify-between gap-2">
      <div className="flex gap-5">
        <button className="rounded border" onClick={getProjectData}>
          Log Project Data
        </button>
        <button className="rounded border" onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <StudioWrapper onReady={onReady} />
    </main>
  );
}

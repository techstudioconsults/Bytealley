/* eslint-disable @typescript-eslint/no-explicit-any */
// features/grapesjs-studio/components/StudioWrapper.tsx
"use client";

import GrapesJsStudio from "@grapesjs/studio-sdk/react";

import "@grapesjs/studio-sdk/style";

import { editorOptions } from "../../config";

// import type { Editor } from "grapesjs";

interface StudioWrapperProperties {
  onReady: (editor: any) => void;
}

const StudioWrapper = ({ onReady }: StudioWrapperProperties) => {
  return (
    <div className="h-full w-full flex-1 overflow-hidden">
      <GrapesJsStudio onReady={onReady} options={editorOptions} />
    </div>
  );
};

export default StudioWrapper;

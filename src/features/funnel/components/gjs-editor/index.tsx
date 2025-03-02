"use client";

import GrapesJsStudio from "@grapesjs/studio-sdk/react";

import "@grapesjs/studio-sdk/style";

import { editorOptions } from "../../config";
import useGrapesJS from "../../hooks/use-grapejs";

const StudioWrapper = () => {
  const { onReady } = useGrapesJS();
  return (
    <div className="h-full w-full flex-1 overflow-hidden">
      <GrapesJsStudio onReady={onReady} options={editorOptions} />
    </div>
  );
};

export default StudioWrapper;

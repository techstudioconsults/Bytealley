/* eslint-disable @typescript-eslint/no-explicit-any */
// features/grapesjs-studio/components/StudioWrapper.tsx
"use client";

import GrapesJsStudio from "@grapesjs/studio-sdk/react";

import "@grapesjs/studio-sdk/style";

// import type { Editor } from "grapesjs";

interface StudioWrapperProperties {
  onReady: (editor: any) => void;
}

const StudioWrapper = ({ onReady }: StudioWrapperProperties) => {
  return (
    <div className="h-full w-full flex-1 overflow-hidden">
      <GrapesJsStudio
        onReady={onReady}
        options={{
          licenseKey: "YOUR_LICENSE_KEY",
          project: {
            default: {
              pages: [
                {
                  name: "Home",
                  component: `<h1 style="padding: 2rem; text-align: center">
                    Hello Studio 👋
                  </h1>`,
                },
              ],
            },
          },
        }}
      />
    </div>
  );
};

export default StudioWrapper;

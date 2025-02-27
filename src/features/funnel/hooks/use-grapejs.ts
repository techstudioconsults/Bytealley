/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// features/grapesjs-studio/hooks/useGrapesJS.ts
import { StudioCommands, ToastVariant } from "@grapesjs/studio-sdk/react";
// import type { Editor } from "grapesjs";
import { useState } from "react";

const useGrapesJS = () => {
  const [editor, setEditor] = useState<any>();

  const onReady = (editor: any) => {
    console.log("Editor loaded", editor);
    setEditor(editor);
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: "Toast header",
      content: "Data logged in console",
      variant: ToastVariant.Info,
    });

  const getProjectData = () => {
    if (editor) {
      console.log({ projectData: editor.getProjectData() });
      showToast("log-project-data");
    }
  };

  const getExportData = () => {
    if (editor) {
      console.log({ html: editor.getHtml(), css: editor.getCss() });
      showToast("log-html-css");
    }
  };

  return {
    editor,
    onReady,
    getProjectData,
    getExportData,
  };
};

export default useGrapesJS;

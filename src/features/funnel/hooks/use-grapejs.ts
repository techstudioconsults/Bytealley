/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// features/grapesjs-studio/hooks/useGrapesJS.ts
import { StudioCommands, ToastVariant } from "@grapesjs/studio-sdk/react";
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

  const showModal = (options: {
    title: string;
    content: string;
    buttons?: Array<{
      id: string;
      label: string;
      className?: string;
      onClick: () => void;
    }>;
  }) => {
    if (editor) {
      const { title, content, buttons = [] } = options;

      editor.Modal.open({
        title,
        content,
        buttons: [
          ...buttons,
          {
            id: "close-modal",
            label: "Close",
            className: "btn-secondary",
            onClick: () => editor.Modal.close(),
          },
        ],
      });
    } else {
      console.warn("Editor is not initialized. Cannot show modal.");
    }
  };

  return {
    editor,
    onReady,
    getProjectData,
    getExportData,
    showModal, // Add showModal to the returned object
  };
};

export default useGrapesJS;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const editorOptions = {
  licenseKey: "YOUR_LICENSE_KEY",
  theme: "light" as "light" | "dark" | "auto",
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
  layout: {
    default: {
      type: "row",
      style: { height: "100%" },
      children: [
        { type: "sidebarLeft" },
        {
          type: "canvasSidebarTop",
          sidebarTop: {
            leftContainer: {
              buttons: ({ items }: { items: any[] }) => [
                ...items,
                {
                  id: "publish-funnel",
                  label: "Save and Continue",
                  style: { backgroundColor: "green", color: "#FFFFFF" },
                  // onClick: () => alert("Button clicked"),
                },
              ],
            },
          },
        },
        { type: "sidebarRight" },
      ],
    },
  },
};

// {id: 'componentOutline', icon: 'borderRadius', tooltip: 'Component outline', editorEvents: {…}, onClick: ƒ}editorEvents: {command:run:core:component-outline: ƒ, command:stop:core:component-outline: ƒ}icon: "borderRadius"id: "componentOutline"onClick: () => {…}length: 0name: ""arguments: (...)caller: (...)[[FunctionLocation]]: react.es.js:22744[[Prototype]]: ƒ ()[[Scopes]]: Scopes[6]tooltip: "Component outline"[[Prototype]]: Object
// VM7799 index.ts:38 {id: 'preview', icon: 'eye', tooltip: 'Preview', editorEvents: {…}, onClick: ƒ}
// VM7799 index.ts:38 {id: 'fullscreen', icon: 'fullscreen', tooltip: 'Fullscreen', editorEvents: {…}, onClick: ƒ}
// VM7799 index.ts:38 {id: 'showCode', icon: 'xml', tooltip: 'Code', onClick: ƒ}
// VM7799 index.ts:38 {id: 'showImportCode', icon: 'trayArrowDown', tooltip: 'Import code', onClick: ƒ}
// VM7799 index.ts:38 {id: 'clearCanvas', icon: 'delete', tooltip: 'Clear page', onClick: ƒ}
// VM7799 index.ts:38 {id: 'store', tooltip: 'Save content', editorEvents: {…}, onClick: ƒ, label: ƒ}
// VM7799 index.ts:38 {id: 'undo', icon: 'arrowULeftTop', disabled: true, editorEvents: {…}, onClick: ƒ}
// VM7799 index.ts:38 {id: 'redo', icon: 'arrowURightTop', disabled: true, editorEvents: {…}, onClick: ƒ}

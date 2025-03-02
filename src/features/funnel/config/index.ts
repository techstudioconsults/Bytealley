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
  // layout: {
  //   default: {
  //     type: "row",
  //     style: { height: "100%" },
  //     children: [
  //       { type: "sidebarLeft" },
  //       {
  //         type: "canvasSidebarTop",
  //         sidebarTop: {
  //           leftContainer: {
  //             buttons: ({ items }: { items: any[] }) => [
  //               ...items,
  //               {
  //                 id: "publish-funnel",
  //                 label: "Save and Continue",
  //                 style: { backgroundColor: "green", color: "#FFFFFF" },
  //                 onClick: ({ editor }: any) => {
  //                   // Use the editor's Modal API to show a modal
  //                   editor.Modal.open({
  //                     title: "Save and Continue", // Modal title
  //                     content: `
  //                       <div>
  //                         <p>Are you sure you want to save and continue?</p>
  //                       </div>
  //                     `, // Modal content (HTML)
  //                     buttons: [
  //                       {
  //                         id: "confirm-save",
  //                         label: "Confirm",
  //                         className: "btn-primary",
  //                         onClick: () => {
  //                           console.log("Save confirmed!");
  //                           editor.Modal.close(); // Close the modal
  //                         },
  //                       },
  //                       {
  //                         id: "cancel-save",
  //                         label: "Cancel",
  //                         className: "btn-secondary",
  //                         onClick: () => {
  //                           console.log("Save cancelled!");
  //                           editor.Modal.close(); // Close the modal
  //                         },
  //                       },
  //                     ],
  //                   });
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //       { type: "sidebarRight" },
  //     ],
  //   },
  // },
};

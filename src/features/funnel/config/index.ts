export const editorOptions = {
  licenseKey: process.env.NEXT_PUBLIC_GRAPESJS_LICENCE_KEY as string,
  theme: "light" as "light" | "dark" | "auto",
  project: {
    default: {
      pages: [
        {
          name: "Home",
          component: `<h1 style="padding: 2rem; text-align: center">
                   Welcome to Byte-alley Funnels Creator 👋
                  </h1>`,
        },
      ],
    },
  },
};

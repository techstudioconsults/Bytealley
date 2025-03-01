import template2 from "@/images/template-2.png";

export const template = {
  id: "webinar",
  thumbnail: template2,
  pages: [
    {
      id: "page-1",
      name: "Home",
      content: null, // Will be populated dynamically
      styles: ``,
    },
    {
      id: "page-2",
      name: "Feedback",
      content: null, // Will be populated dynamically
      styles: "",
    },
  ],
};

export async function getWebinarTemplateWithContent() {
  const [homeHtml, feedbackHtml] = await Promise.all([
    fetch("/templates/template-2/template2.html").then((res) => res.text()),
    fetch("/templates/template-2/feedback.html").then((res) => res.text()),
  ]);

  const updatedTemplate = {
    ...template,
    pages: [
      { ...template.pages[0], content: homeHtml },
      { ...template.pages[1], content: feedbackHtml },
    ],
  };

  return updatedTemplate;
}

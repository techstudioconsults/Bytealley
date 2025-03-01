import template3 from "@/images/template-3.png";





export const template = {
  id: "sales",
  thumbnail: template3,
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

export async function getSalesTemplateWithContent() {
  const [homeHtml, feedbackHtml] = await Promise.all([
    fetch("/templates/template-3/template3.html").then((res) => res.text()),
    fetch("/templates/template-3/feedback.html").then((res) => res.text()),
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
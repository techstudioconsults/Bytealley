import template1 from "@/images/template-1.png";

const template = {
  id: "lead",
  thumbnail: template1,
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

export async function getLeadTemplateWithContent() {
  const [homeHtml, feedbackHtml] = await Promise.all([
    fetch("/templates/template-1/template1.html").then((res) => res.text()),
    fetch("/templates/template-1/feedback.html").then((res) => res.text()),
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

import { getLeadTemplateWithContent } from "./template-1/template";
import { getWebinarTemplateWithContent } from "./template-2/template";
import { getSalesTemplateWithContent } from "./template-3/template";

const templatesFunctions = [getLeadTemplateWithContent, getWebinarTemplateWithContent, getSalesTemplateWithContent];

export const fetchTemplates = async ({ templateID }: { templateID?: string } = {}) => {
  const fetchedTemplates = await Promise.all(templatesFunctions.map((fn) => fn()));

  if (templateID) {
    const template = fetchedTemplates.find((template) => template.id === templateID);
    if (!template) {
      throw new Error(`Template with ID "${templateID}" not found.`);
    }
    return [template];
  }
  return fetchedTemplates;
};

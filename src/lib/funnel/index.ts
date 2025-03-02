// Fetch all templates
export const fetchAllTemplates = async () => {
  const response = await fetch("/api/templates");
  if (!response.ok) throw new Error("Failed to fetch templates");
  return response.json();
};

// Fetch a specific template by ID
export const fetchTemplateByID = async (templateID: string) => {
  const response = await fetch(`/api/templates/${templateID}`);
  if (!response.ok) throw new Error(`Failed to fetch template with ID: ${templateID}`);
  return response.json();
};

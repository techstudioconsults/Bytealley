/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable no-console */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { StudioWrapper, template, useGrapesJS } from "~/features/funnel";
import { fetchTemplateByID } from "~/lib/funnel";
import { FunnelControls } from "../_components/funnel-controls";

export default function Funnel() {
  const { editor } = useGrapesJS();
  const [template, setTemplate] = useState<template>();
  const searchParameters = useSearchParams();
  const ID = searchParameters.get("templateID") as string;

  // Fetch the template when the component mounts or when templateID changes
  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await fetchTemplateByID(ID);
        if (response) {
          setTemplate(response);
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    };
    getTemplate();
  }, [ID]);

  // Update the GrapesJS editor when the template or editor changes
  useEffect(() => {
    if (!editor || !template || !Array.isArray(template.pages)) {
      return;
    }

    // Remove all existing pages
    const existingPages = editor.Pages.getAll();
    existingPages.forEach((page: template) => editor.Pages.remove(page.id));

    // Add new pages from the template
    for (const page of template.pages) {
      const { id, name, content } = page;
      const newPage = editor.Pages.add({ id, name, content });
      if (newPage) {
        // Set the newly created page as active
        editor.Pages.select(newPage.id);
        // Add content to the page
        editor.addComponents(content, { pageId: newPage.id });
      }
    }

    // Set the first page as the active page
    const firstPageId = template.pages[0].id;
    if (firstPageId) {
      editor.Pages.select(firstPageId);
    }
  }, [editor, template]);

  //trigger the save and continue modal

  return (
    <main className="flex h-screen flex-col justify-between gap-2">
      {template && <FunnelControls template={template} />}
      <StudioWrapper />
    </main>
  );
}

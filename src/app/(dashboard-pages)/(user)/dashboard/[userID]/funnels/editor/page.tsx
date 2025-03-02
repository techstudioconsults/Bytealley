/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable no-console */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { StudioWrapper, template, useGrapesJS } from "~/features/funnel";
import { fetchTemplateByID } from "~/lib/funnel";
import { FunnelControls } from "../_components/funnel-controls";

export default function Funnel() {
  const { onReady, editor } = useGrapesJS();
  const [template, setTemplate] = useState<template>();
  const searchParameters = useSearchParams();
  const ID = searchParameters.get("templateID") as string;

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await fetchTemplateByID(ID);
        if (response) {
          console.log(response);
          setTemplate(response);
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    };
    getTemplate();
  }, [ID]);

  useEffect(() => {
    if (!editor || !template || !Array.isArray(template.pages)) {
      return;
    }
    const existingPages = editor.Pages.getAll();
    existingPages.forEach((page: template) => editor.Pages.remove(page.id));
    for (const page of template.pages) {
      const { id, name, content } = page;

      const newPage = editor.Pages.add({ id, name, content });
      if (newPage) {
        editor.Pages.select(newPage.id);
        editor.addComponents(content, { pageId: newPage.id });
      }
    }

    const firstPageId = template.pages[0].id;
    if (firstPageId) {
      editor.Pages.select(firstPageId);
    }
  }, [editor, template]);

  return (
    <main className="flex h-screen flex-col justify-between gap-2">
      {template && <FunnelControls editor={editor} template={template} />}
      <StudioWrapper onReady={onReady} />
    </main>
  );
}

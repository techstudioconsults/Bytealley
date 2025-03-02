/* eslint-disable no-console */
import { promises as fs } from "node:fs";
import path from "node:path";
import { templatesMetadata } from "@/templates/templates";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Find the template by ID
    const template = templatesMetadata.find((t) => t.id === id);
    if (!template) {
      return NextResponse.json({ error: `Template with ID '${id}' not found` }, { status: 404 });
    }

    // Read HTML content for each page in the template
    const pagesWithContent = await Promise.all(
      template.pages.map(async (page) => {
        const filePath = path.join(process.cwd(), "public", "templates", template.id, page.file);
        try {
          const content = await fs.readFile(filePath, "utf8");
          return { ...page, content };
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          return { ...page, content: "" }; // Return empty content if file not found
        }
      }),
    );

    return NextResponse.json({ ...template, pages: pagesWithContent });
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json({ error: "Failed to load template" }, { status: 500 });
  }
}

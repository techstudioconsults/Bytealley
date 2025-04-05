/* eslint-disable no-console */
import { promises as fs } from "node:fs";
import path from "node:path";
import { templatesMetadata } from "@/templates/templates";
import { NextResponse } from "next/server";

// Use environment variable for base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
  try {
    // Read HTML content for each template page
    const templatesWithContent = await Promise.all(
      templatesMetadata.map(async (template) => {
        const pagesWithContent = await Promise.all(
          template.pages.map(async (page) => {
            const filePath = path.join(process.cwd(), "public", "templates", template.id, page.file);
            try {
              const content = await fs.readFile(filePath, "utf8");
              const updatedContent = content.replace("{{BASE_URL}}", baseUrl || "");
              return { ...page, updatedContent };
            } catch (error) {
              console.error(`Error reading file ${filePath}:`, error);
              return { ...page, content: "" }; // Return empty content if file not found
            }
          }),
        );
        return { ...template, pages: pagesWithContent };
      }),
    );

    return NextResponse.json(templatesWithContent);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: "Failed to load templates" }, { status: 500 });
  }
}

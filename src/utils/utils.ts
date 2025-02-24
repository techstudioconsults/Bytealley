/* eslint-disable no-console */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export async function createFileFromUrl(
  url: string,
  fileName?: string, // Optional custom file name
  lastModified?: number, // Optional custom lastModified timestamp
): Promise<File> {
  try {
    // Fetch the file content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the file content as a Blob
    const blob = await response.blob();

    // Extract the file name from the URL if not provided
    const finalFileName = fileName || url.split("/").pop() || "file";

    // Get the MIME type from the response headers
    const mimeType = response.headers.get("Content-Type") || "application/octet-stream";

    // Create a File object
    const file = new File([blob], finalFileName, {
      type: mimeType,
      lastModified: lastModified || Date.now(), // Use provided timestamp or current time
    });

    return file;
  } catch (error) {
    console.error("Error creating File from URL:", error);
    throw error;
  }
}

// export const getDaysInMonth = (month: number) => {
//   const year = new Date().getFullYear();
//   return new Date(year, month, 0).getDate();
// };

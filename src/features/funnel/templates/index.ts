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


// app/api/templates/route.ts
// import { NextResponse } from 'next/server';
// import { getLeadTemplateWithContent } from '@/templates/template-1/template';
// import { getWebinarTemplateWithContent } from '@/templates/template-2/template';
// import { getSalesTemplateWithContent } from '@/templates/template-3/template';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const templateID = searchParams.get('templateID');

//   const templatesFunctions = [getLeadTemplateWithContent, getWebinarTemplateWithContent, getSalesTemplateWithContent];
//   const fetchedTemplates = await Promise.all(templatesFunctions.map((fn) => fn()));

//   if (templateID) {
//     const template = fetchedTemplates.find((template) => template.id === templateID);
//     if (!template) {
//       return NextResponse.json({ error: `Template with ID "${templateID}" not found.` }, { status: 404 });
//     }
//     return NextResponse.json([template]);
//   }

//   return NextResponse.json(fetchedTemplates);
// }

// app/page.tsx
// import React, { useEffect, useState } from 'react';

// interface Template {
//   id: string;
//   thumbnail: string;
//   content: string;
//   styles?: string;
// }

// const HomePage = () => {
//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         const response = await fetch('/api/templates');
//         if (!response.ok) {
//           throw new Error('Failed to fetch templates');
//         }
//         const data = await response.json();
//         setTemplates(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Templates</h1>
//       {templates.map((template) => (
//         <div key={template.id}>
//           <h2>{template.id}</h2>
//           <img src={template.thumbnail} alt={`${template.id} thumbnail`} />
//           <div dangerouslySetInnerHTML={{ __html: template.content }} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomePage;

// Example of fetching a specific template by ID
// useEffect(() => {
//   const fetchTemplate = async () => {
//     const templateID = 'lead'; // Replace with the desired template ID
//     try {
//       const response = await fetch(`/api/templates?templateID=${templateID}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch template');
//       }
//       const data = await response.json();
//       setTemplates(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTemplate();
// }, []);
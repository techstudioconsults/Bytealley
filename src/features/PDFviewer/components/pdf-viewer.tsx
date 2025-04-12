/* eslint-disable unicorn/no-new-array */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "../config/config.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1200;

type PDFFile = string | File | null;

export function PDFViewer({ url }: { url?: PDFFile }) {
  const [file] = useState<PDFFile>(url || "../config/sample.pdf");
  const [numberPages, setNumberPages] = useState<number>();
  const [containerReference, setContainerReference] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerReference, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumberPages }: any): void {
    setNumberPages(nextNumberPages);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerReference}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numberPages), (_element, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

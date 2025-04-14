import fs from "node:fs";
import path from "node:path";

// eslint-disable-next-line unicorn/prefer-module
const pdfjsDistributionPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorkerPath = path.join(pdfjsDistributionPath, "build", "pdf.worker.js");

fs.copyFileSync(pdfWorkerPath, "./dist/pdf.worker.js");

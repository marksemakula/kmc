import { PDFDocument } from 'pdf-lib';

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const SUPPORTED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

export function isSupportedFile(file) {
  return SUPPORTED_TYPES.includes(file.type);
}

// Merges PDF and image (JPG/PNG) files, in order, into a single PDF document.
export async function mergeFilesToPdf(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();

    if (file.type === 'application/pdf') {
      const donorPdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    } else if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      const image = file.type === 'image/png'
        ? await mergedPdf.embedPng(bytes)
        : await mergedPdf.embedJpg(bytes);

      const scale = Math.min((A4_WIDTH - 40) / image.width, (A4_HEIGHT - 40) / image.height, 1);
      const width = image.width * scale;
      const height = image.height * scale;

      const page = mergedPdf.addPage([A4_WIDTH, A4_HEIGHT]);
      page.drawImage(image, {
        x: (A4_WIDTH - width) / 2,
        y: (A4_HEIGHT - height) / 2,
        width,
        height
      });
    } else {
      throw new Error(`Unsupported file type: ${file.name}. Please upload PDF, JPG or PNG files only.`);
    }
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([mergedBytes], { type: 'application/pdf' });
}

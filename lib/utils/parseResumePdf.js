export const runtime = "nodejs";
import PDFParser from "pdf2json";

export default async function parseResumePdf(uint8Array) {
  try {
    if (!uint8Array || !(uint8Array instanceof Uint8Array)) {
      throw new Error("Invalid PDF data");
    }

    const buffer = Buffer.from(uint8Array);

    return await new Promise((resolve, reject) => {
      const pdfParser = new PDFParser(null, 1);

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        const text = pdfParser.getRawTextContent();
        resolve(text);
      });

      pdfParser.on("pdfParser_dataError", (err) => {
        reject(err);
      });

      pdfParser.parseBuffer(buffer);
    });
  } catch (error) {
    console.error("PDF parse error:", error);
    return { error: true };
  }
}

export const runtime = "nodejs";

export default async function parseResumePdf(uint8Array) {
  try {
    if (!uint8Array || !(uint8Array instanceof Uint8Array)) {
      throw new Error("Invalid PDF data");
    }

    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await pdfjsLib.getDocument({
      data: uint8Array,
      disableWorker: true,
      useWorkerFetch: false,
      isEvalSupported: false,
    }).promise;

    let text = "";

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();

      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

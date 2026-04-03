import { PDFParse } from "pdf-parse";

export default async function parseResumePdf(uint8Array) {
  try {
    console.log("parsing");
    const parser = new PDFParse(uint8Array);
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

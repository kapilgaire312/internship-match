export const runtime = "nodejs";

import { extractText, getDocumentProxy } from "unpdf";
export default async function parseResumePdf(uint8Array) {
  try {
    const pdf = await getDocumentProxy(uint8Array);
    const { text } = await extractText(pdf, { mergePages: true });
    return text;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

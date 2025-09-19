import { generateAndDownloadTaxInformation } from "./controller/generateAndDownloadTaxInformation";

export async function POST(req) {
  return await generateAndDownloadTaxInformation(req);
}

import { sendMail } from "./controller/sendMail";

export async function POST(req) {
  const data = await req.json();
  return await sendMail(data);
}

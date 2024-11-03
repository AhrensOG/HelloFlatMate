import { sendMail } from "./controller/sendMail";

export async function GET(req) {
    return await sendMail();
}

import { patchToDoAndSendEmail } from "./controllers/patchToDoAndSendEmail";

export async function PATCH(req) {
  const data = await req.json();

  const result = await patchToDoAndSendEmail(data);
  return result;
}

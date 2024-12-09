import { updateClient } from "./controllers/updateUserController";

export async function PUT(req) {
  const data = await req.json();
  const result = await updateClient(data);

  return result;
}

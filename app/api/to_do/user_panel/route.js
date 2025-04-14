import { cancelToDoForUserPanel } from "./controllers/cancelToDoForUserPanel";
import { createToDoForUserPanel } from "./controllers/createToDoForUserPanel";

export async function POST(req) {
  const data = await req.json();
  const result = await createToDoForUserPanel(data);
  return result;
}

export async function PATCH(req) {
  const data = await req.json();
  const result = await cancelToDoForUserPanel(data);
  return result;
}

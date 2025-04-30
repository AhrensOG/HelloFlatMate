import { cancelToDoForUserPanel } from "./controllers/cancelToDoForUserPanel";
import { createToDoForUserPanel } from "./controllers/createToDoForUserPanel";
import { getToDosForUserPanel } from "./controllers/getToDosForUserPanel";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const result = await getToDosForUserPanel(id);
  return result;
}

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

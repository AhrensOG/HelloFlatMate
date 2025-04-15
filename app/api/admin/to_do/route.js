import { getAllToDosForAdminPanel } from "./controllers/getAllToDosForAdminPanel";
import { updateToDo } from "./controllers/updateToDoController";

export async function PATCH(req) {
  const data = await req.json();
  const result = await updateToDo(data);
  return result;
}

export async function GET() {
  const result = await getAllToDosForAdminPanel();
  return result;
}

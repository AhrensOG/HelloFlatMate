import { createToDo } from "./controllers/createToDoController";
import { deleteToDo } from "./controllers/deleteToDoController";
import { fullUpdateToDo } from "./controllers/fullUpdateToDoController";
import { getAllToDosForAdminPanel } from "./controllers/getAllToDosForAdminPanel";
import { updateToDo } from "./controllers/updateToDoController";

export async function POST(req) {
  const data = await req.json();
  const result = await createToDo(data);
  return result;
}

export async function PATCH(req) {
  const data = await req.json();
  const result = await updateToDo(data);
  return result;
}

export async function GET() {
  const result = await getAllToDosForAdminPanel();
  return result;
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const result = await deleteToDo(id);
  return result;
}

export async function PUT(req) {
  const data = await req.json();
  const result = await fullUpdateToDo(data);
  return result;
}

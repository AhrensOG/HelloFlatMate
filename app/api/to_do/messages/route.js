import { createToDoMessage } from "./controllers/createToDoMessage";
import { getToDoMessagesByToDoId } from "./controllers/getToDoMessagesByToDoId";

export async function POST(req) {
  const data = await req.json();
  const result = await createToDoMessage(data);
  return result;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const toDoId = searchParams.get("toDoId");

  const result = await getToDoMessagesByToDoId(toDoId);
  return result;
}
import { getAllToDosForIncidencePanel } from "./controllers/getAllToDosForIncidencePanel";

export async function GET() {
  const result = await getAllToDosForIncidencePanel();
  return result;
}

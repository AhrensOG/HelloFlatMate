import { createIncidence } from "./controller/createIncidence";
import { editIncidence } from "./controller/editIncidence";
import { getIncidences } from "./controller/getIncidences";

export async function POST(req) {
    const data = await req.json();
    const result = await createIncidence(data);
    return result;
}

export async function GET() {
    const result = await getIncidences();
    return result;
}

export async function PUT(req) {
  const data = await req.json();
  const result = await editIncidence(data);
  return result;
}
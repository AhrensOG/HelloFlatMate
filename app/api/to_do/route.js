import { createToDo } from "./controllers/createToDoController";
import { getAllAvailableToDos, getAllToDos, getToDoById, getToDosByPropertyId, getToDosByUserId } from "./controllers/getToDoController";
import { asignToWorker, asingPrice, changeStatus } from "./controllers/updateTodoController";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    const propertyId = searchParams.get("propertyId");
    const status = searchParams.get("status");

    if (id) {
        const result = await getToDoById(id);
        return result;
    }

    if (userId) {
        const result = await getToDosByUserId(userId);
        return result;
    }

    if (propertyId) {
        const result = await getToDosByPropertyId(propertyId);
        return result;
    }

    if (status === "available") {
        const result = await getAllAvailableToDos(status);
        return result;
    }

    const result = await getAllToDos();
    return result;
}

export async function POST(req) {
    const data = await req.json();
    const result = await createToDo(data);
    return result;
}

export async function PATCH(req) {
    const searchParams = new URL(req.url).searchParams;
    const type = searchParams.get("type");
    const data = await req.json();
    if (type === "asing") {
        const result = await asignToWorker(data);
        return result;
    }
    if (type === "price") {
        const result = await asingPrice(data);
        return result;
    }
    const result = await changeStatus(data);
    return result;
}

import { createToDo } from "./controllers/createToDoController"
import { getAllToDos, getToDoById, getToDosByPropertyId, getToDosByUserId } from "./controllers/getToDoController"
import { updateToDo } from "./controllers/updateToDoController"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')

    if (id) {
        const result = await getToDoById(id)
        return result
    }

    if (userId) {
        const result = await getToDosByUserId(userId)
        return result
    }

    if (propertyId) {
        const result = await getToDosByPropertyId(propertyId)
        return result
    }

    const result = await getAllToDos()
    return result
}

export async function POST(req) {
    const data = await req.json()
    const result = await createToDo(data)
    return result
}

export async function PATCH(req) {
    const data = await req.json()
    const result = await updateToDo(data)
    return result
}
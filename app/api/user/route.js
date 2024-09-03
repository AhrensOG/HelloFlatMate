import { getUserById } from "./controllers/getUsersController"
import { updateClient, updateSignarute } from "./controllers/updateUserController"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
        const result = await getUserById(id)
        return result
    }
}

export async function PUT(req) {
    const data = await req.json()
    const result = await updateClient(data)

    return result
}

export async function PATCH(req) {
    const data = await req.json()

    if (data.signature) {
        const result = await updateSignarute(data)
        return result
    }
}

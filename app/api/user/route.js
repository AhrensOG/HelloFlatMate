import { getAllUsers, getUserById, getUsersByRole } from "./controllers/getUsersController"
import { deleteUser, updateClient, updateRoleUser } from "./controllers/updateUserController"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const role = searchParams.get('role')

    if (id) {
        const result = await getUserById(id)
        return result
    }

    if (role) {
        const result = await getUsersByRole(role)
        return result
    }

    const result = await getAllUsers()
    return result
}

export async function PUT(req) {
    const data = await req.json()

    const result = await updateClient(data)

    return result
}

export async function PATCH(req) {
    const data = await req.json()

    const result = await updateRoleUser(data)

    return result
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const result = await deleteUser(id)
    return result
}
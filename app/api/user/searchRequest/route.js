import { createSearchRequest } from "./controllers/createSearchRequestController"

export async function POST(req) {
    const data = await req.json()
    const result = await createSearchRequest(data)

    return result
}

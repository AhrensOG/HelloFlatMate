import { register } from "./register/route";

export async function POST(req) {
    return await register(req);
}
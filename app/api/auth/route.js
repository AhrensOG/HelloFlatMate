import login from "./login/login";


export async function POST(req) {
    return await login(req)
}
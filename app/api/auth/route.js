const login = require("./login/login.js");


export async function POST(req) {
    return login(req)
}
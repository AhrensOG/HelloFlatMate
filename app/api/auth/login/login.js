const Client = require("../../../../db/models/client.js");
import { NextResponse } from "next/server";


const login = async (req) => {
    try {
        const body = await req.json();
        console.log(body)
        const user = await Client.findOne({ where: { email: body.email } });

        if (user) {
            return NextResponse.json({ message: "Logueado" }, { status: 200 });
        } else {
            await Client.create({
                id: body.id,
                name: body.name,
                lastName: body.name,
                email: body.email,
                profilePicture: body.profile_picture,
                role: "CLIENT",
            });
            return NextResponse.json({ message: "Usuario creado con éxito" }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

module.exports = login
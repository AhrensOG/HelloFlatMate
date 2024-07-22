import { NextResponse } from "next/server";
import client from "@/db/models/client";

export async function register(req) {

    try {
        const body = await req.json();
        client.create({
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            profilePicture: body.profile_picture,
            role: "CLIENT",
            idNum: body.id_num,
            age: body.age,
            phone: body.phone,
            city: body.city,
            street: body.street,
            streetNumber: body.street_number,
            postalCode: body.postal_code,
            signature: body.signature
        })

        return NextResponse.json({ message: "Usuario creado con éxito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}
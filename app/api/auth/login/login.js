import { Client } from "@/db/init";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Importa cookies si estás usando Next.js 13+

const login = async (req) => {
  try {
    const body = await req.json();
    const user = await Client.findOne({ where: { email: body.email } });

    console.log(accesToken);
    if (user) {
      // Aquí se podría establecer una cookie si el usuario existe
      const accesToken = body.accessToken
      console.log(accesToken);

      const cookieStore = cookies();
      cookieStore.set('auth_token', accesToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie

      return NextResponse.json(user, { status: 200 });
    } else {
      const newUser = await Client.create({
        id: body.id,
        name: body.name,
        lastName: body.name,
        email: body.email,
        profilePicture: body.profile_picture,
        role: "CLIENT",
      });

      // Después de crear el usuario, también se puede establecer la cookie
      const authToken = body.accessToken; // Genera o usa un token real
      const cookieStore = cookies();
      cookieStore.set('auth_token', authToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie

      return NextResponse.json(newUser, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export default login;

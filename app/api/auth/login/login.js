import { Client } from "@/db/init";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Función para codificar role y accessToken en un solo token
function encodeToken(role, accessToken) {
  const tokenPayload = JSON.stringify({ role, accessToken });
  return Buffer.from(tokenPayload).toString('base64');
}

const login = async (req) => {
  try {
    const body = await req.json();
    const user = await Client.findOne({ where: { email: body.email } });

    if (user) {
      // Codificar el role y accessToken en un solo token
      const authToken = encodeToken(user.role, body.accessToken);

      // Establecer la cookie con el token codificado
      const cookieStore = cookies();
      cookieStore.set('auth_token', authToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie por 24 horas

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

      // Codificar el role y accessToken en un solo token
      const authToken = encodeToken(newUser.role, body.accessToken);

      // Establecer la cookie con el token codificado
      const cookieStore = cookies();
      cookieStore.set('auth_token', authToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie por 24 horas

      return NextResponse.json(newUser, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export default login;

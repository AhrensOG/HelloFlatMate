import { Chat, ChatParticipant, Client } from "@/db/init";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserById } from "../../user/controllers/getUsersController";

// Función para codificar role y accessToken en un solo token
function encodeToken(role, accessToken, userId) {
    const tokenPayload = JSON.stringify({ role, accessToken, userId });
    return Buffer.from(tokenPayload).toString("base64");
}

function parseDisplayName(displayName) {
  if (typeof displayName !== "string" || !displayName.trim()) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  const parts = displayName.trim().split(/\s+/);

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: "",
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "), // Soporta múltiples apellidos o nombre compuesto
  };
}

const login = async (req) => {
    try {
        const body = await req.json();

        const user = await (await getUserById(body.id)).json();

        if (user) {
            // Codificar el role y accessToken en un solo token
            const authToken = encodeToken(user.role, body.accessToken, user.id);

            // Establecer la cookie con el token codificado
            const cookieStore = cookies();
            cookieStore.set("auth_token", authToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie por 24 horas

            return NextResponse.json(user, { status: 200 });
        } else {
            const names = parseDisplayName(body.name);
            const newUser = await Client.create({
                id: body.id,
                name: names.firstName || "Name",
                lastName: names.lastName || "LastName",
                email: body.email,
                profilePicture: body.profile_picture,
                role: "CLIENT",
            });
            const chatSupp = await Chat.create({
                type: "SUPPORT",
            });

            const chatParticipant = await ChatParticipant.create({
                chatId: chatSupp.id,
                participantId: newUser.id,
                participantType: "CLIENT",
            });

            // Codificar el role y accessToken en un solo token
            const authToken = encodeToken(newUser.role, body.accessToken);

            // Establecer la cookie con el token codificado
            const cookieStore = cookies();
            cookieStore.set("auth_token", authToken, { maxAge: 24 * 60 * 60 }); // Establece la cookie por 24 horas

            return NextResponse.json(newUser, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export default login;

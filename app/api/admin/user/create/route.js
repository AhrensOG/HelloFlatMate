import { authAdmin } from "@/app/firebase/adminConfig";
import { NextResponse } from "next/server";
import { Client } from "@/db/init";

export async function POST(req) {
  const { email, password } = await req.json(); // Obtener el cuerpo de la solicitud

  if (!email || !password) {
    return NextResponse.json(
      { error: "Se requieren tanto el correo electrónico como la contraseña." },
      { status: 400 }
    );
  }

  try {
    const userRecord = await authAdmin.createUser({
      email: email,
      password: password,
    });

    const newUser = await Client.create({
      id: userRecord.uid,
      email: userRecord.email,
      name: "Name",
      lastName: "LastName",
      profilePicture: userRecord.photoURL || "",
      role: "CLIENT",
    });

    return NextResponse.json(
      { message: "Usuario creado exitosamente", userRecord, newUser },
      { status: 201 }
    );
  } catch (error) {
    // Manejar errores específicos de Firebase
    switch (error.code) {
      case "auth/email-already-exists":
        return NextResponse.json(
          { error: "El correo electrónico ya está en uso." },
          { status: 400 }
        );
      case "auth/invalid-email":
        return NextResponse.json(
          { error: "El formato del correo electrónico no es válido." },
          { status: 400 }
        );
      case "auth/operation-not-allowed":
        return NextResponse.json(
          {
            error:
              "La creación de cuentas con email y contraseña está deshabilitada.",
          },
          { status: 403 }
        );
      case "auth/weak-password":
        return NextResponse.json(
          { error: "La contraseña debe tener al menos 6 caracteres." },
          { status: 400 }
        );
      case "auth/too-many-requests":
        return NextResponse.json(
          {
            error:
              "Demasiados intentos de creación de usuario. Intenta más tarde.",
          },
          { status: 429 }
        );
      default:
        return NextResponse.json(
          { error: "Error inesperado. Inténtalo nuevamente." },
          { status: 500 }
        );
    }
  }
}

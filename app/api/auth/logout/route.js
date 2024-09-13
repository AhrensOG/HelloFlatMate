import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Accede a la cookieStore para eliminar la cookie
    const cookieStore = cookies();

    // Elimina la cookie 'auth_token'
    cookieStore.set("auth_token", "", { maxAge: -1 }); // maxAge negativo para eliminarla

    // Retorna una respuesta indicando que el usuario fue deslogueado
    return NextResponse.json(
      { message: "Has cerrado sesión exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ocurrió un error al cerrar sesión." },
      { status: 500 }
    );
  }
}

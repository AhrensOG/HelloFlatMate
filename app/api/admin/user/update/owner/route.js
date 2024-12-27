import { authAdmin } from "@/app/firebase/adminConfig";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    const { userId, newPassword } = await req.json(); // Extraer los datos del cuerpo

    // Validar entrada
    if (!userId || !newPassword) {
        return NextResponse.json({ error: "Se requieren el ID del usuario y la nueva contraseña." }, { status: 400 });
    }

    try {
        // Actualizar la contraseña en Firebase Authentication
        await authAdmin.updateUser(userId, { password: newPassword });

        return NextResponse.json({ message: "Contraseña actualizada exitosamente." }, { status: 200 });
    } catch (error) {
        // Manejar errores específicos de Firebase
        switch (error.code) {
            case "auth/user-not-found":
                return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
            case "auth/weak-password":
                return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
            case "auth/invalid-uid":
                return NextResponse.json({ error: "El ID de usuario proporcionado no es válido." }, { status: 400 });
            case "auth/operation-not-allowed":
                return NextResponse.json({ error: "La actualización de contraseñas está deshabilitada." }, { status: 403 });
            default:
                console.error("Error al actualizar contraseña:", error);
                return NextResponse.json({ error: "Error inesperado al actualizar la contraseña." }, { status: 500 });
        }
    }
}

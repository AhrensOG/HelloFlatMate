import { authAdmin } from "@/app/firebase/adminConfig";
import { Admin, Client, Owner, Worker } from "@/db/init";
import { NextResponse } from "next/server";
import { updateRoleUser } from "../controllers/updateUserController";

export async function PATCH(req) {
    const user = await req.json(); // Obtener los datos de la solicitud

    if (!user.userId) {
        return NextResponse.json({ error: "Se requieren el ID del usuario" }, { status: 400 });
    }

    try {
        // Actualizar la contraseña en Firebase Authentication
        if (user.password?.length > 0) {
            await authAdmin.updateUser(user.userId, { password: user.password });
        }

        let selectUser;
        const MODELS = { CLIENT: Client, OWNER: Owner, ADMIN: Admin, WORKER: Worker };
        if (user.changeRol) {
            const res = await updateRoleUser({ id: user.userId, role: user.rol });
            const resJson = await res.json();
            if (resJson?.user) {
              const selectedModel = MODELS[resJson.user?.role];
              selectUser = await selectedModel.findByPk(resJson.user?.id);
            }
        }
        if (!selectUser) {
            switch (user.rol) {
                case "ADMIN":
                    selectUser = await Admin.findByPk(user.userId);
                    break;
                case "CLIENT":
                    selectUser = await Client.findByPk(user.userId);
                    break;
                case "OWNER":
                    selectUser = await Owner.findByPk(user.userId);
                case "WORKER":
                selectUser = await Worker.findByPk(user.userId);
                default:
                    break;
            }
        }

        if (!selectUser) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        selectUser.name = user?.name;
        selectUser.lastName = user?.lastName;
        selectUser.idNum = user?.dni;
        selectUser.email = user?.email;
        selectUser.role === "OWNER" ? (selectUser.IBAN = user?.IBAN) : null;
        await selectUser.save();
        return NextResponse.json({ message: "Contraseña actualizada exitosamente" }, { status: 200 });
    } catch (error) {
        // Manejar errores específicos de Firebase
        switch (error.code) {
            case "auth/user-not-found":
                return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
            case "auth/weak-password":
                return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
            default:
                console.error("Error al actualizar contraseña:", error);
                return NextResponse.json({ error: "Error inesperado al actualizar la contraseña.", error_message: error }, { status: 500 });
        }
    }
}

import { authAdmin } from "@/app/firebase/adminConfig";
import { NextResponse } from "next/server";
import { Owner, Property } from "@/db/init";
import { sequelize } from "@/db/models/comment";

/**
 * Crear un Owner usando Firebase Auth para autenticación
 * y registrarlo en la base de datos.
 */
export async function createOwner(data) {
    if (!data) {
        return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    if (!data.email || !data.password) {
        return NextResponse.json({ error: "Email y contraseña son obligatorios." }, { status: 400 });
    }

    if (!data.name || !data.lastName) {
        return NextResponse.json({ error: "El nombre y apellido son obligatorios." }, { status: 400 });
    }

    let transaction;

    try {
        // Iniciar la transacción
        transaction = await sequelize.transaction();

        // Crear usuario en Firebase Authentication
        const userRecord = await authAdmin.createUser({
            email: data.email,
            password: data.password,
        });

        console.log("Usuario creado en Firebase:", userRecord);

        // Crear registro en la base de datos con el UID de Firebase
        const owner = await Owner.create(
            {
                id: userRecord.uid, // Usar el UID de Firebase como ID en la DB
                name: data.name,
                lastName: data.lastName,
                email: userRecord.email,
                password: data.password, // (Opcional, podrías no almacenarla)
                idNum: data.dni || null,
                description: data.description || null,
            },
            { transaction }
        );

        // Asociar propiedades si existen
        if (data.properties && Array.isArray(data.properties) && data.properties.length > 0) {
            for (const property of data.properties) {
                await Property.update({ ownerId: userRecord.uid }, { where: { id: property.id }, transaction });
            }
        }

        // Confirmar la transacción
        await transaction.commit();

        return NextResponse.json(
            {
                message: "Owner creado correctamente",
                firebaseUser: userRecord,
                databaseUser: owner,
            },
            { status: 201 }
        );
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }

        // Manejar errores específicos de Firebase
        if (error.code) {
            switch (error.code) {
                case "auth/email-already-exists":
                    return NextResponse.json({ error: "El correo electrónico ya está en uso." }, { status: 400 });
                case "auth/invalid-email":
                    return NextResponse.json({ error: "El formato del correo electrónico no es válido." }, { status: 400 });
                case "auth/weak-password":
                    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
                default:
                    return NextResponse.json({ error: error }, { status: 500 });
            }
        }

        // Manejar errores generales
        return NextResponse.json({ error: error.message || "Error inesperado." }, { status: 500 });
    }
}

import { Client } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.clientId) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });

    const requiredFields = [
        { key: "name", message: "Se requiere el nombre" },
        { key: "lastName", message: "Se requiere el apellido" },
        { key: "idNum", message: "Se requiere el DNI" },
        { key: "phone", message: "Se requiere el teléfono" },
        { key: "country", message: "Se requiere la ciudad" },
        { key: "reasonForValencia", message: "Se requiere razón para vivir en Valencia" },
        { key: "personalReview", message: "Se requiere una reseña personal" },
    ];

    for (const field of requiredFields) {
        if (!data[field.key] || data[field.key].trim().length < 1) {
            return NextResponse.json({ error: field.message }, { status: 400 });
        }
    }

    // Validar formato de fecha de nacimiento
    if (data.birthDate && isNaN(Date.parse(data.birthDate))) {
        return NextResponse.json({ error: "Formato de fecha de nacimiento inválido" }, { status: 400 });
    }

    // Iniciar transacción
    const transaction = await Client.sequelize.transaction();

    try {
        // Buscar cliente por ID
        const user = await Client.findByPk(data.clientId);
        if (!user) {
            await transaction.rollback();
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Actualizar campos existentes
        const fieldsToUpdate = [
            "name",
            "lastName",
            "idNum",
            "phone",
            "country",
            "reasonForValencia",
            "reasonForValenciaOther",
            "personalReview",
            "birthDate",
        ];

        for (const field of fieldsToUpdate) {
            if (data[field] !== undefined) {
                user[field] = data[field];
            }
        }

        await user.save({ transaction });

        // Confirmar transacción
        await transaction.commit();

        return NextResponse.json({ message: "Usuario actualizado con éxito", user }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

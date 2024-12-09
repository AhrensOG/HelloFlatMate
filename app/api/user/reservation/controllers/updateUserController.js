import { Client } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.clientId) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.idNum || data.idNum.trim().length < 1) return NextResponse.json({ error: "Se requiere el DNI" }, { status: 400 });
    if (!data.phone) return NextResponse.json({ error: "Se requiere el teléfono" }, { status: 400 });
    if (!data.country || data.country.trim().length < 1) return NextResponse.json({ error: "Se requiere la ciudad" }, { status: 400 });
    if (!data.reasonForValencia || data.reasonForValencia.trim().length < 1) return NextResponse.json({ error: "Se requiere razon para vivir en valencia" }, { status: 400 });
    if (!data.personalReview || data.personalReview.trim().length < 1) return NextResponse.json({ error: "Se requiere una reseña personal" }, { status: 400 });


    // Iniciar transacción
    const transaction = await Client.sequelize.transaction();

    try {
        const user = await Client.findByPk(data.clientId);
        if (!user) {
            await transaction.rollback();
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Actualizar campos existentes
        user.name = data.name || user.name;
        user.lastName = data.lastName || user.lastName;
        user.idNum = data.idNum || user.idNum;
        user.phone = data.phone || user.phone;
        user.country = data.country || user.country;
        user.reasonForValencia = data.reasonForValencia || user.reasonForValencia;
        user.reasonForValenciaOther = data.reasonForValenciaOther || user.reasonForValenciaOther;
        user.personalReview = data.personalReview || user.personalReview;
      
        await user.save({ transaction });

        // Confirmar transacción
        await transaction.commit();

        return NextResponse.json({ message: "Usuario actualizado con éxito", user }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

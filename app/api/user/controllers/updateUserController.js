import { Client, Owner, Admin } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });

    // Iniciar transacción
    const transaction = await Client.sequelize.transaction();
    try {
        const user = await Client.findByPk(data.id);
        if (!user) {
            await transaction.rollback();
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }
        const sanitize = (value) => (value && value.trim() !== "" ? value.trim() : null);

        user.name = sanitize(data.name) ?? user.name;
        user.lastName = sanitize(data.lastName) ?? user.lastName;
        user.idNum = sanitize(data.idNum) ?? user.idNum;
        user.phone = sanitize(data.phone) ?? user.phone;
        user.city = sanitize(data.city) ?? user.city;
        user.street = sanitize(data.street) ?? user.street;
        user.streetNumber = sanitize(data.streetNumber) ?? user.streetNumber;
        user.postalCode = sanitize(data.postalCode) ?? user.postalCode;
        user.birthDate = sanitize(data.birthDate) ?? formatDate(data.birthDate);
        user.country = sanitize(data.country) ?? user.country;

        user.emergencyName = sanitize(data.emergencyName) ?? user.emergencyName;
        user.emergencyPhone = sanitize(data.emergencyPhone) ?? user.emergencyPhone;
        user.emergencyEmail = sanitize(data.emergencyEmail) ?? user.emergencyEmail;
        user.howMetUs = sanitize(data.howMetUs) ?? user.howMetUs;
        user.destinationUniversity = sanitize(data.destinationUniversity) ?? user.destinationUniversity;
        user.homeUniversity = sanitize(data.homeUniversity) ?? user.homeUniversity;
        user.arrivalDate = sanitize(data.arrivalDate) ?? formatDate(data.arrivalDate);
        user.arrivalTime = sanitize(data.arrivalTime) ?? user.arrivalTime;
        user.genre = sanitize(data.genre) ?? (user.genre || "OTHER");
        user.age = sanitize(data.age) ?? user.age;
        user.reasonForValencia = sanitize(data.reasonForValencia) ?? user.reasonForValencia;
        user.reasonForValenciaOther = sanitize(data.reasonForValenciaOther) ?? user.reasonForValenciaOther;
        user.personalReview = sanitize(data.personalReview) ?? user.personalReview;
        
        await user.save({ transaction });

        // Confirmar transacción
        await transaction.commit();

        return NextResponse.json({ message: "Usuario actualizado con éxito", user }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const formatDate = (date) => {
    if (!date || !date.includes("/")) return null;
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
};

export async function updateSignarute(data) {

    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id || data.id.trim().length < 1) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.signature || data.signature.trim().length < 1) return NextResponse.json({ error: "Se requiere la firma" }, { status: 400 });
    try {
        const user = await Client.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        user.signature = data.signature;
        await user.save();
        return NextResponse.json("Signarute actualizado", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
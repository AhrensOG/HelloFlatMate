import { Client, Owner, Admin } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.idNum || data.idNum.trim().length < 1) return NextResponse.json({ error: "Se requiere el DNI" }, { status: 400 });
    // if (typeof data.age !== 'number' || data.age < 1 || data.age > 120 || data.age < 18) return NextResponse.json({ error: "Se requiere la edad o es incorrecta" }, { status: 400 });
    if (!data.phone) return NextResponse.json({ error: "Se requiere el teléfono" }, { status: 400 });
    if (!data.city || data.city.trim().length < 1) return NextResponse.json({ error: "Se requiere la ciudad" }, { status: 400 });
    if (!data.street || data.street.trim().length < 1) return NextResponse.json({ error: "Se requiere la calle" }, { status: 400 });
    if (!data.streetNumber || data.streetNumber.trim().length < 1) return NextResponse.json({ error: "Se requiere el número" }, { status: 400 });
    if (!data.postalCode || data.postalCode.trim().length < 1) return NextResponse.json({ error: "Se requiere el Código Postal" }, { status: 400 });
    if (!data.birthDate || data.birthDate.trim().length < 1) return NextResponse.json({ error: "Se requiere la fecha de nacimiento" }, { status: 400 });
    if (!data.country || data.country.trim().length < 1) return NextResponse.json({ error: "Se requiere el nacionalidad" }, { status: 400 });

    // Validar nuevos campos
    if (!data.emergencyName && data.emergencyName.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre de emergencia" }, { status: 400 });
    if (!data.emergencyPhone) return NextResponse.json({ error: "Se requiere el teléfono de emergencia" }, { status: 400 });
    if (!data.emergencyEmail && data.emergencyEmail.trim().length < 1) return NextResponse.json({ error: "Se requiere el email de emergencia" }, { status: 400 });
    if (data.howMetUs && data.howMetUs.trim().length < 1) return NextResponse.json({ error: "Se requiere la información de cómo nos conociste" }, { status: 400 });
    if (data.destinationUniversity && data.destinationUniversity.trim().length < 1) return NextResponse.json({ error: "Se requiere la universidad de destino" }, { status: 400 });
    if (data.homeUniversity && data.homeUniversity.trim().length < 1) return NextResponse.json({ error: "Se requiere la universidad de origen" }, { status: 400 });
    if (data.arrivalDate && data.arrivalDate.trim().length < 1) return NextResponse.json({ error: "Se requiere la fecha de llegada" }, { status: 400 });
    if (data.arrivalTime && data.arrivalTime.trim().length < 1) return NextResponse.json({ error: "Se requiere la hora de llegada" }, { status: 400 });
    if (!data.genre || data.genre.trim().length < 1) return NextResponse.json({ error: "Se requiere el género" }, { status: 400 });


    // Iniciar transacción
    const transaction = await Client.sequelize.transaction();

    try {
        const user = await Client.findByPk(data.id);
        if (!user) {
            await transaction.rollback();
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        // Actualizar campos existentes
        user.name = data.name || user.name;
        user.lastName = data.lastName || user.lastName;
        user.idNum = data.idNum || user.idNum;
        // user.age = data.age || user.age;
        user.phone = data.phone || user.phone;
        user.city = data.city || user.city;
        user.street = data.street || user.street;
        user.streetNumber = data.streetNumber || user.streetNumber;
        user.postalCode = data.postalCode || user.postalCode;
        user.birthDate = formatedDate(data.birthDate) || user.birthDate;
        user.country = data.country || user.country;

        // Actualizar nuevos campos
        user.emergencyName = data.emergencyName || user.emergencyName;
        user.emergencyPhone = data.emergencyPhone || user.emergencyPhone;
        user.emergencyEmail = data.emergencyEmail || user.emergencyEmail;
        user.howMetUs = data.howMetUs || user.howMetUs;
        user.destinationUniversity = data.destinationUniversity || user.destinationUniversity;
        user.homeUniversity = data.homeUniversity || user.homeUniversity;
        user.arrivalDate = data.arrivalDate ? new Date(data.arrivalDate) : user.arrivalDate;
        user.arrivalTime = data.arrivalTime ? new Date(data.arrivalTime) : user.arrivalTime;
        user.genre = data.genre || user.genre || "OTHER";
        user.age = data.age || user.age;

        await user.save({ transaction });

        // Confirmar transacción
        await transaction.commit();

        return NextResponse.json({ message: "Usuario actualizado con éxito", user }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


const formatedDate = (date) => {
    const [day, month, year] = date.split("/");

    const newDate = `${year}-${month}-${day}`;
    return newDate;
}

export async function updateSignarute(data) {
    console.log(data);

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
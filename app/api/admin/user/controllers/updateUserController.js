import { Client, Owner, Admin, Worker } from "@/db/init";
import { sequelize } from "@/db/models/comment";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.idNum || data.idNum.trim().length < 1) return NextResponse.json({ error: "Se requiere el DNI" }, { status: 400 });
    if (typeof data.age !== 'number' || data.age < 1 || data.age > 120 || data.age < 18) return NextResponse.json({ error: "Se requiere la edad o es incorrecta" }, { status: 400 });
    if (!data.phone || data.phone.trim().length < 1) return NextResponse.json({ error: "Se requiere el teléfono" }, { status: 400 });
    if (!data.city || data.city.trim().length < 1) return NextResponse.json({ error: "Se requiere la ciudad" }, { status: 400 });
    if (!data.street || data.street.trim().length < 1) return NextResponse.json({ error: "Se requiere la calle" }, { status: 400 });
    if (!data.streetNumber || data.streetNumber.trim().length < 1) return NextResponse.json({ error: "Se requiere el número" }, { status: 400 });
    if (!data.postalCode || data.postalCode.trim().length < 1) return NextResponse.json({ error: "Se requiere el Código Postal" }, { status: 400 });
    if (!data.birthDate || data.birthDate.trim().length < 1) return NextResponse.json({ error: "Se requiere la fecha de nacimiento" }, { status: 400 });

    try {
        const user = await Client.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        user.name = data.name || user.name;
        user.lastName = data.lastName || user.lastName;
        user.idNum = data.idNum || user.idNum;
        user.age = data.age || user.age;
        user.phone = data.phone || user.phone;
        user.city = data.city || user.city;
        user.street = data.street || user.street;
        user.streetNumber = data.streetNumber || user.streetNumber;
        user.postalCode = data.postalCode || user.postalCode;
        user.birthDate = formatedDate(data.birthDate) || user.birthDate;
        await user.save();
        return NextResponse.json({ message: "Usuario actualizado con exito", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function updateOwner(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.email || data.email.trim().length < 1) return NextResponse.json({ error: "Se requiere el email" }, { status: 400 });
    if (!data.profilePicture || data.profilePicture.trim().length < 1) return NextResponse.json({ error: "Se requiere la imagen" }, { status: 400 });

    try {
        const user = await Owner.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        const updatedUser = await user.update(data);
        return NextResponse.json("Usuario actualizado", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function updateAdmin(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.email || data.email.trim().length < 1) return NextResponse.json({ error: "Se requiere el email" }, { status: 400 });
    if (!data.profilePicture || data.profilePicture.trim().length < 1) return NextResponse.json({ error: "Se requiere la imagen" }, { status: 400 });

    try {
        const user = await Admin.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        const updatedUser = await user.update(data);
        return NextResponse.json("Usuario actualizado", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function updateRoleUser(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.role) return NextResponse.json({ error: "Se requiere el rol" }, { status: 400 });

    const transaction = await sequelize.transaction();

    try {
        let user = await Client.findByPk(data.id) || await Owner.findByPk(data.id) || await Admin.findByPk(data.id, { transaction }) || await Worker.findByPk(data.id, { transaction });
        if (!user) {
            await transaction.rollback();
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        const userData = user.toJSON(); // Copia de los datos del usuario para crear uno nuevo más tarde

        let newUser;
        if (data.role === "ADMIN") {
            newUser = await Admin.create({ ...userData, role: "ADMIN" }, { transaction });
        } else if (data.role === "OWNER") {
            newUser = await Owner.create({ ...userData, role: "OWNER" }, { transaction });
        }
        else if (data.role === "CLIENT") {
            newUser = await Client.create({ ...userData, role: "CLIENT" }, { transaction });
        } else if (data.role === "WORKER") {
            newUser = await Worker.create({ ...userData, role: "WORKER" }, { transaction });
        }
        else {
            await transaction.rollback();
            return NextResponse.json({ error: "Rol no válido" }, { status: 400 });
        }

        await user.destroy({ transaction }); // Destruir el usuario original solo si la creación del nuevo fue exitosa

        await transaction.commit();

        return NextResponse.json({ message: "Rol actualizado", user: newUser }, { status: 200 });
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function deleteUser(id) {
    if (!id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });

    try {
        const user = await Client.findByPk(id) || await Owner.findByPk(id) || await Admin.findByPk(id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        user.isActive = false;
        await user.save();
        return NextResponse.json("Usuario eliminado", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const formatedDate = (date) => {
    const [day, month, year] = date.split("/");

    const newDate = `${year}-${month}-${day}`;
    return newDate;
}

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
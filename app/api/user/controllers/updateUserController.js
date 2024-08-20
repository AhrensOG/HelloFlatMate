import { Client, Owner, Admin } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateClient(data) {
    if (!data) return NextResponse.json({ error: "Se requiere el body" }, { status: 400 });
    if (!data.id) return NextResponse.json({ error: "Se requiere el id" }, { status: 400 });
    if (!data.name || data.name.trim().length < 1) return NextResponse.json({ error: "Se requiere el nombre" }, { status: 400 });
    if (!data.lastName || data.lastName.trim().length < 1) return NextResponse.json({ error: "Se requiere el apellido" }, { status: 400 });
    if (!data.email || data.email.trim().length < 1) return NextResponse.json({ error: "Se requiere el email" }, { status: 400 });
    if (!data.profilePicture || data.profilePicture.trim().length < 1) return NextResponse.json({ error: "Se requiere la imagen" }, { status: 400 });
    if (typeof data.idNum !== 'number' || data.idNum < 0) return NextResponse.json({ error: "Se requiere el DNI" }, { status: 400 });
    if (typeof data.age !== 'number' || data.age < 1 || data.age > 120 || data.age < 18) return NextResponse.json({ error: "Se requiere la edad o es incorrecta" }, { status: 400 });
    if (typeof data.phone !== 'number' || data.phone < 0) return NextResponse.json({ error: "Se requiere el teléfono" }, { status: 400 });
    if (!data.city || data.city.trim().length < 1) return NextResponse.json({ error: "Se requiere la ciudad" }, { status: 400 });
    if (!data.street || data.street.trim().length < 1) return NextResponse.json({ error: "Se requiere la calle" }, { status: 400 });
    if (typeof data.streetNumber !== 'number' || data.streetNumber < 0) return NextResponse.json({ error: "Se requiere el número" }, { status: 400 });
    if (!data.postalCode || data.postalCode.trim().length < 1) return NextResponse.json({ error: "Se requiere el Código Postal" }, { status: 400 });

    try {
        const user = await Client.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        user.name = data.name || user.name;
        user.lastName = data.lastName || user.lastName;
        user.email = data.email || user.email;
        user.profilePicture = data.profilePicture || user.profilePicture;
        user.idNum = data.idNum || user.idNum;
        user.age = data.age || user.age;
        user.phone = data.phone || user.phone;
        user.city = data.city || user.city;
        user.street = data.street || user.street;
        user.streetNumber = data.streetNumber || user.streetNumber;
        user.postalCode = data.postalCode || user.postalCode;
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

    try {
        const user = await Client.findByPk(data.id) || await Owner.findByPk(data.id) || await Admin.findByPk(data.id);
        if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        const updatedUser = await user.update({ role: data.role });
        return NextResponse.json("Rol actualizado", { status: 200 });
    } catch (error) {
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
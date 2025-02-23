import { Property } from "@/db/init";
import { NextResponse } from "next/server";

export async function deleteProperty(id) {
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }
        property.status = "DELETED";
        property.isActive = false;
        await property.save();
        return NextResponse.json({ message: "Propiedad eliminada correctamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar la propiedad" }, { status: 500 });
    }
}

export async function desactivateProperty(id) {
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }
        property.isActive = false;
        await property.save();
        return NextResponse.json({ message: "Propiedad desactivada correctamente" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al desactivar la propiedad" }, { status: 500 });
    }
}

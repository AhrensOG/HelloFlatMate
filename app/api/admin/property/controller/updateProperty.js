import { Property, RentalPeriod } from "@/db/init";
import { NextResponse } from "next/server";

export async function updateProperty(id, data) {
    console.log("DATOS: ", data);

    if (!data) {
        return NextResponse.json({ error: "El body no puede estar vacío" }, { status: 400 });
    }
    if (!id) {
        return NextResponse.json({ error: "El id no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.name || data.name.trim() === "") {
        return NextResponse.json({ error: "El nombre no puede estar vacío" }, { status: 400 });
    }
    if (!data.serial || data.serial.trim() === "") {
        return NextResponse.json({ error: "El serial no puede estar vacío" }, { status: 400 });
    }
    if (!data.city || data.city.trim() === "") {
        return NextResponse.json({ error: "La ciudad no puede estar vacío" }, { status: 400 });
    }
    if (!data.street || data.street.trim() === "") {
        return NextResponse.json({ error: "La calle no puede estar vacío" }, { status: 400 });
    }
    if (!data.streetNumber || data.streetNumber <= 0) {
        return NextResponse.json({ error: "El número no puede estar vacío" }, { status: 400 });
    }
    if (!data.postalCode || data.postalCode.trim() === "") {
        return NextResponse.json({ error: "El Código Postal no puede estar vacío" }, { status: 400 });
    }
    if (!data.size || data.size <= 0) {
        return NextResponse.json({ error: "El tamaño no puede estar vacío" }, { status: 400 });
    }
    if (!data.roomsCount || typeof data.roomsCount !== "number" || data.bedrooms <= 0) {
        return NextResponse.json({ error: "El número de habitaciones no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.bathrooms || typeof data.bathrooms !== "number" || data.bathrooms <= 0) {
        return NextResponse.json({ error: "El número de baños no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.bed || typeof data.bed !== "number" || data.bed <= 0) {
        return NextResponse.json({ error: "El número de camas no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.maximunOccupants || typeof data.maximunOccupants !== "number" || data.maximunOccupants <= 0) {
        return NextResponse.json({ error: "El número máximo de ocupantes no puede estar vacío o no es un número" }, { status: 400 });
    }
    if (!data.images || data.images.length === 0) {
        return NextResponse.json({ error: "Las imágenes no pueden estar vacías" }, { status: 400 });
    }
    if (!data.amenities || data.amenities.length === 0) {
        return NextResponse.json({ error: "Las amenidades no pueden estar vacías" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];

    if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: "La categoría no es válida" }, { status: 400 });
    }
    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
        }

        //Actualizar las fechas
        if (data.rentalPeriods.length > 0) {
            data.rentalPeriods.forEach(async (rentalPeriod) => {
                await RentalPeriod.update(rentalPeriod, {
                    where: {
                        id: rentalPeriod.id
                    }
                })
            })
        }

        //Crear nuevas fechas
        if (data.newRentalPeriods.length > 0) {
            data.newRentalPeriods.forEach(async (rentalPeriod) => {
                await RentalPeriod.create({ startDate: new Date(rentalPeriod.startDate), endDate: new Date(rentalPeriod.endDate), rentalPeriodableId: property.id, rentalPeriodableType: "PROPERTY" })
            })
        }

        //Borrar fechas
        if (data.deleteRentalPeriods.length > 0) {
            data.deleteRentalPeriods.forEach(async (rentalPeriod) => {
                await RentalPeriod.destroy({
                    where: {
                        id: rentalPeriod
                    }
                })
            })
        }

        await property.update(data);
        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
    }
}
export async function updateStatusProperty(data) {
    if (!data) {
        return NextResponse.json({ error: "Need data" }, { status: 400 })
    }
    if (!data.propertyId || data.propertyId.trim() === "") {
        return NextResponse.json({ error: "Need propertyId" }, { status: 400 })
    }
    if (!data.status || data.status.trim() === "") {
        return NextResponse.json({ error: "Need status" }, { status: 400 })
    }
    if (!data.status || data.status !== "FREE" && data.status !== "RESERVED" && data.status !== "OCCUPIED") {
        return NextResponse.json({ error: "Status not valid" }, { status: 400 })
    }

    const property = await Property.findByPk(data.propertyId);
    if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }
    if (property.status === "RESERVED" && data.status === "RESERVERD") {
        return NextResponse.json({ error: "Property already reserved" }, { status: 400 })
    }
    property.status = data.status;
    await property.save();
    return NextResponse.json(property, { status: 200 })
}

export async function cascadeUpdateByCategory(data) {
    if (!data) {
        return NextResponse.json({ error: "Need data" }, { status: 400 });
    }
    if (!data.categories || data.categories.length === 0) {
        return NextResponse.json({ error: "Need categories" }, { status: 400 });
    }

    const validCategories = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD"];

    // Validar que las categorías sean válidas
    if (data.categories.some(category => !validCategories.includes(category))) {
        return NextResponse.json({ error: "Category not valid" }, { status: 400 });
    }

    try {
        const transaction = await sequelize.transaction();
        try {
            // Iterar sobre las categorías y realizar las actualizaciones
            for (const category of data.categories) {
                const properties = await Property.findAll({ where: { category }, transaction });

                const accData = data.map(({ category, ...rest }) => rest);
                // Ejecutar las actualizaciones en paralelo usando Promise.all
                await Promise.all(
                    properties.map(property =>
                        property.update({ ...accData }, { transaction })
                    )
                );
            }

            // Si todo va bien, confirmar la transacción
            await transaction.commit();
            return NextResponse.json({ message: "Update successful" }, { status: 200 });
        } catch (error) {
            // Si ocurre un error, deshacer la transacción
            await transaction.rollback();
            console.error(error);
            return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al iniciar la transacción" }, { status: 500 });
    }
}

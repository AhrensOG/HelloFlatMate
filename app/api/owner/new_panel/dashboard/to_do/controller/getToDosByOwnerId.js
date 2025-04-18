import { Client, Property, ToDo } from "@/db/init";

export async function getToDosByOwnerId(ownerId) {
  try {
    // Paso 1: Obtener todas las propiedades del owner
    const rawProperties = await Property.findAll({
      where: { ownerId },
      attributes: ["id"],
    });

    const properties = rawProperties.map((prop) => prop.get({ plain: true }));

    const propertyIds = properties.map((prop) => prop.id);

    if (propertyIds.length === 0) {
      return Response.json([], { status: 200 });
    }

    const rawToDos = await ToDo.findAll({
      where: {
        propertyId: propertyIds,
      },
      include: [
        {
          model: Property,
          as: "property",
          attributes: [
            "serial",
            "street",
            "streetNumber",
            "postalCode",
            "city",
          ],
        },
        {
          model: Client,
          as: "client",
          attributes: ["name", "lastName", "phone", "email"],
        },
      ],
    });

    const toDos = rawToDos.map((todo) => todo.get({ plain: true }));

    return Response.json(toDos, { status: 200 });
  } catch (error) {
    console.error("Error in getToDosByOwnerId:", error);
    return Response.json(
      { error: "Error al obtener tareas del propietario" },
      { status: 500 }
    );
  }
}

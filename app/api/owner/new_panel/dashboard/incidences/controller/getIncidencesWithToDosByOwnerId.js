import { Client, Incidence, Property, ToDo } from "@/db/init";

export async function getIncidencesWithToDosByOwnerId(ownerId) {
  try {
    const rawIncidences = await Incidence.findAll({
      where: { ownerId },
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
      ],
    });

    const incidences = rawIncidences.map((inc) => inc.get({ plain: true }));

    const toDoIds = incidences
      .filter((inc) => inc.toDoId)
      .map((inc) => inc.toDoId);

    let toDosMap = {};

    if (toDoIds.length > 0) {
      const rawToDos = await ToDo.findAll({
        where: { id: toDoIds },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["name", "lastName", "phone", "email"],
          },
        ],
      });

      const toDos = rawToDos.map((todo) => todo.get({ plain: true }));

      toDosMap = toDos.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
    }

    const enrichedIncidences = incidences.map((inc) => ({
      ...inc,
      toDo: inc.toDoId ? toDosMap[inc.toDoId] || null : null,
    }));

    return Response.json(enrichedIncidences, { status: 200 });
  } catch (error) {
    console.error("Error in getIncidencesWithToDosByOwnerId:", error);
    return Response.json(
      { error: "Error al obtener incidencias" },
      { status: 500 }
    );
  }
}

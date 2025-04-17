import { Client, Incidence, ToDo } from "@/db/init";

export async function getIncidencesWithToDosByOwnerId(ownerId) {
  try {
    const incidences = await Incidence.findAll({
      where: { ownerId },
      raw: true,
    });

    const toDoIds = incidences
      .filter((inc) => inc.toDoId)
      .map((inc) => inc.toDoId);

    let toDosMap = {};

    if (toDoIds.length > 0) {
      const toDos = await ToDo.findAll({
        where: { id: toDoIds },
        include: [
          {
            model: Client,
            as: "client",
            attributes: ["name", "lastName", "phone", "email"]
          }
        ]
      });

      toDosMap = toDos.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
    }

    // Agregar la propiedad .toDo si tiene toDoId
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

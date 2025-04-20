const { ToDo } = require("@/db/init");
const { NextResponse } = require("next/server");

export async function deleteToDo(id) {
  try {
    await ToDo.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Tarea eliminada con éxito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la tarea" },
      { status: 500 }
    );
  }
}

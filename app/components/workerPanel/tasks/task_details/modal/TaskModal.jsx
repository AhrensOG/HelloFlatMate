import { useState } from "react";

export default function TaskModal({ type, action, showModal }) {
  // Estado para el valor del textarea
  const [comment, setComment] = useState("");

  // Función para manejar el cambio en el textarea
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#A1A0A066] z-50 backdrop-blur-sm">
      <aside className="bg-white p-6 rounded-lg w-72 z-50">
        <h2 className="font-semibold mb-4 text-center text-base">
          {type === "problem"
            ? "Reportar problema"
            : "¿Completaste la tarea con éxito?"}
        </h2>
        <form action="">
          <label
            className={`${
              type === "problem" ? "hidden" : ""
            } block text-sm font-medium text-gray-700 text-center`}
            htmlFor="report"
          >
            Reporte de la tarea
          </label>
          <textarea
            className="border border-gray-300 rounded-lg font-light text-base text-gray-900 w-full p-2 mt-2 mb-4"
            id="report"
            name="report"
            rows="4"
            value={comment} // Asignar el estado como valor
            onChange={handleCommentChange} // Actualizar el estado al cambiar
          ></textarea>
          <div className="flex justify-center items-center gap-2 space-x-4">
            <button
              onClick={() => showModal(false)}
              className="font-bold text-sm text-gray-800 bg-gray-300 w-24 h-10 flex justify-center items-center rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={
                () =>
                  type === "problem"
                    ? action(comment, "PENDING") // Reportar problema con estado "PENDING"
                    : action(comment, "COMPLETED") // Completar tarea con estado "COMPLETED"
              }
              className="font-bold text-sm text-white bg-blue-700 w-24 h-10 flex justify-center items-center rounded-lg"
            >
              Confirmar
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}

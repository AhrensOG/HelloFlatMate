import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "sonner";

const TYPE_LABELS = {
    OTHER: "Otros",
};

const IncidencesTable = ({ incidences, loading, error, onDelete, onEdit }) => {
    if (loading) {
        return (
            <p className="text-center text-gray-500 p-4">
                Cargando incidencias...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-500 p-4">
                Error al cargar incidencias.
            </p>
        );
    }

    if (!incidences || incidences.length === 0) {
        return (
            <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-white">
                    <tr>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            ID
                        </th>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            Tipo
                        </th>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            Propiedad
                        </th>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            Propietario
                        </th>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            Fecha
                        </th>
                        <th className="border p-2 text-center font-semibold text-gray-700">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            colSpan="6"
                            className="border p-4 text-center text-gray-500"
                        >
                            No hay incidencias registradas.
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white">
                <tr>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        ID
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Propietario
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Propiedad
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Título
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Descripción
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Importe
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Tipo
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Fecha
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Factura
                    </th>
                    <th className="border p-2 text-center font-semibold text-gray-700">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {incidences?.map((incidence) => (
                    <tr key={incidence.id} className="hover:bg-gray-50">
                        <td className="border p-2 text-center">
                            {incidence.id}
                        </td>
                        <td className="border p-2 text-start">
                            {incidence.owner?.name +
                                " " +
                                incidence.owner?.lastName}
                        </td>
                        <td className="border p-2 text-center">
                            {incidence.property?.serial || "-"}
                        </td>
                        <td className="border p-2 text-center">
                            {incidence.title}
                        </td>
                        <td className="border p-2 text-center">
                            {incidence.description}
                        </td>
                        <td className="border p-2 text-center">
                            {incidence.amount} €
                        </td>
                        <td className="border p-2 text-center">
                            {TYPE_LABELS[incidence.type]}
                        </td>
                        <td className="border p-2 text-center">
                            {new Date(incidence.date).toLocaleDateString(
                                "es-ES"
                            )}
                        </td>
                        <td className="border p-2 text-center">
                            {incidence.url ? (
                                <a
                                    href={incidence.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Ver archivo
                                </a>
                            ) : (
                                "-"
                            )}
                        </td>
                        <td className="border p-2 text-gray-700 text-center">
                            <div className="w-full h-full flex gap-2 items-center justify-around">
                                <button onClick={() => onEdit(incidence)}>
                                    <PencilIcon
                                        title="Edición"
                                        className="size-6 text-green-500"
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        toast("Eliminar incidencia", {
                                            action: {
                                                label: "Confirmar",
                                                onClick: () => {
                                                    onDelete(incidence.id);
                                                },
                                            },
                                        })
                                    }
                                >
                                    <TrashIcon
                                        title="Eliminar"
                                        className="size-6 text-red-500"
                                    />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default IncidencesTable;

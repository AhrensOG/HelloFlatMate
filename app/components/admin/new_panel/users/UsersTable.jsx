import React from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";

const UsersTable = ({ filteredUsers, handleOpenModal, handleOpenModalEdit, handleOpenOrdersModal, handleOpenPaysModal }) => {
    return (
        <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
            <table className="min-w-full border-collapse">
            <thead className="sticky top-0 bg-white">
                <tr>
                    {/* <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">ID</th> */}
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Usuario</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Email</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">País</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Fecha Nac.</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Razón</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Tel.</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Ordenes</th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700"> Pagos </th>
                    <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-24">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((user) => (
                    <tr
                        key={user.id}
                        className="hover:bg-gray-100 even:bg-gray-50 transition-couserrs cursor-pointer"
                        onClick={() => handleOpenModal(user)}
                    >
                        {/* <td className="border p-2 text-gray-700 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-20">{user.id}</td> */}
                        <td className="border p-2 text-gray-700 text-start">{`${user.name} ${user.lastName}`}</td>
                        <td className="border p-2 text-gray-700 text-center">
                            {user.email}
                        </td>
                        <td className="border p-2 text-gray-700 text-center">{user.country}</td>
                        <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(user.birthDate)}</td>
                        <td className="border p-2 text-gray-700 text-center">
                            {user.reasonForValencia} {user.reasonForValenciaOther && `(${user.reasonForValenciaOther})`}
                        </td>
                        <td className="border p-2 text-gray-700 text-center">{user.phone}</td>
                        <td
                            className="border p-2 text-gray-700 text-center hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenOrdersModal(user);
                            }}
                        >
                            Ver mas
                        </td>
                        <td
                            className="border p-2 w-28 text-gray-700 text-center hover:underline"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPaysModal(user);
                            }}
                        >
                            Ver mas
                        </td>
                        <td className="border p-2 text-gray-700 text-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenModalEdit(user);
                                }}
                                className="bg-green-500 text-white px-2 py-1 rounded w-full h-full"
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default UsersTable;

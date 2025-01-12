"use client";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import CreateUserModal from "../../users_panel/CreateUserModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function UsersPanel({ allUsers = [], properties = [] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpenCreatUserModal, setIsOpenCreatUserModal] = useState(false);

    // Usar SWR para obtener las órdenes
    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/user", fetcher, {
        fallbackData: allUsers,
        refreshInterval: 60000,
    });

    const users = [...swrData.clients, ...swrData.admins, ...swrData.owners, ...swrData.workers];
    // Filtrar ó rdenes
    const filteredUsers = (users || []).filter((user) => {
        const clientName = user.name || "";
        const clientLastName = user.lastName || "";
        const clientEmail = user.email || "";

        let roleEs = "";
        if (user.role === "CLIENT") roleEs = "cliente";
        if (user.role === "ADMIN") roleEs = "administrador";
        if (user.role === "WORKER") roleEs = "trabajador";
        if (user.role === "OWNER") roleEs = "propietario";

        const searchString = searchQuery.toLowerCase();

        return (
            clientName.toLowerCase().includes(searchString) ||
            clientLastName.toLowerCase().includes(searchString) ||
            clientEmail.toLowerCase().includes(searchString) ||
            roleEs.toLowerCase().includes(searchString)
        );
    });

    const handleOpenModal = (lo) => {
        setSelectedUser(lo);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsOpen(false);
    };

    const handleOpenModalEdit = (lo) => {
        setSelectedUser(lo);
        setIsOpenEdit(true);
    };

    const handleCloseModalEdit = () => {
        setSelectedUser(null);
        setIsOpenEdit(false);
    };

    const handleOpenModalCreate = () => {
        setIsOpenCreatUserModal(true);
    };

    const handleCloseModalCreate = () => {
        setIsOpenCreatUserModal(false);
    };

    // Función para manejar la actualización de una reserva
    const handleUpdateOrder = async (updatedOrder) => {
        try {
            await axios.put(`/api/admin/lease_order`, updatedOrder); // Llama a tu API para actualizar
            toast.success("Orden actualizada correctamente!");
            mutate(); // Actualiza los datos en caché
            handleCloseModalEdit(); // Cierra el modal de edición
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error al actualizar la orden.");
        }
    };

    if (error) return <div>Error al cargar las reservas.</div>;

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Usuarios</h2>
                <div className="w-full flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido, email o rol..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
                        className="border rounded px-3 py-2 w-96"
                    />

                    <button
                        onClick={handleOpenModalCreate}
                        className="w-[10rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center"
                    >
                        Crear Usuario
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg">
                <UsersTable filteredUsers={filteredUsers} handleOpenModal={handleOpenModal} handleOpenModalEdit={handleOpenModalEdit} />
            </div>

            {isOpen && <UserModal user={selectedUser} onClose={handleCloseModal} />}
            {isOpenCreatUserModal && <CreateUserModal onClose={handleCloseModalCreate} data={properties} />}
        </div>
    );
}

"use client";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { toast } from "sonner";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import CreateUserModal from "./CreateUserModal";
import SkeletonLoader from "../SkeletonLoader";
import UpdateUserModal from "./UpdateUserModal";
import OrdersModal from "./OrdersModal";
import PaysModal from "./PaysModal";
import { addLeaseOrderToPayments } from "../utils/addLeaseOrderToPayments";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function UsersPanel({
    properties = [],
    orders = [],
    allLeaseOrders = [],
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpenCreatUserModal, setIsOpenCreatUserModal] = useState(false);
    const [isOpenOrdesModal, setIsOpenOrdesModal] = useState(false);
    const [isPaysModal, setIsPaysModal] = useState(false);
    const [pays, setPays] = useState(null);
    const [ordersUser, setOrdersUser] = useState(null);
    
    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/user", fetcher, {
        refreshInterval: 180000,
    });


    const usersWithLeaseOrderDataInPayment = swrData && addLeaseOrderToPayments(
        swrData,
        allLeaseOrders
    );
    const users = usersWithLeaseOrderDataInPayment && [
        ...usersWithLeaseOrderDataInPayment.clients,
        ...usersWithLeaseOrderDataInPayment.admins,
        ...usersWithLeaseOrderDataInPayment.owners,
        ...usersWithLeaseOrderDataInPayment.workers,
    ];
    // Filtrar ó rdenes
    const filteredUsers = (users || []).filter((user) => {
        const clientName = user.name || "";
        const clientLastName = user.lastName || "";
        const clientEmail = user.email || "";
        const fullname = `${clientName} ${clientLastName}`;

        let roleEs = "";
        if (user.role === "CLIENT") roleEs = "cliente";
        if (user.role === "ADMIN") roleEs = "administrador";
        if (user.role === "WORKER") roleEs = "trabajador";
        if (user.role === "OWNER") roleEs = "propietario";

        const searchString = searchQuery.toLowerCase();

        return (
            fullname.toLowerCase().includes(searchString) ||
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

    const handleOpenModalOrders = (user) => {
        const ordersFiltered = orders.filter(
            (order) => order.clientId === user.id
        );

        setOrdersUser(ordersFiltered);
        setIsOpenOrdesModal(true);
    };

    const handleCloseModalOrders = () => {
        setIsOpenOrdesModal(false);
    };

    const handleOpenModalPays = (user) => {
        setPays([...user.rentPayments, ...user.supplies]);
        setIsPaysModal(true);
    };

    const handleCloseModalPays = () => {
        setIsPaysModal(false);
    };

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

            <UsersTable
                filteredUsers={filteredUsers}
                handleOpenModal={handleOpenModal}
                handleOpenModalEdit={handleOpenModalEdit}
                handleOpenOrdersModal={handleOpenModalOrders}
                handleOpenPaysModal={handleOpenModalPays}
            />

            {isOpen && (
                <UserModal user={selectedUser} onClose={handleCloseModal} />
            )}
            {isOpenCreatUserModal && (
                <CreateUserModal
                    action={handleCloseModalCreate}
                    options_1={properties}
                    mutate={mutate}
                />
            )}
            {isOpenEdit && (
                <UpdateUserModal
                    user={selectedUser}
                    onClose={handleCloseModalEdit}
                    mutate={mutate}
                />
            )}
            {isOpenOrdesModal && (
                <OrdersModal
                    data={ordersUser}
                    onClose={handleCloseModalOrders}
                />
            )}
            {isPaysModal && (
                <PaysModal data={pays} onClose={handleCloseModalPays} />
            )}
        </div>
    );
}

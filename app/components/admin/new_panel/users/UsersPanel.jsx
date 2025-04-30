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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function UsersPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenCreatUserModal, setIsOpenCreatUserModal] = useState(false);
  const [isOpenOrdesModal, setIsOpenOrdesModal] = useState(false);
  const [isPaysModal, setIsPaysModal] = useState(false);
  const [pays, setPays] = useState(null);
  const [ordersForPaysModal, setOrdersForPaysModal] = useState(null);
  const [ordersUser, setOrdersUser] = useState(null);

  const {
    data: swrData,
    error,
    mutate,
  } = useSWR("/api/admin/user/users_panel", fetcher, {
    refreshInterval: 180000,
  });

  const {
    data: propertiesData,
  } = useSWR("/api/admin/property/users_panel", fetcher, {
    revalidateOnFocus: false,
  });

  const users = swrData
    ? [
        ...swrData.clients,
        ...swrData.admins,
        ...swrData.owners,
        ...swrData.workers,
      ]
    : [];

  const filteredUsers = users.filter((user) => {
    const fullname = `${user.name || ""} ${user.lastName || ""}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const roleEs =
      user.role === "CLIENT"
        ? "cliente"
        : user.role === "ADMIN"
        ? "administrador"
        : user.role === "WORKER"
        ? "trabajador"
        : user.role === "OWNER"
        ? "propietario"
        : "";

    const searchString = searchQuery.toLowerCase();
    return (
      fullname.includes(searchString) ||
      email.includes(searchString) ||
      roleEs.includes(searchString)
    );
  });

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  const handleOpenModalEdit = (user) => {
    setSelectedUser(user);
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
    setOrdersUser(user.leaseOrdersRoom || []);
    setIsOpenOrdesModal(true);
  };

  const handleCloseModalOrders = () => {
    setIsOpenOrdesModal(false);
  };

  const handleOpenModalPays = (user) => {
    setPays([...(user.rentPayments || []), ...(user.supplies || [])]);
    setOrdersForPaysModal(user.leaseOrdersRoom || []);
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          options_1={propertiesData}
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
        <OrdersModal data={ordersUser} onClose={handleCloseModalOrders} />
      )}
      {isPaysModal && (
        <PaysModal data={pays} orders={ordersForPaysModal} onClose={handleCloseModalPays} />
      )}
    </div>
  );
}

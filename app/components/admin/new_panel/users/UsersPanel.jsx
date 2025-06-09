"use client";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";
import OrdersModal from "./OrdersModal";
import PaysModal from "./PaysModal";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function UsersPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(100);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [isOpenCreatUserModal, setIsOpenCreatUserModal] = useState(false);
  const [isOpenOrdesModal, setIsOpenOrdesModal] = useState(false);
  const [isPaysModal, setIsPaysModal] = useState(false);
  const [pays, setPays] = useState(null);
  const [ordersForPaysModal, setOrdersForPaysModal] = useState(null);
  const [ordersUser, setOrdersUser] = useState(null);

  const { data: usersForSearchBar } = useSWR(
    "/api/admin/user/users_panel/users_for_search",
    fetcher,
    { revalidateOnFocus: false }
  );

  const {
    data: paginatedData,
    mutate,
    isLoading,
  } = useSWR(
    `/api/admin/user/users_panel?page=${page}&limit=${limit}${
      selectedUser ? `&userId=${selectedUser.id}&role=${selectedUser.role}` : ""
    }`,
    fetcher,
    {
      refreshInterval: 180000,
      keepPreviousData: true,
    }
  );

  const { data: propertiesData } = useSWR(
    "/api/admin/property/users_panel",
    fetcher,
    { revalidateOnFocus: false }
  );

  const rawUsers = paginatedData?.users || [];
  const orderedUsers = selectedUser
    ? [
        ...rawUsers.filter((u) => u.id === selectedUser.id),
        ...rawUsers.filter((u) => u.id !== selectedUser.id),
      ]
    : rawUsers;
  const total = paginatedData?.total || 0;

  const handleOpenModal = (user) => {
    setSelectedUserModal(user);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUserModal(null);
    setIsOpen(false);
  };

  const handleOpenModalEdit = (user) => {
    setSelectedUserModal(user);
    setIsOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setSelectedUserModal(null);
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
        <div className="w-full flex gap-4 relative">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
              if (e.target.value === "") {
                setSelectedUser(null);
              }
            }}
            className="border rounded px-3 py-2 w-96"
          />
          {searchQuery && showSuggestions && (
            <ul className="absolute top-12 bg-white border rounded w-96 shadow-md max-h-[400px] overflow-y-auto z-10">
              {usersForSearchBar
                ?.filter((user) => {
                  const terms = searchQuery
                    .toLowerCase()
                    .split(" ")
                    .filter(Boolean);
                  return terms.every(
                    (term) =>
                      user.name.toLowerCase().includes(term) ||
                      user.lastName.toLowerCase().includes(term) ||
                      user.email.toLowerCase().includes(term)
                  );
                })
                .map((user) => (
                  <li
                    key={user.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setSearchQuery(`${user.name} ${user.lastName}`);
                      setPage(1);
                      setShowSuggestions(false);
                    }}>
                    {user.name} {user.lastName} - {user.email}
                  </li>
                ))}
            </ul>
          )}
          <button
            onClick={handleOpenModalCreate}
            className="w-[10rem] h-12 bg-[#0E1863] rounded-lg text-white flex justify-center items-center font-normal text-base self-center">
            Crear Usuario
          </button>
        </div>
      </div>

      <UsersTable
        filteredUsers={orderedUsers}
        handleOpenModal={handleOpenModal}
        handleOpenModalEdit={handleOpenModalEdit}
        handleOpenOrdersModal={handleOpenModalOrders}
        handleOpenPaysModal={handleOpenModalPays}
      />

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Anterior
        </button>
        <span className="flex items-center">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={orderedUsers.length < limit}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Siguiente
        </button>
      </div>

      {isOpen && (
        <UserModal user={selectedUserModal} onClose={handleCloseModal} />
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
          user={selectedUserModal}
          onClose={handleCloseModalEdit}
          mutate={mutate}
        />
      )}
      {isOpenOrdesModal && (
        <OrdersModal data={ordersUser} onClose={handleCloseModalOrders} />
      )}
      {isPaysModal && (
        <PaysModal
          data={pays}
          orders={ordersForPaysModal}
          onClose={handleCloseModalPays}
        />
      )}
    </div>
  );
}

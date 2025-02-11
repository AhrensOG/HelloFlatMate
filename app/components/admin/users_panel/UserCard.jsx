import { useState } from "react";
import UpdateUserPasswordModal from "./UpdateUserPasswordModal";

export default function UserCard({ data, action }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const typeUser = (type) => {
    switch (type) {
      case "ADMIN":
        return (
          <span className="w-full bg-resolution-blue text-xs rounded-lg text-white p-2">
            Admin
          </span>
        );
      case "OWNER":
        return (
          <span className="w-full bg-[#FF851B] text-xs rounded-lg text-white p-2">
            Propietario
          </span>
        );
      case "CLIENT":
        return (
          <span className="w-full bg-[#0074D9] text-xs rounded-lg text-white p-2">
            Inquilino
          </span>
        );
      case "WORKER":
        return (
          <span className="w-full bg-[#2ECC40] text-xs rounded-lg text-white p-2">
            Trabajador
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <article className="shadow-amenity-check w-full flex flex-wrap justify-center sm:justify-between items-center gap-2 p-4 rounded-lg cursor-pointer">
        <div className="flex flex-col gap-2 break-words w-32">
          <h2 className="font-semibold text-base text-[#222B45]">
            {data.name}
          </h2>
          <p className="text-sm text-[#8F9BB3] font-normal underline">
            {data.email}
          </p>
        </div>
        <div className="w-60 flex justify-center items-center text-center gap-2">
          <button
            onClick={() => handleOpenModal(data.id)}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
          >
            Actualizar contraseña
          </button>
          <button
            onClick={() => action(data)}
            className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600"
          >
            Actualizar Rol
          </button>
          {typeUser(data.role)}
        </div>
      </article>
      {isModalOpen && (
        <UpdateUserPasswordModal
          onClose={handleCloseModal}
          userId={selectedUserId}
        />
      )}
    </>
  );
}

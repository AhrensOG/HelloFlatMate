import { plus_jakarta } from "@/font";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import UserCard from "./UserCard";
import SetRolModal from "./SetRolModal";
import CreateUserModal from "./CreateUserModal";
import { useState } from "react";

export default function UsersPanel({ data, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false); // Estado para el modal de creación de usuario
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const handleShowModal = (data) => {
    setUser(data);
    setShowModal(true);
  };

  // Filtrar usuarios basados en el valor de búsqueda
  const filteredData = data?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item?.name?.toLowerCase().includes(query) ||
      item?.role?.toLowerCase().includes(query) ||
      item?.email?.toLowerCase().includes(query)
    );
  });

  return (
    <main
      className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
    >
      <TitleAdminPanel title={"Usuarios"} />
      <div className="w-full flex flex-wrap gap-2 justify-center items-center ">
        {/* Input de búsqueda */}
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full max-w-md"
          placeholder="Buscar usuarios por nombre, rol o correo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => setShowCreateUserModal(true)} // Mostrar el modal al hacer clic
        >
          Crear Usuario
        </button>
      </div>
      <section className="w-full flex flex-col gap-4 justify-center items-center">
        {filteredData?.length > 0 ? (
          filteredData.map((item) => (
            <UserCard key={item?.id} action={handleShowModal} data={item} />
          ))
        ) : (
          <h3 className="text-lg font-semibold text-gray-500 text-center mt-4">
            No hay usuarios
          </h3>
        )}
      </section>
      {showModal && (
        <SetRolModal action={setShowModal} data={user} reload={reload} />
      )}
      {showCreateUserModal && (
        <CreateUserModal action={setShowCreateUserModal} reload={reload} />
      )}
    </main>
  );
}

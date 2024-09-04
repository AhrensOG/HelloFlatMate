import { plus_jakarta } from "@/font";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import UserCard from "./UserCard";
import SetRolModal from "./SetRolModal";
import { useState } from "react";

export default function UsersPanel({ data, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const handleShowModal = (data) => {
    setUser(data);
    setShowModal(true);
  };
  return (
    <main
      className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
    >
      <TitleAdminPanel title={"Usuarios"} />
      <section className="w-full flex flex-col gap-4 justify-center items-center">
        {data ? (
          data.map((item) => (
            <UserCard key={item?.id} action={handleShowModal} data={item} />
          ))
        ) : (
          <h3 className="text-lg font-semibold text-gray-500 text-center mt-4">
            No hay usuarios
          </h3>
        )}
      </section>
      {showModal && <SetRolModal action={setShowModal} data={user} reload={reload} />}
    </main>
  );
}

import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function SetRolModal({ action, data }) {
  const [selectedRole, setSelectedRole] = useState(data.role || "");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleRoleUpdate = async () => {
    try {
      const response = await axios.patch("/api/admin/user", {
        id: data.id,
        role: selectedRole,
      });
      if (response.status) {
        setSelectedRole(response.data.role);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="fixed inset-0 flex justify-center items-center z-10">
      <div className="absolute inset-0 z-20 w-full h-full bg-[#e1eff2ff] opacity-75"></div>
      <article className="relative w-[18rem] flex flex-col gap-4 items-center z-50 bg-white text-black p-4 rounded-2xl">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-lg text-start grow">Documentación</h2>
          <div className="flex justify-end items-center">
            <button type="button">
              <XMarkIcon onClick={() => action(false)} className="h-7 w-7" />
            </button>
          </div>
        </div>
        {data.profilePicture ? (
          <div className="relative m-2 rounded-xl w-full min-h-[10rem]">
            <Image
              className="rounded-xl"
              src={data.profilePicture}
              fill
              alt="dni"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        ) : null}
        <div className="w-full flex flex-col gap-2 mt-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">
              Nombre:
            </label>
            <span id="name">{data.name || ""}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="surname" className="font-medium">
              Apellido:
            </label>
            <span id="surname">{data.lastName || ""}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-medium">
              Teléfono:
            </label>
            <span id="phone">{data.phone || ""}</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              Email:
            </label>
            <span id="email">{data.email || ""}</span>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="role" className="font-medium">
              Rol:
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="p-2 border rounded-md"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="OWNER">OWNER</option>
              <option value="CLIENT">CLIENT</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between gap-4 w-full mt-4">
          <button
            onClick={() => {
              toast.promise(handleRoleUpdate(), {
                loading: "Cargando...",
                success: () => {
                  action(false);
                  return "Actualizado!";
                },
                error: "Error!",
              });
            }}
            className="w-full py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Actualizar Rol
          </button>
          <button
            onClick={() => {
              action(false);
            }}
            className="w-full py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        </div>
      </article>
    </aside>
  );
}

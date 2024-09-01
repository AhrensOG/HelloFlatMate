import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";

export default function PreviewModal({ action, data }) {
  console.log(data);

  const handleUpdate = async (action) => {
    try {
      const dataRequest = {
        id: data.id,
        adminId: "89",
        state: action,
      };
      const response = await axios.patch("/api/document", dataRequest);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside className="fixed inset-0 flex justify-center items-center z-10">
      <div className="absolute inset-0 z-20 w-full h-full bg-[#e1eff2ff] opacity-75"></div>
      <article className="relative w-[18rem] flex flex-col gap-2 items-center z-50 bg-white text-black p-4 rounded-2xl">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-lg text-start grow">Documentación</h2>
          <div className="flex justify-end items-center">
            <button onClick={action} type="button">
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
        <div className="relative m-2 rounded-xl w-full min-h-[10rem]">
          <Image
            className="rounded-xl"
            src={data.url}
            fill
            alt="dni"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
        <div className="flex justify-between gap-4 w-full mt-4">
          <button
            onClick={() => {
              toast.promise(handleUpdate("APPROVED"), {
                loading: "Cargando...",
                success: () => {
                  action();
                  return "Aprobado!";
                },
                error: "Error!",
              });
            }}
            className="w-full py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Aprobar
          </button>
          <button
            onClick={() => {
              toast.promise(handleUpdate("REJECTED"), {
                loading: "Cargando...",
                success: () => {
                  action();
                  return "Rechazado!";
                },
                error: "Error!",
              });
            }}
            className="w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Rechazar
          </button>
        </div>
      </article>
    </aside>
  );
}

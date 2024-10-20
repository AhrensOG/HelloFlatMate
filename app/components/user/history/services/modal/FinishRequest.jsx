import { saveToDos } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function FinishRequest({ next, prev, data }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Context);

  // Estado para el mensaje y si estará presente
  const [message, setMessage] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  const parseDate = (date, time) => {
    const timeDate = time.split(":");
    const originalDate = new Date(date);
    originalDate.setUTCHours(timeDate[0], timeDate[1], 0, 0);
    return originalDate;
  };

  const dataToDo = {
    type: data?.type || "",
    startDate: parseDate(data?.day.date, data?.time) || "",
    title:
      data?.type === "CLEAN"
        ? "Servicio de limpieza"
        : "Servicio de reparacion" || "",
    body:
      data?.type === "CLEAN"
        ? `Servicio de limpieza solicitado para ${parseDate(
            data?.day.date,
            data?.time
          ).toLocaleDateString("es-ES")}`
        : `Servicio de reparacion solicitado para ${parseDate(
            data?.day.date,
            data?.time
          ).toLocaleDateString("es-ES")}` || "",
    userId: data.user.id || "",
    propertyId: data.propertyId || "",
    typeUser: data.user.role || "",
    clientMessage: message || "", // El mensaje que deja el cliente
    isPresent: isPresent || false, // Si el cliente estará presente
  };

  const submitRequest = async () => {
    try {
      const response = await axios.post("/api/to_do", dataToDo);
      saveToDos(dispatch, response.data);
      next();
    } catch (err) {
      throw err;
    }
  };

  return (
    <motion.div
      className="h-full py-6 flex flex-col justify-center items-center gap-4 mx-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="font-medium text-[#161616] text-lg ">
          {data?.day.dayNumber || ""}, {data?.day.dayName || ""}
        </h2>
        <p className="font-medium text-[#161616] text-sm">
          {data?.time || ""} PM
        </p>
      </div>

      <ul className="list-disc text-[#757575] text-sm font-normal self-start pl-5">
        <li>
          {data?.type === "cleaning"
            ? "Servicio de limpieza"
            : "Servicio de reparacion" || ""}
        </li>
      </ul>

      {/* Textarea para el mensaje */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Deja un mensaje sobre los detalles del servicio"
        className="w-full p-2 border border-gray-300 rounded-md"
        rows="4"
      ></textarea>

      {/* Checkbox para saber si estará presente */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPresent}
          onChange={(e) => setIsPresent(e.target.checked)}
          id="presentCheckbox"
        />
        <label htmlFor="presentCheckbox" className="text-sm text-[#757575]">
          ¿Estará presente en el domicilio durante el servicio?
        </label>
      </div>

      <div className="flex justify-between items-center gap-3 w-full mt-auto">
        <button
          onClick={() => {
            toast.promise(submitRequest(), {
              loading: "Cargando...",
              success: () => {
                router.back();
                return "Solicitud enviada";
              },
              error: "Error al enviar la solicitud",
            });
          }}
          type="button"
          className="text-sm font-normal bg-[#0C1660] w-[9.75rem] h-12 text-white flex justify-center items-center rounded-xl"
        >
          Aceptar
        </button>
        <button
          onClick={prev}
          type="button"
          className="text-sm font-normal bg-white border border-[#0C1660] w-[9.75rem] h-12 text-[#0C1660] flex justify-center items-center rounded-xl"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  );
}

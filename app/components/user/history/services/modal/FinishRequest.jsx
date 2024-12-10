import { saveToDos } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function FinishRequest({ next, prev, data }) {
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState([]); // Archivos seleccionados
    const [uploadedUrls, setUploadedUrls] = useState([]); // URLs de las imágenes subidas

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
        title: data?.type === "CLEAN" ? "Servicio de limpieza" : "Servicio de reparacion" || "",
        body:
            data?.type === "CLEAN"
                ? `Servicio de limpieza solicitado para ${parseDate(data?.day.date, data?.time).toLocaleDateString("es-ES")}`
                : `Servicio de reparacion solicitado para ${parseDate(data?.day.date, data?.time).toLocaleDateString("es-ES")}` || "",
        userId: data.user.id || "",
        propertyId: data.propertyId || "",
        typeUser: data.user.role || "",
        clientMessage: message || "", // El mensaje que deja el cliente
        isPresent: isPresent || false, // Si el cliente estará presente
        images: uploadedUrls, // Enviar las URLs subidas o un array vacío
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files)); // Convertir FileList a array
    };

    const handleSubmitImage = async (files) => {
        try {
            if (files.length > 0) {
                const response = await uploadFiles(files);
                const urls = response.map((file) => file.url);
                setUploadedUrls(urls); // Guardar URLs en el estado
            } else {
                setUploadedUrls([]); // Si no hay archivos, establecer un array vacío
            }
        } catch (err) {
            console.error("Error al subir imágenes:", err);
            throw err;
        }
    };

    const submitRequest = async () => {
        try {
            await handleSubmitImage(selectedFiles); // Manejar la subida de imágenes
            const response = await axios.post("/api/to_do", dataToDo); // Enviar datos al backend
            saveToDos(dispatch, response.data);
            next();
        } catch (err) {
            console.error("Error al enviar la solicitud:", err);
            throw err;
        }
    };

    return (
        <motion.div
            className="h-full py-6 flex flex-col justify-center items-center gap-6 mx-6 w-full max-w-2xl md:mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex justify-between items-center w-full">
                <h2 className="font-medium text-[#161616] text-lg ">
                    {data?.day.dayNumber || ""}, {data?.day.dayName || ""}
                </h2>
                <p className="font-medium text-[#161616] text-sm">{data?.time || ""} PM</p>
            </div>

            <ul className="list-disc text-[#757575] text-sm font-normal self-start pl-5">
                <li>{data?.type === "cleaning" ? "Servicio de limpieza" : "Servicio de reparacion" || ""}</li>
            </ul>

            {/* Textarea para el mensaje */}
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deja un mensaje sobre los detalles del servicio"
                className="w-full p-3 border border-gray-300 rounded-md resize-none md:h-32 h-24"
                rows="4"
            ></textarea>

            <div className="flex flex-col gap-4 w-full">
                {/* Input para subir imágenes */}
                <label htmlFor="imageUpload" className="block text-sm font-medium text-[#757575]">
                    Adjuntar imágenes (opcional)
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#0C1660] file:text-white file:cursor-pointer hover:file:bg-blue-700"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            {/* Checkbox para saber si estará presente */}
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={isPresent} onChange={(e) => setIsPresent(e.target.checked)} id="presentCheckbox" />
                <label htmlFor="presentCheckbox" className="text-sm text-[#757575]">
                    ¿Estará presente en el domicilio durante el servicio?
                </label>
            </div>

            <div className="flex justify-between items-center gap-3 w-full mt-auto">
                <button
                    onClick={() =>
                        toast.promise(submitRequest, {
                            loading: "Cargando...",
                            success: "Solicitud enviada",
                            error: "Error al enviar la solicitud",
                        })
                    }
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

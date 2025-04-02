import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { toast } from "sonner";

export default function MessageInput({ onSendMessage, onSendFile }) {
    const [message, setMessage] = useState("");

    const onChangeInput = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleFileChange = async (e) => {
        await onSendFile(e.target.files);
    };

    return (
        <form onSubmit={sendMessage} action="" className="w-full">
            <section
                className="flex items-center justify-between gap-2 p-2 h-[5.5rem] w-full border border-[#D6D6DE] rounded-xl rounded-t-none bg-white"
            >
                <div className="flex gap-2 items-center justify-between w-full">
                    <div className=" grow">
                        <label hidden htmlFor="message"></label>
                        <input
                            onChange={onChangeInput}
                            className="appearance-none outline-none bg-[#F5F5F5] w-full h-16 rounded-xl p-3"
                            placeholder="Escribe un mensaje..."
                            type="text"
                            name="message"
                            id="message"
                            value={message || ""}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="img_chat" className="h-9 w-9 rounded-full p-1 bg-[#d9d9d9ff] flex justify-center items-center cursor-pointer">
                            <PlusIcon />
                        </label>
                        <input
                            type="file"
                            name="img_chat"
                            id="img_chat"
                            className="hidden"
                            onChange={(e) =>
                                toast.promise(handleFileChange(e), {
                                    loading: "Enviando imagen...",
                                    success: "Imagen enviada correctamente",
                                    error: "Error al enviar la imagen",
                                })
                            } // Llama a la función cuando se selecciona un archivo
                            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/svg"
                        />

                        <button className="h-11 w-11 rounded-full bg-[#0E155F] p-[10px] text-white flex justify-center items-center" type="submit">
                            <PaperAirplaneIcon />
                        </button>
                    </div>
                </div>
            </section>
        </form>
    );
}

import { Context } from "@/app/context/GlobalContext";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import { toast } from "sonner";

export default function MessageInput({
  onSendMessage,
  onSendFile,
  relatedType,
  relatedId,
  type,
}) {
  const { state } = useContext(Context);
  const [message, setMessage] = useState("");

  const onChangeInput = (e) => {
    setMessage(e.target.value);
  };

  const hasPermissionToSend = () => {
    const user = state?.user;
    const leaseOrders = user?.leaseOrdersRoom;

    if (!user || !leaseOrders || !Array.isArray(leaseOrders)) return false;

    const isApprovedAndActive = (lo) =>
      lo.status === "APPROVED" && lo.isActive === true;

    if (type === "GROUP") {
      return leaseOrders.some(
        (lo) => isApprovedAndActive(lo) && lo.propertyId === relatedId
      );
    }

    if (type === "priv") {
      const now = new Date();

      const currentLeaseForChat = leaseOrders.find(
        (lo) =>
          lo.roomId === Number(relatedId) &&
          lo.status === "APPROVED" &&
          lo.isActive === true &&
          new Date(lo.startDate) <= now &&
          new Date(lo.endDate) >= now
      );

      return Boolean(currentLeaseForChat);
    }

    return false;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!hasPermissionToSend()) {
      toast.warning("No puedes enviar mensajes. Tu reserva no está activa.");
      return;
    }
    if (message) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileChange = async (e) => {
    if (!hasPermissionToSend()) {
      toast.warning("No puedes enviar archivos. Tu reserva no está activa.");
      return;
    }
    await onSendFile(e.target.files);
  };

  return (
    <form onSubmit={sendMessage} action="" className="w-full">
      <section className="flex items-center justify-between gap-2 p-2 h-[5.5rem] w-full border border-[#D6D6DE] rounded-xl rounded-t-none bg-white">
        <div className="flex gap-2 items-center justify-between w-full">
          <div className="grow">
            <label hidden htmlFor="message"></label>
            <input
              onChange={onChangeInput}
              className="appearance-none outline-none bg-[#F5F5F5] w-full h-16 rounded-xl p-3"
              placeholder="Escribe un mensaje..."
              type="text"
              name="message"
              id="message"
              value={message}
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label
              htmlFor="img_chat"
              className="h-9 w-9 rounded-full p-1 bg-[#d9d9d9ff] flex justify-center items-center cursor-pointer">
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
              }
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/svg"
            />

            <button
              className="h-11 w-11 rounded-full bg-[#0E155F] p-[10px] text-white flex justify-center items-center"
              type="submit">
              <PaperAirplaneIcon />
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ChatsCard({
  name,
  image,
  action = null,
  id,
  lastMessage,
}) {
  const router = useRouter();

  return (
    <motion.article
      onClick={
        action
          ? () => action()
          : () =>
              router.push(
                `/pages/user/chats/chat?type=supp&id=${id}&bool=false`
              )
      }
      className="flex justify-between items-center gap-2 h-[5rem] p-2 cursor-pointer"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-[4.4rem] h-[4.4rem] rounded-full">
        <Image
          className="rounded-full"
          src={image}
          fill
          alt="Ilustracion de chat"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        {" "}
        {/* Use flex-1 to allow truncation */}
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="font-normal text-xs text-[#919191] truncate">
          {lastMessage?.body || "No hay mensajes"}
        </p>
      </div>
      <div className="flex flex-col h-full justify-between items-end">
        <span className="h-5 w-5 rounded-full text-white font-normal text-xs bg-[#FF0000] flex justify-center items-center">
          1
        </span>
        <p className="font-normal text-xs text-[#919191]">
          {lastMessage
            ? new Date(lastMessage.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </p>
      </div>
    </motion.article>
  );
}

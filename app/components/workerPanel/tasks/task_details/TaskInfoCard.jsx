import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiPhoto,
  HiUser,
} from "react-icons/hi2";
import { MdOutlineKey, MdOutlineQuestionAnswer } from "react-icons/md";

export default function TaskInfoCard({ task }) {
  const tDesc = useTranslations("worker_panel.tasks.task_details.desc_sec");
  const tNote = useTranslations("worker_panel.tasks.task_details.tenant_note");

  return (
    <section className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
      {/* Presencia del inquilino */}
      <div className="flex items-center gap-3 text-sm text-gray-800">
        <MdOutlineKey className="text-[#0C1660]" size={20} />
        <span className="font-medium">
          {task.isPresent ? tDesc("op_1") : tDesc("op_2")}
        </span>
      </div>

      {/* Datos del cliente */}
      {task.client && (
        <div className="space-y-1">
          <h3 className="text-[#0C1660] font-semibold text-sm flex items-center gap-2">
            <HiUser /> Cliente
          </h3>
          <p className="text-sm text-gray-700">
            <strong>Nombre:</strong> {task.client.name} {task.client.lastName}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> {task.client.email}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Teléfono:</strong> {task.client.phone}
          </p>
        </div>
      )}

      {/* Nota del inquilino */}
      {task.clientMessage && (
        <div className="space-y-1">
          <h3 className="text-[#0C1660] font-semibold text-sm flex items-center gap-2">
            <HiOutlineChatBubbleBottomCenterText /> {tNote("title")}
          </h3>
          <p className="text-sm text-gray-700 bg-[#F5F5F5] p-3 rounded-md">
            {task.clientMessage}
          </p>
        </div>
      )}

      {/* Comentario del trabajador */}
      {task.comment && (
        <div className="space-y-1">
          <h3 className="text-[#0C1660] font-semibold text-sm flex items-center gap-2">
            <MdOutlineQuestionAnswer /> Comentario del trabajador
          </h3>
          <p className="text-sm text-gray-700 bg-[#F5F5F5] p-3 rounded-md">
            {task.comment}
          </p>
        </div>
      )}

      {/* Imagen enviada */}
      {task.imageUrl && (
        <div className="space-y-1">
          <h3 className="text-[#0C1660] font-semibold text-sm flex items-center gap-2">
            <HiPhoto /> Imagen enviada
          </h3>
          <Link href={task.imageUrl} target="_blank">
            <div className="relative w-full h-60">
              <Image
                src={task.imageUrl}
                alt="Imagen enviada"
                fill
                className="object-cover object-center"
              />
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}

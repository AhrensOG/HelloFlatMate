import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import MoreInfoModal from "./MoreInfoModal";

export default function MoreInfoItemTemplate({
  property,
  title,
  body,
  onBodyChange,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSave = (newBody) => {
    onBodyChange(property, newBody); // Usa la propiedad para actualizar el texto
    handleShowModal(); // Cierra el modal
  };

  const handleCancel = () => {
    handleShowModal(); // Solo cierra el modal, no hace cambios
  };

  return (
    <article className="p-2 text-[#0D171C] bg-[#F7FAFA] w-full">
      <div className="flex justify-between items-center bg-[#E8EDF2] p-2">
        <h3 className="font-normal text-lg">{title}</h3>
        <button
          onClick={handleShowModal}
          className="h-10 w-10 text-[#0E155F] p-2 bg-[#D0D9E3] rounded-lg"
          type="button"
        >
          <PlusIcon />
        </button>
      </div>
      <p className="text-sm p-1 break-words">
        {body.length === 0 ? "Aquí va la descripción" : body}
      </p>
      {showModal && (
        <MoreInfoModal
          body={body}
          title={title}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </article>
  );
}

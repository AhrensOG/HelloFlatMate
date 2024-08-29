import { PlusIcon } from "@heroicons/react/20/solid";
import MoreInfoModal from "./MoreInfoModal";
import { useState } from "react";

export default function MoreInfoItem({ title, body, action }) {
  const [showModal, setShowModal] = useState();

  const handleShowModal = (body) => {
    action(body);
    setShowModal(!showModal);
  };

  return (
    <article>
      <div className="flex justify-between items-center p-2 text-[#0D171C] bg-[#F7FAFA]">
        <h3 className="font-normal text-lg">{title}</h3>
        <button
          onClick={() => handleShowModal(body)}
          className="h-10 w-10 text-[#0E155F] p-2 bg-[#E8EDF2] rounded-lg"
          type="button"
        >
          <PlusIcon />
        </button>
      </div>

      {showModal && <MoreInfoModal body={body} action={handleShowModal} />}
    </article>
  );
}

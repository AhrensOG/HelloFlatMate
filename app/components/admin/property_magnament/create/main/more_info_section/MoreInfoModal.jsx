import { useState } from "react";

export default function MoreInfoModal({ body, onSave, onCancel, title }) {
  const [inputText, setInputText] = useState(body || "");

  const handleSave = () => {
    onSave(inputText); // Pasa el texto actualizado al manejador de guardar
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[17rem] lg:w-[30rem] lg:h-[35rem] lg:items-baseline">
        <h2 className="font-bold text-[1.37rem] w-full p-1 text-center">
          {title}
        </h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          className="p-2 border border-gray-300 rounded w-full lg:h-[27rem]"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-[#0C1660] text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

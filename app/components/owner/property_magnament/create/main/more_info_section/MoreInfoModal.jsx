import { useState } from "react";

export default function MoreInfoModal({ body, onSave, onCancel, title }) {
  const [inputText, setInputText] = useState(body || "");

  const handleSave = () => {
    onSave(inputText); // Pasa el texto actualizado al manejador de guardar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="font-bold text-[1.37rem] w-full text-start p-1">
          {title}
        </h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

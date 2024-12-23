"use client";

import axios from "axios";

export default function TestRedSysButton() {
    const handleRedSysTest = async () => {
        try {
            console.log("⏳ Iniciando prueba con RedSys...");
            const response = await axios.post("/api/redsys");
            console.log("✅ Respuesta de RedSys:", response.data);

            if (response.data?.form) {
                const formContainer = document.createElement("div");
                formContainer.innerHTML = response.data.form;
                document.body.appendChild(formContainer);

                const form = formContainer.querySelector("#redsysForm");
                if (form) {
                    console.log("🚀 Enviando formulario a RedSys...");
                    form.submit();
                } else {
                    console.error("❌ No se encontró el formulario en la respuesta.");
                }
            } else {
                console.error("❌ La respuesta no contiene el formulario esperado:", response.data);
            }
        } catch (error) {
            console.error("❌ Error al probar RedSys:", error.response?.data || error.message);
        }
    };

    return (
        <button onClick={handleRedSysTest} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Probar RedSys
        </button>
    );
}

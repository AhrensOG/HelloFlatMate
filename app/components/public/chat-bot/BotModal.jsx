import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import UserMessage from "./UserMessageBot";
import { useState } from "react";

// Preguntas y respuestas frecuentes
const faq = {
    "¿Qué es hellorooms?":
        "Las habitaciones para estudiantes en Valencia, hellorooms son apartamentos que gestionamos completamente.\n\nNo tendrás que gestionar nada con el propietario del piso y dentro del horario de 9 a 17 horas siempre podrás comunicarte con nosotros libremente. También tendrás un número de teléfono para emergencias fuera del horario laboral.\n\nDesglose de servicios:\n- Encontramos estudiantes que vienen a estudiar a la ciudad.\n- Formalizamos contratos.\n- Preparamos los pisos.\n- Hacemos el check-in.\n- Contacto 24/7 con los flatmates.\n- Gestión de mantenimiento.\n- Informamos de consumos de suministros.",

    "¿Qué es lo que se paga con la reserva de la habitación a través de la Web de helloflatmate?":
        "La persona que reserva la habitación está abonando la renta del primer mes de contrato de la habitación seleccionada.",

    "¿Con qué compañeros compartiré piso?":
        "helloflatmate aloja a estudiantes o personas jóvenes en prácticas, de diversas nacionalidades, siempre y cuando sean menores de 30 años.",

    "¿Hay pisos solo para chicas?": "helloflatmate dispone de pisos mixtos y pisos solo para chicas.",

    "¿Puede venir familia y amigos a visitarme y dormir en el piso?":
        "Claro, no hay problema, pero debes informar a la oficina y a tus flatmates, y que todos estén de acuerdo. Si la estancia del invitado llega a una semana, deberá aportar 20 €/semana para gastos comunes. No debe convertirse en una costumbre; solo visitas esporádicas.",

    "¿Se admiten mascotas?": "No",

    "¿Si llego al piso el 15 de septiembre, tengo que pagar todo el mes?":
        "Depende:\n- Si reservas una habitación para entrar el 15 de un mes, pagas el mes completo, ya que otra persona podría querer entrar antes.\n- Si contratas el día 15 para entrar el 16, pagas solo la parte proporcional.",

    "¿Puedo cancelar mi reserva y que me devuelvan el dinero?":
        "Depende:\n- Se devuelve el 100% si cancelas al menos 30 días antes del inicio del contrato.\n- Cancelaciones con menos de 30 días no tienen reembolso.\n\nEl propietario también puede cancelar la reserva 30 días antes del inicio del contrato. Desde helloflatmate, se te dará la opción de trasladar tu reserva a otra habitación o recibir un reembolso del 100%.",

    "¿Tengo que pagar alguna comisión para el alquiler o reserva de la habitación?":
        "Sí. La formalización de contrato tiene un coste de 380€ + IVA (459,80€), lo cual garantiza derechos y obligaciones para todos los flatmates.",

    "¿Las facturas están incluidas?":
        "No, las facturas no están incluidas. Los flatmates están exentos de gastos comunitarios del edificio, como el ascensor, limpieza de escalera, reparaciones, etc.",

    "¿Hay internet? ¿Cómo se realizan los pagos de internet?":
        "Sí, todas las viviendas disponen de Internet WiFi de 300 megas (Orange o Movistar). Cuota fija de 16 €/mes, pagada cada 5 meses por adelantado (80 €/habitación).",

    "¿Cómo pagamos las facturas de agua, luz y gas?":
        "Cada 5 meses se aportan 200€ como adelanto para suministros. En contratos de 5 meses, se paga al inicio. En contratos de 10 meses, se realiza al inicio y en enero, junto a la renta de febrero.\n\nEl propietario ajustará con facturas reales: si sobra, se devuelve; si falta, se pedirá un adelanto adicional.",

    "¿Qué fianza tengo que entregar? ¿Cuándo y cómo lo hago?":
        "La fianza es de 350€ si la habitación tiene baño o terraza propia. Para el resto, la fianza es de 300€.",

    "¿Cómo hago mi reserva?":
        "1. Entra en www.helloflatmate.com, regístrate y completa los datos para crear tu cuenta. Recibirás un email para activar tu cuenta.\n\n2. Ingresa en www.helloflatmate.com e inicia sesión.\n\n3. Selecciona la habitación, fecha de contrato y dale a 'Reservar'.\n\n4. Verifica fechas y precio, y selecciona 'Pago Seguro con Tarjeta'. Completa el pago.\n\n5. Recibirás un email de confirmación y solicitud de documentos para formalizar el contrato. Días antes de tu llegada, recibirás instrucciones para el check-in.\n\n¡Bienvenido a helloflatmate!",
};

export default function BotModal() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [isResponseShown, setIsResponseShown] = useState(false);

    const sendMessage = (msg) => {
        const userMessage = { role: "user", content: msg };
        setChat([...chat, userMessage]);

        if (chat.length === 0) {
            setChat((prevChat) => [...prevChat, { role: "bot", content: "Bienvenido/a! Estas son algunas preguntas frecuentes:" }]);
            setShowMenu(true);
        } else {
            handleBotResponse(msg);
        }
    };

    const handleBotResponse = (question) => {
        if (faq[question]) {
            setChat((prevChat) => [...prevChat, { role: "bot", content: faq[question] }]);
            setShowMenu(false);
            setIsResponseShown(true);
        } else {
            setChat((prevChat) => [...prevChat, { role: "bot", content: "Lo siento, no tengo una respuesta para esa pregunta." }]);
        }
    };

    const handleMenuClick = (question) => {
        sendMessage(question);
    };

    const comeBackMenu = () => {
        setChat([{ role: "bot", content: "Bienvenido/a! Estas son algunas preguntas frecuentes:" }]);
        setShowMenu(true);
        setIsResponseShown(false);
    };

    const finishChat = () => {
        setChat([...chat, { role: "bot", content: "¡Gracias por contactarnos! Hasta luego." }]);
        setShowMenu(false);
        setIsResponseShown(false);
    };

    return (
        <motion.aside
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-8 right-10 w-[20rem] max-h-[35rem] rounded-tl-lg rounded-tr-lg rounded-bl-lg border border-gray-200 shadow-2xl flex flex-col overflow-hidden"
            style={{
                boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.15), 0px 11px 11px rgba(0, 0, 0, 0.1)`,
            }}
        >
            <div className="w-full h-[2.5rem] bg-blue-600 rounded-tl-lg rounded-tr-lg text-white font-semibold flex items-center pl-4">
                Bot Asistente
            </div>
            <div className="w-full flex-grow bg-white p-4 flex flex-col overflow-y-auto space-y-4">
                {chat.map((msg, index) => (
                    <UserMessage key={index} message={msg.content} isUser={msg.role === "user"} />
                ))}
                {showMenu && (
                    <div className="space-y-2">
                        {Object.keys(faq).map((question, index) => (
                            <button
                                key={index}
                                className="text-left bg-gray-100 p-2 rounded-lg w-full text-sm hover:bg-gray-200 transition-colors"
                                onClick={() => handleMenuClick(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                )}
                {isResponseShown && (
                    <div className="mt-4 flex justify-between">
                        <button onClick={comeBackMenu} className="text-blue-600 text-sm font-medium underline">
                            Volver al menú principal
                        </button>
                        <button onClick={finishChat} className="text-red-500 text-sm font-medium underline">
                            Finalizar
                        </button>
                    </div>
                )}
            </div>
            <div className="flex items-center border-t border-gray-200 px-4 py-3 bg-gray-50">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            sendMessage(message);
                            setMessage("");
                        }
                    }}
                    type="text"
                    id="message"
                    className="w-full bg-gray-100 rounded-full h-10 px-4 outline-none text-sm"
                    placeholder="Escribe tu mensaje..."
                />
                <button
                    onClick={() => {
                        if (message) sendMessage(message);
                        setMessage("");
                    }}
                    className="ml-2 p-2 bg-blue-600 rounded-full flex items-center justify-center w-10 h-10"
                >
                    <PaperAirplaneIcon className="text-white w-5 h-5" />
                </button>
            </div>
        </motion.aside>
    );
}

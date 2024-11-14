export default function UserMessage({ message, isUser }) {
    // Divide el mensaje en líneas
    const parts = message.split(/\n/g);

    // Variable para almacenar las líneas normales y las de la lista
    const normalText = [];
    const listItems = [];

    // Separar texto normal de elementos de lista
    parts.forEach((part) => {
        if (part.trim().startsWith("-")) {
            // Remueve el "-" y agrega el elemento de lista
            listItems.push(part.replace("-", "").trim());
        } else if (part.trim() !== "") {
            // Agrega texto normal
            normalText.push(part.trim());
        }
    });

    return (
        <div className={`p-2 rounded-xl max-w-[14rem] my-2 ${isUser ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
            {/* Renderiza texto normal */}
            {normalText.map((text, index) => (
                <p key={index}>{text}</p>
            ))}

            {/* Renderiza lista si existen elementos */}
            {listItems.length > 0 && (
                <ul className="list-disc pl-4 space-y-1 mt-2">
                    {listItems.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

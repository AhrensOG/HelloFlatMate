import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SetPrice({ onPriceSet, createSupply, taskPrice }) {
    const [price, setPrice] = useState(taskPrice || "");
    const [isPriceSet, setIsPriceSet] = useState(!!taskPrice); // Determina si ya se estableció un precio

    useEffect(() => {
        if (taskPrice) {
            setPrice(taskPrice);
            setIsPriceSet(true);
        }
    }, [taskPrice]);

    const handleSetPrice = () => {
        if (price.trim() === "" || isNaN(price)) {
            toast.error("Por favor, ingrese un precio válido.");
            return;
        }
        setIsPriceSet(true);
        onPriceSet(Number(price));
        toast.success("¡Precio establecido exitosamente!");
    };

    if (isPriceSet) {
        return (
            <div className="text-center">
                <h4 className="text-lg font-bold">Precio establecido:</h4>
                <p className="text-xl font-semibold text-[#0C1660]">{price} €</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <label htmlFor="priceInput" className="text-sm font-medium text-[#757575]">
                Establecer precio para la tarea
            </label>
            <input
                id="priceInput"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ingrese el precio en €"
                className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={() => {
                    toast.promise(createSupply(price), {
                        loading: "Estableciendo precio...",
                        success: (data) => {
                            handleSetPrice();
                            return `¡Precio establecido exitosamente!`;
                        },
                        error: (err) => `Error al establecer el precio: ${err}`,
                    });
                }}
                className="bg-[#0C1660] text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition"
            >
                Definir precio
            </button>
        </div>
    );
}

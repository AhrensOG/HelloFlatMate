 
import Image from "next/image";
import { useState } from "react";

export default function RoomCounter({ onChange, initialValue }) {
  const [counter, setCounter] = useState(initialValue || 1);

  const increment = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    onChange("rooms", newCounter);
  };

  const decrement = () => {
    const newCounter = Math.max(1, counter - 1); // Evitar que el contador sea menor que 1
    setCounter(newCounter);
    onChange("rooms", newCounter);
  };

  return (
    <section
      className={`  flex gap-1 justify-between w-full h-[5vh] items-center px-4 text-[#1C1C21]`}
    >
      <h3 className="text-[1.37rem] font-bold">Número de Habitaciones</h3>
      <div className="flex gap-1">
        <button
          onClick={decrement}
          className="width-[0.93rem] rounded-full"
          type="button"
        >
          <Image
            src={"/filter/minus-icon.svg"}
            width={15}
            height={15}
            alt="Boton menos"
          />
        </button>
        <span className="text-[1.37rem] font-bold">{counter}</span>
        <button
          onClick={increment}
          className="width-[0.93rem] rounded-full"
          type="button"
        >
          <Image
            src={"/filter/plus-icon.svg"}
            width={15}
            height={15}
            alt="Boton mas"
          />
        </button>
      </div>
    </section>
  );
}

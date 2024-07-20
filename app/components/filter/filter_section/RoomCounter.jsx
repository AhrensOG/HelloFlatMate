import { plus_jakarta } from "@/font"
import Image from "next/image"
import { useState } from "react"

export default function RoomCounter() {
    const [counter, setCounter] = useState(1)

    const increment = () => {
        setCounter(counter + 1)
    }

    const decrement = () => {
        setCounter(counter - 1)
    }

    return (
        <section className={`${plus_jakarta.className} flex gap-1 justify-between w-full h-[5vh] items-center px-4 text-[#1C1C21]`}>
            <h3 className="text-[1.37rem] font-bold">Número de Habitaciones</h3>
            <div className="flex gap-1">
                <button onClick={decrement} className="width-[0.93rem] rounded-full" type="button"><Image src={"/filter/minus-icon.svg"} width={15} height={15} alt="Boton menos" /></button>
                <span className="text-[1.37rem] font-bold">{counter}</span>
                <button onClick={increment} className="width-[0.93rem] rounded-full" type="button"><Image src={"/filter/plus-icon.svg"} width={15} height={15} alt="Boton mas" /></button>
            </div>
        </section>
    )
}
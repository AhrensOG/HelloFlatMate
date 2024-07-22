"use client"
import { plus_jakarta } from "@/font"
import Image from "next/image"
import { useState } from 'react'
import Tooltip from "./tooltip/Tooltip"

export default function PropertyCard() {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => { setIsOpen(!isOpen) }

    const handleClose = () => { setIsOpen(!isOpen) }


    return (
        <section className={`${plus_jakarta.className} flex gap-3 w-full h-[15vh]`}>
            <div className="h-full">
                <Image className="h-full" src={"/property-card/property-stock-1.svg"} width={117} height={117} alt="Imagen de propiedad" />
            </div>
            <div className="flex flex-col justify-between h-full grow">
                <div className="flex flex-col grow gap-2">
                    <h4 className="flex w-full gap-2 items-center text-[0.81rem] text-[#000000B2] font-normal">
                        HelloRoom{' '}
                        <button type="button" className="relative" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                            <Image src={"/property-card/gray-question-icon.svg"} width={17} height={17} alt="Más Información" />
                            <Tooltip isOpen={isOpen} />
                        </button>
                    </h4>
                    <h2 className="flex w-full gap-2 items-center text-sm text-[#000000B2] font-medium">
                        <span><Image src={"/property-card/location-icon.svg"} width={18} height={18} alt="Icono de Ubicación" /></span> Ubicación de la Habitación
                    </h2>
                    <p className="text-[0.68rem] text-[#828282] font-normal">Wifi - Baño compartido</p>
                </div>
                <div className="flex justify-between gap-2 h-[3.75rem] pb-2">
                    <span className="flex items-center gap-2 self-end pb-2.5 text-[#000000B2] h-[0.81rem] font-medium">
                        <Image className="" src={"/property-card/star.svg"} width={13} height={13} alt="Icono de Estrella" /> 4.9
                    </span>
                    <div className="flex flex-col justify-end items-end font-medium">
                        <span className="text-xs text-[#171412] h-[1.06rem] bg-[#FFF06D] px-1">15% OFF</span>
                        <h3 className="text-base text-[#000000B2]">$180 <span className="text-xs text-[#B2B2B2]">/mes</span></h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
"use client"
import { plus_jakarta } from "@/font"
import Image from "next/image"

export default function SearchBar() {
    return (
        <form className={`${plus_jakarta.className} text-[#A0A09F]`} role="search">
            <div className="flex gap-2 items-center justify-center">
                <div className="bg-black flex align-center w-[265px] h-[32px] rounded-[10px] border-[1px] border-[#00000033]">
                    <span className="self-center ml-2"><Image src={"/search/search-icon.svg"} width={16} height={16} alt="Icono de búsqueda" /></span>
                    <label htmlFor="search-input" className="text-center hidden">Buscar</label>
                    <input className="text-center rounded-[10px] grow text-[15px] font-medium" type="text" placeholder="Buscar..." aria-label="Buscar"></input>
                </div>

                <button className="flex font-medium text-base items-center gap-1" aria-label="Abrir filtros" >Filter <span><Image alt="Abrir filtros" src={"/search/filter-arrow.svg"} width={16} height={16} /></span></button>
            </div>
        </form>
    )
}
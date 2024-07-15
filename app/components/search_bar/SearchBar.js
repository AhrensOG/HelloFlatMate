"use client"
import { plus_jakarta } from "@/font"
import Image from "next/image"

export default function SearchBar() {
    return (
        <form className={`${plus_jakarta.className} text-[#A0A09F]`} role="search">
            <div className="flex gap-2 items-center justify-center">
                <div className="bg-black flex align-center w-[75%] h-[2.2rem] rounded-[0.6rem] border-[1px] border-[#00000033]">
                    <span className="self-center ml-2"><Image src={"/search/search-icon.svg"} width={16} height={16} alt="Icono de búsqueda" /></span>
                    <label htmlFor="search-input" className="text-center hidden">Buscar</label>
                    <input className="text-center rounded-[0.6rem] grow text-[0.93rem] font-medium" type="text" placeholder="Buscar..." aria-label="Buscar"></input>
                </div>

                <button className="flex font-medium text-base items-center gap-1" aria-label="Abrir filtros" >Filter <span><Image alt="Abrir filtros" src={"/search/filter-arrow.svg"} layout="responsive" width={16} height={16} /></span></button>
            </div>
        </form>
    )
}
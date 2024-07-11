"use client"
import Image from "next/image"
import SideBarDropdown from "./SideBarDropdown"
import Link from "next/link"
import { plus_jakarta } from "@/font"
import { motion, AnimatePresence } from "framer-motion"


export default function SideBar({ handleClose, isOpen }) {
    return (
        <AnimatePresence mode="wait">
            {isOpen &&
                <motion.aside
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: "0" }}
                    exit={{ opacity: 0, x: "-100%" }}
                    transition={{ duration: 0.5 }}
                    className={`${plus_jakarta.className} flex flex-col items-start fixed inset-0 z-10 bg-white`}>
                    <div className="flex m-3 w-[14.75rem] justify-between">
                        <button onClick={handleClose} aria-label="Cerrar menú">
                            <Image src={"/nav_bar/side_bar/btn-close.svg"} width={24} height={24} alt="Botón para cerrar menú" />
                        </button>
                        <Image className="self-center" src={"/nav_bar/nav-bar-logo.svg"} width={125} height={41} alt="Logo de FlatMate" />
                    </div>
                    <nav className="flex flex-col w-full">
                        <div className="flex gap-2 items-center px-4 py-3">
                            <Image src={"/nav_bar/side_bar/black-house.svg"} width={20} height={20} alt="Botón para ir al inicio" />
                            <h2 className="text-xl font-medium text-licorice-black">
                                <Link href="#">
                                    Inicio
                                </Link>
                            </h2>
                        </div>
                        <SideBarDropdown tittle="Mi dormitorio" icon="/nav_bar/side_bar/ligth-house.svg" info={[]} />
                        <SideBarDropdown tittle="Mis viajes" icon="/nav_bar/side_bar/paper.svg" info={[]} />
                        <SideBarDropdown tittle="Chats" icon="/nav_bar/side_bar/chat-icon.svg" info={[]} />
                        <SideBarDropdown tittle="Servicios" icon="/nav_bar/side_bar/question.svg" info={[]} />
                        <SideBarDropdown tittle="Configuración" icon="/nav_bar/side_bar/config-icon.svg" info={[]} />
                        <SideBarDropdown tittle="Soporte" icon="/nav_bar/side_bar/headphone-icon.svg" info={[]} />
                    </nav>
                </motion.aside>}

        </AnimatePresence>
    )
}


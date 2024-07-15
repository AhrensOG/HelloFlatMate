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
                    className={`${plus_jakarta.className} flex flex-col items-start fixed inset-0 z-10 w-full`}>
                    <div className="flex p-3 bg-white w-full h-[8vh]">
                        <button onClick={handleClose} aria-label="Cerrar menú">
                            <Image src={"/nav_bar/side_bar/btn-close.svg"} layout="responsive" width={24} height={24} alt="Botón para cerrar menú" />
                        </button>
                        <div className="h-[100%] w-[7.82rem] ml-[25%] self-center"> <Image src={"/nav_bar/nav-bar-logo.svg"} layout="responsive" width={125} height={41} alt="Logo de FlatMate" /></div>
                    </div>
                    <nav className="flex flex-col w-full gap-4">
                        <div className="flex gap-2 items-center px-4 py-3 w-full h-[1.25rem]">
                            <div><Image src={"/nav_bar/side_bar/black-house.svg"} layout="responsive" width={20} height={20} alt="Botón para ir al inicio" /></div>
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


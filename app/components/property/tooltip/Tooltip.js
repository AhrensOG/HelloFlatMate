import { motion, AnimatePresence } from "framer-motion"

export default function Tooltip({ isOpen }) {
    return (
        <AnimatePresence>
            {isOpen &&
                <motion.aside
                    animate={{ opacity: 0.95 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-[1.1rem] rounded-lg text-white bg-[#828282] w-[35vw] opacity-75"
                >
                    {console.log("hello")}
                    <p className="py-3 px-2 text-xs font-bold">
                        Nuestras acogedoras hellorooms están diseñadas para estudiantes internacionales y nacionales que buscan un espacio listo para habitar en Valencia por menos de un año. Todas nuestras habitaciones están gestionadas por los agentes de helloflatmate, garantizando una experiencia de vivienda sin complicaciones desde el primer momento.
                    </p>
                </motion.aside>}
        </AnimatePresence>
    )
}
import { motion, AnimatePresence } from "framer-motion"

export default function Tooltip({ isOpen }) {
    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    className="absolute top-0 right-o w-[8.25rem]"
                >
                    <p>
                        Nuestras acogedoras hellorooms están diseñadas específicamente para estudiantes internacionales y nacionales que buscan un espacio listo para habitar desde el primer momento dado que vienen a Valencia por menos de un año y son gestionadas por los agentes de helloflatmate.
                    </p>
                </motion.div>}
        </AnimatePresence>
    )
}
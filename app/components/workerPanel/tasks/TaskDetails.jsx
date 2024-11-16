import { MapPinIcon } from "@heroicons/react/24/outline";
import ApplicationCardHistory from "../../user/history/application/ApplicationCardHistory";
import { plus_jakarta } from "@/font";
import { AnimatePresence, motion } from "framer-motion";
import TitleSection from "../TitleSection";
import DescriptionSection from "./task_details/DescriptionSection";
import TenatnsNote from "./task_details/TenatnsNote";
import LocationSection from "./task_details/LocationSection";
import Buttons from "./task_details/Buttons";
import TaskModal from "./task_details/modal/TaskModal";
import { useContext, useEffect, useState } from "react";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Context } from "@/app/context/GlobalContext";

export default function TaskDetails({ section }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { state } = useContext(Context);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState();
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (state?.user) {
            setUser(state.user);
        }
    }, [state.user]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get(`/api/to_do?id=${id}`);
                setTask(res.data);
                setStatus(res.data.status);
            } catch (err) {
                console.log(err);
            }
        };

        if (user && id) {
            fetchTask();
        }
    }, [user, id]);

    const handleShowModal = (comment, status) => {
        console.log(status, comment);

        setShowModal(!showModal);

        if (status === "COMPLETED" || status === "PENDING") {
            toast.promise(handleFinishTask(comment, status), {
                loading: "Guardando...",
                success: "¡Guardado exitosamente!",
                error: "¡Ocurrió un error!",
            });
        }

        setType(status);
    };

    const handleModal = (str) => {
        setType(str);
        setShowModal(!showModal);
    };

    const handleFinishTask = async (comment, status) => {
        try {
            const res = await axios.patch(`/api/to_do`, {
                id: task.id,
                status: status,
                comment: comment,
            });
            return res;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const claimTask = async () => {
        try {
            const res = await axios.patch(`/api/to_do?type=asing`, {
                id: task.id,
                workerId: user?.id,
                userId: task.userId,
            });
            console.log(res);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    if (!user || !task) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                className={`${plus_jakarta.className} flex flex-col h-screen`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <header>
                    {console.log(task)}
                    <UserSerivceNavBar />
                </header>
                <main className="flex-grow">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`${plus_jakarta.className} flex flex-col gap-3 py-4 m-4 lg:gap-8 lg:justify-around `}
                    >
                        <TitleSection title={"Historial de tareas"} />
                        <div className="flex flex-col gap-1">
                            <div className="border bg-gris-español w-full"></div>
                            <ApplicationCardHistory data={task} />
                            <div className="border bg-gris-español w-full"></div>
                        </div>

                        <section className="flex flex-col justify-center items-center gap-6 lg:flex-row-reverse lg:flex-wrap">
                            <div className="flex flex-col gap-4 lg:w-[45%] lg:justify-around">
                                <DescriptionSection body={task?.isPresent} />
                                <TenatnsNote body={task?.clientMessage || ""} />
                            </div>
                            <LocationSection />
                            {status === "PENDING" && task.workerId !== null && <Buttons action={handleModal} />}
                            {task.workerId === null && (
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={() => {
                                            toast.promise(claimTask(), {
                                                loading: "Asignando...",
                                                success: "¡Asignado exitosamente!",
                                                error: "¡Ocurrio un error!",
                                            });
                                        }}
                                        className="w-full h-12 bg-[#0C1660] text-[#F7FAFA] text-base font-bold rounded-lg lg:w-[20rem]"
                                        type="button"
                                    >
                                        Aceptar tarea
                                    </button>
                                </div>
                            )}
                        </section>
                        {showModal && <TaskModal type={type} action={handleShowModal} showModal={setShowModal} />}
                    </motion.section>
                </main>
                <footer className="sticky bottom-0">
                    <BottomNavBar section={section} />
                </footer>
            </motion.div>
        </AnimatePresence>
    );
}

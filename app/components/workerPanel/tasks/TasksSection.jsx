import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ApplicationCardHistory from "../../user/history/application/ApplicationCardHistory";
import axios from "axios";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import SearchBar from "../home/SearchBar";
import { useTranslations } from "next-intl";

export default function TasksSection({ section }) {
    const [detailsInfo, setDetailsInfo] = useState({});
    const route = useRouter();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({ clean: false, repair: false });

    const t = useTranslations("worker_panel.tasks");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get("/api/to_do?status=available");
                setTasks(res.data);
                setFilteredTasks(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTask();
    }, []);

    useEffect(() => {
        // Filtrar las tareas según la búsqueda y los checkboxes
        let filtered = tasks.filter((task) => {
            if (filter.clean && task.type !== "CLEAN") return false;
            if (filter.repair && task.type !== "REPAIR") return false;
            if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
        setFilteredTasks(filtered);
    }, [filter, searchTerm, tasks]);

    const handleShowdetails = (info, id) => {
        setDetailsInfo(info);
        route.push("/pages/worker-panel/tasks/details?id=" + id);
    };

    const handleFilterChange = (name, value) => {
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    if (!tasks) {
        return (
            <div className="flex flex-col items-center justify-center h-screen ">
                <header className="w-full">
                    <UserSerivceNavBar />
                </header>
                <main className="w-full grow grid place-items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </main>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                className={`  flex flex-col h-[97vh] relative`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <header>
                    <UserSerivceNavBar />
                </header>
                <main className="flex-grow overflow-y-auto mb-16">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`  flex flex-col gap-2 py-4 m-4`}
                    >
                        <div className="flex justify-center items-center mb-4 w-full">
                            <h2 className="text-[#000000CC] font-bold text-xl mx-auto ml-24 lg:mx-auto">{t("h2_1")}</h2>
                        </div>
                        <div className="lg:flex lg:justify-around lg:w-full lg:items-center">
                            {/* Usar el SearchBar existente */}
                            <div className="lg:w-[45%]">
                                <SearchBar data={searchTerm} setData={setSearchTerm} />
                            </div>

                            {/* Añadir los checkboxes aquí */}
                            <div className="flex gap-4 mt-4 justify-center lg:w-[45%] lg:m-0">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={filter.clean} onChange={(e) => handleFilterChange("CLEAN", e.target.checked)} />
                                    {t("clean")}
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={filter.repair} onChange={(e) => handleFilterChange("REPAIR", e.target.checked)} />
                                    {t("repair")}
                                </label>
                            </div>
                        </div>
                        <div className="border bg-gris-español"></div>
                        <div className="lg:flex-row lg:flex-wrap lg:flex lg:gap-8 lg:justify-around w-full">
                            {filteredTasks.length === 0 ? (
                                <div className="flex-grow flex items-center justify-center">
                                    <p className="text-[#121417] text-lg font-medium p-4 rounded-lg">{t("p_1")}</p>
                                </div>
                            ) : (
                                filteredTasks.map((task) => (
                                    <div key={task.id} className="lg:w-[45%] hover:scale-110">
                                        <ApplicationCardHistory action={() => handleShowdetails(task, task.id)} data={task} />
                                        <div className="border bg-gris-español"></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.section>
                </main>
                <footer className="fixed bottom-0 left-0 w-full bg-white">
                    <BottomNavBar section={section} />
                </footer>
            </motion.div>
        </AnimatePresence>
    );
}

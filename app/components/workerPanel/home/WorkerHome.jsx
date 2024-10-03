import { plus_jakarta } from "@/font";
import SideModal from "./SideModal";
import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import NewsItem from "./NewsItem";
import TodayTaskSection from "./TodayTaskSection";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import TaskCardSimple from "./TaskCardSimple";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";

export default function WorkerHome({ section }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const router = useRouter();
  const { state } = useContext(Context);
  const [user, setUser] = useState(state?.user);

  const [newTasks, setNewTasks] = useState([]);
  const [oldTasks, setOldTasks] = useState([]);
  const [searchNewTasks, setSearchNewTasks] = useState("");
  const [searchOldTasks, setSearchOldTasks] = useState("");
  const [filteredNewTasks, setFilteredNewTasks] = useState([]);
  const [filteredOldTasks, setFilteredOldTasks] = useState([]);

  const handleSearchNewTasks = (search) => {
    setSearchNewTasks(search.toLowerCase());
    filterNewTasks(search.toLowerCase());
  };

  const handleSearchOldTasks = (search) => {
    setSearchOldTasks(search.toLowerCase());
    filterOldTasks(search.toLowerCase());
  };

  const filterNewTasks = (search) => {
    if (!search) {
      setFilteredNewTasks(newTasks);
    } else {
      setFilteredNewTasks(
        newTasks.filter((task) => task.title.toLowerCase().includes(search))
      );
    }
  };

  const filterOldTasks = (search) => {
    if (!search) {
      setFilteredOldTasks(oldTasks);
    } else {
      setFilteredOldTasks(
        oldTasks.filter((task) => task.title.toLowerCase().includes(search))
      );
    }
  };

  // Actualiza el usuario cuando cambie el estado global
  useEffect(() => {
    setUser(state?.user);
  }, [state?.user]);

  // Realiza la petición a la API cuando el usuario esté disponible
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/to_do?id=${user.id}`);
        const tasks = res.data;
        setNewTasks(tasks.filter((task) => task.status === "PENDING"));
        setOldTasks(tasks.filter((task) => task.status !== "PENDING"));
        // Establecer las tareas filtradas inicialmente
        setFilteredNewTasks(tasks.filter((task) => task.status === "PENDING"));
        setFilteredOldTasks(tasks.filter((task) => task.status !== "PENDING"));
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]); // Incluye `user` como dependencia

  if (!user || (!newTasks && !oldTasks)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`${plus_jakarta.className} flex flex-col h-screen relative gap-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header>
          <UserSerivceNavBar />
        </header>
        <main className="flex-grow mb-16">
          <section
            className={`${plus_jakarta.className} relative flex flex-col gap-4 m-3 lg:flex-row lg:justify-around`}
          >
            <div className="flex flex-col gap-4 lg:w-[45%]">
              <SearchBar data={searchNewTasks} setData={handleSearchNewTasks} />
              <TodayTaskSection data={filteredNewTasks} />
            </div>
            <section className="flex flex-col gap-4 lg:w-[45%]">
              <SearchBar data={searchOldTasks} setData={handleSearchOldTasks} />
              <h2 className="font-bold text-2xl text-[#121417]">
                Historial de tareas
              </h2>
              {filterOldTasks > 0 ? (
                filteredOldTasks?.map((item) => (
                  <TaskCardSimple
                    key={item?.id}
                    action={() =>
                      router.push(
                        "/pages/worker-panel/tasks/details?id=" + item?.id
                      )
                    }
                    type={item?.type?.toLowerCase()}
                    status={item?.status?.toLowerCase()}
                    title={item?.title}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-[#121417]">No hay tareas para mostrar</p>
                </div>
              )}
            </section>
          </section>
        </main>
        <footer className="fixed bottom-0 left-0 w-full bg-white">
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

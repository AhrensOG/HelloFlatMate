"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";

import BottomNavBar from "../bottomNavBar/BottomNavBar";
import UserServiceNavBar from "../nav_bar/UserServiceNavBar";
import SearchBar from "../home/SearchBar";
import ApplicationCardHistory from "../../user/history/application/ApplicationCardHistory";

export default function TasksSection({ section }) {
  const router = useRouter();
  const t = useTranslations("worker_panel.tasks");

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    CLEAN: false,
    REPAIR: false,
    PENDING: false,
    IN_PROGRESS: false,
    COMPLETED: false,
    CANCELLED: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/to_do");
        setTasks(res.data);
        setFilteredTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const { CLEAN, REPAIR, PENDING, IN_PROGRESS, COMPLETED, CANCELLED } =
      filters;

    const filtered = tasks.filter((task) => {
      // Filtro por tipo
      const matchesType =
        (!CLEAN && !REPAIR) ||
        (CLEAN && task.type === "CLEAN") ||
        (REPAIR && task.type === "REPAIR");

      // Filtro por estado
      const anyStatusSelected =
        PENDING || IN_PROGRESS || COMPLETED || CANCELLED;
      const matchesStatus =
        !anyStatusSelected ||
        (PENDING && task.status === "PENDING") ||
        (IN_PROGRESS && task.status === "IN_PROGRESS") ||
        (COMPLETED && task.status === "COMPLETED") ||
        (CANCELLED && task.status === "CANCELLED");

      // Filtro por búsqueda
      const matchesSearch =
        !searchTerm ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesStatus && matchesSearch;
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filters]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleShowDetails = (task) => {
    router.push(`/pages/worker-panel/tasks/details?id=${task.id}`);
  };

  if (!tasks) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <header className="w-full">
          <UserServiceNavBar />
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
        className="flex flex-col h-[97vh] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}>
        <header>
          <UserServiceNavBar />
        </header>

        <main className="flex-grow overflow-y-auto mb-16">
          <motion.section
            className="flex flex-col gap-2 py-4 m-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="flex justify-center items-center mb-4 w-full">
              <h2 className="text-[#000000CC] font-bold text-xl">
                {t("h2_1")}
              </h2>
            </div>

            <div className="lg:flex lg:justify-between lg:items-start gap-6">
              <div className="lg:w-[45%]">
                <SearchBar data={searchTerm} setData={setSearchTerm} />
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.CLEAN}
                      onChange={(e) =>
                        handleFilterChange("CLEAN", e.target.checked)
                      }
                    />
                    {t("clean")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.REPAIR}
                      onChange={(e) =>
                        handleFilterChange("REPAIR", e.target.checked)
                      }
                    />
                    {t("repair")}
                  </label>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.PENDING}
                      onChange={(e) =>
                        handleFilterChange("PENDING", e.target.checked)
                      }
                    />
                    {t("cards.pending")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.IN_PROGRESS}
                      onChange={(e) =>
                        handleFilterChange("IN_PROGRESS", e.target.checked)
                      }
                    />
                    {t("cards.in_progress")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.COMPLETED}
                      onChange={(e) =>
                        handleFilterChange("COMPLETED", e.target.checked)
                      }
                    />
                    {t("cards.completed")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.CANCELLED}
                      onChange={(e) =>
                        handleFilterChange("CANCELLED", e.target.checked)
                      }
                    />
                    {t("cards.cancelled")}
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex flex-col gap-4">
              {filteredTasks.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-[#121417] text-lg font-medium p-4 rounded-lg">
                    {t("p_1")}
                  </p>
                </div>
              ) : (
                [...filteredTasks]
                  .sort((a, b) => {
                    const order = {
                      PENDING: 0,
                      IN_PROGRESS: 1,
                      COMPLETED: 2,
                      CANCELLED: 3,
                    };
                    return order[a.status] - order[b.status];
                  })
                  .map((task) => (
                    <div
                      key={task.id}
                      className="hover:scale-[1.01] transition">
                      <ApplicationCardHistory
                        action={() => handleShowDetails(task)}
                        data={task}
                      />
                    </div>
                  ))
              )}
            </div>
          </motion.section>
        </main>

        <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md">
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

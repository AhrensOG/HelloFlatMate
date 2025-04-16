"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Context } from "@/app/context/GlobalContext";
import ApplicationCardHistory from "../../user/history/application/ApplicationCardHistory";
import Buttons from "./task_details/Buttons";
import TaskModal from "./task_details/modal/TaskModal";
import UserSerivceNavBar from "../nav_bar/UserServiceNavBar";
import BottomNavBar from "../bottomNavBar/BottomNavBar";
import LocationSection from "../../user/property-details/main/LocationSection";
import {
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
  HiOutlineMapPin,
} from "react-icons/hi2";
import TaskInfoCard from "./task_details/TaskInfoCard";
import TaskInfoSection from "./task_details/TaskInfoSection";
import ToDoMessagesSection from "./task_details/ToDoMessagesSection";

export default function TaskDetails({ section }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { state } = useContext(Context);
  const t = useTranslations("worker_panel.tasks.task_details");

  const [user, setUser] = useState(null);
  const [task, setTask] = useState();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (state?.user) setUser(state.user);
  }, [state.user]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`/api/to_do?id=${id}`);
      setTask(res.data);
    } catch (err) {
      toast.error("No se pudo obtener la tarea.");
    }
  };

  useEffect(() => {
    if (user && id) fetchTask();
  }, [user, id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleShowModal = async (comment, status) => {
    setShowModal(false);
    setType(status);
    const toastId = toast.loading(t("responses_1.loading"));
    try {
      await axios.patch(`/api/to_do`, { id: task.id, status, comment });
      await fetchTask();
      toast.success(t("responses_1.success"), { id: toastId });
    } catch {
      toast.error(t("responses_1.error"), { id: toastId });
    }
  };

  const handleModal = (status) => {
    setType(status);
    setShowModal(true);
  };

  const claimTask = async () => {
    const toastId = toast.loading(t("responses_2.loading"));
    try {
      await axios.patch(`/api/to_do?type=asing`, {
        id: task.id,
        workerId: user?.id,
        userId: task.userId,
      });
      await fetchTask();
      toast.success(t("responses_2.success"), { id: toastId });
    } catch {
      toast.error(t("responses_2.error"), { id: toastId });
    }
  };

  const cancelTask = async () => {
    const toastId = toast.loading("Cancelando tarea...");
    try {
      await axios.patch(`/api/to_do`, {
        id: task.id,
        status: "CANCELLED",
        cancellationReason: cancelReason,
      });
      await fetchTask();
      setShowCancelModal(false);
      toast.success("Tarea cancelada", { id: toastId });
    } catch {
      toast.error("No se pudo cancelar", { id: toastId });
    }
  };

  if (!user || !task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-[#440cac] border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col min-h-screen bg-[#F7FAFA]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}>
        <header>
          <UserSerivceNavBar />
        </header>

        <main className="flex-grow">
          <motion.section
            className="flex flex-col gap-6 py-4 px-4 lg:px-8 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <TaskInfoSection task={task} />

            <ToDoMessagesSection toDoId={task.id} currentUser={user} />

            {(task.status === "IN_PROGRESS" || task.status === "PENDING") &&
              task.workerId !== null && <Buttons action={handleModal} />}

            {task.workerId === null && (
              <div className="w-full flex justify-center">
                <button
                  onClick={claimTask}
                  className="w-full max-w-md h-12 bg-[#0C1660] text-white font-bold rounded-lg hover:bg-[#09104a] transition">
                  {t("claim_task")}
                </button>
              </div>
            )}

            {(task.status === "PENDING" || task.status === "IN_PROGRESS") && (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full max-w-md h-12 border border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                  Cancelar tarea
                </button>
              </div>
            )}
          </motion.section>
        </main>

        {showModal && (
          <TaskModal
            type={type}
            action={handleShowModal}
            showModal={setShowModal}
          />
        )}

        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
              <h2 className="text-lg font-bold text-red-600">Cancelar tarea</h2>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Motivo de cancelación"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition">
                  Cerrar
                </button>
                <button
                  onClick={cancelTask}
                  disabled={cancelReason.trim() === ""}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    cancelReason.trim()
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="sticky bottom-0">
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

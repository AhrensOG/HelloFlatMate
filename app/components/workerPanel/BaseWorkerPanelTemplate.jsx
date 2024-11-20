import React, { useEffect, useState } from "react";
import BottomNavBar from "./bottomNavBar/BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import UserSerivceNavBar from "./nav_bar/UserServiceNavBar";
 
import { useSearchParams } from "next/navigation";
import axios from "axios";
import TaskDetails from "./tasks/TaskDetails";

const BaseWorkerPanelTemplate = ({ children, section }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/to_do?id=${id}`);
        setTask(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  }, [id]);

  return (
    <AnimatePresence>
      <motion.div
        className={`  flex flex-col h-screen`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header>
          <UserSerivceNavBar />
        </header>
        <main className="flex-grow">
          {section === "tareas" ? <TaskDetails task={task} /> : children}
        </main>
        <footer>
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default BaseWorkerPanelTemplate;

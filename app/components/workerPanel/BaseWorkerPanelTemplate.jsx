import React from "react";
import BottomNavBar from "./bottomNavBar/BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import UserSerivceNavBar from "./nav_bar/UserServiceNavBar";
import { plus_jakarta } from "@/font";

const BaseWorkerPanelTemplate = ({ children, section }) => {
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
          <UserSerivceNavBar />
        </header>
        <main className="flex-grow">{children}</main>
        <footer>
          <BottomNavBar section={section} />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default BaseWorkerPanelTemplate;

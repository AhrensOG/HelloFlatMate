"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bars3Icon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BanknotesIcon,
  BellAlertIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const AdminSideBar = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Propiedades", icon: <BuildingOffice2Icon className="w-6 h-6" /> },
    { name: "Habitaciones", icon: <BuildingOfficeIcon className="w-6 h-6" /> },
    { name: "Cobros", icon: <BanknotesIcon className="w-6 h-6" /> },
    { name: "Pre-reservas", icon: <BellAlertIcon className="w-6 h-6" /> },
    { name: "Reservas", icon: <DocumentTextIcon className="w-6 h-6" /> },
    { name: "Usuarios", icon: <UserGroupIcon className="w-6 h-6" /> },
    { name: "Documentos", icon: <ClipboardDocumentIcon className="w-6 h-6" /> },
    { name: "Periodos", icon: <CalendarDaysIcon className="w-6 h-6" /> },
    {
      name: "Cerrar sesión",
      icon: <ArrowRightStartOnRectangleIcon className="w-6 h-6" />,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen bg-white shadow-lg flex flex-col overflow-hidden border-r drop-shadow-xl rounded-r-xl relative min-w-14 max-w-[180px]"
        initial={{ width: "56px" }}
        animate={{ width: isOpen ? "180px" : "56px" }} // Suavizar transición
        exit={{ width: "56px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }} // Transición suave
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo Fixed */}
        <div className="relative w-full overflow-hidden pb-6 p-1.5">
          <div className="relative w-32 h-10">
            <Image src="/home/new_home/newLogo.png" fill alt="helloflatmate" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col flex-1 space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-all duration-300 group"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => onSelect(item.name)}
            >
              {/* Icon */}
              <div className="w-6 h-6 text-[#440cac] transition-colors duration-300">
                {item.icon}
              </div>

              {/* Text */}
              <motion.span
                className={`ml-4 text-gray-500 whitespace-nowrap font-bold transition-all duration-300 group-hover:text-[#5ce0e5] ${
                  !isOpen ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
              >
                {item.name}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminSideBar;

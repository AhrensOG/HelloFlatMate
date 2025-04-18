"use client";
import Link from "next/link";
import Dropdown from "../public/auth/Dropdown";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";
import NotificationIcon from "./notifications/NotificationIcon";
import { useTranslations } from "next-intl";
import NotificationsModal from "./notifications/NotificationsModal";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NavbarV3({ fixed = false, borderBottom = true }) {
  const { state, dispatch } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const user = state?.user;
  const [notifModalIsOpen, setNotifModalIsOpen] = useState(false);
  const notifications = state?.notifications || [];
  const [unreadCount, setUnreadCount] = useState(state?.unreadCount || null);

  const t = useTranslations("nav_bar");
  const router = useRouter();

  const [locale, setLocale] = useState("es");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    await logOut();
    router.push("/pages/auth");
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferredLanguage");
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notification?id=${user.id}`);
        dispatch({
          type: "SET_NOTIFICATIONS",
          payload: res.data.notifications,
        });
        dispatch({ type: "SET_UNREAD_COUNT", payload: res.data.unreadCount });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchNotifications();
  }, [user?.id, dispatch]);

  useEffect(() => {
    setUnreadCount(state.unreadCount);
  }, [state.unreadCount]);

  const renderMenuOptions = () => {
    switch (state?.user?.role) {
      case "ADMIN":
        return (
          <>
            <Link
              onClick={() => toggleMenu()}
              href={`/pages/admin/new-panel`}
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("admin_link_1")}
            </Link>
          </>
        );
      case "OWNER":
        return (
          <>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/profile"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("owner_link_1")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/dashboard"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("owner_link_2")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/my-tenantsv2"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("owner_link_3")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/payments"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("owner_link_4")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/incidences"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("owner_link_5")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/owner/chats"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              Chats
            </Link>
          </>
        );
      case "CLIENT":
        return (
          <>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/profilev2"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("user_link_1")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/reservations"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("user_link_2")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/history"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("user_link_3")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/payments"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("user_link_4")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/supplies"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("user_link_5")}
            </Link>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/user/chats"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              Chats
            </Link>
          </>
        );
      case "WORKER":
        return (
          <>
            <Link
              onClick={() => toggleMenu()}
              href="/pages/worker-panel/tasks"
              className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
              {t("worker_link_1")}
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav
      className={`flex items-center justify-between py-2 px-4 lg:px-10 z-30 border-[#c7c7c7] bg-white ${
        fixed ? "fixed top-0 w-full h-16 z-20" : "relative"
      } ${borderBottom ? "border-b" : "border-none"}`}>
      {/* Icono de menú hamburguesa a la izquierda */}
      <div className="md:hidden flex justify-center items-center">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Logo */}
      <Link href={`/`}>
        <Image
          src="/home/new_home/Helloflatmate.png"
          width={150}
          height={47.45}
          alt="logo"
        />
      </Link>

      {/* Menú de escritorio */}
      <div className="hidden md:flex items-center gap-5">
        {/* <Link
          href={`/${locale?.toLowerCase()}/ultimas-habitaciones`}
          target="_blank"
          className="font-bold text-base border border-black py-1 p-2 px-5">
          Last rooms
        </Link> */}
        <Link
          href={`/${locale?.toLowerCase()}/como-funciona`}
          target="_blank"
          className="font-bold text-base">
          {t("link_how_it_works")}
        </Link>
        <Link
          href={`/${locale?.toLowerCase()}/terminos-y-condiciones`}
          target="_blank"
          className="font-bold text-base">
          {t("link_terms_and_conditions")}
        </Link>

        {user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 font-bold text-base">
              {user.name} <ChevronDownIcon className="size-4 text-gray-500" />
            </button>
            <div className="absolute right-0 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
              {renderMenuOptions()}
              <button
                onClick={() => handleLogOut()}
                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500 w-full text-start">
                {t("logout")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-1">
            <Link
              href={`/${locale?.toLowerCase()}/pages/auth?register=true`}
              className="font-bold text-base">
              {t("link_register")}
            </Link>
            <span className="font-bold text-base">|</span>
            <Link
              href={`/${locale?.toLowerCase()}/pages/auth`}
              className="font-bold text-base">
              {t("link_login")}
            </Link>
          </div>
        )}
        <Dropdown />
        {/* Notificaciones */}
        {user && (
          <>
            {(unreadCount !== null || unreadCount !== undefined) && (
              <NotificationIcon
                onClick={() => setNotifModalIsOpen(!notifModalIsOpen)}
                count={unreadCount}
              />
            )}
            {notifModalIsOpen && (
              <NotificationsModal
                data={notifications}
                userId={user?.id}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
              />
            )}
          </>
        )}
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 w-full bg-white rounded-md p-4 md:hidden overflow-hidden">
            <div className="flex flex-col">
              <div className="px-6">
                <Dropdown mobile />
              </div>
              {/* <Link
                href="/ultimas-habitaciones"
                target="_blank"
                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                Last rooms
              </Link> */}
              <Link
                href={`/${locale?.toLowerCase()}/como-funciona`}
                target="_blank"
                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                {t("link_how_it_works")}
              </Link>
              <Link
                href="/privacy-policy"
                target="_blank"
                className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                {t("link_terms_and_conditions")}
              </Link>
              {user ? (
                <>
                  {renderMenuOptions()}
                  <button
                    onClick={() => handleLogOut()}
                    className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                    {t("logout")}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  <Link
                    href="/pages/auth?register=true"
                    className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                    {t("link_register")}
                  </Link>
                  <Link
                    href="/pages/auth"
                    className="block transition-all px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                    {t("link_login")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

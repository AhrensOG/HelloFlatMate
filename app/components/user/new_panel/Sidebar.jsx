"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightStartOnRectangleIcon,
  BoltIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  UserIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import { logOut } from "@/app/firebase/logOut";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const t = useTranslations("user_profile_v2.sidebar");
  const { state } = useContext(Context);
  const pathname = usePathname();

  let shouldShowIncidences = false;

  if (
    state.user?.leaseOrdersRoom &&
    Array.isArray(state.user.leaseOrdersRoom)
  ) {
    shouldShowIncidences = state.user.leaseOrdersRoom.some(
      (order) => order.room?.property?.category !== "HELLO_LANDLORD"
    );
  }
  const links = [
    {
      name: t("links.profile"),
      href: "/pages/user/profilev2",
      icon: <UserIcon className="size-6" />,
    },
    {
      name: t("links.payments"),
      href: "/pages/user/payments",
      icon: <CreditCardIcon className="size-6" />,
    },
    {
      name: t("links.reservations"),
      href: "/pages/user/reservations",
      icon: <CalendarIcon className="size-6" />,
    },
    {
      name: "Check-In",
      href: "https://calendly.com/rooms-hfm/30min",
      icon: <CalendarDaysIcon className="size-6" />,
    },
    {
      name: t("links.history"),
      href: "/pages/user/history",
      icon: <ReceiptRefundIcon className="size-6" />,
    },
    {
      name: t("links.supplies"),
      href: "/pages/user/supplies",
      icon: <BoltIcon className="size-6" />,
    },
    {
      name: "Chats",
      href: "/pages/user/chats",
      icon: <ChatBubbleBottomCenterIcon className="size-6" />,
    },
    ...(shouldShowIncidences
      ? [
          {
            name: t("links.incidences"),
            href: "/pages/user/incidences",
            icon: <WrenchIcon className="size-6" />,
          },
        ]
      : []),
  ];

  return (
    <aside className="hidden h-full max-h-[850px] sticky top-8 max-w-80 w-full rounded-xl border bg-white text-gray-800 shadow-sm md:flex flex-col my-4 py-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gray-100 grid place-items-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="105px" height="105px">
            <g fill="none">
              <circle cx={53.5} cy={53.5} r={53.5} fill="var(--sah-shadow)" />
              <path
                fill="#fff"
                d="M73.653 61.847a28.39 28.39 0 0 0-10.83-6.793c4.317-2.973 7.154-7.95 7.154-13.577C69.977 32.39 62.585 25 53.5 25s-16.477 7.391-16.477 16.477c0 5.627 2.837 10.604 7.155 13.577a28.39 28.39 0 0 0-10.83 6.793C27.964 67.23 25 74.387 25 82h4.453c0-13.26 10.787-24.047 24.047-24.047S77.547 68.74 77.547 82H82c0-7.613-2.965-14.77-8.347-20.153zM53.5 53.5c-6.63 0-12.023-5.394-12.023-12.023 0-6.63 5.393-12.024 12.023-12.024s12.023 5.394 12.023 12.024c0 6.63-5.393 12.023-12.023 12.023z"
              />
            </g>
          </svg>
        </div>
        <h2 className="mt-3 text-xl font-bold">{`${
          state.user?.name || " "
        }`}</h2>
      </div>

      <nav className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : "_self"}
            className={`flex items-center text-lg font-bold gap-3 p-5 transition-all border-l-8 hover:border-[#440cac] hover:bg-slate-100 hover:text-[#440cac] ${
              pathname.includes(link.href)
                ? "border-[#440cac] text-[#440cac]"
                : "border-transparent"
            } ${link.name === "Check-In" && "text-red-500"}`}>
            <span>{link.icon}</span>
            {link.name}
          </Link>
        ))}
        <button
          onClick={() => logOut()}
          className={`flex items-center text-lg font-bold gap-3 p-5 transition-all border-l-8 border-transparent hover:border-[#440cac] hover:bg-slate-100 hover:text-[#440cac]`}>
          <span>
            <ArrowRightStartOnRectangleIcon className="size-6" />
          </span>
          {t("btn_logout")}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

"use client";

import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import { montserrat } from "@/font";
import React from "react";
import { usePathname } from "next/navigation";
import OwnerSidebar from "@/app/components/owner/new_panel/OwnerSideBar";
import { useTranslations } from "next-intl";
const ownerDashboardLayout = ({ children }) => {
    const t = useTranslations("owner_panel");
    const pathname = usePathname();

    const renderProgressBar = () => {
        if (pathname.includes("/pages/owner/dashboard")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">{t("title_1")}</span>
                </div>
            );
        } else if (pathname.includes("/pages/owner/profile")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">{t("title_2")}</span>
                </div>
            );
        } else if (pathname.includes("/pages/owner/my-tenantsv2")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">{t("title_3")}</span>
                </div>
            );
        } else if (pathname.includes("/pages/owner/chats")) {
          return (
              <div className="hidden md:flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                  <span className="p-6 text-xl font-bold">{t("title_5")}</span>
              </div>
          );
      }
        return null;
    };

    return (
        <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
            <NavbarV3 borderBottom={false} />

            {renderProgressBar()}

            <div className={`bg-white flex justify-center items-start grow`}>
                <div className={`flex grow max-w-screen-xl w-full gap-8 ${pathname.includes("/pages/owner/chats/chat") ? "mx-0 md:mx-4 h-[calc(100vh-63.28px)] md:h-auto" : "mx-4" }`}>
                    <OwnerSidebar />
                    <main className={`grow contain-inline-size ${pathname.includes("/pages/owner/chats/chat") ? "h-[calc(100vh-63.28px)] sm:h-auto mt-0 md:mt-4" : "mt-4" }`}>{children}</main>
                </div>
            </div>
        </div>
    );
};

export default ownerDashboardLayout;

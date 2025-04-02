"use client";

import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import Sidebar from "@/app/components/user/new_panel/Sidebar";
import { montserrat } from "@/font";
import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import ProfileProgressBar from "@/app/components/user/new_panel/profile/auxiliarComponents/ProfileProgressBar";
import ContractProgressBar from "@/app/components/user/new_panel/contract/auxiliarComponents/ContractProgressBar";
import ContractProgressBarFallback from "@/app/components/user/new_panel/contract/auxiliarComponents/fallbacks/ContractProgressBarFallback";
import { useTranslations } from "next-intl";

const UserDashboardLayout = ({ children }) => {
    const t = useTranslations("user_profile_v2");
    const pathname = usePathname();

    const renderProgressBar = () => {
        if (pathname.includes("/pages/user/profile")) {
            return <ProfileProgressBar />;
        } else if (pathname.includes("/pages/user/payments")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] bg-[#f7f7f7] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">{t("title_1")}</span>
                </div>
            );
        } else if (pathname.includes("/pages/user/reservations")) {
            return null;
        } else if (pathname.includes("/pages/user/contractv2")) {
            return (
                <Suspense fallback={<ContractProgressBarFallback />}>
                    <ContractProgressBar />
                </Suspense>
            );
        } else if (pathname.includes("/pages/user/history")) {
            return null;
        } else if (pathname.includes("/pages/user/supplies")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] bg-[#f7f7f7] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">{t("title_2")}</span>
                </div>
            );
        } else if (pathname.includes("/pages/user/chats")) {
            return null;
        }
        return null;
    };

    return (
        <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
            <NavbarV3 borderBottom={false} />

            {renderProgressBar()}

            <div
                className={`${
                    pathname.includes("/pages/user/reservations") ||
                    pathname.includes("/pages/user/history")
                        ? "bg-white pt-10"
                        : pathname.includes("/pages/user/contractv2")
                        ? "bg-white"
                        : ""
                } ${
                  pathname.includes("/pages/user/chats")
                      ? "bg-white md:pt-10"
                      : pathname.includes("/pages/user/contractv2")
                      ? "bg-white"
                      : ""
              } flex justify-center items-start grow bg-[#f7f7f7]`}
            >
                <div className={`flex grow max-w-screen-xl w-full gap-8 ${pathname.includes("/pages/user/chats/chat") ? "mx-0 md:mx-4 h-[calc(100vh-63.28px)] md:h-auto" : "mx-4" }`}>
                    <Sidebar />
                    <main className={`w-full flex grow ${pathname.includes("/pages/user/chats/chat") ? "h-[calc(100vh-63.28px)] sm:h-auto mt-0 md:mt-4" : "mt-4" }`}>{children}</main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;

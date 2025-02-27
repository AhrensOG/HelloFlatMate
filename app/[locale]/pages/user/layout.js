"use client";

import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import Sidebar from "@/app/components/user/new_panel/Sidebar";
import { montserrat } from "@/font";
import React from "react";
import { usePathname } from "next/navigation";
import ProfileProgressBar from "@/app/components/user/new_panel/profile/auxiliarComponents/ProfileProgressBar";

const UserDashboardLayout = ({ children }) => {
    const pathname = usePathname();

    const renderProgressBar = () => {
        if (pathname.includes("/pages/user/profile")) {
            return <ProfileProgressBar />;
        } else if (pathname.includes("/pages/user/payments")) {
            return (
                <div className="flex w-full justify-start items-end h-[102px] bg-[#f7f7f7] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">Pagos</span>
                </div>
            );
        } else if (pathname.includes("/pages/user/reservations")) {
            return null;
        }
        return null;
    };

    return (
        <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
            <NavbarV3 />

            {renderProgressBar()}

            <div className="flex justify-center items-start grow bg-[#f7f7f7]">
                <div className="flex grow max-w-screen-xl w-full">
                    <Sidebar />
                    <main className="grow p-8 pb-0 px-4">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;

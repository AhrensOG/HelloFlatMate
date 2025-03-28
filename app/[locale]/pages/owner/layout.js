"use client";

import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import { montserrat } from "@/font";
import React from "react";
import { usePathname } from "next/navigation";
import OwnerSidebar from "@/app/components/owner/new_panel/OwnerSideBar";
const ownerDashboardLayout = ({ children }) => {
    const pathname = usePathname();

    const renderProgressBar = () => {
        if (pathname.includes("/pages/owner/dashboard")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">Dashboard</span>
                </div>
            );
        } else if (pathname.includes("/pages/owner/profile")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">Perfil</span>
                </div>
            );
        } else if (pathname.includes("/pages/owner/my-tenantsv2")) {
            return (
                <div className="flex w-full justify-start items-end h-[86px] border-b-2 border-gray-300">
                    <span className="p-6 text-xl font-bold">Mis inquilinos</span>
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
                <div className="flex grow max-w-screen-xl w-full gap-8 mx-4">
                    <OwnerSidebar />
                    <main className="grow mt-4">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default ownerDashboardLayout;

"use client";


import Clausulas from "@/app/components/public/clausulas/Clausulas";
import Footer_1 from "@/app/components/public/home/Footer";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";

export default function PrivacyPolicyPage() {
    return (
        <>
            <header>
            <NavbarV3 />
            </header>
            <Clausulas/>
            <Footer_1 />
        </>
    );
}

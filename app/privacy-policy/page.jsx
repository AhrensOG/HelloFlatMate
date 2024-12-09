"use client";


import PrivacyPolicy from "@/app/components/public/privacy-policy/PrivacyPolicy";
import Footer_1 from "@/app/components/public/home/Footer";
import NavbarV3 from "../components/nav_bar/NavbarV3";


export default function PrivacyPolicyPage() {
    return (
        <>
            <header>
            <NavbarV3 />
            </header>
            <PrivacyPolicy />
            <Footer_1 />
        </>
    );
}

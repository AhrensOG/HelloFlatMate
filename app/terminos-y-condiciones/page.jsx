"use client";

import TerminosCondiciones from "@/app/components/public/terminos-condiciones/TerminosCondiciones";
import Footer_1 from "@/app/components/public/home/Footer";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";


export default function PrivacyPolicyPage() {
    return (
        <>
            <header>
            <NavbarV3 />
            </header>
            <TerminosCondiciones/>
            <Footer_1 />
        </>
    );
}

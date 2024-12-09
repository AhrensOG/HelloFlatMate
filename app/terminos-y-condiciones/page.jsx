"use client";
import NavBar_1 from "@/app/components/public/home/NavBar_1";
import TerminosCondiciones from "@/app/components/public/terminos-condiciones/TerminosCondiciones";
import Footer_1 from "@/app/components/public/home/Footer";

export default function PrivacyPolicyPage() {
    return (
        <>
            <header>
            <NavBar_1 />
            </header>
            <TerminosCondiciones/>
            <Footer_1 />
        </>
    );
}

"use client";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import FAQ2 from "@/app/components/public/faqs/FAQ2";
import FAQS from "@/app/components/public/faqs/FAQS";
import Footer_1 from "@/app/components/public/home/Footer";

export default function FAQsPage() {
    return (
        <>
            <header>
            <NavbarV3 />
            </header>
            <FAQ2 />
            <Footer_1 />
        </>
    );
}

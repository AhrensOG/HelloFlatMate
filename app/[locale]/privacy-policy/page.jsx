"use client";

import NavBar from "@/app/components/nav_bar/NavBar";
import PrivacyPolicy from "@/app/components/public/privacy-policy/PrivacyPolicy";

export default function PrivacyPolicyPage() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <PrivacyPolicy />
        </>
    );
}

"use client";

import Footer_1 from "@/app/components/public/home/Footer";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import LegalNotice from "@/app/components/public/legal-notice/LegalNotice";

export default function LegalNoticePage() {
  return (
    <>
      <header>
        <NavbarV3 />
      </header>
      <LegalNotice />
      <Footer_1 />
    </>
  );
}

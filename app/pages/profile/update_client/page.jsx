"use client";
import NavBarProfile from "@/app/components/profile/NavBarProfile";
import UpdateClient from "@/app/components/profile/update_data/UpdateClient";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UpdateClientPage() {
  const router = useRouter();

  return (
    <AnimatePresence>
      <div className={`${plus_jakarta.className}`}>
        <header className="px-2">
          <NavBarProfile action={() => router.back()} />
        </header>
        <UpdateClient />
      </div>
    </AnimatePresence>
  );
}

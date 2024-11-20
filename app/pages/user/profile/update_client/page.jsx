"use client";
import NavBarProfile from "@/app/components/user/profile/NavBarProfile";
import UpdateClient from "@/app/components/user/profile/update_data/UpdateClient";
 
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UpdateClientPage() {
  const router = useRouter();

  return (
    <AnimatePresence>
      <div className={` `}>
        <header className="px-2">
          <NavBarProfile action={() => router.back()} />
        </header>
        <UpdateClient />
      </div>
    </AnimatePresence>
  );
}

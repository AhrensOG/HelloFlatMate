"use client";

import Auth from "@/app/components/public/auth/Auth";
import Dropdown from "@/app/components/public/auth/Dropdown";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function AuthFallback() {
  return <div>Loading...</div>; // O cualquier otro fallback visual
}

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <header>
        <nav className="flex justify-between items-center p-5 absolute top-0 w-full z-20">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="size-6 sm:text-white"/>
          </button>
          <Dropdown />
        </nav>
      </header>
      <main className="flex justify-center items-center grow h-screen">
        <Suspense fallback={<AuthFallback />}>
          <Auth />
        </Suspense>
      </main>
    </div>
  );
}

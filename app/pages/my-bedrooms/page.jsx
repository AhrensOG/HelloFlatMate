"use client";
import MyBedroomDetails from "@/app/components/history/bedroom/MyBedroomDetails";
import MyBedroomActivitys from "@/app/components/history/bedroom/MyBedroomActivitys";
import NavBarHistory from "@/app/components/history/NavBarHistory";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyBedroomsList from "@/app/components/history/bedroom/MyBedroomsList";

export default function MyBedrooms() {
  const route = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState({});

  const handleShowdetails = (info) => {
    if (info) {
      setDetailsInfo(info);
      setShowDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setDetailsInfo({});
  };

  return (
    <AnimatePresence>
      <header className="py-2">
        <NavBarHistory
          title={`${!showDetails ? "Mis dormitorios" : "Mi dormitorio"}`}
          redirect={
            !showDetails
              ? () => {
                  route.back();
                }
              : handleCloseDetails
          }
        />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col px-5 my-8 gap-10`}
      >
        {!showDetails ? (
          <MyBedroomsList action={handleShowdetails} />
        ) : (
          <>
            <MyBedroomDetails />
            <MyBedroomActivitys />
          </>
        )}
      </main>
    </AnimatePresence>
  );
}

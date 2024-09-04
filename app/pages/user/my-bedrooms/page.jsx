"use client";
import MyBedroomDetails from "@/app/components/user/history/bedroom/MyBedroomDetails";
import MyBedroomActivitys from "@/app/components/user/history/bedroom/MyBedroomActivitys";
import NavBarHistory from "@/app/components/user/history/NavBarHistory";
import { plus_jakarta } from "@/font";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MyBedroomsList from "@/app/components/user/history/bedroom/MyBedroomsList";
import { Context } from "@/app/context/GlobalContext";

export default function MyBedrooms() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [propertiesList, setPropertiesList] = useState([]);
  const { state } = useContext(Context);

  const handleShowDetails = (info) => {
    if (info) {
      setSelectedRoom(info);
      setShowDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRoom(null);
  };

  useEffect(() => {
    if (state.user) {
      const user = state?.user;
      const rooms = user?.leaseOrdersRoom || [];
      const properties = user?.leaseOrdersProperty || [];

      setPropertiesList([...rooms, ...properties]);
    }
  }, [state?.user]);

  return (
    <>
      <header className="py-2">
        <NavBarHistory
          title={`${!showDetails ? "Mis dormitorios" : "Mi dormitorio"}`}
          redirect={
            !showDetails
              ? () => {
                  router.back();
                }
              : handleCloseDetails
          }
        />
      </header>
      <main
        className={`${plus_jakarta.className} flex flex-col justify-center items-center w-full px-5 my-8 gap-10`}
      >
        <AnimatePresence mode="wait">
          {!showDetails ? (
            propertiesList.length > 0 ? (
              <MyBedroomsList
                key="list"
                action={handleShowDetails}
                properties={propertiesList}
                user={state?.user || false}
              />
            ) : (
              <motion.p
                key="empty"
                className="w-full text-center text-xl font-medium text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ¡Aun no tienes dormitorios!
              </motion.p>
            )
          ) : (
            <motion.div
              key="details"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
            >
              {selectedRoom && (
                <div className="flex flex-col justify-center items-center gap-6 w-full">
                  <MyBedroomDetails room={selectedRoom} />
                  <MyBedroomActivitys data={selectedRoom} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

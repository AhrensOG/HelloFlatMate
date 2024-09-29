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
import NavBar from "@/app/components/nav_bar/NavBar";

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

      const allProperties = [...rooms, ...properties];
      const filtered = allProperties.filter(
        (property) => property.status === "APPROVED"
      );
      setPropertiesList(filtered);
    }
  }, [state?.user]);

  return (
    <>
      {/* MOBILE DESIGN */}
      <div className="flex flex-col w-full sm:hidden">
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
      </div>
      {/* DESKTOP DESIGN */}
      <div className="sm:flex flex-col w-full hidden">
        <AnimatePresence mode="wait">
          <div className="h-screen flex flex-col w-full">
            <motion.header
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.25 }}
            >
              <NavBar client={true} admin={false} owner={false} />
            </motion.header>
            <div className="flex h-[calc(100vh-93px)] w-full">
              {/* Left side: Bedroom list */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25 }}
                className="w-3/6 md:w-1/3 h-full overflow-y-auto p-4 border-r"
              >
                {propertiesList.length > 0 ? (
                  <MyBedroomsList
                    key="list"
                    action={handleShowDetails}
                    properties={propertiesList}
                    user={state?.user || false}
                  />
                ) : (
                  <p className="text-center text-xl font-medium text-slate-400">
                    ¡Aun no tienes dormitorios!
                  </p>
                )}
              </motion.div>

              {/* Right side: Bedroom details */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25 }}
                className="w-3/6 md:w-2/3 h-full overflow-y-auto p-4"
              >
                {selectedRoom ? (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-center items-center gap-6 w-full"
                  >
                    <MyBedroomDetails room={selectedRoom} />
                    <MyBedroomActivitys data={selectedRoom} />
                  </motion.div>
                ) : (
                  <p className="text-center text-xl font-medium text-slate-400">
                    Selecciona un dormitorio para ver los detalles
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

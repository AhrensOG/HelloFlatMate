"use client";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import NavBar from "@/app/components/nav_bar/NavBar";
import ReservationSection from "@/app/components/user/profile/reservations/ReservationSection";
import { useEffect } from "react";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";

export default function MyBedrooms() {
  const { state } = useContext(Context);
  const [user, setUser] = useState(false);
  const [leaseOrdersList, setLeaseOrdersList] = useState([]);

  useEffect(() => {
    if (state.user) {
      const getData = async () => {
        const res = await axios.get(`/api/user?id=${state?.user?.id}`);
        setUser(res.data);
        const leaseRooms = res.data?.leaseOrdersRoom;
        const leaseProperties = res.data?.leaseOrdersProperty;

        setLeaseOrdersList([...leaseRooms, ...leaseProperties]);
      };
      getData();
    }
  }, [state.user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <AnimatePresence>
      <>
        <headear>
          <NavBar client={true} admin={false} owner={false} />
        </headear>
        <ReservationSection data={user} leaseOrdersList={leaseOrdersList} />
      </>
    </AnimatePresence>
  );
}

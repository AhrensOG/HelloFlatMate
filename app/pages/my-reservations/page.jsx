"use client";
import MyBedroomDetails from "@/app/components/history/bedroom/MyBedroomDetails";
import MyBedroomActivitys from "@/app/components/history/bedroom/MyBedroomActivitys";
import NavBarHistory from "@/app/components/history/NavBarHistory";
import { plus_jakarta } from "@/font";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import MyBedroomsList from "@/app/components/history/bedroom/MyBedroomsList";
import NavBar from "@/app/components/nav_bar/NavBar";
import ReservationSection from "@/app/components/profile/reservations/ReservationSection";
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
        const leaseRooms = res.data?.leaseOrdersRoom
        const leaseProperties = res.data?.leaseOrdersProperty

        setLeaseOrdersList([...leaseRooms, ...leaseProperties])
      };
      getData();
    }
  }, [state.user]);

  return (
    <AnimatePresence>
      <>
        <headear>
          <NavBar client={true} admin={false} owner={false} />
        </headear>
        <ReservationSection data={user} leaseOrdersList={leaseOrdersList}/>
      </>
    </AnimatePresence>
  );
}

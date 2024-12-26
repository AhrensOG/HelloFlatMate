"use client";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import NavBar from "@/app/components/nav_bar/NavBar";
import ReservationSection from "@/app/components/user/profile/reservations/ReservationSection";
import { useEffect } from "react";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import BotIcon from "@/app/components/public/chat-bot/BotIcon";
import BotModal from "@/app/components/public/chat-bot/BotModal";

export default function MyReservations() {
    const { state } = useContext(Context);
    const [user, setUser] = useState(false);
    const [leaseOrdersList, setLeaseOrdersList] = useState([]);

    useEffect(() => {
        if (state.user) {
            const getData = async () => {
                try {
                    setUser(state.user);
                    const leaseRooms = state.user?.leaseOrdersRoom;
                    // const leaseProperties = state.user?.leaseOrdersProperty;

                    setLeaseOrdersList([...leaseRooms]);
                } catch (error) {
                    console.log(error);
                }
            };
            getData();
        }
    }, [state.user]);

    if (!user) {
        return (
            <AnimatePresence>
                <div className="h-screen flex flex-col w-full">
                    <header>
                        <NavBar client={true} admin={false} owner={false} />
                    </header>
                    <div className="flex items-center justify-center grow">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                </div>
            </AnimatePresence>
        );
    }
    return (
        <AnimatePresence>
            <div className="h-screen flex flex-col w-full relative">
                <BotIcon />
                <header>
                    <NavBar client={true} admin={false} owner={false} />
                </header>
                <ReservationSection data={user} leaseOrdersList={leaseOrdersList} />
            </div>
        </AnimatePresence>
    );
}

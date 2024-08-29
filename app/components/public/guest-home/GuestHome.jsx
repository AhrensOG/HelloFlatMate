"use client";
import Banner from "./Banner";
import Features from "./Features";
import Offers from "./Offers";
import TypeRooms from "./TypeRooms";
import { data } from "./type_rooms/typesRoomsData";
import { AnimatePresence } from "framer-motion";

export default function GuestHome() {
  return (
    <AnimatePresence>
      <main className="flex justify-center items-center">
        <div className="w-full max-w-screen-sm">
          <Banner />
          <Offers />
          <TypeRooms data={data} />
          <Features />
        </div>
      </main>
    </AnimatePresence>
  );
}

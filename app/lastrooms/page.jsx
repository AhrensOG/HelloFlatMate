"use client";

import { Suspense } from "react";
import LastRoomsPage from "./LastRoomPage";

export default function LastRooms() {
  return (
    <Suspense fallback={<div></div>}>
      <LastRoomsPage />
    </Suspense>
  );
}

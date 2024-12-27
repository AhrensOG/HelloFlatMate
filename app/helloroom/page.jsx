"use client";

import { Suspense } from "react";
import HelloRoomPage from "./HelloRoomPage";

export default function HelloRoom() {
  return (
    <Suspense fallback={<div></div>}>
      <HelloRoomPage />
    </Suspense>
  );
}

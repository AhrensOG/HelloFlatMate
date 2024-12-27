"use client";

import { Suspense } from "react";
import HelloStudioPage from "./HelloStudioPage";

export default function HelloStudio() {
  return (
    <Suspense fallback={<div></div>}>
      <HelloStudioPage />
    </Suspense>
  );
}

"use client";

import { Suspense } from "react";
import HelloColivingPage from "./HelloColivingPage";

export default function HelloColiving() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HelloColivingPage />
        </Suspense>
    );
}

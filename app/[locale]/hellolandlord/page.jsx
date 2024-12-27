"use client";

import { Suspense } from "react";
import HelloLandlordPage from "./HelloLandLordPage";

export default function HelloLandlord() {
    return (
        <Suspense fallback={<div></div>}>
            <HelloLandlordPage />
        </Suspense>
    );
}

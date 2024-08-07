"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerProfile from "@/app/components/owner/owner_profile/OwnerProfile";
import React from "react";

const OwnerPage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <OwnerProfile />
    </>
  );
};

export default OwnerPage;

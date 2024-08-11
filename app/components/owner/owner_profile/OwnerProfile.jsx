import React from "react";
import ProfileCard from "../../profile/ProfileCard";
import Wallet from "./auxiliarComponents/Wallet";
import ChatSection from "./auxiliarComponents/ChatSection";
import AdviseSection from "./auxiliarComponents/AdviseSection";

const OwnerProfile = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-sm p-4 space-y-6">
        <div className="w-full">
          <h1 className="text-lg font-bold">Mi Perfil</h1>
          <ProfileCard
            link="/pages/admin/profile"
            name={"Propietario"}
            email={"propietario@gmail.com"}
          />
        </div>
        <Wallet />
        <ChatSection />
        <AdviseSection />
      </div>
    </section>
  );
};

export default OwnerProfile;

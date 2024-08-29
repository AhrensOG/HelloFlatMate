import React, { useContext } from "react";
import OwnerProfileCard from "./OwnerProfileCard";
import Wallet from "./auxiliarComponents/Wallet";
import ChatSection from "./auxiliarComponents/ChatSection";
import AdviseSection from "./auxiliarComponents/AdviseSection";
import { Context } from "@/app/context/GlobalContext";

const OwnerProfile = () => {
  const { state } = useContext(Context);
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-sm p-4 space-y-6">
        <div className="w-full">
          <h1 className="text-lg font-bold">Mi Perfil</h1>
          <OwnerProfileCard
            link="/pages/admin/profile"
            image={state?.user?.profilePicture || "/profile/profile.jfif"}
            name={state?.user?.name || "Propietario"}
            email={state?.user?.email || "propietario@gmail.com"}
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

import React, { useState } from "react";
import TenantCard from "./auxiliarComponents/TenantCard";
import TitleAdminPanel from "../../admin/shared/TitleAdminPanel";
import OwnerTenantDetail from "../owner_tenant_detail/OwnerTenantDetail";
import { AnimatePresence, motion } from "framer-motion";

const OwnerTenants = ({ data = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleOpenModal = (tenant) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTenant(null);
  };

  return (
    <section className="w-full flex justify-center items-center relative">
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="w-full absolute top-0 max-w-screen-xl flex flex-col justify-start items-center p-4 space-y-6"
          >
            <div className="w-full flex justify-start items-center gap-6">
              <TitleAdminPanel title={"Mis inquilinos"} />
            </div>
            <div className="w-full max-w-screen-md flex flex-grow flex-col justify-start items-center gap-4">
              {data &&
                data.map((tenant) => {
                  const name = `${tenant.name} ${tenant.lastName}`;
                  const location = `${tenant.street} ${tenant.streetNumber}, ${tenant.city}`;
                  const image =
                    tenant.profilePicture === "" || !tenant.profilePicture
                      ? false
                      : tenant.profilePicture;

                  return (
                    <TenantCard
                      key={tenant.tenantId}
                      name={name}
                      location={location}
                      image={image}
                      action={() => handleOpenModal(tenant)}
                    />
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <motion.div
            key="details"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="flex items-start justify-center w-full"
          >
            <div className="bg-white absolute top-0 rounded-lg w-full flex justify-center items-center">
              <OwnerTenantDetail
                tenant={selectedTenant}
                action={handleCloseModal}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OwnerTenants;

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
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-xl flex flex-col justify-start items-center p-4 space-y-6">
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
      </div>

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <>
            <motion.div
              key="background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50 h-screen"
            />
            <motion.div
              key="details"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="z-50 fixed top-0 flex items-center justify-center p-4 w-full overflow-hidden h-screen"
            >
              <div className="bg-white rounded-lg max-w-xl w-full relative flex justify-center items-center h-auto">
                <OwnerTenantDetail
                  tenant={selectedTenant}
                  action={handleCloseModal}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OwnerTenants;

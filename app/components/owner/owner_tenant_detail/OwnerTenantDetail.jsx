import React, { useState } from "react";
import { toast } from "sonner";
import ContactCard from "./auxiliarComponents/ContactCard";
import StaySection from "./auxiliarComponents/StaySection";
import TransactionSection from "./auxiliarComponents/TransactionSection";
import TitleAdminPanel from "../../admin/shared/TitleAdminPanel";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const OwnerTenantDetail = ({ tenant, action }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    typeSupply: "WATER",
    amount: "",
    expirationDate: "",
    reference: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast("¿Estás seguro de que deseas crear esta solicitud de pago?", {
      action: {
        label: "Confirmar",
        onClick: async () => {
          const data = {
            ...formData,
            propertyId: tenant.propertyId,
            clientId: tenant.tenantId,
          };
          const toastId = toast.loading("Creando solicitud...");
          try {
            await axios.post("/api/owner/supply", data);
            toast.success("Solicitud de pago creada correctamente!", {
              id: toastId,
            });
          } catch (error) {
            toast.error("Error al crear la solicitud de pago", { id: toastId });
            console.error(error);
          } finally {
            setIsModalOpen(false);
          }
        },
      },
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="w-full flex flex-col justify-start items-center">
      <div className="w-full max-w-screen-xl flex flex-col justify-center items-center p-4 space-y-4">
        <div className="w-full flex justify-start items-center gap-6">
          <TitleAdminPanel title={"Detalle"} action={action} />
        </div>
        <div className="w-full divide-y divide-slate-300 space-y-2">
          <ContactCard
            name={`${tenant.name} ${tenant.lastName ? tenant.lastName : ""}`}
            location={`${tenant.street} ${tenant.streetNumber}, ${tenant.city}`}
            image={
              tenant.profilePicture === "" || !tenant.profilePicture
                ? "/profile/profile.png"
                : tenant.profilePicture
            }
            email={tenant.email}
            phoneNumber={tenant.phoneNumber || false}
          />
          <StaySection tenant={tenant} />
        </div>
        <TransactionSection />
        <button
          onClick={openModal}
          className="w-full p-3 text-lg text-white bg-resolution-blue rounded-lg"
        >
          Solicitar Pago
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-black bg-opacity-50 p-8 w-full"
          >
            <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold w-full text-center">
                  Crear solicitud de pago
                </h2>

                <div className="flex flex-col">
                  <label className="text-xs" htmlFor="title">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Ej: Recibo del agua..."
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs" htmlFor="reference">
                    Referencia (Opcional)
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs" htmlFor="typeSupply">
                    Tipo
                  </label>
                  <select
                    id="typeSupply"
                    name="typeSupply"
                    value={formData.typeSupply}
                    onChange={handleInputChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="WATER">Agua</option>
                    <option value="GAS">Gas</option>
                    <option value="ELECTRICITY">Electricidad</option>
                    <option value="EXPENSES">Expensas</option>
                    <option value="INTERNET">Internet</option>
                    <option value="OTHERS">Otros</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs" htmlFor="amount">
                    Monto (€)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    className="p-2 border border-gray-300 rounded number-input-no-appearance"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs" htmlFor="expirationDate">
                    Fecha de Expiración
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 text-white bg-green-500 rounded"
                >
                  Crear
                </button>
              </form>

              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OwnerTenantDetail;

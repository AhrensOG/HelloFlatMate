import { useContext, useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import LeaseOrderSection from "./LeaseOrderSection";
import LeaseOrderClientSection from "./LeaseOrderClientSection";
import LeaseOrderPropertySection from "./LeaseOrderPropertySection";
import LeaseOrderOwnerSection from "./LeaseOrderOwnerSection";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function LeaseOrderPanel({ data }) {
  const router = useRouter();
  const { state } = useContext(Context);

  const [showCurrentLeaseOrder, setShowCurrentLeaseOrder] = useState(true);
  const [showAllLeaseOrders, setShowAllLeaseOrders] = useState(false);

  const property = data;
  const rooms = useMemo(
    () => property?.rooms?.filter((room) => room.leaseOrdersRoom.length > 0),
    [property?.rooms]
  );
  const leaserOrders = useMemo(
    () =>
      property?.category === "HELLO_STUDIO"
        ? property?.leaseOrdersProperty
        : null,
    [property]
  );

  const currentUser = useMemo(() => state?.user, [state?.user]);

  const handleLeaseOrderAction = async (leaseOrder, action) => {
    const dataRequest = {
      leaseOrderId: leaseOrder.id,
      adminId: currentUser.id,
      action,
      propertyId: property.category === "HELLO_STUDIO" ? property.id : null,
      type: property.category === "HELLO_STUDIO" ? "PROPERTY" : "ROOM",
      roomId: property.category === "HELLO_STUDIO" ? null : leaseOrder.roomId,
    };

    try {
      toast.promise(axios.patch(`/api/admin/lease_order`, dataRequest), {
        loading: "Procesando...",
        success: `Orden ${
          action === "PENDING" ? "aprobada" : "rechazada"
        } exitosamente`,
        error: "Error al procesar la acción",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderLeaseOrders = (orders, roomdata, isCurrent) =>
    orders.map((leaseOrder) => (
      <div key={leaseOrder.id} className="my-4">
        <LeaseOrderSection
          data={leaseOrder}
          formatDate={formatDate}
          room={roomdata}
        />
        <LeaseOrderClientSection
          data={leaseOrder.client}
          formatDate={formatDate}
          isSigned={leaseOrder.isSigned}
        />
        {leaseOrder.status === "IN_PROGRESS" && (
          <div className="flex justify-between gap-4 mb-4">
            <button
              onClick={() => handleLeaseOrderAction(leaseOrder, "PENDING")}
              className="px-6 py-2 bg-[#52B46B] text-white rounded-lg hover:bg-green-600 transition"
            >
              Aprobar
            </button>
            <button
              onClick={() => handleLeaseOrderAction(leaseOrder, "REJECTED")}
              className="px-6 py-2 bg-[#E74C3C] text-white rounded-lg hover:bg-red-600 transition"
            >
              Rechazar
            </button>
          </div>
        )}
      </div>
    ));

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <main className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <TitleAdminPanel title="Lease Orders" />

      <div className="flex flex-col gap-2">
        {/* Current Lease Orders */}
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={() => setShowCurrentLeaseOrder(!showCurrentLeaseOrder)}
        >
          <h2 className="text-xl font-bold text-gray-800">Órdenes actuales</h2>
          <ChevronUpIcon
            className={`w-6 h-6 transform transition-transform ${
              showCurrentLeaseOrder ? "rotate-180" : ""
            }`}
          />
        </div>
        <AnimatePresence>
          {showCurrentLeaseOrder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {rooms?.length > 0
                ? rooms.map((room) => (
                    <div key={room.id}>
                      {renderLeaseOrders(
                        room.leaseOrdersRoom.filter(
                          (order) =>
                            order.status === "PENDING" ||
                            order.status === "IN_PROGRESS" ||
                            order.status === "APPROVED"
                        ),
                        room
                      )}
                    </div>
                  ))
                : leaserOrders?.length > 0
                ? renderLeaseOrders(leaserOrders, true)
                : "No hay órdenes actuales."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-2">
        {/* All Lease Orders */}
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={() => setShowAllLeaseOrders(!showAllLeaseOrders)}
        >
          <h2 className="text-xl font-bold text-gray-800">Todas las órdenes</h2>
          <ChevronUpIcon
            className={`w-6 h-6 transform transition-transform ${
              showAllLeaseOrders ? "rotate-180" : ""
            }`}
          />
        </div>
        <AnimatePresence>
          {showAllLeaseOrders && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {rooms?.length > 0
                ? rooms.map((room) => renderLeaseOrders(room.leaseOrdersRoom))
                : leaserOrders?.length > 0
                ? renderLeaseOrders(leaserOrders)
                : "No hay órdenes registradas."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <LeaseOrderPropertySection data={property} formatDate={formatDate} />
        <LeaseOrderOwnerSection data={property.owner} formatDate={formatDate} />
      </div>
    </main>
  );
}

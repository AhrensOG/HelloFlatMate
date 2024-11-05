import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

export default function LeaseOrderPanel(data) {
  const [property, setProperty] = useState(data.data);
  const [client, setClient] = useState(false);
  const [owner, setOwner] = useState(null);
  const [rooms, setRooms] = useState(null);
  const { state } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(state?.user);

  const router = useRouter();
  const [leaserOrders, setLeaserOrders] = useState(
    data.data?.category === "HELLO_STUDIO" ||
      data.data?.category === "HELLO_LANDLORD"
      ? data.data?.leaseOrdersProperty
      : null
  );

  const [showCurrentLeaseOrder, setShowCurrentLeaseOrder] = useState(
    leaserOrders?.length > 0 ? true : false
  );
  const [showAllLeaseOrders, setShowAllLeaseOrders] = useState(false);

  useEffect(() => {
    setCurrentUser(state?.user);
  }, []);

  useEffect(() => {
    if (!client) {
      const fetchClient = async () => {
        try {
          if (leaserOrders && leaserOrders.length > 0) {
            const client = await axios.get(
              `/api/user?id=${leaserOrders[0]?.clientId}`
            );
            if (client) {
              setClient(client?.data || null);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      const fetchOwner = async () => {
        try {
          const owner = await axios.get(`/api/user?id=${property?.ownerId}`);
          setOwner(owner?.data || null);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchRooms = () => {
        const rooms = property.rooms.filter(
          (room) => room.leaseOrdersRoom.length > 0
        );
        setRooms(rooms);
      };
      if (property.rooms.length > 0) {
        fetchRooms();
      }
      fetchClient();
      fetchOwner();
    }
  }, [data, client, leaserOrders, property.ownerId, property.rooms]);

  const aproveLeaseOrder = async (leaseOrder, contract) => {
    try {
      const dataRequest = {
        leaseOrderId: leaseOrder.id,
        adminId: state.user.id,
        action: "APPROVED",
        propertyId:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? property.id
            : null,
        type:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? "PROPERTY"
            : "ROOM",
        roomId:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? null
            : leaseOrder.roomId,
      };
      // await axios.patch("/api/admin/contract", {
      //   contractId: contract.id,
      //   status: "APPROVED",
      // });
      await axios.patch(`/api/admin/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const rejectLeaseOrder = async (leaseOrder, contract) => {
    try {
      const dataRequest = {
        leaseOrderId: leaseOrder.id,
        adminId: state?.user.id,
        action: "REJECTED",
        propertyId:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? property.id
            : null,
        type:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? "PROPERTY"
            : "ROOM",
        roomId:
          property.category === "HELLO_STUDIO" ||
          property.category === "HELLO_LANDLORD"
            ? null
            : leaseOrder.roomId,
      };

      // await axios.patch("/api/admin/contract", {
      //   contractId: contract.id,
      //   status: "REJECTED",
      // });
      await axios.patch(`/api/admin/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  if (!client && !owner && !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <TitleAdminPanel title="Lease Orders" />
      <div className="flex flex-col gap-2">
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={() => setShowCurrentLeaseOrder(!showCurrentLeaseOrder)}
        >
          <h2 className="text-xl font-bold text-gray-800">Ordenes actuales</h2>
          <span
            className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
              showCurrentLeaseOrder ? "bg-[#1C8CD65E] rotate-180" : ""
            }`}
          >
            <ChevronUpIcon />
          </span>
        </div>
        <AnimatePresence>
          {showCurrentLeaseOrder && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Propiedades con room con precio */}
              {(property?.category === "HELLO_ROOM" ||
                property?.category === "HELLO_COLIVING") &&
                rooms?.length > 0 &&
                rooms.map((room) => {
                  // Filtra las órdenes que están en progreso (dentro del rango de fechas y con estado PENDING o APPROVED)
                  const inProgressOrders = room.leaseOrdersRoom.filter(
                    (leaseOrder) => {
                      // const now = new Date();
                      // const startDate = new Date(leaseOrder.startDate);
                      // const endDate = new Date(leaseOrder.endDate);
                      return (
                        leaseOrder.status === "PENDING" ||
                        leaseOrder.status === "APPROVED"
                      );
                    }
                  );

                  // Comprueba si hay órdenes en progreso
                  const hasInProgressOrders = inProgressOrders.length > 0;

                  return (
                    <div
                      key={room.id}
                      className="p-6 bg-[#ECF0F3] rounded-lg shadow-md border border-gray-200 space-y-4 my-4"
                    >
                      {hasInProgressOrders ? (
                        inProgressOrders.map((leaseOrder) => (
                          <div key={leaseOrder.id}>
                            <h2 className="text-2xl font-bold text-[#222B45] mb-2">
                              {room.name}
                            </h2>
                            <LeaseOrderSection
                              data={leaseOrder}
                              formatDate={formatDate}
                            />
                            <LeaseOrderClientSection
                              data={leaseOrder.client}
                              formatDate={formatDate}
                              contract={leaseOrder.client.contracts.find(
                                (contract) =>
                                  (contract.contractableId ==
                                    leaseOrder.roomId &&
                                    contract.contractableType == "ROOM" &&
                                    contract.status == "PENDING") ||
                                  contract.status == "APPROVED"
                              )}
                              isSigned={leaseOrder.isSigned}
                            />
                            {leaseOrder.status === "PENDING" && (
                              <div className="flex justify-between gap-4">
                                <button
                                  onClick={() => {
                                    toast.custom((t) => (
                                      <div className="bg-white p-4 rounded shadow-md text-center">
                                        <p className="text-gray-800 mb-4">
                                          ¿Estás seguro de que deseas aprobar
                                          esta orden de arrendamiento?
                                        </p>
                                        <div className="flex justify-center gap-4">
                                          <button
                                            onClick={() => {
                                              toast.dismiss(t.id); // Cierra el toast actual
                                              // Inicia la acción de aprobación con el toast de tipo `promise`
                                              toast.promise(
                                                aproveLeaseOrder(
                                                  leaseOrder,
                                                  room.contracts.find(
                                                    (contract) =>
                                                      contract.status ===
                                                        "PENDING" &&
                                                      contract.clientId ===
                                                        leaseOrder.client.id &&
                                                      contract.contractableId ===
                                                        leaseOrder.roomId &&
                                                      contract.contractableType ===
                                                        "ROOM"
                                                  )
                                                ),
                                                {
                                                  loading: "Cargando...",
                                                  success:
                                                    "Orden de arrendamiento aceptada",
                                                  error:
                                                    "Error al aceptar la orden de arrendamiento",
                                                }
                                              );
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                          >
                                            Confirmar
                                          </button>
                                          <button
                                            onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                          >
                                            Cancelar
                                          </button>
                                        </div>
                                      </div>
                                    ));
                                  }}
                                  className="px-6 py-2 bg-[#52B46B] text-white rounded-lg hover:bg-green-600 transition"
                                >
                                  Aprobar
                                </button>

                                <button
                                  onClick={() => {
                                    toast.custom((t) => (
                                      <div className="bg-white p-4 rounded shadow-md text-center">
                                        <p className="text-gray-800 mb-4">
                                          ¿Estás seguro de que deseas rechazar
                                          esta orden de arrendamiento?
                                        </p>
                                        <div className="flex justify-center gap-4">
                                          <button
                                            onClick={() => {
                                              toast.dismiss(t.id); // Cierra el toast actual
                                              // Inicia la acción de rechazo con el toast de tipo `promise`
                                              toast.promise(
                                                rejectLeaseOrder(
                                                  leaseOrder,
                                                  room.contracts.find(
                                                    (contract) =>
                                                      contract.status ===
                                                        "PENDING" &&
                                                      contract.clientId ===
                                                        leaseOrder.client.id &&
                                                      contract.contractableId ===
                                                        leaseOrder.roomId &&
                                                      contract.contractableType ===
                                                        "ROOM"
                                                  )
                                                ),
                                                {
                                                  loading: "Cargando...",
                                                  success:
                                                    "Orden de arrendamiento rechazada",
                                                  error:
                                                    "Error al rechazar la orden de arrendamiento",
                                                }
                                              );
                                            }}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                          >
                                            Confirmar
                                          </button>
                                          <button
                                            onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                          >
                                            Cancelar
                                          </button>
                                        </div>
                                      </div>
                                    ));
                                  }}
                                  className="px-6 py-2 bg-[#E74C3C] text-white rounded-lg hover:bg-red-600 transition"
                                >
                                  Rechazar
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-md p-6">
                          <h2 className="text-2xl font-bold text-[#222B45] mb-2">
                            {room.name}
                          </h2>
                          <p className="text-[#464E5F] text-lg font-semibold">
                            No hay órdenes pendientes
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

              {/* Propiedades sin room con precio */}
              {(property?.category === "HELLO_STUDIO" ||
                property?.category === "HELLO_LANDLORD") &&
              leaserOrders?.length > 0 ? (
                leaserOrders
                  .filter(
                    (order) =>
                      order.status === "PENDING" || order.status === "APPROVED"
                  )
                  .map((leaserOrder) => (
                    <div key={leaserOrder.id} className="my-4">
                      <LeaseOrderSection
                        data={leaserOrder}
                        formatDate={formatDate}
                      />
                      {client && (
                        <LeaseOrderClientSection
                          data={client}
                          formatDate={formatDate}
                          contract={client.contracts.find(
                            (contract) =>
                              (contract.status === "PENDING" ||
                                contract.status === "APPROVED") &&
                              contract.contractableId === property.id &&
                              contract.contractableType === "PROPERTY"
                          )}
                          isSigned={leaserOrder.isSigned}
                        />
                      )}
                      {leaserOrder.status === "PENDING" && (
                        <div className="flex justify-between gap-4 mb-4">
                          {console.log(client)}

                          <button
                            onClick={() => {
                              toast.custom((t) => (
                                <div className="bg-white p-4 rounded shadow-md text-center">
                                  <p className="text-gray-800 mb-4">
                                    ¿Estás seguro de que deseas aprobar esta
                                    orden de arrendamiento?
                                  </p>
                                  <div className="flex justify-center gap-4">
                                    <button
                                      onClick={() => {
                                        toast.dismiss(t.id); // Cierra el toast actual
                                        // Inicia la acción de aprobación con el toast de tipo `promise`
                                        toast.promise(
                                          aproveLeaseOrder(
                                            leaserOrder,
                                            client.contracts.find(
                                              (contract) =>
                                                contract.status === "PENDING" &&
                                                contract.contractableId ===
                                                  property.id &&
                                                contract.contractableType ===
                                                  "PROPERTY"
                                            )
                                          ),
                                          {
                                            loading: "Cargando...",
                                            success:
                                              "Orden de arrendamiento aceptada",
                                            error:
                                              "Error al aceptar la orden de arrendamiento",
                                          }
                                        );
                                      }}
                                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ));
                            }}
                            className="px-6 py-2 bg-[#52B46B] text-white rounded-lg hover:bg-green-600 transition"
                          >
                            Aprobar
                          </button>

                          <button
                            onClick={() => {
                              toast.custom((t) => (
                                <div className="bg-white p-4 rounded shadow-md text-center">
                                  <p className="text-gray-800 mb-4">
                                    ¿Estás seguro de que deseas rechazar esta
                                    orden de arrendamiento?
                                  </p>
                                  <div className="flex justify-center gap-4">
                                    <button
                                      onClick={() => {
                                        toast.dismiss(t.id); // Cierra el toast actual
                                        // Inicia la acción de rechazo con el toast de tipo `promise`
                                        toast.promise(
                                          rejectLeaseOrder(
                                            leaserOrder,
                                            client.contracts.find(
                                              (contract) =>
                                                contract.status === "PENDING" &&
                                                contract.contractableId ===
                                                  property.id &&
                                                contract.contractableType ===
                                                  "PROPERTY"
                                            )
                                          ),
                                          {
                                            loading: "Cargando...",
                                            success:
                                              "Orden de arrendamiento rechazada",
                                            error:
                                              "Error al rechazar la orden de arrendamiento",
                                          }
                                        );
                                      }}
                                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      onClick={() => toast.dismiss(t.id)} // Cierra el toast sin hacer nada
                                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ));
                            }}
                            className="px-6 py-2 bg-[#E74C3C] text-white rounded-lg hover:bg-red-600 transition"
                          >
                            Rechazar
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="flex justify-center items-center h-64 bg-[#ECF0F3] rounded-lg shadow-md my-4">
                  <p className="text-[#464E5F] text-lg font-semibold">
                    No hay órdenes pendientes
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white"
          onClick={() => {
            setShowCurrentLeaseOrder(false);
            setShowAllLeaseOrders(!showAllLeaseOrders);
          }}
        >
          <h2 className="text-xl font-bold text-gray-800">Todas las ordenes</h2>
          <span
            className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
              showAllLeaseOrders ? "bg-[#1C8CD65E] rotate-180" : ""
            }`}
          >
            <ChevronUpIcon />
          </span>
        </div>
        <AnimatePresence>
          {showAllLeaseOrders && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Propiedades con room con precio */}
              {(property?.category === "HELLO_ROOM" ||
                property?.category === "HELLO_COLIVING") &&
                (rooms ? (
                  rooms.map((room) => {
                    // Filtra las órdenes que cumplen con los criterios especificados
                    const filteredOrders = room.leaseOrdersRoom;

                    const hasFilteredOrders = filteredOrders.length > 0;

                    return (
                      <div
                        key={room.id}
                        className="p-6 bg-[#ECF0F3] rounded-lg shadow-md border border-gray-200 space-y-4 my-4"
                      >
                        {hasFilteredOrders ? (
                          filteredOrders.map((leaseOrder) => (
                            <div key={leaseOrder.id}>
                              <h2 className="text-2xl font-bold text-[#222B45] mb-2">
                                {room.name}
                              </h2>
                              <LeaseOrderSection
                                data={leaseOrder}
                                formatDate={formatDate}
                                isAll={true}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-[#222B45] mb-2">
                              {room.name}
                            </h2>
                            <p className="text-[#464E5F] text-lg font-semibold">
                              No hay órdenes pendientes
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center h-64 bg-[#ECF0F3] rounded-lg shadow-md my-4">
                    <p className="text-[#464E5F] text-lg font-semibold">
                      No hay habitaciones con órdenes pendientes
                    </p>
                  </div>
                ))}

              {/* Propiedades sin room con precio */}
              {(property?.category === "HELLO_STUDIO" ||
                property?.category === "HELLO_LANDLORD") &&
                (leaserOrders ? (
                  leaserOrders
                    // .filter((leaserOrder) => {
                    //   return (
                    //     !leaserOrder.isActive &&
                    //     leaserOrder.status !== "PENDING"
                    //   );
                    // })
                    .map((leaserOrder) => (
                      <LeaseOrderSection
                        data={leaserOrder}
                        formatDate={formatDate}
                        key={leaserOrder.id}
                        isAll={true}
                      />
                    ))
                ) : (
                  <div className="flex justify-center items-center h-64 bg-[#ECF0F3] rounded-lg shadow-md my-4">
                    <p className="text-[#464E5F] text-lg font-semibold">
                      No hay órdenes pendientes
                    </p>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex flex-row gap-4 justify-between items-stretch">
        <LeaseOrderPropertySection data={property} formatDate={formatDate} />
        <LeaseOrderOwnerSection data={owner} formatDate={formatDate} />
      </div>

      <div className="flex justify-between gap-2 mt-6">
        <button
          onClick={() => router.push(`/pages/admin/supplies/${property.id}`)}
          type="button"
          className="px-6 py-2 bg-resolution-blue text-white rounded-lg hover:bg-[#1A8CA8] transition"
        >
          Ir a suministros
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-[#21ABCC] border border-[#21ABCC] text-white rounded-lg hover:bg-white hover:text-[#21ABCC] transition"
        >
          Ir a documentos
        </button>
      </div>
    </main>
  );
}

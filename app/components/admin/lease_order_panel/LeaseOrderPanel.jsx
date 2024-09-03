import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LeaseOrderSection from "./LeaseOrderSection";
import LeaseOrderClientSection from "./LeaseOrderClientSection";
import LeaseOrderPropertySection from "./LeaseOrderPropertySection";
import LeaseOrderOwnerSection from "./LeaseOrderOwnerSection";

export default function LeaseOrderPanel(data) {
  const [leaserOrders, setLeaserOrders] = useState(
    data.data?.category === "HELLO_STUDIO" ||
      data.data?.category === "HELLO_LANDLORD"
      ? data.data?.leaseOrdersProperty.filter(
          (leaseOrder) => leaseOrder?.status === "PENDING"
        )
      : null
  );
  const [property, setProperty] = useState(data.data);
  const [client, setClient] = useState(null);
  const [owner, setOwner] = useState(null);
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    if (!client) {
      const fetchClient = async () => {
        try {
          const client = await axios.get(
            `/api/user?id=${leaserOrders[0].clientId}`
          );
          if (client) {
            setClient(client?.data || null);
          }
        } catch (error) {
          console.log(error);
        }
      };
      const fetchOwner = async () => {
        try {
          const owner = await axios.get(`/api/user?id=${property.ownerId}`);
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

  const aproveLeaseOrder = async (leaseOrder) => {
    try {
      const dataRequest = {
        leaseOrderId: leaseOrder.id,
        adminId: "89",
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
      await axios.patch(`/api/admin/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const rejectLeaseOrder = async (leaseOrder) => {
    try {
      const dataRequest = {
        leaseOrderId: leaseOrder.id,
        adminId: "89",
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
      await axios.patch(`/api/admin/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  if (!client && !owner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto my-8 p-4">
      {/* Propiedades con room con precio */}
      {(property?.category === "HELLO_ROOM" ||
        property?.category === "HELLO_COLIVING") &&
        (rooms ? (
          rooms.map((room) => {
            const hasInProgressOrders = room.leaseOrdersRoom.some(
              (leaseOrder) => leaseOrder.status === "PENDING"
            );
            return (
              <div
                key={room.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200 space-y-4 my-4"
              >
                {hasInProgressOrders ? (
                  room.leaseOrdersRoom.map((leaseOrder) => (
                    <div key={leaseOrder.id}>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {room.name}
                      </h2>
                      <LeaseOrderSection
                        data={leaseOrder}
                        formatDate={formatDate}
                      />
                      <LeaseOrderClientSection
                        data={leaseOrder.client}
                        formatDate={formatDate}
                      />
                      <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">
                          Contrato
                        </h2>
                        <p className="text-gray-600">Contrato</p>
                      </section>
                      <div className="flex justify-between gap-4 ">
                        <button
                          onClick={() => {
                            return toast.promise(aproveLeaseOrder(leaseOrder), {
                              loading: "Cargando...",
                              success: "Orden de arrendamiento aceptada",
                              error:
                                "Error al aceptar la orden de arrendamiento",
                            });
                          }}
                          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => {
                            return toast.promise(rejectLeaseOrder(leaseOrder), {
                              loading: "Cargando...",
                              success: "Orden de arrendamiento rechazada",
                              error:
                                "Error al rechazar la orden de arrendamiento",
                            });
                          }}
                          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md my-4 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {room.name}
                    </h2>
                    <p className="text-gray-600 text-lg font-semibold">
                      No hay órdenes pendientes
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md my-4">
            <p className="text-gray-600 text-lg font-semibold">
              No hay habitaciones con órdenes pendientes
            </p>
          </div>
        ))}

      {/* Propiedades sin room con precio  */}
      {(property?.category === "HELLO_STUDIO" ||
        property?.category === "HELLO_LANDLORD") &&
        (leaserOrders ? (
          leaserOrders.map((leaserOrder) => (
            <LeaseOrderSection data={leaserOrder} formatDate={formatDate} />
          ))
        ) : (
          <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md my-4">
            <p className="text-gray-600 text-lg font-semibold">
              No hay órdenes pendientes
            </p>
          </div>
        ))}

      {(property?.category === "HELLO_STUDIO" ||
        property?.category === "HELLO_LANDLORD") &&
        client && (
          <LeaseOrderClientSection data={client} formatDate={formatDate} />
        )}

      <LeaseOrderPropertySection data={property} formatDate={formatDate} />

      <LeaseOrderOwnerSection data={owner} formatDate={formatDate} />

      {(property.category === "HELLO_STUDIO" ||
        property.category === "HELLO_LANDLORD") &&
        client && (
          <section className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
            <h2 className="text-xl font-bold text-gray-800">Contrato</h2>
            <p className="text-gray-600">Contrato</p>
          </section>
        )}

      {(property.category === "HELLO_STUDIO" ||
        property.category === "HELLO_LANDLORD") &&
        leaserOrders.length > 0 && (
          <div className="flex justify-between gap-4 ">
            <button
              onClick={() => {
                return toast.promise(aproveLeaseOrder(leaserOrders[0]), {
                  loading: "Cargando...",
                  success: "Orden de arrendamiento aceptada",
                  error: "Error al aceptar la orden de arrendamiento",
                });
              }}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Aprobar
            </button>
            <button
              onClick={() => {
                return toast.promise(rejectLeaseOrder(leaserOrders[0]), {
                  loading: "Cargando...",
                  success: "Orden de arrendamiento rechazada",
                  error: "Error al rechazar la orden de arrendamiento",
                });
              }}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Rechazar
            </button>
          </div>
        )}
    </main>
  );
}

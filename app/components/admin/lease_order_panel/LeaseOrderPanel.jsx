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
          (leaseOrder) => leaseOrder?.status === "IN_PROGRESS"
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
          setClient(client?.data || null);
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
        setLeaserOrders(property.rooms.leaseOrdersRoom);
      };
      if (property.rooms.length > 0) {
        fetchRooms();
      }
      fetchClient();
      fetchOwner();
    }
  }, [data, client]);

  const aproveLeaseOrder = async () => {
    try {
      const dataRequest = {
        leaseOrderId: leaserOrders[0].id,
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
            : leaserOrders[0].roomId,
      };
      await axios.patch(`/api/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const rejectLeaseOrder = async () => {
    try {
      const dataRequest = {
        leaseOrderId: leaserOrders[0].id,
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
            : leaserOrders[0].roomId,
      };
      await axios.patch(`/api/lease_order`, dataRequest);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  if (!client && !owner) return <div>Cargando...</div>;

  return (
    <main class="max-w-4xl mx-auto my-8 p-4">
      {console.log(rooms)}
      {property?.category === "HELLO_STUDIO" ||
      property?.category === "HELLO_LANDLORD" ? (
        leaserOrders?.length > 0 ? (
          leaserOrders.map((leaserOrder) => {
            return (
              <LeaseOrderSection data={leaserOrder} formatDate={formatDate} />
            );
          })
        ) : (
          <div class="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md my-4">
            <p class="text-gray-600 text-lg font-semibold">
              No hay órdenes pendientes
            </p>
          </div>
        )
      ) : (
        rooms.map((room, index) => {
          return (
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 space-y-4 my-4">
              <LeaseOrderSection
                key={room.leaseOrdersRoom[index]?.id}
                data={room.leaseOrdersRoom[index]}
                formatDate={formatDate}
              />
              <LeaseOrderClientSection
                data={room.leaseOrdersRoom[index]?.client}
                formatDate={formatDate}
              />
            </div>
          );
        })
      )}

      {property?.category === "HELLO_STUDIO" || "HELLO_LANDLORD" ? (
        client ? (
          <LeaseOrderClientSection data={client} formatDate={formatDate} />
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}

      <LeaseOrderPropertySection data={property} formatDate={formatDate} />

      <LeaseOrderOwnerSection data={owner} formatDate={formatDate} />

      <section class="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
        <h2 class="text-xl font-bold text-gray-800">Contrato</h2>
        <p class="text-gray-600">Contrato</p>
      </section>

      <div class="flex justify-between gap-4 ">
        <button
          onClick={() => {
            return toast.promise(aproveLeaseOrder(), {
              loading: "Cargando...",
              success: "Orden de arrendamiento aceptada",
              error: "Error al aceptar la orden de arrendamiento",
            });
          }}
          class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Aprobar
        </button>
        <button
          onClick={rejectLeaseOrder}
          class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Rechazar
        </button>
      </div>
    </main>
  );
}

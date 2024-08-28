import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LeaseOrderPanel(data) {
  const [leaserOrders, setLeaserOrders] = useState(
    data.data?.category === "HELLO_STUDIO" ||
      data.data?.category === "HELLO_LANDLORD"
      ? data.data?.leaseOrdersProperty.filter(
          (leaseOrder) => leaseOrder?.status === "IN_PROGRESS"
        )
      : data.data?.rooms
          .filter((room) =>
            room.leaseOrdersRoom.filter(
              (leaseOrder) => leaseOrder?.status === "IN_PROGRESS"
            )
          )
          .map((room) => room.leaseOrdersRoom[0])
  );
  const [property, setProperty] = useState(data.data);
  const [client, setClient] = useState(null);
  const [owner, setOwner] = useState(null);
  const [room, setRoom] = useState(null);

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
      // const fetchRooms = () => {
      //   const rooms = property.rooms.filter(
      //     (room) => room.leaseOrdersRoom.length > 0
      //   );
      //   setRoom(rooms[0] || null);
      // };
      // fetchRooms();
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

  if (!client && !owner) return <div>Cargando...</div>;

  return (
    <main>
      {console.log(leaserOrders[0])}
      <section>
        <h2>Numero de Orden : {leaserOrders[0]?.id || 0}</h2>
        <p>fecha de creacion: {leaserOrders[0]?.date || 0}</p>
        <p>
          Fecha de inicio de la ocupación : {leaserOrders[0]?.startDate || 0}
        </p>
        <p>Fecha de fin de la ocupación: {leaserOrders[0]?.endDate || 0}</p>
        <p>Precio : {leaserOrders[0]?.price || 0}</p>
      </section>
      <section>
        <h2>Datos de la propiedad</h2>
        <p>Tipo de propiedad: {property?.category || "No definido"}</p>
        <p>
          Ubicacion:{" "}
          {property?.city +
            ", " +
            property?.street +
            " " +
            property?.streetNumber || ""}
        </p>
        <p>Superficie: {property?.size || "No definido"}</p>
        <p>Precio por mes : {property?.price || "No definido"}</p>
        <p>
          Numero de habitaciones: {property?.rooms?.length || "No definido"}
        </p>
        <p>Numero de banos: {property?.bathrooms || "No definido"}</p>
        <p>Numero de camas: {property?.bed || "No definido"}</p>
      </section>
      <section>
        <h2>Datos del dueño</h2>
        <p>
          Nombre y apellido: {owner?.name + owner?.lastName || "No definido"}
        </p>
        <p>Correo electronico: {owner?.email || "No definido"}</p>
        <p>Telefono: 0000000</p>
        //En caso que no sea helloflatmate
        <p>Fecha de nacimiento</p>
        <p>Domicilio</p>
        <p>Identificacion</p>
      </section>
      <section>
        <h2>Datos del Cliente</h2>
        <article>
          <p>
            Nombre y apellido:{" "}
            {client?.name + " " + client?.lastName || "No definido"}
          </p>
          <p>Correo electronico: {client?.email || "No definido"}</p>
          <p>Telefono: {client?.phone}</p>
          <p>Fecha de nacimiento: {client?.birthDate || "No definido"}</p>
          <p>
            Domicilio:{" "}
            {client?.city + " " + client?.street + " " + client?.streetNumber ||
              "No definido"}
          </p>
        </article>
        <article>
          <div>
            <p>Identificacion</p>
          </div>
          <div>
            <p>Nomina</p>
          </div>
          <div>
            <p>Firma</p>
            <Image src={client?.signature || ""} height={200} width={200} />
          </div>
        </article>
      </section>
      <section>
        <h2>Contrato</h2>
        <p>contrato</p>
      </section>

      <button onClick={aproveLeaseOrder}>Aprobar</button>
      <button onClick={rejectLeaseOrder}>Rechazar</button>
    </main>
  );
}

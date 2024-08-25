import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LeaseOrderPanel(data) {
  const [leaserOrders, setLeaserOrders] = useState(
    data.data?.leaseOrdersProperty.filter(
      (leaseOrder) => leaseOrder.status === "IN_PROGRESS"
    )
  );
  const [property, setProperty] = useState(data.data);
  const [client, setClient] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (!client) {
      const fetchClient = async () => {
        try {
          const client = await axios.get(
            `/api/user?id=${leaserOrders[0].clientId}`
          );
          setClient(client.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchOwner = async () => {
        try {
          const owner = await axios.get(`/api/user?id=${property.ownerId}`);
          setOwner(owner.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchClient();
      fetchOwner();
    }
  }, [data, client]);

  if (!client && !owner) return <div>Cargando...</div>;

  return (
    <main>
      {console.log(client, owner)}
      <section>
        <h2>Numero de Orden : {leaserOrders[0].id}</h2>
        <p>fecha de creacion: {leaserOrders[0].date}</p>
        <p>Fecha de inicio de la ocupación : {leaserOrders[0].startDate}</p>
        <p>Fecha de fin de la ocupación: {leaserOrders[0].endDate}</p>
        <p>Precio : {leaserOrders[0].price || 0}</p>
      </section>
      <section>
        <h2>Datos de la propiedad</h2>
        <p>Tipo de propiedad: {property.category}</p>
        <p>
          Ubicacion:{" "}
          {property.city + ", " + property.street + " " + property.streetNumber}
        </p>
        <p>Superficie: {property.size}</p>
        <p>Precio por mes : {property.price}</p>
        <p>Numero de habitaciones: {property.rooms.length}</p>
        <p>Numero de banos: {property.bathrooms}</p>
        <p>Numero de camas: {property.bed}</p>
      </section>
      <section>
        <h2>Datos del dueño</h2>
        <p>Nombre y apellido: {owner.name + owner.lastName}</p>
        <p>Correo electronico: {owner.email}</p>
        <p>Telefono: 0000000</p>
        //En caso que no sea helloflatmate
        <p>Fecha de nacimiento</p>
        <p>Domicilio</p>
        <p>Identificacion</p>
      </section>
      <section>
        <h2>Datos del Cliente</h2>
        <article>
          <p>Nombre y apellido: {client.name + " " + client.lastName}</p>
          <p>Correo electronico: {client.email}</p>
          <p>Telefono: {client.phone}</p>
          <p>Fecha de nacimiento: {client.birthDate}</p>
          <p>
            Domicilio:{" "}
            {client.city + " " + client.street + " " + client.streetNumber}
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
            <Image src={client.signature} height={200} width={200} />
          </div>
        </article>
      </section>
      <section>
        <h2>Contrato</h2>
        <p>contrato</p>
      </section>

      <button>Aprobar</button>
      <button>Rechazar</button>
    </main>
  );
}

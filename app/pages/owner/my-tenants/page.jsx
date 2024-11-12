"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import OwnerTenants from "@/app/components/owner/owner_tenants/OwnerTenants";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MyTenantsPage = () => {
  const { state, dispatch } = useContext(Context);
  const [tenantsData, setTenantsData] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      if (state.user?.id) {
        try {
          const res = await axios.get(
            "/api/property?ownerId=" + state.user?.id
          );
          const propertiesData = res.data;
          // Mapeo de todas las lease orders de la propiedad y las habitaciones
          const mappedTenants = propertiesData.flatMap((property) => {
            // Lease orders a nivel de propiedad
            const propertyLeaseOrders = property.leaseOrdersProperty.map(
              (order) => ({
                tenantId: order.client?.id,
                name: order.client?.name,
                lastName: order.client?.lastName,
                email: order.client?.email,
                phone: order.client?.phone,
                profilePicture: order.client?.profilePicture,
                leaseType: "Property", // Indica que la orden es de la propiedad
                roomName: null, // No hay habitación, es un arrendamiento de la propiedad completa
                startDate: order.startDate,
                endDate: order.endDate,
                date: order.date,
                serial: property.serial,
                price: order.price,
                status: order.status,
                street: property.street,
                streetNumber: property.streetNumber,
                city: property.city,
                category: property.category,
                propertyId: property.id,
              })
            );

            // Lease orders a nivel de habitación
            const roomLeaseOrders = property.rooms.flatMap((room) =>
              room.leaseOrdersRoom.map((order) => ({
                tenantId: order.client?.id,
                name: order.client?.name,
                lastName: order.client?.lastName,
                email: order.client?.email,
                phone: order.client?.phone,
                profilePicture: order.client?.profilePicture,
                leaseType: "Room", // Indica que la orden es de una habitación específica
                roomName: room.name,
                startDate: order.startDate,
                endDate: order.endDate,
                date: order.date,
                serial: room.serial,
                price: order.price,
                status: order.status,
                street: property.street,
                streetNumber: property.streetNumber,
                city: property.city,
                category: property.category,
                propertyId: property.id,
              }))
            );

            // Combinamos los dos arrays (lease orders de la propiedad y de las habitaciones)
            return [...propertyLeaseOrders, ...roomLeaseOrders];
          });
          setTenantsData(mappedTenants);
        } catch (error) {
          console.error("Error al obtener los inquilinos:", error);
        }
      }
    };

    fetchTenants();
  }, [state.user]);

  if (!tenantsData || tenantsData.length <= 0) {
    return (
      <div className="flex flex-col">
        <header>
          <NavBar client={false} admin={false} owner={true} />
        </header>
        <main className="grow w-full">
          {/* <OwnerTenants data={tenantsData} /> */}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header>
        <NavBar client={false} admin={false} owner={true} />
      </header>
      <main className="grow w-full">
        <OwnerTenants data={tenantsData} />
      </main>
    </div>
  );
};

export default MyTenantsPage;

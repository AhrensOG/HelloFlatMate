"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import CategorySelector from "@/app/components/user/home/categorySelector/CategorySelector";
import { getAllProperties } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const SelectCategoryPage = () => {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState([]);
  const [helloRoomProperties, setHelloRoomProperties] = useState([]);
  const [helloColivingProperties, setHelloColivingProperties] = useState([]);
  const [helloStudioProperties, setHelloStudioProperties] = useState([]);
  const [helloLandlordProperties, setHelloLandlordProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        await getAllProperties(dispatch);
      } catch (error) {
        toast.error("Error al obtener propiedades");
      }
    };

    fetchProperties();
  }, [dispatch]);

  useEffect(() => {
    if (state.properties && state.properties.length > 0) {
      // Filtrar propiedades según la categoría
      const roomProps = state.properties.filter(
        (property) => property.category === "HELLO_ROOM"
      );
      const colivingProps = state.properties.filter(
        (property) => property.category === "HELLO_COLIVING"
      );
      const studioProps = state.properties.filter(
        (property) => property.category === "HELLO_STUDIO"
      );
      const landlordProps = state.properties.filter(
        (property) => property.category === "HELLO_LANDLORD"
      );

      // Actualizar los estados locales
      setHelloRoomProperties(roomProps);
      setHelloColivingProperties(colivingProps);
      setHelloStudioProperties(studioProps);
      setHelloLandlordProperties(landlordProps);
    }
  }, [state.properties]);

  return (
    <>
      <header>
        <NavBar client={true} admin={false} owner={false} />
      </header>
      <CategorySelector
        helloRoomProperties={helloRoomProperties}
        helloColivingProperties={helloColivingProperties}
        helloStudioProperties={helloStudioProperties}
        helloLandlordProperties={helloLandlordProperties}
      />
    </>
  );
};

export default SelectCategoryPage;

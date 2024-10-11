"use client";
import NavBar from "@/app/components/nav_bar/NavBar";
import CategorySelector from "@/app/components/user/home/categorySelector/CategorySelector";
import { getAllProperties } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import React, { Suspense, useContext, useEffect, useState } from "react";
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
      setProperties(state.properties)
      setHelloRoomProperties(roomProps);
      setHelloColivingProperties(colivingProps);
      setHelloStudioProperties(studioProps);
      setHelloLandlordProperties(landlordProps);
    }
  }, [state.properties]);

  return (
    <>
      {/* <header>
        <NavBar client={true} admin={false} owner={false} />
      </header> */}
      {/* Suspense para manejar el loader mientras se cargan las propiedades */}
      <Suspense fallback={<Loader />}>
        <CategorySelector
          helloRoomProperties={helloRoomProperties}
          helloColivingProperties={helloColivingProperties}
          helloStudioProperties={helloStudioProperties}
          helloLandlordProperties={helloLandlordProperties}
          allProperties={properties}
        />
      </Suspense>
    </>
  );
};

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loader"></div>{" "}
      {/* Puedes crear una animación CSS para el loader */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SelectCategoryPage;

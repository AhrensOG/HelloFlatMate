"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

// Función para obtener la latitud y longitud a partir de la dirección
const getCoordinates = async (address) => {
  try {
    // Realizamos la solicitud a nuestro propio endpoint en lugar de Google directamente
    const response = await axios.get(`/api/maps/geocoding`, {
      params: {
        address, // Pasamos la dirección como parámetro
      },
    });

    // Si recibimos datos válidos, devolvemos las coordenadas
    if (response.data && response.data.lat && response.data.lng) {
      const { lat, lng } = response.data;
      return { lat, lng };
    } else {
      console.error("No se encontraron resultados para la dirección.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las coordenadas:", error);
    return null;
  }
};

// Estilos para el contenedor del mapa
const containerStyle = {
  width: "100%",
  height: "200px",
};

export default function LocationSection({
  street,
  streetNumber,
  postalCode,
  city,
  country,
}) {
  const address = `${street} ${streetNumber}, ${postalCode} ${city}, ${country}`;
  const [location, setLocation] = useState({ lat: 39.4698, lng: -0.3774 }); // Valores por defecto (Madrid)
  const [loadingLocation, setLoadingLocation] = useState(true); // Estado para manejar el loading de la ubicación

  // Cargar el script de Google Maps con tu API Key
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY, // Asegúrate de almacenar la API Key en las variables de entorno
  });

  // Al cargar el componente, obtener las coordenadas basadas en la dirección
  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await getCoordinates(address);
      if (coords) {
        setLocation(coords); // Actualizar la ubicación con las coordenadas obtenidas
      }
      setLoadingLocation(false); // Ya no está cargando la ubicación
    };

    fetchCoordinates();
  }, [address]); // Solo se ejecuta cuando la dirección cambia

  const onLoad = useCallback(function callback(map) {
    map.setZoom(16);
  }, []);

  if (!isLoaded || loadingLocation) {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="font-bold text-[1.37rem]">¿Dónde Estarás?</h2>
        <div className="animate-pulse w-full h-[200px] bg-gray-200 rounded-lg">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-[1.37rem]">¿Dónde Estarás?</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={14}
        onLoad={onLoad}
      >
        {/* Marcador en la ubicación */}
        <Marker position={location} />
      </GoogleMap>
    </section>
  );
}

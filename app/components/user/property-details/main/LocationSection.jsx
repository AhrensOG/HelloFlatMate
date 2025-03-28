"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { useTranslations } from "next-intl";

// Definir las librerías que se van a cargar (incluye la nueva para el marcador avanzado)
const libraries = ["marker"];

// Función para obtener la latitud y longitud a partir de la dirección
const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`/api/maps/geocoding`, {
            params: { address },
        });
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
    height: "350px",
};

export default function LocationSection({ street, streetNumber, postalCode, city, country }) {
    const t = useTranslations("room_details");
    const address = `${street} ${streetNumber}, ${postalCode} ${city}, ${country}`;
    const [location, setLocation] = useState({ lat: 39.4698, lng: -0.3774 });
    const [loadingLocation, setLoadingLocation] = useState(true);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // Cargar el script de Google Maps con tu API Key y Map ID
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        libraries,
        mapIds: [process.env.NEXT_PUBLIC_MAP_ID], // Aquí añades tu Map ID
        version: "beta"
    });

    useEffect(() => {
        const fetchCoordinates = async () => {
            const coords = await getCoordinates(address);
            if (coords) {
                setLocation(coords);
            }
            setLoadingLocation(false);
        };

        fetchCoordinates();
    }, [address]);

    const onLoad = useCallback(
        (map) => {
            mapRef.current = map;
            map.setZoom(16);

            if (window.google && window.google.maps && window.google.maps.marker) {
                // Crear el AdvancedMarkerElement solo después de que el mapa se cargue
                markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
                    map: mapRef.current,
                    position: location,
                    title: "Ubicación",
                });
            } else {
                console.error("AdvancedMarkerElement no está disponible.");
            }
        },
        [location]
    );

    if (!isLoaded || loadingLocation) {
        return (
            <section className="flex flex-col gap-3 w-full">
                <h2 className="font-bold text-[1.2rem]">{t("location_sec_title")}</h2>
                <div className="animate-pulse w-full h-[350px] bg-gray-200 rounded-lg">
                    <div className="w-full h-full bg-gray-300"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-3 w-full">
            <h2 className="font-bold text-[1.2rem]">{t("location_sec_title")}</h2>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={14}
                onLoad={onLoad}
                options={{ mapId: process.env.NEXT_PUBLIC_MAP_ID }} // Se asigna el Map ID aquí
            >
                {/* AdvancedMarkerElement ya se agrega manualmente en onLoad */}
            </GoogleMap>
        </section>
    );
}

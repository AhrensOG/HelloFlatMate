"use client";
import React, { createContext, useEffect, useReducer, useRef } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";
import { disconnectNotificationSocket, getNotificationSocket } from "../socket";

export const Context = createContext();

const initialState = {
    user: null,
    notifications: [],
};

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const socketRef = useRef(null);
    const isListeningRef = useRef(false);
    const isConnectedRef = useRef(false); // 🔥 Nueva referencia para evitar doble conexión

    useEffect(() => {
        const getData = async () => {
            try {
                await isUserLogged(dispatch);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };
        getData();
    }, []);

    // useEffect(() => {
    //     if (state?.user?.id && !isConnectedRef.current) {
    //         console.log("🔌 Conectando socket...");
    //         socketRef.current = getNotificationSocket(state?.user.id);

    //         socketRef.current.emit("userConnected", state.user.id, () => {
    //             console.log("👤 Usuario conectado al socket");
    //             isConnectedRef.current = true; // 🔥 Marca como conectado
    //         });

    //         if (!isListeningRef.current) {
    //             isListeningRef.current = true;

    //             const handleNewNotification = (notification) => {
    //                 console.log("📩 Nueva notificación recibida:", notification);
    //                 dispatch({ type: "ADD_NOTIFICATION", payload: notification });
    //             };

    //             socketRef.current.on("newNotification", handleNewNotification);

    //             return () => {
    //                 console.log("🛑 Eliminando listeners de notificaciones...");
    //                 socketRef.current.off("newNotification", handleNewNotification);
    //                 isListeningRef.current = false;
    //             };
    //         }
    //     } else if (!state.user?.id) {
    //         console.log("🔴 Usuario no autenticado. Desconectando socket...");
    //         disconnectNotificationSocket();
    //         socketRef.current = null;
    //         isConnectedRef.current = false; // 🔥 Reinicia la conexión
    //         isListeningRef.current = false;
    //     }
    // }, [state?.user?.id]);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default GlobalContext;

"use client";
import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
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
    const socket = useRef(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    let count = 0;

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
    //     if (state?.user?.id && !socket.current) {
    //         console.log(typeof state.user.id, state.user.id);
    //         const notificationSocket = getNotificationSocket(state.user.id);
    //         socket.current = notificationSocket; // Asignar el socket a la referencia
    //         notificationSocket.on("connect", () => {
    //             count++;
    //             console.log(count);
    //             console.log(`✅ Conectado a notificaciones con ID: ${notificationSocket.id}`);
    //             setIsSocketConnected(true);
    //         });

    //         notificationSocket.emit("userConnected", state.user.id, () => {
    //             console.log("conecte");

    //             console.log("👤 Usuario conectado a las notificaciones");
    //         });

    //         const handleNotification = (notification) => {
    //             console.log("📩 Nueva notificación recibida:", notification);
    //         };

    //         notificationSocket.on("newNotification", handleNotification);

    //         return () => {
    //             console.log("❌ Desconectando socket de notificaciones...");
    //             notificationSocket.off("newNotification", handleNotification);
    //             disconnectNotificationSocket();
    //             setIsSocketConnected(false);
    //             socket.current = null;
    //         };
    //     }
    // }, [state?.user]);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default GlobalContext;

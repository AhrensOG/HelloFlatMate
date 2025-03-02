"use client";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";
import { getSocket, disconnectSocket } from "@/app/socket";

export const Context = createContext();

const initialState = {
    user: null,
    notifications: [],
};

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [socket, setSocket] = useState(null);

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

    // Conectar socket cuando el usuario está autenticado
    useEffect(() => {
        if (state.user?.id) {
            if (!socket) {
                console.log("Intentando conectar socket...");
                const newSocket = getSocket(state.user.id);
                setSocket(newSocket);
            }
        } else {
            if (socket) {
                console.log("Desconectando socket por cierre de sesión...");
                disconnectSocket();
                setSocket(null);
            }
        }
    }, [state.user]);

    // Escuchar eventos del socket solo si está conectado
    useEffect(() => {
        if (socket && socket.connected) {
            console.log("Socket conectado, escuchando eventos...");

            const handleNewNotification = (notification) => {
                console.log("Nueva notificación recibida:", notification);
                dispatch({ type: "ADD_NOTIFICATION", payload: notification });
            };

            socket.on("newNotification", (not) => {
                handleNewNotification(not);
            });

            return () => {
                console.log("Eliminando listeners de notificaciones...");
                socket.off("newNotification", handleNewNotification);
            };
        }
    }, [socket]);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default GlobalContext;

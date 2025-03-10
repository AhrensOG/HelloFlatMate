"use client";
import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";

export const Context = createContext();

const initialState = {
    user: null,
    notifications: [],
};

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default GlobalContext;

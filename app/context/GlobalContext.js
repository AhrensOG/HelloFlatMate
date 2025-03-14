"use client";
import React, { createContext, useEffect, useReducer, useRef } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";

export const Context = createContext();

const initialState = {
    user: null,
    notifications: [],
};

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isFetched = useRef(false);

    useEffect(() => {
        const getData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;

            try {
                await isUserLogged(dispatch);
            } catch (error) {
                console.error("Error en isUserLogged:", error);
            }
        };

        getData();
    }, []);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export default GlobalContext;

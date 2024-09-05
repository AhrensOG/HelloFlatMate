"use client";

import PropertiesPanel from "@/app/components/admin/properties_panel/PropertiesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import { getAllProperties } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PropertiesPanelPage() {
  const { state, dispatch } = useContext(Context);
  const [properties, setProperties] = useState();

  useEffect(() => {
    if (state.user) {
      try {
        const getData = async () => {
          await getAllProperties(dispatch);
        };
        getData();
      } catch (error) {
        toast.error("Error al obtener propiedades");
      }
    }
  }, [state.user]);

  useEffect(() => {
    console.log(state);

    if (state.properties) {
      setProperties(state.properties);
    }
  }, [state.properties, dispatch]);

  if (!properties) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <headear>
        <NavBar client={false} admin={true} owner={false} />
      </headear>
      <PropertiesPanel data={properties} />
    </>
  );
}

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
  const [propertiesSimple, setPropertiesSimple] = useState([]);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/admin/property?simple=true");
      const users= await axios.get("/api/admin/user?role=CLIENT");
      setPropertiesSimple(res.data);
      setUsers(users.data)
    };
    fetchData();
  }, []);

  // if (propertiesSimple.length <= 0) {
  //   return (
  //     <div className="h-screen flex flex-col">
  //       <headear>
  //         <NavBar client={false} admin={true} owner={false} />
  //       </headear>
  //       <div className="flex items-center justify-center flex-1">
  //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <header>
        <NavBar client={false} admin={true} owner={false} />
      </header>
      <PropertiesPanel data={{properties:propertiesSimple, users: users}}  role={"ADMIN"} />
    </>
  );
}

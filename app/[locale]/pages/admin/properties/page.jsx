"use client";

import PropertiesPanel from "@/app/components/admin/properties_panel/PropertiesPanel";
import NavBar from "@/app/components/nav_bar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PropertiesPanelPage() {
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

  return (
    <>
      <header>
        <NavBar client={false} admin={true} owner={false} />
      </header>
      <PropertiesPanel data={{properties:propertiesSimple, users: users}}  role={"ADMIN"} />
    </>
  );
}

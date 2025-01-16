import React from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

const UsersTable = ({ filteredUsers, handleOpenModalEdit }) => {
  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Usuario" },
    { key: "lastName", name: "Apellido" },
    { key: "idNum", name: "ID Num" },
    { key: "country", name: "País" },
    { key: "city", name: "Ciudad" },
    { key: "street", name: "Calle" },
    { key: "streetNumber", name: "Número Calle" },
    { key: "postalCode", name: "Código Postal" },
    { key: "phone", name: "Teléfono" },
    { key: "email", name: "Email" },
    { key: "emergencyName", name: "Nombre Emergencia" },
    { key: "emergencyPhone", name: "Teléfono Emergencia" },
    { key: "emergencyEmail", name: "Email Emergencia" },
    { key: "birthDate", name: "Fecha Nacimiento" },
    { key: "genre", name: "Género" },
    { key: "howMetUs", name: "Cómo nos conoció" },
    { key: "destinationUniversity", name: "Universidad de destino" },
    { key: "homeUniversity", name: "Universidad de origen" },
    { key: "reasonForValencia", name: "Razón para Valencia" },
    { key: "reasonForValenciaOther", name: "Razón Otro" },
    { key: "personalReview", name: "Reseña Personal" },
    { key: "arrivalDate", name: "Fecha de llegada" },
    { key: "arrivalTime", name: "Hora de llegada" },
    // { key: "documents", name: "Documentos" },
    // { key: "contracts", name: "Contratos" },
    // { key: "signature", name: "Firma" },
  ];

  return (
    <div className="flex-1 h-full contain-strict flex border rounded-lg bg-white">
      <DataGrid columns={columns} rows={filteredUsers} className="h-auto" />
    </div>
  );
};

export default UsersTable;

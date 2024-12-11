import Image from "next/image";
import React from "react";

const SearchNotFound = ({
  title = "Todos nuestros alojamientos están reservados",
  description = "No te preocupes, ¡te avisaremos en cuanto tengamos disponibilidad!",
}) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <Image
        src="/home/new_home/archivo.png"
        alt="No hay alojamientos disponibles"
        width={150}
        height={150}
      />
      <h2 style={{ fontSize: "1.5rem", color: "#333" }}>{title}</h2>
      <p style={{ fontSize: "1rem", color: "#555", marginTop: "10px" }}>
        {description}
      </p>
    </div>
  );
};

export default SearchNotFound;

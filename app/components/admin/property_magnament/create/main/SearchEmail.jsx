import { useState, useEffect } from "react";

export default function SearchEmail({ owners, onSelect, email = "" }) {
  const [searchQuery, setSearchQuery] = useState(email);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isSearching, setIsSearching] = useState(email !== "");

  // Filtrar los Owners basados en la consulta de búsqueda
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setIsSearching(true);

    if (query) {
      const results = owners.filter((owner) =>
        owner.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOwners(results);
    } else {
      setFilteredOwners([]);
    }
  };

  // Manejar la selección de un email
  const handleSelect = (owner) => {
    setSearchQuery(owner.email); // Muestra el correo electrónico en el input
    setFilteredOwners([]); // Oculta el desplegable
    setIsSearching(false); // Marca que la búsqueda ha terminado
    if (onSelect) {
      onSelect(owner.email); // Pasa el email a la función de selección
    }
  };

  // Manejar el enfoque del input para mostrar resultados solo cuando se está buscando
  const handleFocus = () => {
    setIsSearching(true);
  };

  // Efecto para manejar el caso en que el parámetro email cambia
  useEffect(() => {
    if (email) {
      setSearchQuery(email);
      setIsSearching(false); // Si ya tenemos un email, no necesitamos mostrar el desplegable
      const results = owners.filter((owner) =>
        owner.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredOwners(results);
    }
  }, [email, owners]);

  return (
    <div className="relative">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={handleFocus}
        placeholder="Buscar por email..."
        className="border rounded p-2 w-full"
      />
      {isSearching &&
        searchQuery !== email &&
        (filteredOwners.length > 0 ? (
          <ul className="absolute z-10 mt-1 border rounded bg-white shadow-lg w-full max-h-60 overflow-auto">
            {filteredOwners.map((owner) => (
              <li
                key={owner.email}
                onClick={() => handleSelect(owner)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {owner.email}
              </li>
            ))}
          </ul>
        ) : searchQuery ? (
          <div className="absolute z-10 mt-1 border rounded bg-white shadow-lg w-full p-2 text-gray-500">
            No se encontraron coincidencias
          </div>
        ) : null)}
    </div>
  );
}

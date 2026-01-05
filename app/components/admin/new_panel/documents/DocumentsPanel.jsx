import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import DocumentModal from "./DocumentModal";
import { toast } from "sonner";
import CreateDocumentModal from "./CreateDocument";
import {
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const LABELS_TYPE = {
  ROSTER: "Nómina / Matricula",
  CONTRACT: "Contrato",
};

export default function DocumentsPanel() {
  // Estados para Filtros y Paginación
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 100;

  // Estados para Modales
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  // 1. Obtener usuarios para el buscador (Knowledge base local para el select)
  const { data: users = [] } = useSWR(
    "/api/admin/user/documents_panel",
    fetcher,
    { revalidateOnFocus: false }
  );

  // 2. Obtener documentos paginados y filtrados
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...(selectedUser && { userId: selectedUser.id }),
  });

  const {
    data: swrData,
    error,
    mutate,
    isLoading,
  } = useSWR(
    `/api/admin/document/admin_panel?${queryParams.toString()}`,
    fetcher,
    {
      refreshInterval: 60000,
      keepPreviousData: true, // Evita saltos bruscos en la UI al cambiar de página
    }
  );

  const handleOpenModal = (doc) => {
    setSelectedDocument(doc);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Eliminando...");
    try {
      await axios.delete(`/api/admin/document?id=${id}`);
      // Revalidamos la data de la página actual
      await mutate();
      toast.success("Documento eliminado correctamente", { id: toastId });
    } catch (error) {
      toast.error("Error al eliminar el documento", { id: toastId });
    }
  };

  // Filtrado local de la lista de usuarios para el dropdown de búsqueda
  const filteredUsersSearch =
    searchQuery && !selectedUser
      ? users.filter((u) =>
          `${u.name} ${u.lastName} ${u.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];

  const documents = swrData?.documents || [];

  return (
    <div className="h-screen w-full flex flex-col p-4 gap-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex gap-3">Documentos</h2>

        <div className="flex gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre de usuario o email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) setSelectedUser(null);
              }}
              className="border rounded px-3 py-2 w-[450px]"
            />
            {/* Dropdown de resultados de usuario */}
            {filteredUsersSearch.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded shadow-xl max-h-60 overflow-y-auto mt-1">
                {filteredUsersSearch.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-none"
                    onClick={() => {
                      console.log(user)
                      setSelectedUser(user);
                      setSearchQuery(`${user.name} ${user.lastName} - ${user.email}`);
                      setPage(1); // Reset a pág 1 al filtrar
                    }}>
                    <p className="font-semibold">
                      {user.name} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setIsOpenCreate(true)}
            className="bg-[#0C1660] text-white px-5 py-2 rounded hover:bg-[#1a257a] transition-colors">
            Crear Documento
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg bg-white relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            Cargando...
          </div>
        )}

        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-50 z-20 shadow-sm">
            <tr>
              <th className="p-3 w-16 text-center font-semibold text-gray-600 border-b">
                ID
              </th>
              <th className="p-3 text-left font-semibold text-gray-600 border-b">
                Nombre
              </th>
              <th className="p-3 text-center font-semibold text-gray-600 border-b">
                Usuario
              </th>
              <th className="p-3 w-32 text-center font-semibold text-gray-600 border-b">
                Orden
              </th>
              <th className="p-3 w-32 text-center font-semibold text-gray-600 border-b">
                Tipo
              </th>
              <th className="p-3 w-32 text-center font-semibold text-gray-600 border-b">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr
                  key={`${doc.id}-${doc.type}`}
                  className="hover:bg-blue-50/30 transition-colors border-b last:border-none cursor-pointer"
                  onClick={() => {
                    const targetUrl =
                      doc.type === "CONTRACT" ? doc.url : doc.urls?.[0];
                    if (targetUrl) window.open(targetUrl, "_blank");
                  }}>
                  <td className="p-3 text-center text-sm text-gray-500">
                    {doc.id}
                  </td>
                  <td className="p-3 text-sm font-medium">{doc.name}</td>
                  <td className="p-3 text-center text-sm">
                    {doc.client
                      ? `${doc.client.name} ${doc.client.lastName}`
                      : "N/A"}
                  </td>
                  <td className="p-3 text-center text-sm">
                    {doc.leaseOrderId || "-"}
                  </td>
                  <td className="p-3 text-center text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase">
                      {LABELS_TYPE[doc.type] || doc.type}
                    </span>
                  </td>
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-4 justify-center">
                      <button onClick={() => handleOpenModal(doc)}>
                        <PencilIcon className="size-5 text-blue-600 hover:text-blue-800" />
                      </button>
                      <button
                        onClick={() => {
                          toast("¿Eliminar documento?", {
                            action: {
                              label: "Confirmar",
                              onClick: () => handleDelete(doc.id),
                            },
                          });
                        }}>
                        <TrashIcon className="size-5 text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-400">
                  No se encontraron documentos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER: PAGINACIÓN */}
      <div className="flex items-center justify-center px-4 py-3 bg-white border rounded-lg">
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeftIcon className="size-5" />
          </button>
          <div className="flex items-center px-4 text-sm font-medium">
            Página {page}{" "}
            {swrData?.totalPages ? `de ${swrData.totalPages}` : ""}
          </div>
          <button
            disabled={!swrData?.hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>

      {/* MODALES */}
      {isOpen && (
        <DocumentModal
          onClose={() => setIsOpen(false)}
          document={selectedDocument}
          mutate={mutate}
        />
      )}
      {isOpenCreate && (
        <CreateDocumentModal
          onClose={() => setIsOpenCreate(false)}
          users={users}
          mutate={mutate}
        />
      )}
    </div>
  );
}

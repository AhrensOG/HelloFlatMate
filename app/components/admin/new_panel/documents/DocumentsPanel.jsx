import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import DocumentModal from "./DocumentModal";
import { toast } from "sonner";
import CreateDocumentModal from "./CreateDocument";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const LABELS_TYPE = {
    ROSTER: "Nómina / Matricula",
    CONTRACT: "Contrato",
};

export default function DocumentsPanel({ data, users }) { 
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documents, setDocuments] = useState(data);
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const {
        data: swrData,
        error,
        mutate,
    } = useSWR("/api/admin/document", fetcher, {
        fallbackData: data,
        refreshInterval: 60000,
    });

    // Actualiza el estado de los documentos cuando swrData cambie
    useEffect(() => {
        setDocuments(swrData || data);
    }, [swrData, data]);

    const handleOpenModal = (doc) => {
        setSelectedDocument(doc);
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/document?id=${id}`);
            const updatedData = swrData.filter((item) => item.id !== id);
            mutate(updatedData);
        } catch (error) {
            throw error;
        }
    };

    const deleteToast = (doc) => {
        toast(
            <div className="flex items-center mx-auto gap-2 flex-col">
                <p>Estas seguro que deseas eliminar el documento?</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            toast.promise(handleDelete(doc.id), {
                                loading: "Eliminando...",
                                success: "Documento eliminado",
                                info: "Error al eliminar el documento",
                            });
                            toast.dismiss();
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Si
                    </button>
                    <button onClick={() => toast.dismiss()} className="bg-green-500 text-white px-2 py-1 rounded">
                        No
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
            }
        );
    };

    // Filtra los documentos basados en el texto de búsqueda
    const filteredDocuments = documents?.filter((doc) => {
        const searchTerm = searchQuery.toLowerCase();
        const fullname = `${doc.client.name} ${doc.client.lastName}`.toLowerCase() || "";
        const email = doc.client.email?.toLowerCase() || "";

        return fullname.includes(searchTerm) || email.includes(searchTerm);
    });

    return (
        <div className="h-screen w-full flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex gap-3">Documentos</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o tipo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded px-3 py-2 w-[450px]"
                    />
                    <button onClick={() => setIsOpenCreate(true)} className="bg-[#0C1660] text-white px-3 py-3 rounded ml-5">
                        Crear Documento
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-lg contain-inline-size">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Nombre</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Usuario</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Orden</th>
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Tipo</th>
                            {/* <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Estado</th> */}
                            <th className="border border-t-0 p-2 w-32 text-center font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocuments &&
                            filteredDocuments?.map((doc) => (
                                <tr
                                    key={`${doc.id}${doc.type}`}
                                    className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => {
                                        if (doc.type === "CONTRACT") {
                                            window.open(doc.url, "_blank");
                                        } else if (doc.type === "ROSTER") {
                                            window.open(doc.urls[0], "_blank");
                                        }
                                    }}
                                >
                                    <td className="border p-2 text-gray-700 text-center">{doc.id}</td>
                                    <td className="border p-2 text-gray-700 text-left">{doc.name}</td>
                                    <td className="border p-2 text-gray-700 text-center">{`${doc.client?.name} ${doc.client?.lastName}`}</td>
                                    <td className="border p-2 text-gray-700 text-center">{doc.leaseOrderId}</td>
                                    <td className="border p-2 text-gray-700 text-center">{LABELS_TYPE[doc.type]}</td>
                                    {/* <td className={`border p-2 w-36 text-center`}>{doc.status}</td> */}
                                    <td className="border p-2 text-gray-700 text-center">
                                        <div className="flex gap-2 items-center justify-around">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenModal(doc);
                                                }}
                                            >
                                                <PencilIcon title="Editar" className="size-6 text-green-500"/>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteToast(doc);
                                                }}
                                            >
                                                <TrashIcon title="Eliminar" className="size-6 text-red-500"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {isOpen && <DocumentModal isOpen={isOpen} onClose={() => setIsOpen(false)} document={selectedDocument} />}
            {isOpenCreate && <CreateDocumentModal isOpen={isOpenCreate} onClose={() => setIsOpenCreate(false)} users={users} mutate={mutate} />}
        </div>
    );
}

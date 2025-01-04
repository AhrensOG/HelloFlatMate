import { useEffect, useState } from "react";
import formatDateToDDMMYYYY from "../utils/formatDate";
import OrderModalReservation from "./OrderModalReservation";
import EditReservationModal from "./EditReservationModal";
import axios from "axios";

export default function ReservationPanel({ data }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [orders, setOrders] = useState(data);
    const [filteredOrders, setFilteredOrders] = useState(data); // Estado para órdenes filtradas
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);

    const handleOpenModal = (lo) => {
        setSelectedOrder(lo);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(false);
        setIsOpen(false);
    };

    const handleOpenModalEdit = (lo) => {
        setSelectedOrder(lo);
        setIsOpenEdit(true);
    };

    const handleCloseModalEdit = () => {
        setSelectedOrder(false);
        setIsOpenEdit(false);
    };

    // Función para filtrar órdenes
    const filterOrders = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = orders.filter((lo) => {
            const roomSerial = lo.room?.serial || "";
            const clientName = lo.client?.name || "";
            const clientLastName = lo.client?.lastName || "";
            return (
                roomSerial.toLowerCase().includes(lowerCaseQuery) ||
                clientName.toLowerCase().includes(lowerCaseQuery) ||
                clientLastName.toLowerCase().includes(lowerCaseQuery)
            );
        });
        setFilteredOrders(filtered); // Actualiza el estado de órdenes filtradas
    };

    useEffect(() => {
        filterOrders(searchQuery); // Filtra órdenes al cambiar el query
    }, [searchQuery, orders]); // Dependencias: cambia cuando searchQuery o orders cambian

    const fetchLeaseOrders = async () => {
        try {
            const res = await axios.get("/api/admin/lease_order");
            setOrders(res.data);
            setFilteredOrders(res.data); // Inicializa también las órdenes filtradas
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLeaseOrders();
    }, []);

    return (
        <div className="h-screen flex flex-col p-4 gap-4">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Reservas</h2>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Buscar por serial o cliente"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
                        className="border rounded px-3 py-2 w-96"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="border border-t-0 p-2 w-16 text-center font-semibold text-gray-700">ID</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Room</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700">Usuario</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Check-In</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Check-Out</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">Firmada</th>
                            <th className="border border-t-0 p-2 w-20 text-center font-semibold text-gray-700">¿En revision?</th>
                            <th className="border border-t-0 p-2 w-28 text-center font-semibold text-gray-700">Creado</th>
                            <th className="border border-t-0 p-2 text-center font-semibold text-gray-700 w-52">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((lo) => (
                            <tr
                                key={lo.id}
                                className="hover:bg-gray-100 even:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleOpenModal(lo)}
                            >
                                <td className="border p-2 text-gray-700 text-center">{lo.id}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo.room?.serial}</td>
                                <td className="border p-2 text-gray-700 text-left">{`${lo.client?.name} ${lo.client?.lastName}`}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo?.startDate)}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo?.endDate)}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo?.isSigned ? "Si" : "No"}</td>
                                <td className="border p-2 text-gray-700 text-center">{lo?.inReview ? "Si" : "No"}</td>
                                <td className="border p-2 text-gray-700 text-center">{formatDateToDDMMYYYY(lo.date)}</td>
                                <td className="border p-2 text-gray-700 text-center flex justify-around" onClick={() => handleOpenModalEdit(lo)}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el clic en el botón propague al tr
                                            handleOpenModalEdit(lo); // Abre el modal de edición
                                        }}
                                        className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isOpen && <OrderModalReservation data={selectedOrder} onClose={handleCloseModal} />}
            {isOpenEdit && <EditReservationModal leaseOrder={selectedOrder} onClose={handleCloseModalEdit} fetch={fetchLeaseOrders} />}
        </div>
    );
}

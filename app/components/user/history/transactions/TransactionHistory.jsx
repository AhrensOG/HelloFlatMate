import { useContext, useEffect, useState } from "react";
import { ArrowDownTrayIcon, ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Context } from "@/app/context/GlobalContext";
import { v4 as uuidv4 } from "uuid"; // Importar uuid para generar identificadores únicos
import NavBar from "@/app/components/nav_bar/NavBar";
import { motion } from "framer-motion"; // Importamos framer-motion
import { toast } from "sonner";
import axios from "axios";

const STATUS_COLORS = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    REJECTED: "bg-red-100 text-red-800",
    PAID: "bg-green-100 text-green-800",
    NOT_PAID: "bg-gray-100 text-gray-800",
    CANCELED: "bg-red-200 text-red-800",
};

const SUPPLY_TYPES_TRANSLATIONS = {
    WATER: "Agua",
    GAS: "Gas",
    ELECTRICITY: "Electricidad",
    EXPENSES: "Gastos Comunes",
    INTERNET: "Internet",
    OTHERS: "Otros",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza a fondo",
    DEPOSIT: "Depósito",
    GENERAL_SUPPLIES: "Aporte para suministros (agua, luz, gas)",
};

export default function TransactionHistory({ redirect }) {
    const { state } = useContext(Context);
    const [allPayments, setAllPayments] = useState({});
    const [isReserveOpen, setIsReserveOpen] = useState(false);
    const [isMonthlyOpen, setIsMonthlyOpen] = useState(false);
    const [isSuppliesOpen, setIsSuppliesOpen] = useState(false);
    const [isAgencyFeesOpen, setIsAgencyFeesOpen] = useState(false);

    useEffect(() => {
        if (state.user?.rentPayments && state.user?.supplies) {
            const rentPaymentsWithId = state.user.rentPayments.map((payment) => ({
                ...payment,
                uniqueKey: uuidv4(),
            }));
            const supplyPaymentsWithId = state.user.supplies.map((payment) => ({
                ...payment,
                uniqueKey: uuidv4(),
            }));

            setAllPayments({
                rentPayments: rentPaymentsWithId,
                supplies: supplyPaymentsWithId,
            });
        }
    }, [state.user]);

    const downloadBillPDF = async (payment) => {
        const toastId = toast.loading("Procesando...")
        try {
            const user = state?.user;
            if (!user) {
                toast.info("Debe iniciar sesión antes de descargar la factura.", { id: toastId });
                return;
            }
            const requiredFields = [
                "name",
                "lastName",
                "idNum",
                "street",
                "streetNumber",
                "city",
                "postalCode",
                "phone",
                "email"
            ];
            const missingFields = requiredFields.filter((field) => !user[field]);
    
            if (missingFields.length > 0) {
                toast.info(
                    `Debes completar la información de tu perfil para poder descargar la factura.`, { description: `¡Dirigete a 'Perfil' para hacerlo!`, id: toastId }
                );
                return;
            }
            //Generar y descargar el pdf
            const pdfRes = await axios.post(
                "/api/payment?type=billPDF",
                {
                    userId: payment.clientId,
                    propertyId: payment.paymentableId,
                    paymentableType: payment.paymentableType,
                    rentPaymentId: payment.id,
                    leaseOrderId: payment.leaseOrderId,
                    quotaNumber: payment.quotaNumber,
                },
                {
                    responseType: "blob", // Esto es importante para manejar archivos
                }
            );

            // Crear un enlace temporal para descargar el PDF
            const url = window.URL.createObjectURL(new Blob([pdfRes.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Factura_${payment.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("¡Factura descargada!", {id: toastId})
        } catch (error) {
            toast.info("¡Factura descargada!", {id: toastId})
            console.log(error);
        }
    };

    const renderPaymentStatus = (status) => {
        const colorClass = STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
        let statusText = "";

        switch (status) {
            case "PENDING":
                statusText = "Pendiente";
                break;
            case "APPROVED":
                statusText = "Aprobado";
                break;
            case "REJECTED":
                statusText = "Rechazado";
                break;
            case "PAID":
                statusText = "Pagado";
                break;
            case "NOT_PAID":
                statusText = "No Pagado";
                break;
            case "CANCELED":
                statusText = "Cancelado";
                break;
            default:
                statusText = "Desconocido";
        }

        return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>{statusText}</span>;
    };

    const renderRentPayments = () => {
        const rentPayments = allPayments.rentPayments || [];

        // Encontrar el pago con quotaNumber 1 para obtener su fecha como referencia (startDate)
        const firstPayment = rentPayments.find((payment) => payment.quotaNumber === 1);
        const startDate = firstPayment ? new Date(firstPayment.date) : null;

        const getMonthFromQuota = (startDate, quotaNumber) => {
            if (!startDate) return "Fecha no disponible";

            const date = new Date(startDate);
            date.setMonth(date.getMonth() + quotaNumber - 1); // Ajustar meses según la cuota
            return date.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
            });
        };

        // Función para mostrar el toast con Sonner
        const showToast = () => {
            return toast.info("Muy pronto podrá ver la factura.", {
                description: "Estamos trabajando en la migración de datos.",
            });
        };

        return (
            <div>
                {console.log(allPayments)}
                <h2
                    onClick={() => setIsReserveOpen(!isReserveOpen)}
                    className="cursor-pointer text-lg font-semibold flex items-center justify-between gap-2 mt-2 py-3 px-4 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                    <span className="text-blue-700">Pagos mensuales</span>
                    <ChevronDownIcon className={`${isReserveOpen ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out size-6`} />
                </h2>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isReserveOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-1"
                >
                    <div className="grid gap-1">
                        {rentPayments.length > 0 ? (
                            rentPayments.map((payment) => (
                                <motion.div
                                    key={`reservation-${payment.uniqueKey}`}
                                    className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.2 },
                                    }}
                                    // onClick={showToast} // Mostrar toast al hacer clic
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-md font-medium">{`Pago - ${getMonthFromQuota(startDate, payment.quotaNumber)}`}</h3>
                                        {renderPaymentStatus(payment.status)}
                                    </div>
                                    <p className="text-sm text-gray-500">ID: {payment.paymentId || "-"}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500">Descripción: {payment.description || "-"}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg mt-2 p-2 bg-blue-100 text-blue-800 max-w-20 rounded-full text-center">
                                            € {payment.amount}
                                        </p>
                                        <button
                                            type="button"
                                            className="h-6 w-6"
                                            onClick={() => downloadBillPDF(payment)}
                                        >
                                            <ArrowDownTrayIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay pagos de mensuales disponibles.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    };

    const renderSupplyPayments = () => {
        // Filtrar los pagos de suministros, excluyendo las tasas de la agencia
        const supplies = (allPayments.supplies || []).filter((payment) => payment.type !== "AGENCY_FEES");

        // Filtrar las tasas de la agencia por su estado
        const agencyFees = (allPayments.supplies || []).filter((payment) => payment.type === "AGENCY_FEES");

        // Función para mostrar el toast con Sonner
        const showToast = () => {
            return toast.info("Muy pronto podrá ver la factura.", {
                description: "Estamos trabajando en la migración de datos.",
            });
        };

        return (
            <div>
                {/* Pagos de Suministros */}
                <h2
                    onClick={() => setIsSuppliesOpen(!isSuppliesOpen)}
                    className="cursor-pointer text-lg font-semibold flex items-center justify-between gap-2 mt-2 py-3 px-4 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                    <span className="text-blue-700">Pagos de Suministros</span>
                    <ChevronDownIcon className={`${isSuppliesOpen ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out size-6`} />
                </h2>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isSuppliesOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-1"
                >
                    <div className="grid gap-1">
                        {supplies.length > 0 ? (
                            supplies.map((payment) => (
                                <motion.div
                                    key={`supply-${payment.uniqueKey}`}
                                    className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 cursor-pointer"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.2 },
                                    }}
                                    onClick={showToast}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-md font-medium">{SUPPLY_TYPES_TRANSLATIONS[payment.type] || "Suministros"}</h3>
                                        {renderPaymentStatus(payment.status)}
                                    </div>
                                    <p className="text-xs text-gray-400">ID: {payment.paymentId ? payment.paymentId : "-"}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="text-lg mt-2 bg-green-100 text-green-800 max-w-20 rounded-full text-center">€ {payment.amount}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay pagos de suministros disponibles.</p>
                        )}
                    </div>
                </motion.div>

                {/* Tasas de la Agencia */}
                <h2
                    onClick={() => setIsAgencyFeesOpen(!isAgencyFeesOpen)}
                    className="cursor-pointer text-lg font-semibold flex items-center justify-between gap-2 mt-2 py-3 px-4 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                    <span className="text-blue-700">Tasas de la agencia</span>
                    <ChevronDownIcon className={`${isAgencyFeesOpen ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out size-6`} />
                </h2>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isAgencyFeesOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-1"
                >
                    <div className="grid gap-1">
                        {agencyFees.length > 0 ? (
                            agencyFees.map((payment) => (
                                <motion.div
                                    key={`agency-fee-${payment.uniqueKey}`}
                                    className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.2 },
                                    }}
                                    onClick={showToast}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-md font-medium">Tasa de Agencia</h3>
                                        {renderPaymentStatus(payment.status)}
                                    </div>
                                    <p className="text-xs text-gray-400">ID: {payment.paymentId ? payment.paymentId : "-"}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(payment.date).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="text-lg mt-2 bg-green-100 text-green-800 max-w-20 rounded-full text-center">€ {payment.amount}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay pagos de tasas de la agecia disponibles.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <div>
            {/* MOBILE */}
            <div className="sm:hidden">
                <header>
                    <NavBar />
                </header>
                <div className="w-full flex justify-center items-center p-6">
                    <div className="w-full max-w-screen-xl flex items-center justify-center relative">
                        <button onClick={redirect} type="button" className="w-6 h-6 opacity-90 ml-4 absolute left-0">
                            <ArrowLeftIcon />
                        </button>
                        <h1 className="text-xl font-bold">Mis finanzas</h1>
                    </div>
                </div>
                <main className="flex flex-col gap-4 py-4 mx-4">
                    {renderRentPayments()}
                    {renderSupplyPayments()}
                </main>
            </div>

            {/* DESKTOP */}
            <div className="hidden h-screen w-full sm:block">
                <header>
                    <NavBar />
                </header>
                <div className="w-full flex justify-center items-center p-6">
                    <div className="w-full max-w-screen-xl flex items-center justify-center relative">
                        <button onClick={redirect} type="button" className="w-6 h-6 opacity-90 ml-4 absolute left-0">
                            <ArrowLeftIcon />
                        </button>
                        <h1 className="text-xl font-bold">Mis finanzas</h1>
                    </div>
                </div>
                <div className="grow flex w-full justify-center items-start">
                    <main className="flex flex-col py-4 mx-4 w-full max-w-screen-lg">
                        {renderRentPayments()}
                        {renderSupplyPayments()}
                    </main>
                </div>
            </div>
        </div>
    );
}

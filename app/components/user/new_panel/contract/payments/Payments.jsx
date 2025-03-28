"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import axios from "axios";
import { isUserLogged } from "@/app/context/actions/isUserLogged";

const SUPPLY_TYPE_LABELS = {
    WATER: "Agua",
    GAS: "Gas",
    ELECTRICITY: "Electricidad",
    EXPENSES: "Expensas",
    INTERNET: "WIFI",
    AGENCY_FEES: "Tasa de la agencia",
    CLEANUP: "Limpieza check-out",
    OTHERS: "Otros",
    DEPOSIT: "Depósito",
    GENERAL_SUPPLIES: "Suministros generales (agua, luz, gas)",
};

export default function Payments() {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    const searchParams = useSearchParams();
    const propertyId = searchParams.get("p");
    const roomId = searchParams.get("r");
    const leaseOrderId = searchParams.get("lo");

    const [payments, setPayments] = useState([]);
    const [allPaid, setAllPaid] = useState(false);

    useEffect(() => {
        if (!state?.user || !Array.isArray(state.user.supplies)) return;

        const order = [
            "DEPOSIT",
            "AGENCY_FEES",
            "GENERAL_SUPPLIES",
            "INTERNET",
        ];
        const allowedTypes = [
            "DEPOSIT",
            "AGENCY_FEES",
            "INTERNET",
            "GENERAL_SUPPLIES",
        ];

        const supplies = state.user.supplies.filter(
            (sup) =>
                String(sup.leaseOrderId) === leaseOrderId &&
                allowedTypes.includes(sup.type)
        );

        const suppliesByType = supplies.reduce((acc, item) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
            acc[item.type].push(item);
            return acc;
        }, {});

        let selectedSupplies = [];

        const leaseOrder = state.user.leaseOrdersRoom?.find(
            (lo) => String(lo.id) === leaseOrderId
        );

        const selectSupplyByQuarter = (items) => {
            if (items.length === 2 && leaseOrder) {
                const startMonth =
                    new Date(leaseOrder.startDate).getUTCMonth() + 1;
                const endMonth = new Date(leaseOrder.endDate).getUTCMonth() + 1;
                // Se verifica que ambos meses estén entre febrero (2) y junio (6)
                const desiredQuarter =
                    startMonth >= 2 &&
                    startMonth <= 6 &&
                    endMonth >= 2 &&
                    endMonth <= 6
                        ? "2Q"
                        : "1Q";
                const match = items.find((item) =>
                    item.name.includes(desiredQuarter)
                );
                return match ? match : items[0];
            } else if (items.length >= 1) {
                return items[0];
            }
            return null;
        };

        allowedTypes.forEach((type) => {
            if (type === "GENERAL_SUPPLIES" || type === "INTERNET") {
                const items = suppliesByType[type] || [];
                const selected = selectSupplyByQuarter(items);
                if (selected) {
                    selectedSupplies.push(selected);
                }
            } else {
                const items = suppliesByType[type] || [];
                if (items.length > 0) {
                    selectedSupplies.push(items[0]);
                }
            }
        });

        selectedSupplies.sort(
            (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
        );
        setPayments(selectedSupplies);

        const allArePaid =
            selectedSupplies.length > 0 &&
            selectedSupplies.every((sup) => sup.status === "PAID");
        setAllPaid(allArePaid);
    }, [state?.user, leaseOrderId]);

    function generateDsOrder(leaseOrderId) {
        const baseStr = String(leaseOrderId);
        const timePart = Date.now().toString().slice(-4);
        const randomDigit = Math.floor(Math.random() * 10).toString();
        let dsOrder = baseStr + timePart + randomDigit;
        if (dsOrder.length > 12) dsOrder = dsOrder.slice(0, 12);
        return dsOrder;
    }

    const handlePay = async (sup) => {
        if (!state?.user) return;

        const toastId = toast.loading("Redirigiendo al pago...");

        const matchedLeaseOrder = state.user?.leaseOrdersRoom?.find(
            (lo) => String(lo.id) === String(sup.leaseOrderId)
        );
        const propertySerial = matchedLeaseOrder?.room?.serial || "";

        try {
            const dsOrder = generateDsOrder(sup.leaseOrderId);
            const label = SUPPLY_TYPE_LABELS[sup.type] || sup.type;
            const body = {
                amount: sup.amount * 100,
                order: dsOrder,
                paymentMetaData: {
                    supplyId: sup.id,
                    order: dsOrder,
                    paymentType: "supply",
                    clientId: state.user?.id,
                    merchantName: `Pago - ${label}`,
                    merchantDescription: `Pago - ${label} - (${propertySerial} - ${state.user.name} ${state.user.lastName})`,
                    merchantUrlOk: `/pages/user/contractv2/payments?p=${propertyId}&r=${roomId}&lo=${leaseOrderId}`,
                    merchantUrlkO: `/pages/user/contractv2/payments?p=${propertyId}&r=${roomId}&lo=${leaseOrderId}`,
                },
            };

            const { data } = await axios.post("/api/redsys/checkout", body);
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Preparando redirección a Redsys", { id: toastId });

            const form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", data.redsysUrl);

            const inputVersion = document.createElement("input");
            inputVersion.type = "hidden";
            inputVersion.name = "Ds_SignatureVersion";
            inputVersion.value = data.Ds_SignatureVersion;
            form.appendChild(inputVersion);

            const inputParams = document.createElement("input");
            inputParams.type = "hidden";
            inputParams.name = "Ds_MerchantParameters";
            inputParams.value = data.Ds_MerchantParameters;
            form.appendChild(inputParams);

            const inputSignature = document.createElement("input");
            inputSignature.type = "hidden";
            inputSignature.name = "Ds_Signature";
            inputSignature.value = data.Ds_Signature;
            form.appendChild(inputSignature);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("Error al iniciar pago:", error);
            toast.error("Ocurrió un error al iniciar el pago.", {
                id: toastId,
            });
        }
    };

    const handleContinue = async () => {
        if (!allPaid) {
            toast.info("Aún tienes pagos pendientes. No puedes continuar.");
            return;
        }
        const toastId = toast.loading("Verificando...");

        try {
            await isUserLogged(dispatch);
            toast.success(
                "¡Todos los pagos están realizados! Puedes continuar.",
                { id: toastId }
            );

            router.push(
                `/es/pages/user/contractv2/signature?p=${propertyId}&r=${roomId}&lo=${leaseOrderId}`
            );
        } catch (error) {
            console.error("Error al verificar los pagos:", error);
            toast.info("¡Ups! Ocurrió un error al verificar los pagos.", {
                id: toastId,
                description: "Intenta nuevamente o contacta a nuestro soporte.",
            });
        }
    };

    if (!state?.user) return null;

    return (
        <div className="w-full h-full p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pagos de tu Reserva
            </h2>

            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                A continuación encontrarás los pagos requeridos para tu reserva
                (depósito, tasa de agencia, suministros y wifi). Deben estar
                todos pagados para poder continuar con la firma del contrato.
            </p>

            {payments.length === 0 ? (
                <p className="text-gray-500 text-sm">
                    No se encontraron pagos para esta reserva.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {payments.map((sup) => (
                        <div
                            key={sup.id}
                            className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {SUPPLY_TYPE_LABELS[sup.type]}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Importe: <strong>{sup.amount} €</strong>
                                </p>
                                <p
                                    className={`text-xs font-medium mt-1 ${
                                        sup.status === "PAID"
                                            ? "text-green-600"
                                            : "text-[#440cac]"
                                    }`}>
                                    Estado:{" "}
                                    {sup.status === "PAID"
                                        ? "Pagado"
                                        : "Pendiente"}
                                </p>
                            </div>

                            {sup.status === "PENDING" && (
                                <button
                                    onClick={() => handlePay(sup)}
                                    className="px-3 py-1 rounded-md text-sm font-semibold text-white bg-[#440cac] hover:bg-[#440cac]/80 transition-colors">
                                    Pagar
                                </button>
                            )}

                            {sup.status === "PAID" && (
                                <div className="text-sm text-green-600 font-semibold">
                                    ✓ Pagado
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                <button
                    onClick={handleContinue}
                    className={`w-full py-3 font-semibold transition-colors 
            ${
                allPaid
                    ? "bg-[#440cac] text-white hover:bg-[#440cac]/80"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}>
                    Continuar
                </button>
            </div>
        </div>
    );
}

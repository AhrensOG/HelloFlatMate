"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import { createContractPDFV2 } from "@/app/context/actions";
import PremiumContractV2 from "./PremiunContractV2";
import HelloRoomContractV2 from "./HelloroomContractV2";
import HelloColivingContractV2 from "./HelloColivingContractV2";
import HelloLandlordContractV2 from "./HelloLandlordContractV2";
import SignaturePadV2 from "./SignaturePadV2";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import ContractDetailV2Fallback from "../../auxiliarComponents/fallbacks/ContractDetailV2Fallback";

const ContractDetailV2 = () => {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();
    const searchParams = useSearchParams();
    const propertyId = searchParams.get("p");
    const roomId = searchParams.get("r");
    const leaseOrderId = searchParams.get("lo");

    const [owner, setOwner] = useState(null);
    const [property, setProperty] = useState(null);
    const [room, setRoom] = useState(null);
    const [leaseOrder, setLeaseOrder] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [signatureModal, setSignatureModal] = useState(false);

    useEffect(() => {
        if (!state?.user || !leaseOrderId) {
            setLeaseOrder(null);
            setRoom(null);
            return;
        }
        const foundLeaseOrder = state.user.leaseOrdersRoom?.find(
            (order) => order.id === parseInt(leaseOrderId)
        );
        if (foundLeaseOrder) {
            setLeaseOrder(foundLeaseOrder);
            setRoom(foundLeaseOrder.room || null);
        } else {
            setLeaseOrder(null);
            setRoom(null);
        }
    }, [state?.user, leaseOrderId]);

    useEffect(() => {
        if (leaseOrder?.room?.property) {
            setProperty(leaseOrder.room.property);
        } else {
            setProperty(null);
        }
    }, [leaseOrder]);

    useEffect(() => {
        if (!propertyId) return;
        const fetchOwner = async () => {
            try {
                const ownerRes = await axios.get(
                    `/api/user/owner?propertyId=${propertyId}`
                );
                setOwner(ownerRes.data || null);
            } catch (error) {
                console.error("Error fetching owner:", error);
                toast.info("Error al cargar datos del propietario.");
            }
        };
        fetchOwner();
    }, [propertyId]);

    const setMonth = (month) => {
        switch (month) {
            case 1:
                return "Enero";
            case 2:
                return "Febrero";
            case 3:
                return "Marzo";
            case 4:
                return "Abril";
            case 5:
                return "Mayo";
            case 6:
                return "Junio";
            case 7:
                return "Julio";
            case 8:
                return "Agosto";
            case 9:
                return "Septiembre";
            case 10:
                return "Octubre";
            case 11:
                return "Noviembre";
            case 12:
                return "Diciembre";
            default:
                return "";
        }
    };

    const setDate = () => {
        const date = new Date();
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${day} de ${setMonth(month)} del ${year}`;
    };

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    // Datos para el contrato
    const contractDate = setDate();
    const landlordName = owner ? `${owner.name} ${owner.lastName}` : "";
    const landlordNIF = owner?.idNum || "-";
    const landlordIBAN = owner?.IBAN || "-";
    const landlordStreet = property?.street || "-";
    const landlordStreetNumber = property?.streetNumber || "-";
    const landlordDoorNumber = property?.floor || "-";
    const landlordPostalCode = property?.postalCode || "-";
    const numberOfRooms = property?.rooms?.length || 1;
    const numberOfBathrooms = property?.bathrooms || 1;
    const monthlyRent = room?.price || "";
    const roomNumber = room?.serial || "";
    const propertyCategory = property?.category;

    // Datos del cliente (tenant)
    const info = state?.user;
    const tenantName = info ? `${info.name} ${info.lastName}` : "-";
    const tenantID = info?.idNum || "-";
    const tenantPhone = info?.phone || "-";
    const tenantEmail = info?.email || "-";
    const tenantAddress = info ? `${info.city}, ${info.country}` : "-";
    const tenantStreet = info
        ? `${info.street} ${info.streetNumber}, CP ${info.postalCode}`
        : "-";
    const startDate = leaseOrder?.startDate
        ? parseDate(leaseOrder.startDate)
        : "-";
    const endDate = leaseOrder?.endDate ? parseDate(leaseOrder.endDate) : "-";

    const handleCreatePDF = async (clientSignature) => {
        try {
            const values = {
                contractDate,
                landlordName,
                landlordNIF,
                landlordIBAN,
                landlordStreet,
                landlordStreetNumber,
                landlordDoorNumber,
                landlordPostalCode,
                numberOfRooms,
                numberOfBathrooms,
                tenantName,
                tenantID,
                tenantPhone,
                tenantEmail,
                tenantAddress,
                tenantStreet,
                roomNumber,
                startDate,
                endDate,
                monthlyRent,
                propertyCategory,
                leaseOrderId: leaseOrder?.id,
            };

            let dataContract = {
                ownerId: property?.ownerId,
                clientId: state?.user?.id,
                roomId: room?.id,
                leaseOrderId: leaseOrder?.id,
            };
            const ownerSignature =
                "https://firebasestorage.googleapis.com/v0/b/helloflatprueba.appspot.com/o/Firmas%2FhelloflatmateSignature.png?alt=media&token=d2049b5a-fccf-4407-bfcd-cd5d73f462a2";
            await createContractPDFV2(
                values,
                dataContract,
                clientSignature,
                ownerSignature
            );
            toast.success("¡Contrato firmado!");
            await isUserLogged(dispatch);
            router.push(
                `/es/pages/user/contractv2/success?p=${propertyId}&r=${roomId}&lo=${leaseOrderId}`
            );
        } catch (error) {
            console.error(error);
            toast.info("Ocurrió un error al crear el contrato.");
        }
    };

    if (!state.user) return <ContractDetailV2Fallback />;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-7 py-4">
            {propertyCategory === "HELLO_STUDIO" && (
                <PremiumContractV2
                    contractDate={contractDate}
                    landlordName={landlordName}
                    landlordNIF={landlordNIF}
                    landlordStreet={landlordStreet}
                    landlordStreetNumber={landlordStreetNumber}
                    landlordDoorNumber={landlordDoorNumber}
                    landlordPostalCode={landlordPostalCode}
                    numberOfRooms={numberOfRooms}
                    numberOfBathrooms={numberOfBathrooms}
                    tenantName={tenantName}
                    tenantID={tenantID}
                    tenantPhone={tenantPhone}
                    tenantEmail={tenantEmail}
                    tenantAddress={tenantAddress}
                    tenantStreet={tenantStreet}
                    roomNumber={roomNumber}
                    startDate={startDate}
                    endDate={endDate}
                    monthlyRent={monthlyRent}
                    handleModal={setSignatureModal}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            )}

            {propertyCategory === "HELLO_ROOM" && (
                <HelloRoomContractV2
                    contractDate={contractDate}
                    landlordName={landlordName}
                    landlordNIF={landlordNIF}
                    landlordStreet={landlordStreet}
                    landlordStreetNumber={landlordStreetNumber}
                    landlordDoorNumber={landlordDoorNumber}
                    landlordPostalCode={landlordPostalCode}
                    numberOfRooms={numberOfRooms}
                    numberOfBathrooms={numberOfBathrooms}
                    tenantName={tenantName}
                    tenantID={tenantID}
                    tenantPhone={tenantPhone}
                    tenantEmail={tenantEmail}
                    tenantAddress={tenantAddress}
                    tenantStreet={tenantStreet}
                    roomNumber={roomNumber}
                    startDate={startDate}
                    endDate={endDate}
                    monthlyRent={monthlyRent}
                    handleModal={setSignatureModal}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            )}

            {propertyCategory === "HELLO_COLIVING" && (
                <HelloColivingContractV2
                    contractDate={contractDate}
                    landlordName={landlordName}
                    landlordNIF={landlordNIF}
                    landlordStreet={landlordStreet}
                    landlordStreetNumber={landlordStreetNumber}
                    landlordDoorNumber={landlordDoorNumber}
                    landlordPostalCode={landlordPostalCode}
                    numberOfRooms={numberOfRooms}
                    numberOfBathrooms={numberOfBathrooms}
                    tenantName={tenantName}
                    tenantID={tenantID}
                    tenantPhone={tenantPhone}
                    tenantEmail={tenantEmail}
                    tenantAddress={tenantAddress}
                    tenantStreet={tenantStreet}
                    roomNumber={roomNumber}
                    startDate={startDate}
                    endDate={endDate}
                    monthlyRent={monthlyRent}
                    handleModal={setSignatureModal}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            )}

            {propertyCategory === "HELLO_LANDLORD" && (
                <HelloLandlordContractV2
                    contractDate={contractDate}
                    landlordName={landlordName}
                    landlordNIF={landlordNIF}
                    landlordIBAN={landlordIBAN}
                    landlordStreet={landlordStreet}
                    landlordStreetNumber={landlordStreetNumber}
                    landlordDoorNumber={landlordDoorNumber}
                    landlordPostalCode={landlordPostalCode}
                    numberOfRooms={numberOfRooms}
                    numberOfBathrooms={numberOfBathrooms}
                    tenantName={tenantName}
                    tenantID={tenantID}
                    tenantPhone={tenantPhone}
                    tenantEmail={tenantEmail}
                    tenantAddress={tenantAddress}
                    tenantStreet={tenantStreet}
                    roomNumber={roomNumber}
                    startDate={startDate}
                    endDate={endDate}
                    monthlyRent={monthlyRent}
                    handleModal={setSignatureModal}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            )}

            {/* Checkbox para habilitar el botón */}
            {state.user && propertyCategory && (
                <div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="cursor-pointer"
                        />
                        <label
                            htmlFor="termsCheckbox"
                            className="text-sm text-gray-700 cursor-pointer">
                            He leído y acepto los términos del contrato
                        </label>
                    </div>
                    <div className="w-full">
                        <button
                            disabled={!isChecked}
                            onClick={() => setSignatureModal(true)}
                            className={`w-full py-3 font-semibold transition-colors ${
                                isChecked
                                    ? "bg-[#440cac] text-white hover:bg-[#440cac]/80 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}>
                            Firmar contrato
                        </button>
                    </div>
                </div>
            )}

            <AnimatePresence
                mode="wait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {signatureModal && (
                    <SignaturePadV2
                        setModal={setSignatureModal}
                        createContractPDF={handleCreatePDF}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default ContractDetailV2;

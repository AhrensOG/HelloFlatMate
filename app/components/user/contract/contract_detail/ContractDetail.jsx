import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { plus_jakarta, poppins } from "@/font";
import TitleSection from "../TitleSection";
import ButtonReadAndSingContract from "../ButtonReadAndSingContract";
import SignaturePad from "../contract_signature/SignaturePad";
import Image from "next/image";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import { createContractPDF } from "@/app/context/actions";
import { useSearchParams } from "next/navigation";
import PremiumContract from "./PremiunContract";
import HelloRoomContract from "./HelloroomContract";
import HelloColivingContract from "./HelloColivingContract";
import HelloLandlordContract from "./HelloLandlordContract";

const ContractDetail = ({ handleContinue, handleBack, owner, property }) => {
  const { state, dispatch } = useContext(Context);
  const [signatureModal, setSignatureModal] = useState(false);
  const [room, setRoom] = useState(false);
  const [leaseOrder, setLeaseOrder] = useState(false);
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(false); // Estado para el checkbox

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomId = searchParams.get("r");
        const leaseOrderId = searchParams.get("lo");

        if (property && leaseOrderId) {
          if (roomId) {
            // Buscar la room si `roomId` está presente
            const rooms = property.rooms || [];
            const foundRoom = rooms.find(
              (room) => room.id === parseInt(roomId)
            );

            if (foundRoom) {
              setRoom(foundRoom);
              // Buscar la leaseOrder dentro de `leaseOrdersRoom` de la room encontrada
              const foundLeaseOrder = foundRoom.leaseOrdersRoom.find(
                (order) => order.id === parseInt(leaseOrderId)
              );
              setLeaseOrder(foundLeaseOrder || null);
            } else {
              setRoom(null);
              setLeaseOrder(null);
            }
          } else {
            // Si no hay `roomId`, buscar en `leaseOrdersProperty`
            const foundLeaseOrder = property.leaseOrdersProperty.find(
              (order) => order.id === parseInt(leaseOrderId)
            );
            setLeaseOrder(foundLeaseOrder || null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams, property]);

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
    }
  };

  const setDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
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

  // Property DATA
  const contractDate = setDate();
  const landlordName = owner?.name + " " + owner?.lastName || "Javier García";
  const landlordNIF = "12345678Z";
  const landlordStreet = property.street || "Gran Vía";
  const landlordStreetNumber = property.streetNumber || "45";
  const landlordDoorNumber = room ? room.serial : "-";
  const landlordPostalCode = property.postalCode || "46021";
  const numberOfRooms = property.roomsCount || 1;
  const numberOfBathrooms = property.bathrooms || 1;
  const monthlyRent = room ? room.price : property.price;
  const roomNumber = room ? room.serial : "-";
  const propertyCategory = property?.category;

  // Client DATA
  const info = state?.user;
  const tenantName = info?.name + " " + info?.lastName || "María López";
  const tenantID = info?.idNum || "87654321B";
  const tenantPhone = info?.phone || "600123456";
  const tenantEmail = info?.email || "maria.lopez@example.com";
  const tenantAddress =
    info?.street + " " + info?.streetNumber || "Av. del Cid, 10";
  const tenantStreet = info?.street || "Av. del Cid";
  const startDate = leaseOrder?.startDate
    ? parseDate(leaseOrder.startDate)
    : "1 de septiembre de 2024";
  const endDate = leaseOrder?.endDate
    ? parseDate(leaseOrder.endDate)
    : "31 de agosto de 2025";

  const handleCreatePDF = async (clientSignature) => {
    try {
      const values = {
        contractDate,
        landlordName,
        landlordNIF,
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
      };
      let dataContract;
      if (room) {
        dataContract = {
          ownerId: property?.ownerId,
          clientId: state?.user?.id,
          roomId: room?.id,
        };
      } else {
        dataContract = {
          ownerId: property?.ownerId,
          clientId: state?.user?.id,
          propertyId: property?.id,
        };
      }

      await createContractPDF(dispatch, values, dataContract, clientSignature);
      return toast.success("¡Contrato bajo revision!");
    } catch (error) {
      return toast.error("Ocurrió un error al crear el contrato.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`  w-full flex flex-col gap-7 p-4`}
    >
      <TitleSection
        title={"Contrato de renta"}
        action={() => {
          handleBack();
        }}
      />
      {property?.category === "HELLO_STUDIO" && (
        <PremiumContract
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

      {property?.category === "HELLO_ROOM" && (
        <HelloRoomContract
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

      {property?.category === "HELLO_COLIVING" && (
        <HelloColivingContract
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

      {property?.category === "HELLO_LANDLORD" && (
        <HelloLandlordContract
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

      <AnimatePresence
        mode="wait"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {signatureModal && (
          <SignaturePad
            setModal={setSignatureModal}
            createContractPDFAndContinue={handleCreatePDF}
            handleContinue={handleContinue}
            order={leaseOrder?.id}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ContractDetail;

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AdminSideBar from "./sidebar/AdminSideBar";
import PreReservationsPanel from "./pre_reservations/PreReservationsPanel";
import ReservationPanel from "./reservation/ReservationPanel";
import UsersPanel from "./users/UsersPanel";
import PaymentsPanel from "./payments/PaymentsPanel";
import RoomsPanel from "./rooms/RoomsPanel";
import DocumentsPanel from "./documents/DocumentsPanel";
import RentalPeriodsPanel from "./rental_periods/RentalPeriodsPanel";
import PropertiesPanel from "./properties/PropertiesPanel";
import ConsumptionsPanel from "./consumptions/ConsumptionsPanel";
import ChatsPanel from "./chats/ChatsPanel";
import IncidencesPanel from "./incidences/IncidencesPanel";
import MaintenancePanel from "./maintenance/MaintenancePanel";
import OwnerContractsPanel from "./ownerContracts/OwnerContractsPanel";

const NewAdminPanel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const section = searchParams.get("section") || "propiedades";

    const renderSection = () => {
        switch (section) {
            case "pre-reservas":
                return <PreReservationsPanel />;
            case "reservas":
                return <ReservationPanel />;
            case "usuarios":
                return (
                    <UsersPanel />
                );
            case "cobros":
                return <PaymentsPanel />;
            case "habitaciones":
                return <RoomsPanel />;
            case "documentos":
                return <DocumentsPanel />;
            case "periodos":
                return <RentalPeriodsPanel />;
            case "propiedades":
                return <PropertiesPanel />;
            case "consumos":
                return <ConsumptionsPanel />;
            case "chats":
                return <ChatsPanel />;
            case "incidencias":
                return <IncidencesPanel />;
            case "mantenimiento":
                return <MaintenancePanel />;
            case "contratos": 
                return <OwnerContractsPanel />
            default:
                return <div/>;
        }
    };

    return (
        <main className="flex h-screen">
            <AdminSideBar onSelect={(name) => router.push(`?section=${name.toLowerCase()}`)} />
            <div className="grow">{renderSection()}</div>
        </main>
    );
};

export default NewAdminPanel;

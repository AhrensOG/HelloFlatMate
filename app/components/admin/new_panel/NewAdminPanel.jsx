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

const NewAdminPanel = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const section = searchParams.get("section") || "propiedades";

    const renderSection = () => {
        switch (section) {
            case "pre-reservas":
                return <PreReservationsPanel />;
            case "reservas":
                return <ReservationPanel data={{ clients: data.clients, properties: data.properties }} />;
            case "usuarios":
                return (
                    <UsersPanel
                        properties={data.optionSerials}
                        orders={[...data.allLeaseOrders]}
                        allLeaseOrders={data.allLeaseOrders}
                    />
                );
            case "cobros":
                return <PaymentsPanel users={data.allUsers?.clients || []} />;
            case "habitaciones":
                return <RoomsPanel />;
            case "documentos":
                return <DocumentsPanel users={data.allUsers?.clients} />;
            case "periodos":
                return <RentalPeriodsPanel />;
            case "propiedades":
                return <PropertiesPanel data={data.properties} />;
            case "consumos":
                return <ConsumptionsPanel users={data.allUsers?.clients} properties={data.optionSerials} />;
            case "chats":
                return <ChatsPanel users={data.allUsers} properties={data.optionSerials} />;
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

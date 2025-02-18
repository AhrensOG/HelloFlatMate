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

const NewAdminPanel = ({ data }) => { 
    const router = useRouter();
    const searchParams = useSearchParams();
    const section = searchParams.get("section") || "propiedades";

    const renderSection = () => {
        switch (section) {
            case "pre-reservas":
                return <PreReservationsPanel leaseOrders={data.leaseOrders} />;
            case "reservas":
                return <ReservationPanel leaseOrders={data.leaseOrdersApproved} data={{ clients: data.clients, properties: data.properties }} />;
            case "usuarios":
                return (
                    <UsersPanel
                        allUsers={data.allUsers}
                        properties={data.optionSerials}
                        orders={[...data.leaseOrdersApproved, ...data.leaseOrders]}
                        allLeaseOrders={data.allLeaseOrders}
                    />
                );
            case "cobros":
                return <PaymentsPanel payments={data.payments} users={data.allUsers?.clients || []} />;
            case "habitaciones":
                return <RoomsPanel data={data.rooms} />;
            case "documentos":
                return <DocumentsPanel data={data.documents} users={data.allUsers?.clients} />;
            case "periodos":
                return <RentalPeriodsPanel data={data.rentalPeriods} />;
            case "propiedades":
                return <PropertiesPanel data={data.properties} />;
            default:
                return <PreReservationsPanel leaseOrders={data.leaseOrders} />;
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

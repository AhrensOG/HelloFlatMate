import MyBedroomCard from "./MyBedroomCard";
import { motion } from "framer-motion";

export default function MyBedroomsList({ action, user, properties }) {
    return (
        <motion.section
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5 w-full"
        >
            <h2 className="font-semibold text-base text-[#000000CC]">Hola {user.name}</h2>
            <p className="font-semibold text-base text-[#000000CC]">Tus alojamientos</p>
            <div className="flex flex-col gap-5 pt-5">
                {properties.map((p) => {
                    const prop = p.room || p.property;
                    const category = prop.category || prop.property.category;

                    const location = {
                        street: prop.street || prop.property.street,
                        postalCode: prop.postalCode || prop.property.postalCode,
                        city: prop.city || prop.property.city,
                    };
                    const date = {
                        startDate: p.startDate,
                        endDate: p.endDate,
                    };

                    const handleAction = () => {
                        action({
                            images: prop.images,
                            type: category,
                            location: location,
                            dueDate: date, // Puedes formatear la fecha según sea necesario
                            price: prop.price,
                            amenities: prop.amenities || prop.property.amenities,
                            id: prop.propertyId || prop.id || prop.property?.id,
                            property: prop,
                            leaseOrder: p,
                        });
                    };

                    return (
                        <MyBedroomCard
                            key={p.id}
                            type={category}
                            location={location}
                            dueDate={date}
                            price={prop.price}
                            amenities={prop.amenities || prop.property.amenities}
                            images={prop.images?.[0]}
                            action={handleAction}
                            leaseOrder={p}
                        />
                    );
                })}
            </div>
        </motion.section>
    );
}

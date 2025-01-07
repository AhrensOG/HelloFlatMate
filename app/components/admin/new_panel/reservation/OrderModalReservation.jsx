import Link from "next/link";
import formatDateToDDMMYYYY from "../utils/formatDate";
import Image from "next/image";

export default function OrderModalReservation({ data, onClose }) {
    const { date, startDate, endDate, price, status, room, property, client } = data || {};
    // Datos del usuario
    const {
        id,
        name,
        lastName,
        idNum,
        country,
        city,
        street,
        streetNumber,
        postalCode,
        phone,
        email,
        emergencyName,
        emergencyPhone,
        emergencyEmail,
        birthDate,
        documents,
        contracts,
        signature,
        genre,
        howMetUs,
        destinationUniversity,
        homeUniversity,
        reasonForValencia,
        reasonForValenciaOther,
        personalReview,
        arrivalDate,
        arrivalTime,
    } = client || {};
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            {/* Contenedor principal */}
            <div
                className="bg-white w-full max-w-md mx-auto rounded shadow p-6 relative text-sm max-h-[90%] overflow-auto"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/* Botón de Cerrar */}
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    X
                </button>
                <h2 className="text-lg font-bold mb-4">Detalle de la reserva</h2>
                Datos de la reserva
                <p>
                    <strong>ID:</strong> {id}
                </p>
                <p>
                    <strong>Serial:</strong> {room?.serial || property?.serial}
                </p>
                <p>
                    <strong>Fecha:</strong> {formatDateToDDMMYYYY(date)}
                </p>
                <p>
                    <strong>Check-In:</strong> {formatDateToDDMMYYYY(startDate)}
                </p>
                <p>
                    <strong>Check-Out:</strong> {formatDateToDDMMYYYY(endDate)}
                </p>
                <p>
                    <strong>Precio:</strong> {price} €
                </p>
                <p>
                    <strong>Estado:</strong> {status}
                </p>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold mb-2">Datos del usuario</h3>
                {client ? (
                    <>
                        <div className="space-y-1 text-">
                            <p>
                                <strong>ID:</strong> {id}
                            </p>
                            <p>
                                <strong>Nombre:</strong> {name}
                            </p>
                            <p>
                                <strong>Apellido:</strong> {lastName}
                            </p>
                            <p>
                                <strong>ID Num:</strong> {idNum}
                            </p>
                            <p>
                                <strong>Email:</strong> {email}
                            </p>
                            <p>
                                <strong>Teléfono:</strong> {phone}
                            </p>
                            <p>
                                <strong>País:</strong> {country}
                            </p>
                            <p>
                                <strong>Ciudad:</strong> {city}
                            </p>
                            <p>
                                <strong>Calle:</strong> {street}
                            </p>
                            <p>
                                <strong>Nº Calle:</strong> {streetNumber}
                            </p>
                            <p>
                                <strong>Codigo Postal:</strong> {postalCode}
                            </p>
                            <p>
                                <strong>Contacto de emergencia:</strong> {emergencyName}
                            </p>
                            <p>
                                <strong>Teléfono de emergencia:</strong> {emergencyPhone}
                            </p>
                            <p>
                                <strong>Email de emergencia:</strong> {emergencyEmail}
                            </p>
                            <p>
                                <strong>Género:</strong> {genre === "MALE" ? "Masculino" : genre === "FEMALE" ? "Femenino" : genre === "OTHER" ? "Otro" : "No definido"}
                            </p>
                            <p>
                                <strong>Fecha de nacimiento:</strong> {formatDateToDDMMYYYY(new Date(birthDate))}
                            </p>
                            <p>
                                <strong>Review Personal:</strong> {personalReview}
                            </p>
                            <p>
                                <strong>¿Cómo nos conoció?:</strong> {howMetUs}
                            </p>
                            <p>
                                <strong>Universidad de destino:</strong> {destinationUniversity}
                            </p>
                            <p>
                                <strong>Universidad de origen:</strong> {homeUniversity}
                            </p>
                            <p>
                                <strong>Razón Valencia:</strong> {reasonForValencia} {reasonForValenciaOther && `(${reasonForValenciaOther})`}
                            </p>
                            <p>
                                <strong>Review Personal:</strong> {personalReview}
                            </p>
                            <p>
                                <strong>Fecha de llegada:</strong> {arrivalDate ? formatDateToDDMMYYYY(new Date(arrivalDate)) : ""}
                            </p>
                            <p>
                                <strong>Hora de llegada:</strong> {arrivalTime}
                            </p>

                            <p>
                                <strong>Firma:</strong>
                                {signature ? <Image src={signature} width={100} height={100} alt="signature" /> : <p>No hay firma</p>}
                            </p>
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-1 text-">
                            <h3 className="text-lg font-semibold mb-2">Contratos</h3>
                            {contracts?.length > 0 ? (
                                contracts.map((contract) => (
                                    <div key={contract.id}>
                                        <Link href={`${contract.url}`} target="_blank">
                                            <p>{contract.name}</p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No hay contratos</p>
                            )}
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-1 text-">
                            <h3 className="text-lg font-semibold mb-2">Documentos</h3>
                            {documents?.filter((document) => document.type === "IDENTIFICATION").length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {" "}
                                    {/* Contenedor flex para las imágenes */}
                                    {documents
                                        .filter((document) => document.type === "IDENTIFICATION") // Filtra los documentos
                                        .map((document) => (
                                            <div key={document.id} className="flex-shrink-0">
                                                {" "}
                                                {/* Cada imagen en un div */}
                                                {document.urls.map((url) => (
                                                    <Image
                                                        src={url}
                                                        width={100}
                                                        height={100}
                                                        alt={document.name}
                                                        key={document.name + document.id}
                                                        className="rounded" // Añadir clase para bordes redondeados
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p>No hay documentos</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>No hay datos del usuario.</p>
                )}
            </div>
        </div>
    );
}

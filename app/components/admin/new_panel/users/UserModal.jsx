import Image from "next/image";
import formatDateToDDMMYYYY from "../utils/formatDate";
import Link from "next/link";

const UserModal = ({ user, onClose }) => {
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
    role,
  } = user || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      {/* Contenedor principal */}
      <div className="bg-white w-full max-w-md mx-auto rounded shadow p-6 relative text-sm z-50 max-h-[90%] overflow-y-auto">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
        >
          X
        </button>

        <div>
          <h2 className="text-lg font-semibold mb-2">Datos del usuario</h2>
          <strong>ID:</strong> {id}
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
            <strong>Nº:</strong> {streetNumber}
          </p>
          <p>
            <strong>CP:</strong> {postalCode}
          </p>
          <p>
            <strong>Género:</strong> {genre}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong>{" "}
            {formatDateToDDMMYYYY(birthDate)}
          </p>
          <hr className="my-4" />
          <h3 className="text-lg font-semibold mb-2">Contacto de emergencia</h3>
          <p>
            <strong>Contacto de emergencia:</strong> {emergencyName}
          </p>
          <p>
            <strong>Email de emergencia:</strong> {emergencyEmail}
          </p>
          <p>
            <strong>Teléfono de emergencia:</strong> {emergencyPhone}
          </p>
          <hr className="my-4" />
          <h3 className="text-lg font-semibold mb-2">
            Otros datos del usuario
          </h3>
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
            <strong>Razón Valencia:</strong> {reasonForValencia}{" "}
            {reasonForValenciaOther && `(${reasonForValenciaOther})`}
          </p>
          <p>
            <strong>Fecha de llegada:</strong>{" "}
            {arrivalDate ? formatDateToDDMMYYYY(new Date(arrivalDate)) : ""}
          </p>
          <p>
            <strong>Hora de llegada:</strong> {arrivalTime}
          </p>
          <hr className="my-4" />
          <h3 className="text-lg font-semibold mb-2">Firma del usuario</h3>
          <p>
            <strong>Firma:</strong>
            {signature ? (
              <Image src={signature} width={100} height={100} alt="signature" />
            ) : (
              <span>No hay firma</span>
            )}
          </p>
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
            {documents?.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex-shrink-0 border p-2 rounded-lg shadow-md"
                  >
                    {/* Mostrar Información del Documento */}
                    <p className="font-semibold text-gray-800">
                      {document.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateToDDMMYYYY(document.createdAt)}
                    </p>

                    {/* Mostrar las URLs */}
                    {document.urls?.map((url) => (
                      <div key={url} className="mt-2">
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Ver documento
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay documentos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

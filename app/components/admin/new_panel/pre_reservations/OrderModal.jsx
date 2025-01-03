import formatDateToDDMMYYYY from "../utils/formatDate";

const OrderModal = ({ order, onClose }) => {
  // Sacamos datos de la orden
  const {
    id,
    date,
    startDate,
    endDate,
    price,
    status,
    room,
    property, // si viene de type property
    client,
  } = order;

  // Datos del usuario
  const {
    name,
    lastName,
    idNum,
    country,
    reasonForValencia,
    reasonForValenciaOther,
    personalReview,
    phone,
    email,
    birthDate,
  } = client || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      {/* Contenedor principal */}
      <div className="bg-white w-full max-w-md mx-auto rounded shadow p-6 relative text-sm">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
        >
          X
        </button>

        <h2 className="text-lg font-bold mb-4">Detalle de la reserva</h2>
        {/* Datos de la reserva */}
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
          <div className="space-y-1 text-">
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
              <strong>País:</strong> {country}
            </p>
            <p>
              <strong>Razón Valencia:</strong> {reasonForValencia}{" "}
              {reasonForValenciaOther && `(${reasonForValenciaOther})`}
            </p>
            <p>
              <strong>Review Personal:</strong> {personalReview}
            </p>
            <p>
              <strong>Teléfono:</strong> {phone}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong>{" "}
              {formatDateToDDMMYYYY(birthDate)}
            </p>
          </div>
        ) : (
          <p>No hay datos del usuario.</p>
        )}
      </div>
    </div>
  );
};

export default OrderModal;

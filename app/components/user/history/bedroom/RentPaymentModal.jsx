import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RentPaymentModal({
  isOpen,
  onClose,
  totalAmount,
  leaseOrder,
  handlePayment,
}) {
  if (!isOpen) return null;

  // Convertir fechas a objetos Date
  const startDate = leaseOrder?.startDate
    ? new Date(leaseOrder.startDate)
    : null;
  const endDate = leaseOrder?.endDate ? new Date(leaseOrder.endDate) : null;
  const [currentInstallment, setCurrentInstallment] = useState(1);
  const [adjustedAmount, setAdjustedAmount] = useState(totalAmount);

  // Calcular la duración del contrato en meses
  const monthsDuration =
    startDate && endDate
      ? (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1
      : 1;

  // Determinar cuota actual en base al mes de la fecha de inicio
  useEffect(() => {
    if (startDate) {
      const currentDate = new Date();
      const monthsPassed =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth()) +
        1;
      const installmentNumber = Math.min(monthsPassed, monthsDuration); // Limita el número de cuotas al máximo de la duración del contrato
      setCurrentInstallment(installmentNumber);

      // Verifica si es después del día 10 del mes
      const lateFee =
        currentDate.getDate() > 10 ? totalAmount * 1.05 : totalAmount;
      setAdjustedAmount(lateFee);
    }
  }, [startDate, monthsDuration, totalAmount]);

  const handleConfirm = async () => {
    await handlePayment(adjustedAmount, currentInstallment);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Pago de cuota
        </h2>

        <p className="text-gray-700 mb-2">
          <strong>Cuota actual:</strong> {currentInstallment} de{" "}
          {monthsDuration}
        </p>

        <p className="mt-4 text-gray-700">
          Total a pagar:{" "}
          <span className="font-semibold">${adjustedAmount.toFixed(2)}</span>
        </p>
        {new Date().getDate() > 10 && (
          <p className="text-sm text-red-500 mt-1">
            Incluye un recargo del 5% por pago tardío.
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

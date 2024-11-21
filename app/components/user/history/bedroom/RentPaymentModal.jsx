import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RentPaymentModal({
  isOpen,
  onClose,
  totalAmount,
  leaseOrder,
  handlePayment,
  rentPayments,
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

  // Determinar la cuota actual basada en los pagos existentes
  useEffect(() => {
    if (leaseOrder) {
      if (rentPayments.length > 0) {
        // Filtrar pagos que coincidan con el leaseOrderId
        const relevantPayments = rentPayments.filter(
          (payment) => payment.leaseOrderId === leaseOrder.id
        );

        // Encontrar la cuota más alta pagada
        const maxQuotaPayment = relevantPayments.reduce(
          (max, payment) =>
            payment.quotaNumber > max.quotaNumber ? payment : max,
          { quotaNumber: 0 }
        );

        // La cuota actual será la siguiente después de la mayor pagada
        const nextQuota = maxQuotaPayment.quotaNumber + 1;
        setCurrentInstallment(nextQuota);
      } else {
        // Si no hay pagos realizados, la cuota actual es la primera
        setCurrentInstallment(1);
      }
    }
  }, [leaseOrder, rentPayments]);

  // Ajuste de monto (considerar recargo por retraso si es necesario)
  useEffect(() => {
    if (startDate) {
      const currentDate = new Date();
      const lateFee = totalAmount;
      // currentDate.getDate() > 25 ? totalAmount * 1.05 : totalAmount;
      setAdjustedAmount(lateFee);
    }
  }, [startDate, totalAmount]);

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
        {/* {new Date().getDate() > 25 && (
          <p className="text-sm text-red-500 mt-1">
            Incluye un recargo del 5% por pago tardío.
          </p>
        )} */}

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

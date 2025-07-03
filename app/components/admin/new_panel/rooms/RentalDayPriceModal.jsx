import React, { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "sonner";

const formatDate = (date) =>
  date
    ? date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

const RentalDayPriceModal = ({ onClose, onApply, room }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [price, setPrice] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [lastPriceInfo, setLastPriceInfo] = useState({
    date: null,
    price: "N/A",
  });

  const rentalItem = room?.rentalItems?.[0];
  const rentalPeriod = rentalItem?.rentalPeriod;

  const periodStart = rentalPeriod
    ? new Date(rentalPeriod.startDate)
    : undefined;
  const periodEnd = rentalPeriod ? new Date(rentalPeriod.endDate) : undefined;

  const pricesByDay = useMemo(() => {
    const map = {};
    rentalItem?.rentalDayPrices?.forEach((item) => {
      map[item.date] = item.price;
    });
    return map;
  }, [rentalItem]);

  const unpricedDaysCount = useMemo(() => {
    if (!periodStart || !periodEnd) return 0;
    let count = 0;
    let current = new Date(periodStart);
    while (current <= periodEnd) {
      const dateStr = [
        current.getFullYear(),
        String(current.getMonth() + 1).padStart(2, "0"),
        String(current.getDate()).padStart(2, "0"),
      ].join("-");
      if (!pricesByDay[dateStr]) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  }, [periodStart, periodEnd, pricesByDay]);

  const handleSave = async () => {
    if (!price || isNaN(price)) {
      toast.info("Por favor ingresa un precio válido.");
      return;
    }
    if (!range?.from) {
      toast.info("Por favor selecciona al menos un día en el calendario.");
      return;
    }

    const startDate = range.from;
    const endDate = range.to || range.from;

    const success = await onApply({
      rentalItemId: rentalItem.id,
      startDate,
      endDate,
      price: parseFloat(price),
    });

    if (success) {
      setRange({ from: undefined, to: undefined });
      setPrice("");
      setLastPriceInfo({ date: null, price: "N/A" });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="bg-white w-full max-w-3xl mx-auto rounded shadow-lg p-6 relative z-50 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300">
          X
        </button>

        <h2 className="text-lg font-bold mb-1">Configurar precios por día</h2>
        <div className="text-sm text-gray-600 mb-3">
          Room serial: <strong>{room.serial}</strong>
        </div>

        <div className="mt-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Precio (€)
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mt-2 text-sm text-gray-600">
          Días sin precio asignado: <strong>{unpricedDaysCount}</strong>
        </div>

        <div className="mt-2 text-sm text-green-700 font-semibold">
          Último día consultado:{" "}
          {lastPriceInfo.date ? formatDate(lastPriceInfo.date) : "—"} — Precio:{" "}
          {lastPriceInfo.price}€
        </div>

        <div className="mt-4 grid place-items-center w-full">
          <DayPicker
            classNames={{
              today: "text-[#440CAC] font-bold",
              chevron: `fill-[#440CAC]`,
              outside: "text-gray-500",
              selected: "text-[#440CAC] font-bold",
              range_middle: "bg-[#f0f0ff] text-[#440CAC]",
            }}
            mode="range"
            selected={range}
            onSelect={(val) =>
              setRange(val || { from: undefined, to: undefined })
            }
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            numberOfMonths={2}
            fixedWeeks
            showOutsideDays
            disabled={[{ before: periodStart }, { after: periodEnd }]}
            modifiers={{
              priced: (date) => {
                const dateStr = [
                  date.getFullYear(),
                  String(date.getMonth() + 1).padStart(2, "0"),
                  String(date.getDate()).padStart(2, "0"),
                ].join("-");
                return pricesByDay[dateStr];
              },
            }}
            modifiersClassNames={{
              priced: "bg-green-100 rounded-full",
            }}
            onDayClick={(date) => {
              const dateStr = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
              ].join("-");
              const price = pricesByDay[dateStr];
              setLastPriceInfo({ date, price: price || "N/A" });
            }}
          />
        </div>

        <div className="mt-2 text-sm text-gray-600">
          Rango seleccionado:{" "}
          <strong>
            {range?.from ? formatDate(range.from) : "—"} -{" "}
            {range?.to ? formatDate(range.to) : "—"}
          </strong>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalDayPriceModal;

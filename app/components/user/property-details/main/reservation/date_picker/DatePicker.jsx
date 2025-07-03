import { useState, useMemo } from "react";
import Month from "./Month";
import HeaderDatePicker from "./HeaderDatePicker";
import { FooterDatePicker } from "./FooterDatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";

const createLocalDate = (isoString) => {
  const [year, month, day] = isoString.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
};

const toMidnightUTC = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  // Crea fecha a las 00:00 del día elegido en UTC
  return new Date(Date.UTC(y, m, d)).toISOString();
};

export default function DatePicker({
  data,
  setData,
  occupedDates,
  rentalPeriods,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Estados para la fecha de inicio y la fecha de finalización
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [currentDay, setCurrentDay] = useState(date.getDate());

  // Filtrar las fechas ocupadas que no tengan el estado "REJECTED"
  const occupiedDateRanges = occupedDates
    .filter((order) => order.status !== "REJECTED" && order.status !== "IN_PROGRESS")
    .map((order) => ({
      start: createLocalDate(order.startDate),
      end: createLocalDate(order.endDate),
    }));

  const rentalDateRanges = rentalPeriods.map((period) => ({
    start: createLocalDate(period.rentalPeriod?.startDate),
    end: createLocalDate(period.rentalPeriod?.endDate),
  }));

  // 🔑 Crear un mapa rápido de precios por día
  const pricesByDay = useMemo(() => {
    const map = {};
    rentalPeriods.forEach((item) => {
      item.rentalDayPrices.forEach((priceObj) => {
        const localDate = createLocalDate(priceObj.date);
        const dateStr = localDate.toISOString().slice(0, 10);
        map[dateStr] = priceObj.price;
      });
    });
    return map;
  }, [rentalPeriods]);

  const isRangeOccupied = (start, end) => {
    const current = new Date(start);
    while (current <= end) {
      if (isDateOccupied(current)) {
        return true; // Hay al menos un día ocupado
      }
      current.setDate(current.getDate() + 1);
    }
    return false; // Ningún día ocupado en el rango
  };

  // Función para verificar si una fecha está ocupada o fuera del rango
  const isDateOccupied = (date) => {
    // Verificar si la fecha está fuera del rango de rentalPeriods
    const isOutsideRentalRange = !rentalDateRanges.some((range) => {
      return date >= range.start && date <= range.end;
    });

    // Verificar si la fecha está ocupada
    const isOccupied = occupiedDateRanges.some((range) => {
      return date >= range.start && date <= range.end;
    });

    return isOccupied || isOutsideRentalRange;
  };

  // Muestra las fechas seleccionadas en el input
  const getSelectedDateText = () => {
    if (!startDate && !endDate) return "Seleccione las fechas";
    if (startDate && !endDate) return `Ingreso: ${formatDate(startDate)}`;
    if (startDate && endDate)
      return `Ingreso: ${formatDate(startDate)} - Salida: ${formatDate(
        endDate
      )}`;
  };

  // Formatear fecha en dd/mm
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  // Mostrar u ocultar el DatePicker
  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      // Al abrir el datepicker, reiniciar la selección
      setIsSelectingStartDate(true);
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Calcular la duración en días
  const calculateDuration = (start, end) => {
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // ✅ +1 para incluir ambos días
  };

  // Seleccionar fecha
  const handleSelectDate = (date) => {
    if (isDateOccupied(date)) return; // No permitir la selección de una fecha ocupada o fuera de rango

    if (isSelectingStartDate) {
      setStartDate(date);
      setIsSelectingStartDate(false); // Cambiar a seleccionar fecha de finalización
    } else {
      if (date < startDate) {
        // Si la fecha de fin es menor que la fecha de inicio, establecer esta fecha como la nueva fecha de inicio
        setStartDate(date);
        setEndDate(null); // Limpiar la fecha de fin
        setIsSelectingStartDate(false); // Cambiar a seleccionar fecha de finalización
      } else if (date.getTime() === startDate.getTime()) {
        // Si la fecha de fin es igual a la fecha de inicio, reiniciar el proceso
        setStartDate(null);
        setEndDate(null);
        setIsSelectingStartDate(true); // Volver a seleccionar fecha de inicio
      } else {
        // Si la fecha de fin es válida (mayor que la fecha de inicio), establecerla
        setEndDate(date);
      }
    }
  };

  const getPricesInRange = (start, end, pricesByDay) => {
    const prices = [];
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().slice(0, 10);
      if (pricesByDay[dateStr] != null) {
        prices.push(pricesByDay[dateStr]);
      }
      current.setDate(current.getDate() + 1);
    }
    return prices;
  };

  // Confirmar la selección de fechas
  const handleConfirmSelection = () => {
    if (startDate && endDate) {
      if (isRangeOccupied(startDate, endDate)) {
        toast.info(
          "El rango seleccionado incluye días ocupados. Por favor elige otro."
        );
        return;
      }

      const duration = calculateDuration(startDate, endDate);
      const pricesInRange = getPricesInRange(startDate, endDate, pricesByDay);
      const totalPrice = pricesInRange.reduce((acc, val) => acc + val, 0);

      setData({
        ...data,
        startDate: toMidnightUTC(startDate),
        endDate: toMidnightUTC(endDate),
        duration: duration,
        prices: pricesInRange, // ✅ lista de precios día a día
        totalPrice: totalPrice, // ✅ suma de precios
      });

      setShowDatePicker(false);
    }
  };

  // Manejar la cancelación
  const handleCancel = (isCancel) => {
    if (isCancel) {
      setShowDatePicker(false);
      setStartDate(null);
      setEndDate(null);
      setIsSelectingStartDate(true);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="w-full relative rounded-lg shadow-reservation-drop my-2 cursor-pointer">
        <div className="p-3 border border-gray-300 rounded-lg text-base  bg-white w-full flex justify-between items-center">
          <input
            onClick={handleShowDatePicker}
            value={getSelectedDateText()}
            className="appearance-none outline-none w-full"
            type="text"
            placeholder="Seleccione las fechas"
            readOnly
          />
          <span
            onClick={handleShowDatePicker}
            className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
              showDatePicker ? "bg-[#1C8CD65E] rotate-180" : ""
            }`}>
            <ChevronUpIcon />
          </span>
        </div>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="my-1 bg-white p-3 rounded-md w-full min-h-[19.4rem]">
            {/* Header */}
            <HeaderDatePicker
              year={{ year, setYear }}
              month={{ month, setMonth }}
              date={{ date, setDate }}
              day={{ startDate, endDate }}
              callback={handleSelectDate}
            />

            {/* Indicador de selección */}
            <div className="text-center my-2">
              {isSelectingStartDate
                ? "Seleccionando fecha de inicio"
                : "Seleccionando fecha de finalización"}
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-x-4 my-3">
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Dom
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Lun
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Mar
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Mié
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Jue
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Vie
              </span>
              <span className="text-[#B5BEC6] text-sm md:text-base text-center">
                Sáb
              </span>
            </div>

            {/* Mes */}
            <Month
              year={year}
              month={month}
              currentDay={currentDay}
              callback={handleSelectDate}
              date={date}
              selectedDate={isSelectingStartDate ? startDate : endDate}
              startDate={startDate}
              endDate={endDate}
              isDateOccupied={isDateOccupied}
              rentalPeriods={rentalPeriods}
              pricesByDay={pricesByDay} // 🚀 Pasamos el mapa de precios
            />

            <FooterDatePicker
              cancel={handleCancel}
              confirm={handleConfirmSelection}
            />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AccordionItemV2 = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 bg-white rounded-xl p-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className="font-semibold text-gray-800 text-xl">{title}</span>
        <div className="relative w-6 h-6">
          {/* Línea horizontal */}
          <motion.div
            className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Línea vertical */}
          <motion.div
            className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
            animate={{ rotate: isOpen ? 0 : 90 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 text-gray-600 text-lg">{content}</div>
      </motion.div>
    </div>
  );
};

const FAQ2 = () => {
  const items = [
    {
      title: "¿Qué es un hellorooms?",
      content:
        "Las habitaciones para estudiantes en Valencia, hellorooms son apartamentos que gestionamos completamente. No tendrás que gestionar nada con el propietario del piso y dentro del horario de 9 a 17 horas siempre podrás comunicarte con nosotros libremente. Del mismo modo también tendrás un número de teléfono para llamarnos en caso de emergencia fuera de horario laboral.",
    },
    {
      title: "¿Qué es lo que se paga con la reserva de la habitación a través de la Web de helloflatmate?",
      content:
        "La persona que reserva la habitación está abonando la renta del primer mes de contrato de la habitación seleccionada.",
    },
    {
      title: "¿Con qué compañeros compartiré piso?",
      content:
        "helloflatmate aloja a estudiantes o a personas jóvenes en prácticas de empresas de diversas nacionalidades, siempre y cuando sean menores de 30 años.",
    },
    {
      title: "¿Hay pisos solo para chicas?",
      content:
        "helloflatmate dispone de pisos mixtos y pisos sólo para chicas.",
    },
    {
      title: "¿Puede venir familia y amigos a visitarme y dormir en el piso?",
      content:
        "Claro, no hay ningún problema, pero hay que informar a la oficina y a tus flatmates, y que todos estén de acuerdo. Si la estancia de este invitado llega a la semana de duración, éste deberá aportar 20 €/semana para los gastos comunes del piso. En ningún caso debe convertirse en una costumbre, sólo visitas esporádicas.",
    },
    {
      title: "¿Se admiten mascotas?",
      content:
        "No.",
    },
    {
      title: "¿Si llego al piso el 15 de septiembre por ejemplo, tengo que pagar todo el mes?",
      content:
        "Depende: La habitación siempre se cobra por mes entero. Si haces una reserva el 25 de agosto para entrar en la habitación el 15 de septiembre hasta el 30 de junio, se deberá abonar el mes completo ya que pudiera darse el caso de que hubiera una persona que quisiera entrar antes y la propiedad perdería beneficios. Si contratas una habitación el día 15 del mes para entrar el 16 pagarás únicamente la parte proporcional del mes.",
    },
    {
      title: "¿Puedo cancelar mi reserva y que me devuelvan el dinero?",
      content:
        "Se devolverá el 100% del importe de reserva en caso de cancelar al menos 30 días antes del inicio del contrato. Cancelaciones realizadas con menos de 30 días de antelación al inicio de contrato, no darán lugar a ningún tipo de reembolso. El propietario también se reserva el derecho de cancelar la reserva al menos 30 días antes de inicio de contrato y desde helloflatmate te daremos la opción de trasladar tu reserva a otra habitación similar o el reembolso del 100% de tu dinero.",
    },
    {
      title: "¿Tengo que pagar alguna comisión para el alquiler o reserva de la habitación?",
      content:
        "Sí. Tener un contrato legal, sujeto al código civil, que garantice derechos y obligaciones para cada uno de nuestros flatmates conlleva un trabajo extra para la agencia. Por experiencia en nuestra etapa de estudiantes en el extranjero lo consideramos fundamental para la seguridad y tranquilidad de nuestros inquilinos. La formalización de contrato tiene un coste de 380€ +iva (459.80€)",
    },
    {
      title: "¿Las facturas están incluidas? Las facturas no están incluidas.",
      content:
        "Debes saber que nuestros flatmates están exentos de pago de los gastos comunitarios del edificio (ascensor, limpieza de la escalera, reparaciones en el edificio, etc..).",
    },
    {
      title: "¿Hay internet? ¿Cómo se realizan los pagos de internet?",
      content:
        "Sí, todas las viviendas disponen de Internet wifi 300 megas Orange o en su defecto Movistar. Cuota fija de 16 €/mes, que se paga cada 5 meses por adelantado (80 €/habitación) independientemente del número de habitaciones que disponga la vivienda.",
    },
    {
      title: "¿Cómo pagamos las facturas de agua, luz y gas?",
      content:
        "Cada 5 meses de contrato se aportan 200€ en concepto de Adelanto de suministros. En los contratos de 5 meses se abonará al inicio del contrato, el día del check in. En los contratos de 10 meses se harán dos entregas, la primera al inicio de contrato, se abona el día del check in, y la segunda a finales de enero, junto a la renta de febrero. Este importe se lo entregamos al propietario. Generalmente y con un consumo responsable, este adelanto de dinero deberá ser suficiente para cubrir tus gastos de agua, luz y gas. En ambos casos el propietario regularizará con las facturas reales, en el caso de que no se haya consumido toda la aportación se devolverá la diferencia. En caso de superarla el propietario podrá exigir un pequeño adelanto para futuras facturas.",
    },
    {
      title: "¿Qué fianza tengo que entregar? ¿Cuándo y cómo lo hago?",
      content:
        "Como en cualquier alquiler, se entrega una fianza por si hubiera impagos o desperfectos producido por el inquilino en la vivienda/habitación. Las habitaciones van sujetas a una fianza de 350€ si tienen baño propio o terraza propia. Para el resto de habitaciones la fianza a entregar es de 300€",
    },
    {
      title: "¿Cómo hago mi reserva?",
      content:
        "Tienes que entrar en www.helloflatmate.com , Registrarte, y cumplimentar todos los datos que te solicitan para Crear una cuenta. Te llegará un email de confirmación para que actives la cuenta a través de él. Ahora puedes entrar en www.helloflatmate.com e Iniciar Sesión con tu email y la contraseña que has definido. Ve al Link de la habitación que has elegido, Selecciona la Fecha de contrato y dale al botón azul de Reservar. Comprueba que las fechas y precio son correctos y dale al botón azul de Pago Seguro con Tarjeta. Te llevará a la pasarela de pago online del banco y puedes hacer la operación de compra con toda tranquilidad. Te llegará un email de confirmación con un recibo del pago y solicitando una documentación que debes enviarnos. Ya está, ya tienes la habitación reservada para ti, a la espera de tus documentos para formalizar el contrato. Días antes de tu llegada recibirás un email con las instrucciones para el check in. ¡Bienvenido a helloflatmate!",
    },

  ];

  return (
    <div className="w-full flex flex-col justify-center items-center py-16 px-2 bg-[#FFE5F7] space-y-10">
      <h2 className="text-4xl font-bold text-gray-800 text-center">
      ¿Alguna duda?
      </h2>
      <div className="max-w-screen-lg w-full space-y-4">
        {items.map((item, index) => (
          <AccordionItemV2
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
        </div>
    </div>
  );
};

export default FAQ2;

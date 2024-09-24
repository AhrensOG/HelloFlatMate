"use client";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState, useEffect } from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-2">
      <div className="h-10 bg-gray-300 rounded mb-4 w-full"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-6 bg-gray-300 rounded mb-4 w-full"></div>
      <div className="h-12 bg-gray-400 rounded w-full"></div>
    </div>
  );
};

const SuccessPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const [action, setAction] = useState("");

  // Obtener el tipo de pago desde el query
  const paymentType = searchParams.get("type");

  // useEffect para actualizar los textos según el tipo de pago
  useEffect(() => {
    if (paymentType === "supply") {
      setTitle("¡Pago de Suministro Completado!");
      setSubTitle("Gracias por realizar tu pago de servicios.");
      setBody(
        "Tu pago ha sido procesado exitosamente. No olvides revisar los detalles del suministro y gestionar futuros pagos."
      );
      setAction("Ver Detalles del Suministro");
    } else if (paymentType === "reserve") {
      // Mantén los textos predeterminados para las reservas
      setTitle("¡Felicitaciones!");
      setSubTitle("Gracias por confiar en helloflamate");
      setBody(
        "Completa tus datos y sube la documentación necesaria para que podamos confirmar tu reserva."
      );
      setAction("Completar Información");
    }
  }, [paymentType]); // Se ejecuta cuando cambia el paymentType

  // Función de redirección basada en el tipo de pago
  const handleCallback = () => {
    if (paymentType === "reserve") {
      router.push("/pages/user/contract/" + id);
    } else if (paymentType === "supply") {
      router.push("/pages/user/supplies/" + id);
    } else {
      router.push("/");
    }
  };

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ThankYou
        title={title}
        subTitle={subTitle}
        body={body}
        action={action}
        callback={handleCallback}
      />
    </Suspense>
  );
};

export default SuccessPage;

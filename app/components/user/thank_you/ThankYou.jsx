import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYou({
  id,
  title = "",
  subTitle = "",
  body = "",
  action = "",
  callback = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tit, setTit] = useState(title);
  const [subTit, setSubTit] = useState(subTitle);
  const [bod, setBod] = useState(body);
  const [act, setAct] = useState(action);

  // Obtener el tipo de pago desde el query
  const paymentType = searchParams.get("type");
  const roomId = searchParams.get("r");
  const lo = searchParams.get("lo");

  // useEffect para actualizar los textos según el tipo de pago
  useEffect(() => {
    if (paymentType === "supply") {
      setTit("¡Pago de Suministro Completado!");
      setSubTit("Gracias por realizar tu pago de servicios.");
      setBod(
        "Tu pago ha sido procesado exitosamente. No olvides revisar los detalles del suministro y gestionar futuros pagos."
      );
      setAct("Ver Detalles del Suministro");
    } else if (paymentType === "reserve") {
      // Mantén los textos predeterminados para las reservas
      setTit("¡Felicitaciones!");
      setSubTit("Gracias por confiar en helloflamate");
      setBod(
        "Completa tus datos, sube la documentación requerida y firma tu contrato digital para poder acceder a tu alojamiento en tu panel de usuario."
      );
      setAct("Completar Información");
    } else if (paymentType === "monthly") {
      // Mantén los textos predeterminados para las reservas
      setTit("¡Felicitaciones!");
      setSubTit("Gracias por confiar en helloflamate");
      setBod("Verifica tus pagos en tus dormitorios");
      setAct("Continuar");
    }
  }, [paymentType]); // Se ejecuta cuando cambia el paymentType

  // Función de redirección basada en el tipo de pago
  const handleCallback = () => {
    if (paymentType === "reserve") {
      router.push(`/pages/user/contract/${id}?r=${roomId}&lo=${lo}`);
    } else if (paymentType === "supply") {
      router.push("/pages/user/supplies/" + id);
    } else if (paymentType === "monthly") {
      router.push("/pages/user/my-bedrooms");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center h-[70vh]">
        <div className="flex flex-col items-center justify-center w-full max-w-screen-sm">
          <div className="grow flex flex-col items-center justify-center gap-8 ">
            <Image
              src={"/howitworks/verificado.gif"}
              width={130}
              height={130}
            />
            <div>
              <h1 className="text-2xl font-semibold text-center">{tit}</h1>
              <h2 className="font-semibold text-base text-center">{subTit}</h2>
            </div>

            <div>
              <h3 className="text-center text-gray-600 font-normal">{bod}</h3>
            </div>
          </div>
          <div className="flex items-end w-full p-2">
            <button
              className="text-white w-full h-[3rem] font-bold bg-[#1FAECC] rounded-lg border border-[#1FAECC]"
              onClick={() => (callback ? callback() : handleCallback())}
            >
              {act}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

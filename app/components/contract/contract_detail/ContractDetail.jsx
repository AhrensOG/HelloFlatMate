import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import TitleSection from "../TitleSection";
import ButtonReadAndSingContract from "../ButtonReadAndSingContract";
import SignaturePad from "../contract_signature/SignaturePad";
import Image from "next/image";
import { Context } from "@/app/context/GlobalContext";

const ContractDetail = ({ handleContinue, handleBack }) => {
  const { state } = useContext(Context);
  const [signatureModal, setSignatureModal] = useState(false);

  // Property DATA
  const contractDate = "23 de julio de 2024";
  const landlordName = "Juan Pérez";
  const landlordNIF = "12345678A";
  const landlordStreet = "Gran Vía";
  const landlordStreetNumber = "45";
  const landlordDoorNumber = "3B";
  const landlordPostalCode = "46021";
  const numberOfRooms = 3;
  const numberOfBathrooms = 2;
  const monthlyRent = 450;
  const proportionalRent = 300;
  const roomNumber = "2";

  // Client DATA
  const info = state.reservationInfo?.userContractInformation;
  const tenantName = info?.name + " " + info?.lastName || "María López";
  const tenantID = info?.dni || "87654321B";
  const tenantPhone = info?.phone || "600123456";
  const tenantEmail = info?.email || "maria.lopez@example.com";
  const tenantAddress = info?.address || "Av. del Cid, 10";
  const tenantStreet = info?.address || "Av. del Cid";
  const startDate = info?.startDate || "1 de septiembre de 2024";
  const endDate = info?.endDate || "31 de agosto de 2025";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
      <TitleSection
        title={"Contrato de renta"}
        action={() => {
          handleBack();
        }}
      />
      <div className="w-full grid place-items-center">
        <div className="container mx-auto p-4 max-w-screen-sm max-h-[50vh] overflow-y-scroll w-full text-justify">
          <p className="mb-4 text-sm break-words font-light">
            En la ciudad de Valencia, a{" "}
            <span className="font-medium">{contractDate}</span>
          </p>
          <h2 className="text-base font-bold mb-2">REUNIDOS</h2>
          <p className="mb-4 text-sm break-words font-light">
            De una parte, D./Dª{" "}
            <span className="font-medium">{landlordName}</span>, como parte
            ARRENDADORA, siendo mayor de edad, con NIF{" "}
            <span className="font-medium">{landlordNIF}</span>, propietario/a en
            pleno dominio del inmueble sito en Valencia:
          </p>
          <p className="mb-4 text-sm break-words font-light">
            C/ <span className="font-medium">{landlordStreet}</span> nº{" "}
            <span className="font-medium">{landlordStreetNumber}</span> - PUERTA{" "}
            <span className="font-medium">{landlordDoorNumber}</span>ª, Valencia{" "}
            <span className="font-medium">{landlordPostalCode}</span>
          </p>
          <p className="mb-4 text-sm break-words font-light">
            Dicho inmueble se halla amueblado y consta de{" "}
            <span className="font-medium">{numberOfRooms}</span> habitaciones,
            sala de estar, cocina y{" "}
            <span className="font-medium">{numberOfBathrooms}</span> cuartos de
            baño.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            EL ARRENDADOR autoriza a Hello Flat Mate S.L. con CIF B98358963,
            bajo mandato expreso, únicamente la formalización de este contrato.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            De otra parte, D/Dª{" "}
            <span className="font-medium">{tenantName}</span>, mayor de edad,
            con D.N.I o pasaporte{" "}
            <span className="font-medium">{tenantID}</span>, nº de teléfono{" "}
            <span className="font-medium">{tenantPhone}</span>, email{" "}
            <span className="font-medium">{tenantEmail}</span>, y con domicilio
            en <span className="font-medium">{tenantAddress}</span>, C/{" "}
            <span className="font-medium">{tenantStreet}</span>, actuando como
            parte ARRENDATARIA, está interesado en arrendar la habitación n.º R
            <span className="font-medium">{roomNumber}</span> del mencionado
            inmueble.
          </p>

          <h2 className="text-base font-bold mb-2">INTERVIENEN</h2>
          <p className="mb-4 text-sm break-words font-light">
            Las partes intervienen en su propio nombre y derecho, reconociéndose
            la capacidad legal necesaria para celebrar el presente contrato, a
            cuyo efecto acuerdan;
          </p>
          <p className="mb-4 text-sm break-words font-light">
            Que, estando interesada la parte la ARRENDATARIA en el arrendamiento
            de la habitación indicada en el Expositivo anterior, y la
            ARRENDADORA en concedérselo, han convenido la celebración del
            presente CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA
            COMPARTIDA, el cual se formaliza con sujeción al régimen jurídico
            establecido en la Ley de Arrendamientos Urbanos de 24 de noviembre
            de 1.994, así como el recogido en el Código Civil, el cual llevan a
            cabo por medio del presente contrato y, con arreglo a las siguientes
          </p>

          <h2 className="text-base font-bold mb-2">CLÁUSULAS</h2>
          <h3 className="text-lg font-bold mb-2">
            PRIMERA. - DESTINO Y OBJETO DEL CONTRATO.
          </h3>
          <p className="mb-4 text-sm break-words font-light">
            Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación descrita
            en este contrato.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            El destino pactado para la edificación es de Uso distinto al de
            vivienda y concretamente la residencia temporal del ARRENDATARIO por
            motivos laborales o educativos, sin que los arrendatarios puedan
            cambiar el destino pactado para el mismo.
          </p>

          <h3 className="text-lg font-bold mb-2">SEGUNDA. - ESTADO.</h3>
          <p className="mb-4 text-sm break-words font-light">
            Dado que el ARRENDATARIO es posible que firme el contrato sin haber
            previamente visitado la vivienda in situ, tendrá 3 días para
            reportar cualquier desperfecto que se encuentren en zonas comunes
            como en la habitación alquilada.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            Una vez transcurrido este período sin que el ARRENDATARIO haya
            notificado desperfecto alguno en la vivienda o en la habitación
            arrendada, se entenderá que la vivienda se encontraba en perfecto
            estado para su uso y habitabilidad, debiendo devolverla el
            arrendatario a la finalización del contrato en ese mismo estado.
          </p>

          <h3 className="text-lg font-bold mb-2">
            TERCERA. - DURACIÓN DEL CONTRATO.
          </h3>
          <p className="mb-4 text-sm break-words font-light">
            El presente contrato se acuerda que se extenderá por el período
            comprendido del <span className="font-medium">{startDate}</span> al{" "}
            <span className="font-medium">{endDate}</span>. Transcurrido dicho
            período, el contrato quedará resuelto sin necesidad de requerimiento
            alguno y se dejará libre la habitación a las 9 a.m. La expiración
            del tiempo pactado para el presente contrato de arrendamiento
            producirá la automática extinción del contrato, quedando obligadas
            los arrendatarios a dejar la habitación libre de enseres a la
            referida fecha y a disposición del ARRENDADOR, y en las mismas
            condiciones existentes en el momento de la ocupación. Para el caso
            de que el ARRENDATARIO estuviera interesado en añadir una noche
            extra a su estancia, ésta tendrá un coste de 35 €, y siempre estará
            condicionada a la disponibilidad de la habitación y a la
            autorización del ARRENDADOR.
          </p>

          <h3 className="text-lg font-bold mb-2">CUARTA. - RENTA.</h3>
          <p className="mb-4 text-sm break-words font-light">
            El arrendatario abonará al arrendador, en concepto de renta, la
            cantidad de <span className="font-medium">{monthlyRent}</span> €
            mensuales, siempre por adelantado y dentro del período comprendido
            entre los días 20 y 25 de cada mes. En dicho precio no se incluyen
            los gastos relativos a los suministros de agua, luz e internet.
            Dicha renta se abonará a través del área de usuario del ARRENDATARIO
            de la página web www.helloflatmate.com a través de la pasarela de
            pago, mediante tarjeta de crédito o débito. El incumplimiento
            reiterado de la obligación de pago o notificación del justificante
            del pago en el periodo fijado será motivo de resolución del
            contrato, dando derecho al arrendador a solicitar el desahucio,
            siendo por cuenta del ARRENDATARIO los gastos que estas acciones
            originen. El ARRENDATARIO es conocedor y asume que en caso de impago
            de las rentas deberá abandonar la vivienda, perdiendo las cantidades
            entregadas en concepto de fianza así como suministros de agua, luz,
            gas e internet. Del mismo modo, para el caso de que el arrendatario
            incumpla el plazo de pago de la renta, el ARRENDADOR podrá sancionar
            al ARRENDATARIO por dicho incumplimiento con 10€ por cada día de
            retraso en el pago.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            El ARRENDATARIO estará obligado a abonar junto a la renta del último
            mes de contrato, 50 € para la limpieza profunda de la vivienda. No
            obstante, el ARRENDATARIO deberá dejar la habitación, así como las
            zonas comunes totalmente limpias y sin enseres personales. En ese
            sentido, el ARRENDATARIO se responsabiliza solidariamente junto a
            sus compañeros a dejar la vivienda completamente limpia. En caso de
            que la vivienda no quede en las condiciones establecidas se
            descontará del depósito la cantidad de horas extra que se haya
            invertido en la limpieza de ésta.
          </p>

          <h3 className="text-lg font-bold mb-2">
            QUINTA. - PRIMERA ENTREGA DE LLAVES.
          </h3>
          <p className="mb-4 text-sm break-words font-light">
            Que previamente a la entrega de llaves, el inquilino deberá abonar
            las siguientes cantidades:
          </p>
          <p className="mb-4 text-sm break-words font-light">
            ⦁ Un depósito de TRESCIENTOS EUROS (300 €) en concepto de FIANZA.
            Este importe será devuelto entre 30 y 45 días tras la finalización
            del contrato, por parte del ARRENDADOR al ARRENDATARIO, mediante
            transferencia bancaria y una vez revisado que la vivienda se
            encuentra en perfecto estado y se hayan liquidado todos los gastos
            de suministros.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            El ARRENDATARIO correrá con los gastos bancarios que se deriven de
            la devolución de la fianza.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            ⦁ La parte proporcional de la renta del primer mes en función de los
            días que va a ocupar la habitación desde el 01/09/2024. Este importe
            es de <span className="font-medium">{proportionalRent}</span> Euros.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            ⦁ Una fianza que se devolverá tras la salida del inquilino siempre
            que no haya ningún desperfecto de QUINIENTOS EUROS (500 €) por la
            llave.
          </p>
          <p className="mb-4 text-sm break-words font-light">
            No se permitirán más inquilinos que los autorizados en el presente
            contrato, debiendo ser desocupada la vivienda una vez finalizado el
            contrato.
          </p>

          <h3 className="text-lg font-bold mb-2">SEXTA. - INCUMPLIMIENTO.</h3>
          <p className="mb-4 text-sm break-words font-light">
            Si alguna de las partes no cumpliese con alguna de las cláusulas
            contenidas en el presente contrato, quedará automáticamente anulado
            y las partes podrán reclamar lo que en derecho les corresponda.
          </p>

          <h3 className="text-lg font-bold mb-2">SÉPTIMA. - USO.</h3>
          <p className="mb-4 text-sm break-words font-light">
            El arrendatario no podrá subarrendar la vivienda ni ceder el uso de
            la misma a ninguna persona, ni en forma total ni parcial. El
            ARRENDADOR se reserva el derecho de inspeccionar la vivienda y sus
            dependencias, así como de exigir en todo momento el cumplimiento de
            las condiciones establecidas en el presente contrato.
          </p>

          <h3 className="text-lg font-bold mb-2">
            OCTAVA. - DERECHO DE DESISTIMIENTO.
          </h3>
          <p className="mb-4 text-sm break-words font-light">
            El ARRENDATARIO podrá desistir del contrato en cualquier momento sin
            ninguna penalización, notificándolo al ARRENDADOR con un mes de
            antelación.
          </p>

          <h3 className="text-lg font-bold mb-2">NOVENA. - LOPD.</h3>
          <p className="mb-4 text-sm break-words font-light">
            En cumplimiento de lo dispuesto en la Ley Orgánica 15/1999, de 13 de
            diciembre, de Protección de Datos de Carácter Personal (LOPD), las
            partes se comprometen a tratar los datos personales proporcionados
            en el presente contrato con la confidencialidad y el respeto debido.
          </p>

          <p className="mt-8">
            En prueba de conformidad, ambas partes firman el presente contrato,
            en duplicado ejemplar, y a un solo efecto, en el lugar y fecha
            indicados en el encabezamiento.
          </p>
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm break-words font-light flex flex-col justify-center items-center">
              Firma ARRENDATARIA:{" "}
            </p>
            <p className="mb-4 text-sm break-words font-light flex flex-col justify-center items-center">
              Firma ARRENDADORA:{" "}
              <Image
                src={"/contract/signature.svg"}
                width={200}
                height={100}
                alt="Owner Signature"
              />
            </p>
          </div>
        </div>

        <ButtonReadAndSingContract
          action={() => setSignatureModal(true)}
          title={"Firmar contrato"}
        />
      </div>
      {signatureModal && (
        <SignaturePad
          setModal={setSignatureModal}
          handleContinue={handleContinue}
        />
      )}
    </motion.section>
  );
};

export default ContractDetail;

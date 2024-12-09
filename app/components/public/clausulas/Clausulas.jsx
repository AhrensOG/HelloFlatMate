import React from "react";

const ContractClauses = () => {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-resolution-blue">
        Cláusulas del Contrato
      </h1>

      {/* Cláusula 1 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">PRIMERA. DESTINO Y OBJETO DEL CONTRATO</h2>
        <p className="pl-6 mt-2">
          Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación descrita en este contrato.
        </p>
        <p className="pl-6 mt-4">
          El destino pactado para la edificación es de <strong>uso distinto al de vivienda</strong> y concretamente
          la residencia temporal del ARRENDATARIO por motivos laborales o educativos, sin que los arrendatarios puedan cambiar el destino pactado para el mismo.
        </p>
      </section>

      {/* Cláusula 2 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">SEGUNDA. ESTADO</h2>
        <p className="pl-6 mt-2">
          Dado que el ARRENDATARIO es posible que firme el contrato sin haber previamente visitado la vivienda in situ,
          tendrá <strong>3 días</strong> para reportar cualquier desperfecto que se encuentren en zonas comunes como en la habitación alquilada.
        </p>
        <p className="pl-6 mt-4">
          Una vez transcurrido este período sin que el ARRENDATARIO haya notificado desperfecto alguno en la vivienda
          o en la habitación arrendada, se entenderá que la vivienda se encontraba en perfecto estado para su uso y habitabilidad,
          debiendo devolverla el arrendatario a la finalización del contrato en ese mismo estado.
        </p>
      </section>

      {/* Cláusula 3 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">TERCERA. DURACIÓN DEL CONTRATO</h2>
        <p className="pl-6 mt-2">
          El presente contrato se acuerda que se extenderá por el período comprendido del <strong>…./…/202… al …./.…/202…</strong>.
          Transcurrido dicho período, el contrato quedará resuelto sin necesidad de requerimiento alguno y se dejará libre la habitación a las <strong>9 a.m.</strong>.
        </p>
        <p className="pl-6 mt-4">
          Para el caso de que el ARRENDATARIO estuviera interesado en añadir una noche extra a su estancia,
          ésta tendrá un coste de <strong>35 €</strong>, y siempre estará condicionada a la disponibilidad de la habitación y a la autorización del ARRENDADOR.
        </p>
      </section>

      {/* Cláusula 4 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">CUARTA. RENTA</h2>
        <p className="pl-6 mt-2">
          El arrendatario abonará al arrendador, en concepto de renta, la cantidad de <strong>…… € mensuales</strong>,
          siempre por adelantado y dentro del período comprendido entre los días <strong>20 y 25 de cada mes</strong>.
        </p>
        <p className="pl-6 mt-4">
          En dicho precio no se incluyen los gastos relativos a los suministros de agua, luz e internet. 
          Dicha renta se abonará a través del área de usuario del ARRENDATARIO en la página web{" "}
          <a
            href="https://www.helloflatmate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.helloflatmate.com
          </a>{" "}
          a través de la pasarela de pago, mediante tarjeta de crédito o débito.
        </p>
        <p className="pl-6 mt-4">
          El incumplimiento reiterado de la obligación de pago o notificación del justificante del pago en el periodo fijado
          será motivo de resolución del contrato, dando derecho al arrendador a solicitar el desahucio.
        </p>
        <p className="pl-6 mt-4">
          Para el caso de que el arrendatario incumpla el plazo de pago de la renta, el ARRENDADOR podrá sancionar
          al ARRENDATARIO con <strong>10 € por cada día de retraso en el pago</strong>.
        </p>
        <p className="pl-6 mt-4">
          El ARRENDATARIO estará obligado a abonar junto a la renta del último mes de contrato, <strong>50 €</strong> para la limpieza profunda de la vivienda.
        </p>
      </section>

      {/* Cláusula 5 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">QUINTA. PRIMERA ENTREGA DE LLAVES</h2>
        <p className="pl-6 mt-2">
          Antes de la entrega de llaves, el inquilino deberá abonar las siguientes cantidades:
        </p>
        <ul className="list-disc pl-12 mt-4 space-y-2">
          <li>
            <strong>300 €</strong> en concepto de fianza. Este importe será devuelto entre <strong>30 y 45 días</strong> tras la finalización del contrato.
          </li>
          <li>
            <strong>200 €</strong> en concepto de suministros de agua y luz por cada período de cinco meses de contrato.
          </li>
          <li>
            <strong>80 €</strong> en concepto de tarifa plana de internet por los primeros cinco meses de contrato.
          </li>
        </ul>
      </section>

      {/* Cláusula 6 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">SEXTA. DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR</h2>
        <p className="pl-6 mt-2">
          Las partes acuerdan expresamente la renuncia del ARRENDATARIO a impedir que el ARRENDADOR pueda acceder a las zonas comunes
          de la vivienda y a las habitaciones que circunstancialmente no se encuentren arrendadas en el momento del acceso a la vivienda.
        </p>
        <p className="pl-6 mt-4">
          En caso de que se vaya a efectuar una visita, ésta será comunicada con al menos <strong>una hora de antelación</strong> al arrendatario.
        </p>
      </section>

      {/* Continuar con el mismo formato */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">SÉPTIMA. DESISTIMIENTO DEL CONTRATO POR PARTE DEL ARRENDATARIO</h2>
        <p className="pl-6 mt-2">
          En caso de desistimiento por parte del ARRENDATARIO, éste estará obligado al pago íntegro de todas las mensualidades
          convenidas hasta la finalización del contrato, salvo que presente un nuevo inquilino que sea aceptado por el arrendador.
        </p>
      </section>

      {/* Añade las cláusulas restantes con el mismo formato */}

      <p className="text-sm text-gray-500 mt-6">
        © 2024 HELLO FLAT MATE, S.L. Todos los derechos reservados.
      </p>
    </main>
  );
};

export default ContractClauses;

import React from "react";
import Image from "next/image";
import ButtonReadAndSingContract from "../ButtonReadAndSingContract";

export default function HelloLandlordContract({
  contractDate = "… de ……. de 202…..",
  landlordName = "………………………",
  landlordNIF = "………………………………………",
  landlordIBAN = "ES………………………………………",
  landlordStreet = "……………………………",
  landlordStreetNumber = "……..",
  landlordDoorNumber = "……….ª",
  landlordPostalCode = "46…………...",
  numberOfRooms = "…..",
  numberOfBathrooms = "…",
  tenantName = "……………………………",
  tenantID = "……………",
  tenantPhone = "+……………………",
  tenantEmail = "………………………",
  tenantAddress = "………………………",
  tenantStreet = "……………………………………",
  roomNumber = "R……",
  startDate = "…/…/202…",
  endDate = "…/…/202…",
  monthlyRent = "……..",
  handleModal,
  isChecked,
  setIsChecked,
}) {
  return (
    <div className="w-full grid place-items-center">
      <div className="container mx-auto p-4 max-w-screen-lg max-h-max overflow-y-auto w-full text-justify">
        <p className="text-justify mb-4">
          <strong>CONTRATO DE ARRENDAMIENTO DE ALOJAMIENTO</strong>
        </p>
        <p className="mb-4 text-sm font-light">
          En la ciudad de Valencia, a {contractDate || "… de ……. de 202….."}
        </p>
        <h2 className="text-base font-bold mb-2">REUNIDOS</h2>
        <p className="mb-4 text-sm font-light">
          De una parte, D./Dª {landlordName || "………………………"}, como parte
          ARRENDADORA, siendo mayor de edad, con NIF{" "}
          {landlordNIF || "………………………………………"}, propietario/a en pleno dominio del
          inmueble sito en Valencia:
        </p>
        <p className="mb-4 text-sm font-light">
          C/ {landlordStreet || "……………………………"} nº{" "}
          {landlordStreetNumber || "…….."} - PUERTA{" "}
          {landlordDoorNumber || "……….ª"}, Valencia{" "}
          {landlordPostalCode || "46…………..."}.
        </p>
        <p className="mb-4 text-sm font-light">
          Dicho inmueble se halla amueblado y consta de {numberOfRooms || "….."}{" "}
          habitaciones, sala de estar, cocina y {numberOfBathrooms || "…"}{" "}
          cuartos de baño.
        </p>
        <p className="mb-4 text-sm font-light">
          EL ARRENDADOR autoriza a Hello Flat Mate S.L. con CIF B98358963, bajo
          mandato expreso, únicamente la formalización de este contrato.
        </p>
        <p className="mb-4 text-sm font-light">
          De otra parte, D./Dª {tenantName || "……………………………"}, mayor de edad, con
          D.N.I o pasaporte{" "}
          {tenantID || "……………"}, nº de teléfono {tenantPhone || "+……………………"},
          email {tenantEmail || "………………………"}, y con domicilio en{" "}
          {tenantAddress || "………………………"}, C/ {tenantStreet || "……………………………………"}{" "}
          actuando como parte ARRENDATARIA, está interesado en arrendar la
          habitación n.º {roomNumber || "R……"} del mencionado inmueble.
        </p>
        <h2 className="text-base font-bold mb-2">INTERVIENEN</h2>
        <p className="mb-4 text-sm font-light">
          Las partes intervienen en su propio nombre y derecho, reconociéndose
          la capacidad legal necesaria para celebrar el presente contrato, a
          cuyo efecto acuerdan; Que, estando interesada la parte la ARRENDATARIA
          en el arrendamiento de la habitación indicada en el Expositivo
          anterior, y la ARRENDADORA en concedérselo, han convenido la
          celebración del presente CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN
          VIVIENDA COMPARTIDA, el cual se formaliza con sujeción al régimen
          jurídico establecido en la Ley de Arrendamientos Urbanos de 24 de
          noviembre de 1.994, así como el recogido en el Código Civil, el cual
          llevan a cabo por medio del presente contrato y, con arreglo a las
          siguientes:
        </p>
        <h2 className="text-base font-bold mb-2">CLÁUSULAS</h2>
        <h3 className="text-sm font-bold mb-2">
          PRIMERA. - DESTINO Y OBJETO DEL CONTRATO.
        </h3>
        <p className="mb-4 text-sm font-light">
          Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación descrita en
          este contrato. El destino pactado para la edificación es de Uso
          distinto al de vivienda y concretamente la residencia temporal del
          ARRENDATARIO por motivos laborales o educativos, sin que los
          arrendatarios puedan cambiar el destino pactado para el mismo.
        </p>
        <h3 className="text-sm font-bold mb-2">SEGUNDA. - ESTADO.</h3>
        <p className="mb-4 text-sm font-light">
          Dado que el ARRENDATARIO es posible que firme el contrato sin haber
          previamente visitado la vivienda in situ, tendrá 3 días para reportar
          cualquier desperfecto que se encuentren en zonas comunes como en la
          habitación alquilada. Una vez transcurrido este período sin que el
          ARRENDATARIO haya notificado desperfecto alguno en la vivienda o en la
          habitación arrendada, se entenderá que la vivienda se encontraba en
          perfecto estado para su uso y habitabilidad, debiendo devolverla el
          arrendatario a la finalización del contrato en ese mismo estado.
        </p>
        <h3 className="text-sm font-bold mb-2">
          TERCERA. - DURACIÓN DEL CONTRATO.
        </h3>
        <p className="mb-4 text-sm font-light">
          El presente contrato se acuerda que se extenderá por el período
          comprendido del {startDate || "…/…/202…"} al {endDate || "…/…/202…"}.
          Transcurrido dicho período, el contrato quedará resuelto sin necesidad
          de requerimiento alguno y se dejará libre la habitación a las 9 a.m.
          La expiración del tiempo pactado para el presente contrato de
          arrendamiento producirá la automática extinción del contrato, quedando
          obligadas los arrendatarios a dejar la habitación libre de enseres a
          la referida fecha y a disposición del ARRENDADOR, y en las mismas
          condiciones existentes en el momento de la ocupación. Para el caso de
          que el ARRENDATARIO estuviera interesado en añadir una noche extra a
          su estancia, ésta tendrá un coste de 35 €, y siempre estará
          condicionada a la disponibilidad de la habitación y a la autorización
          del ARRENDADOR.
        </p>

        <h3 className="text-sm font-bold mb-2">CUARTA. - RENTA.</h3>
        <p className="mb-4 text-sm font-light">
          El arrendatario abonará al arrendador, en concepto de renta, la
          cantidad de {monthlyRent || "…….."} € mensuales, siempre por
          adelantado y dentro del período comprendido entre los días 20 y 25 de
          cada mes. En dicho precio no se incluyen los gastos relativos a los
          suministros de agua, luz e internet. Dicha renta se abonará mediante
          transferencia bancaria o ingreso en la siguiente cuenta de EL
          ARRENDADOR, indicando en el concepto el nombre del inquilino: IBAN
          Arrendador: {landlordIBAN || "ES…………………………………………"} El incumplimiento reiterado
          de la obligación de pago o notificación del justificante del pago en
          el periodo fijado será motivo de resolución del contrato, dando
          derecho al arrendador a solicitar el desahucio, siendo por cuenta del
          ARRENDATARIO los gastos que estas acciones originen. El ARRENDATARIO
          es conocedor y asume que en caso de impago de las rentas deberá
          abandonar la vivienda, perdiendo las cantidades entregadas en concepto
          de fianza así como suministros de agua, luz, gas e internet. Del mismo
          modo, para el caso de que el arrendatario incumpla el plazo de pago de
          la renta, el ARRENDADOR podrá sancionar al ARRENDATARIO por dicho
          incumplimiento con 10€ por cada día de retraso en el pago.
        </p>

        <p className="mb-4 text-sm font-light">
          El ARRENDATARIO estará obligado a abonar junto a la renta del último
          mes de contrato, 50 € para la limpieza profunda de la vivienda. No
          obstante, el ARRENDATARIO deberá dejar la habitación, así como las
          zonas comunes totalmente limpias y sin enseres personales. En ese
          sentido, el ARRENDATARIO se responsabiliza solidariamente junto a sus
          compañeros a dejar la vivienda completamente limpia. En caso de que la
          vivienda no quede en las condiciones establecidas se descontará del
          depósito la cantidad de horas extra que se haya invertido en la
          limpieza de ésta.
        </p>

        <h3 className="text-sm font-bold mb-2">
          QUINTA. - PRIMERA ENTREGA DE LLAVES.
        </h3>
        <p className="mb-4 text-sm font-light">
          Que previamente a la entrega de llaves, el inquilino deberá abonar las
          siguientes cantidades:
        </p>
        <p className="mb-4 text-sm font-light">
          • Un depósito de TRESCIENTOS EUROS (300 €) en concepto de FIANZA. Este
          importe será devuelto entre 30 y 45 días tras la finalización del
          contrato, por parte del ARRENDADOR al ARRENDATARIO, mediante
          transferencia bancaria y una vez revisado que la vivienda se encuentra
          en perfecto estado y se hayan liquidado todos los gastos de
          suministros.
        </p>
        <p className="mb-4 text-sm font-light">
          El ARRENDATARIO correrá con los gastos bancarios que en su caso se
          devenguen con la devolución de la fianza, y en especial aquellos
          derivados del uso de otro método de devolución especial (Western
          Unión, Ria, MoneyGram…etc.).
        </p>
        <p className="mb-4 text-sm font-light">
          Para el caso de que se encuentren desperfectos en la revisión que en
          su día se efectúe, así como recibos impagados por parte del
          ARRENDATARIO, el ARRENDADOR podrá deducir dichos importes de la
          cantidad a devolver del antes mencionado depósito.
        </p>
        <p className="mb-4 text-sm font-light">
          • La cantidad de DOSCIENTOS EUROS (200 €) en concepto de suministros
          de agua y luz por cada período de CINCO MESES de contrato. Una vez
          transcurrido dicho periodo, se calculará el importe exacto a abonar
          por parte del ARRENDATARIO en concepto de suministros, ajustando el
          importe abonado con el consumo real efectuado por el arrendatario.
        </p>
        <p className="mb-4 text-sm font-light">
          En caso de que los gastos de suministros hayan sido superiores al
          importe abonado de 200 €, estas cantidades serán repercutidas al
          ARRENDATARIO por parte del ARRENDADOR.
        </p>
        <p className="mb-4 text-sm font-light">
          • La cantidad de OCHENTA EUROS (80 €) en concepto de TARIFA PLANA de
          internet por los primeros cinco meses de contrato. Para los contratos
          de 10 meses, a final de enero, junto a la renta de febrero, se hará
          otra aportación para los siguientes 5 meses de contrato para los
          suministros y wifi.
        </p>

        <h3 className="text-sm font-bold mb-2">
          SEXTA. - DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR.
        </h3>
        <p className="mb-4 text-sm font-light">
          Las partes acuerdan expresamente la renuncia del ARRENDATARIO a
          impedir que el ARRENDADOR pueda acceder a las zonas comunes de la
          vivienda y a las habitaciones que circunstancialmente no se encuentren
          arrendadas en el momento del acceso a la vivienda.
        </p>
        <p className="mb-4 text-sm font-light">
          En caso de que se vaya a efectuar una visita por parte del responsable
          del ARRENDADOR a la vivienda, ésta será comunicada siempre con al
          menos una hora de antelación al arrendatario.
        </p>
        <p className="mb-4 text-sm font-light">
          La violación de este derecho del arrendador por parte de cualquier
          persona que se encuentre en la vivienda será considerada causa de
          resolución del contrato de arrendamiento y motivo de desahucio del
          arrendatario, siendo este responsable de los daños y perjuicios que el
          impedimento de acceso a la vivienda pueda ocasionar al arrendador,
          entre otros la pérdida de beneficios por no poder arrendar otras
          habitaciones.
        </p>
        <h3 className="text-sm font-bold mb-2">
          SÉPTIMA. – DESISTIMIENTO DEL CONTRATO POR PARTE DEL ARRENDATARIO.
        </h3>
        <p className="mb-4 text-sm font-light">
          En caso de desistimiento por parte del ARRENDATARIO, éste vendrá
          obligado al pago íntegro de todas las mensualidades convenidas hasta
          la finalización del contrato, salvo que éste presente un nuevo
          inquilino, se firme un nuevo contrato y sea aceptado por el resto de
          arrendatarios que ocupan la vivienda.
        </p>

        <h3 className="text-sm font-bold mb-2">OCTAVA. - FUERZA MAYOR.</h3>
        <p className="mb-4 text-sm font-light">
          En caso de fuerza mayor, el ARRENDATARIO no podrá exigir la
          resolución, suspensión y/o modificación del contrato, ni la reducción
          de la renta pactada. Entiéndase por fuerza mayor, a los efectos de
          este contrato, toda circunstancia que tenga carácter imprevisible e
          inevitable que afecte al cumplimiento de las obligaciones
          contractuales, tales como, ad exemplum, acontecimientos naturales
          extraordinarios como inundaciones, terremotos, caída de rayos,
          situaciones de epidemia y pandemia.
        </p>
        <p className="mb-4 text-sm font-light">
          Se exime al ARRENDADOR de cualquier responsabilidad derivada de las
          medidas adoptadas por la autoridad competente que escapen de su ámbito
          de control.
        </p>

        <h3 className="text-sm font-bold mb-2">
          NOVENA. – CESIÓN Y SUBARRIENDO.
        </h3>
        <p className="mb-4 text-sm font-light">
          Con expresa renuncia a lo dispuesto en el artículo 32 de la LAU., el
          ARRENDATARIO se obliga a no subarrendar, en todo o en parte, ni ceder
          o traspasar la habitación arrendada sin el consentimiento expreso y
          escrito del ARRENDADOR, siendo éste un contrato personal e
          intransferible. El incumplimiento de esta cláusula será causa de
          resolución del contrato.
        </p>

        <h3 className="text-sm font-bold mb-2">
          DÉCIMA. - DEVOLUCIÓN DE LAS LLAVES POR PARTE DEL ARRENDATARIO.
        </h3>
        <p className="mb-4 text-sm font-light">
          La parte ARRENDATARIA hará entrega de las llaves de la vivienda y de
          la habitación en la que se encuentra en la fecha de finalización del
          presente contrato, y con el mismo formato de entrega (con arandela y
          código de habitación).
        </p>
        <p className="mb-4 text-sm font-light">
          De realizar la entrega más tarde, sin que hubiera ejercitado la
          facultad de contratar una noche extra, el ARRENDATARIO abonará al
          ARRENDADOR la cantidad de 35 € por cada día de retraso en la puesta a
          disposición de las llaves, en concepto de cláusula penal, además de
          todos los gastos directos e indirectos que dicho retraso genere para
          la recuperación de la vivienda y de la habitación.
        </p>

        <h3 className="text-sm font-bold mb-2">
          DECIMOPRIMERA. – EMPADRONAMIENTO.
        </h3>
        <p className="mb-4 text-sm font-light">
          El ARRENDATARIO tendrá derecho a empadronarse en la vivienda
          compartida, siempre y cuando cumpla con los requisitos exigidos en la
          normativa local de referencia.
        </p>
        <p className="mb-4 text-sm font-light">
          Los contratos de arrendamiento de habitación cuya duración sea
          inferior a SEIS (6) MESES no darán derecho a empadronamiento, según lo
          previsto por el Ayuntamiento de Valencia.
        </p>
        <p className="mb-4 text-sm font-light">
          Para el caso de que el ARRENDATARIO esté interesado en que sea HELLO
          FLAT MATE quien gestione la tramitación del empadronamiento ante las
          autoridades, el ARRENDATARIO deberá abonar un suplemento de 150 €. En
          todo caso, una vez finalizado el arrendamiento, el ARRENDATARIO se
          obliga a presentar ante la OFICINA DEL PADRÓN MUNICIPAL la solicitud
          de baja. Si no lo hiciera, y no hubiera abonado el suplemento previsto
          en concepto de gestión, se descontarán del depósito 50 €.
        </p>

        <h3 className="text-sm font-bold mb-2">
          DECIMOSEGUNDA. - NORMAS DE CONVIVENCIA.
        </h3>
        <p className="mb-4 text-sm font-light">
          La parte ARRENDATARIA se someterá durante toda la vigencia del
          contrato a las normas establecidas por la comunidad de propietarios,
          especialmente las relativas a la convivencia, las obligaciones
          recogidas en la Ley 49/1960, de 21 de julio, sobre Propiedad
          Horizontal, y particularmente las normas incluidas en el ANEXO I del
          presente contrato, del que forma parte inseparable.
        </p>

        <h3 className="text-sm font-bold mb-2">
          DECIMOTERCERA. - OBLIGACIONES DEL ARRENDADOR Y ARRENDATARIO CON
          RESPECTO AL MANTENIMIENTO Y REPARACIONES.
        </h3>
        <p className="mb-4 text-sm font-light">
          El ARRENDADOR realizará, sin derecho por ello a elevar la renta al
          ARRENDATARIO, las reparaciones necesarias para conservar la vivienda
          en condiciones de habitabilidad para el uso convenido, salvo cuando el
          deterioro o reparación sea imputable al ARRENDATARIO, conforme a lo
          dispuesto en los artículos 1.563 y 1.564 del Código Civil.
        </p>
        <p className="mb-4 text-sm font-light">
          Las pequeñas reparaciones que exija el desgaste por el uso ordinario
          de la vivienda correrán por cuenta del ARRENDATARIO. Se entienden como
          pequeñas reparaciones la sustitución de bombillas, atascos en
          fregaderos, atascos en el WC, atascos en las persianas, rociador de la
          manguera de la ducha, etc.
        </p>
        <p className="mb-4 text-sm font-light">
          Es obligación del arrendatario el mantenimiento correcto y diligente
          tanto de la habitación alquilada como del resto de dependencias de la
          vivienda. El arrendatario no podrá hacer agujeros en las paredes o
          puertas, ni usar pegamentos o gomas adhesivas que puedan manchar o
          dañar las superficies.
        </p>
        <p className="mb-4 text-sm font-light">
          Las reparaciones e incidencias serán abonadas por el ARRENDATARIO al
          técnico encargado en el momento de su intervención. En caso de que
          estas corran a cargo del ARRENDADOR, él las abonará al ARRENDATARIO
          mediante transferencia bancaria.
        </p>

        <h3 className="text-sm font-bold mb-2">
          DECIMOCUARTA. – INCUMPLIMIENTO DE OBLIGACIONES.
        </h3>
        <p className="mb-4 text-sm font-light">
          El incumplimiento por cualquiera de las partes de las obligaciones
          resultantes del contrato dará derecho a la parte que hubiera cumplido
          las suyas a exigir el cumplimiento de la obligación o a promover la
          resolución del contrato de acuerdo con lo dispuesto en el artículo
          1.124 del Código Civil.
        </p>
        <p className="mb-4 text-sm font-light">
          Además, el ARRENDADOR podrá resolver de pleno derecho el contrato por
          las siguientes causas:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            a) La falta de pago de la renta o, en su caso, de cualquiera de las
            cantidades cuyo pago haya asumido o corresponda al ARRENDATARIO.
          </li>
          <li className="mb-2">
            b) La falta de pago del importe de la fianza.
          </li>
          <li className="mb-2">
            c) La realización de daños causados dolosamente en la finca o de
            obras no consentidas por el arrendador cuando el consentimiento de
            este sea necesario.
          </li>
          <li className="mb-2">
            d) Cuando en el inmueble tengan lugar actividades molestas,
            insalubres, nocivas, peligrosas o ilícitas.
          </li>
          <li className="mb-2">
            e) El incumplimiento reiterado o grave de alguna de las normas de
            convivencia acompañadas como ANEXO I de este contrato.
          </li>
        </ul>

        <h3 className="text-sm font-bold mb-2">
          DECIMOQUINTA. - LEGISLACIÓN APLICABLE.
        </h3>
        <p className="mb-4 text-sm font-light">
          En todo lo no previsto en el presente contrato, éste se regirá por lo
          dispuesto tanto en la Ley 29/1994, de 24 de noviembre, de
          Arrendamientos Urbanos, y supletoriamente por lo dispuesto en el
          Código Civil.
        </p>

        <h3 className="text-sm font-bold mb-2">DECIMOSEXTA. - SUMISIÓN.</h3>
        <p className="mb-4 text-sm font-light">
          Los contratantes se someten expresamente a los Juzgados y Tribunales
          de la ciudad de Valencia para todas aquellas cuestiones litigiosas que
          pudieran derivarse del presente contrato, por ser el lugar donde se
          encuentra la habitación arrendada.
        </p>
        {/* <p className="mb-4 text-sm font-light">
          Y con el carácter expresado en la intervención, firman el presente
          contrato, en el lugar y fecha indicados.
        </p>

        <div className="my-8 text-center w-full flex flex-wrap items-start justify-around">
          <p className="mb-4 text-sm break-words font-light flex flex-col justify-center items-center">
            Firma ARRENDATARIA:{" "}
          </p>
          <p className="mb-4 text-sm break-words font-light flex flex-col justify-center items-center">
            Firma ARRENDADORA:{" "}
            <Image
              src={"/contract/signature.png"}
              width={200}
              height={100}
              alt="Owner Signature"
            />
          </p>
        </div> */}

        <h3 className="text-sm font-bold mb-2">
          ANEXO I – NORMAS DE CONVIVENCIA
        </h3>
        <ol className="list-decimal ml-6 mb-4 text-sm font-light">
          <li className="mb-4">
            La parte arrendataria afirma que ha sido informada y se someterá
            durante toda la vigencia del contrato a las normas establecidas por
            la comunidad de propietarios, especialmente las relativas a la
            convivencia vecinal.
          </li>
          <li className="mb-4">
            El arrendatario deberá tener especial cuidado con los ruidos, a
            cualquier hora:
            <br />
            En particular se establece que «se consideran actividades no
            tolerables» acciones como «gritar, vociferar o emplear un tono
            excesivamente alto de la voz humana o la actividad directa de las
            personas, movimiento de muebles y/o enseres, etc». Entra dentro de
            esta categoría usar aparatos e instrumentos musicales o acústicos,
            radio, televisión, cuando causen molestias.
            <br />
            Asimismo, se considera una actividad no tolerable «usar
            electrodomésticos o maquinaria susceptibles de producir ruidos»
            molestos; se pone el ejemplo de un taladro. Por último, se añade
            también «la posesión de animales sin adoptar las medidas necesarias
            para evitar que los ruidos producidos por éstos ocasionen molestias
            a los vecinos». El texto subraya que se consideran «especialmente
            gravosos» estos comportamientos cuando tengan lugar entre las 22.00
            y las 8.00 horas.
          </li>
          <li className="mb-4">
            También deberá cumplir y respetar las normas internas de convivencia
            razonable que sean decididas por la mayoría de los arrendatarios de
            la vivienda, entre las que se incluye el cumplimiento de los turnos
            de limpieza de zonas comunes, baños y cocina, bajar la basura y el
            resto de las tareas domésticas básicas.
          </li>
          <li className="mb-4">
            Queda prohibida expresamente la tenencia de cualquier tipo de animal
            o mascota en la vivienda.
          </li>
          <li className="mb-4">
            El arrendamiento de la habitación tiene incluido el uso de las zonas
            comunes de la vivienda. Se establecen como normas de utilización de
            zonas comunes de la vivienda las siguientes:
            <ul className="list-disc ml-6">
              <li className="mb-2">
                a. Uso de los cuartos de baño, cocina y sala de estar: se podrá
                utilizar en cualquier horario respetando en todo momento las
                necesidades de utilización del resto de usuarios.
              </li>
              <li className="mb-2">
                b. El arrendatario acepta de forma expresa la prohibición de
                fumar dentro de cualquier dependencia de la vivienda, así como
                el consumo de sustancias estupefacientes. En caso de que se
                denuncie esta circunstancia por parte del resto de arrendatarios
                de la vivienda o de los vecinos, quedará el arrendador facultado
                para resolver el presente contrato con pérdida de las cantidades
                previamente abonadas en concepto de fianza y suministros
                abonadas por el arrendatario.
              </li>
              <li className="mb-2">
                c. Además, tampoco se podrá llevar a cabo ningún tipo de fiesta,
                cena o comida multitudinaria en la vivienda. Máximo se admiten 3
                invitados a la vez, entre todos los compañeros del piso.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            Para el caso de que esta circunstancia sea denunciada por el resto
            de los arrendatarios de la vivienda o de los vecinos, quedará
            facultado el arrendador para resolver el presente contrato con la
            pérdida de la fianza abonada por el arrendatario:
            <ul className="list-disc ml-6">
              <li className="mb-2">
                • Primer aviso por molestias vecinales (0€)
              </li>
              <li className="mb-2">
                • Segundo aviso (200€) ampliación de fianza.
              </li>
              <li className="mb-2">
                • Tercer aviso expulsión de la vivienda con pérdida de las
                aportaciones de fianza, suministros y wifi.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            El arrendatario da su consentimiento expreso de poder compartir las
            zonas comunes de la vivienda con personas de distinto género, etnia,
            nacionalidad o religión.
          </li>
          <li className="mb-4">
            Se hablará con educación y respeto o se penalizará con 100€ las
            faltas de respeto, insultos, etc., al arrendador, a la agencia, a
            los trabajadores de mantenimiento y limpieza, o a los propios
            compañeros.
          </li>
          <li className="mb-4">
            El arrendatario no podrá hacer uso de las habitaciones de la
            vivienda que no se encuentren arrendadas, siendo que para el caso de
            que efectivamente lo haga, podrá ser detraído el 100% de la cantidad
            entregada en concepto de fianza.
          </li>
          <li className="mb-4">
            Queda terminantemente prohibido el encendido de velas, candelas,
            incienso y cualquier otro material que arda y pueda incendiar la
            habitación o el piso.
          </li>
          <li className="mb-4">
            El arrendatario se obliga a estar en el grupo de Whatsapp del piso
            mientras resida en el piso.
          </li>
          <li className="mb-4">
            Visitas - Se puede recibir visitas en el piso siempre y cuando se
            informe a los compañeros y a la agencia a través del grupo de
            Whatsapp y los compañeros estén de acuerdo. La duración de la
            estancia es de máximo 3 noches y no pueden coincidir más de 3
            invitados de manera simultánea en la vivienda.
          </li>
          <li className="mb-4">
            Si el invitado supera las 3 noches de estancia, deberá contribuir
            con 20 € /semana para los gastos comunes del piso, previa aceptación
            por parte de los compañeros y de la agencia. En ningún caso debe
            convertirse en una costumbre, sólo visitas esporádicas.
          </li>
          <li className="mb-4">
            El visitante no puede dormir en las zonas comunes del piso, ni en el
            sofá. Siempre deberá hacerlo dentro de la habitación de su
            anfitrión. No puede haber un invitado pernoctando en el piso cuando
            su anfitrión se encuentre fuera de la ciudad.
          </li>
          <li className="mb-4">
            Para el supuesto de que el arrendatario extravíe las llaves de la
            vivienda o no las entregue a la finalización, deberá abonar los
            gastos ocasionados por el cambio de la cerradura de la puerta de
            entrada principal, más un juego de llaves por cada habitación de la
            vivienda y dos juegos de llaves extra que le corresponderá al
            arrendador.
          </li>
          <li className="mb-4">
            Una vez finalizado el presente contrato, el arrendatario deberá
            dejar la habitación, así como las zonas comunes, totalmente limpias
            y sin enseres personales, tal y como la encontró a su llegada.
          </li>
          <li className="mb-4">
            En caso de desperfectos ocasionados en las zonas comunes de la
            vivienda, y para el caso de que el causante de los daños no se
            identifique, responderán de los costes de las reparaciones
            pertinentes todos los inquilinos de forma solidaria con sus
            respectivas fianzas, sin perjuicio de que posteriormente puedan
            entablar las acciones legales pertinentes de forma interna para la
            restitución de dichos importes frente al responsable de los
            desperfectos.
          </li>
        </ol>

        <div className="pt-5 space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="form-checkbox"
            />
            <span>
              Habiendo leído el contrato acepto los términos y condiciones
            </span>
          </label>
          <ButtonReadAndSingContract
            action={() => handleModal(true)}
            title={"Firmar contrato"}
            isChecked={isChecked}
          />
        </div>
      </div>
    </div>
  );
}

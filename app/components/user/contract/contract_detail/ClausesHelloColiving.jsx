import React from "react";

const ClausesHelloColiving = ({
  startDate = "05/05/2025",
  endDate = "05/10/2025",
  monthlyRent = "-",
}) => {
  return (
    <div className="flex flex-col text-sm leading-relaxed text-gray-800">
      <h2 className="text-base font-bold mb-4 uppercase">CLÁUSULAS</h2>

      <h3 className="font-bold mb-2">
        PRIMERA. – DESTINO Y OBJETO DEL CONTRATO.
      </h3>
      <p className="mb-4 font-light">
        Que el <span className="font-medium">ARRENDADOR</span>, arrienda al{" "}
        <span className="font-medium">ARRENDATARIO</span>, la habitación
        descrita en este contrato.
      </p>
      <p className="mb-4 font-light">
        El destino pactado para la edificación es de Uso distinto al de vivienda
        y concretamente la residencia temporal del{" "}
        <span className="font-medium">ARRENDATARIO</span> por motivos laborales
        o educativos, sin que los arrendatarios puedan cambiar el destino
        pactado para el mismo.
      </p>

      <h3 className="font-bold mb-2">SEGUNDA. – ESTADO.</h3>
      <p className="mb-4 font-light">
        Dado que el <span className="font-medium">ARRENDATARIO</span> es posible
        que firme el contrato sin haber previamente visitado la vivienda in
        situ, tendrá 3 días para reportar cualquier desperfecto que se
        encuentren en zonas comunes como en la habitación alquilada.
      </p>
      <p className="mb-4 font-light">
        Una vez transcurrido este período sin que el{" "}
        <span className="font-medium">ARRENDATARIO</span> haya notificado
        desperfecto alguno en la vivienda o en la habitación arrendada, se
        entenderá que la vivienda se encontraba en perfecto estado para su uso y
        habitabilidad, debiendo devolverla el arrendatario a la finalización del
        contrato en ese mismo estado.
      </p>

      <h3 className="font-bold mb-2">TERCERA. – DURACIÓN DEL CONTRATO.</h3>
      <p className="mb-4 font-light">
        El presente contrato se acuerda que se extenderá por el período
        comprendido del <span className="font-medium">{startDate}</span> al{" "}
        <span className="font-medium">{endDate}</span>. Transcurrido dicho
        período, el contrato quedará resuelto sin necesidad de requerimiento
        alguno y se dejará libre la habitación a las 9 a.m.
      </p>
      <p className="mb-4 font-light">
        La expiración del tiempo pactado para el presente contrato de
        arrendamiento producirá la automática extinción del contrato, quedando
        obligadas los arrendatarios a dejar la habitación libre de enseres a la
        referida fecha y a disposición del{" "}
        <span className="font-medium">ARRENDADOR</span>, y en las mismas
        condiciones existentes en el momento de la ocupación.
      </p>
      <p className="mb-4 font-light">
        Para el caso de que el <span className="font-medium">ARRENDATARIO</span>{" "}
        estuviera interesado en añadir una noche extra a su estancia, ésta
        tendrá un coste de 35 €, y siempre estará condicionada a la
        disponibilidad de la habitación y a la autorización del{" "}
        <span className="font-medium">ARRENDADOR</span>.
      </p>

      <h3 className="font-bold mb-2">CUARTA. – RENTA.</h3>
      <p className="mb-4 font-light">
        El arrendatario abonará al arrendador, en concepto de renta, la cantidad
        de <span className="font-medium">{monthlyRent}</span> € mensuales,
        siempre por adelantado y dentro del período comprendido entre los días
        20 y 25 de cada mes.
      </p>
      <p className="mb-4 font-light">
        Dicha renta se abonará a través del área de usuario del{" "}
        <span className="font-medium">ARRENDATARIO</span> de la página web
        www.helloflatmate.com a través de la pasarela de pago, mediante tarjeta
        de crédito o débito.
      </p>
      <p className="mb-4 font-light">
        El incumplimiento reiterado de la obligación de pago o notificación del
        justificante del pago en el periodo fijado será motivo de resolución del
        contrato, dando derecho al arrendador a solicitar el desahucio, siendo
        por cuenta del <span className="font-medium">ARRENDATARIO</span> los
        gastos que estas acciones originen.
      </p>
      <p className="mb-4 font-light">
        El <span className="font-medium">ARRENDATARIO</span> es conocedor y
        asume que en caso de impago de las rentas deberá abandonar la vivienda,
        perdiendo las cantidades entregadas en concepto de fianza así como
        suministros de agua, luz, gas e internet.
      </p>
      <p className="mb-4 font-light">
        Del mismo modo, para el caso de que el arrendatario incumpla el plazo de
        pago de la renta, el <span className="font-medium">ARRENDADOR</span>{" "}
        podrá sancionar al <span className="font-medium">ARRENDATARIO</span> por
        dicho incumplimiento con 10€ por cada día de retraso en el pago.
      </p>
      <p className="mb-4 font-light">
        El <span className="font-medium">ARRENDATARIO</span> estará obligado a
        abonar junto a la renta del último mes de contrato, 50 € para la
        limpieza profunda de la vivienda. No obstante, el{" "}
        <span className="font-medium">ARRENDATARIO</span> deberá dejar la
        habitación, así como las zonas comunes totalmente limpias y sin enseres
        personales.
      </p>
      <p className="mb-4 font-light">
        En ese sentido, el <span className="font-medium">ARRENDATARIO</span> se
        responsabiliza solidariamente junto a sus compañeros a dejar la vivienda
        completamente limpia. En caso de que la vivienda no quede en las
        condiciones establecidas se descontará del depósito la cantidad de horas
        extra que se haya invertido en la limpieza de ésta.
      </p>
      <div className="mb-4 font-light">
        <p>Servicios incluidos en la renta:</p>
        <ul className="list-disc ml-5">
          <li>Internet Wifi</li>
          <li>2 limpiezas semanales de zonas comunes</li>
          <li>Atención 24 horas</li>
        </ul>
      </div>

      <h3 className="font-bold mb-2">QUINTA. – PRIMERA ENTREGA DE LLAVES.</h3>
      <p className="mb-4 font-light">
        Que previamente a la entrega de llaves, el inquilino deberá abonar las
        siguientes cantidades:
      </p>
      <p className="mb-4 font-light">
        - Un depósito de QUINIENTOS EUROS (500 €) en concepto de FIANZA. Este
        importe será devuelto entre 30 y 45 días tras la finalización del
        contrato, por parte del <span className="font-medium">ARRENDADOR</span>{" "}
        al <span className="font-medium">ARRENDATARIO</span>, mediante
        transferencia bancaria y una vez revisado que la vivienda se encuentra
        en perfecto estado y se hayan liquidado todos los gastos de suministros.
      </p>
      <p className="mb-4 font-light">
        El <span className="font-medium">ARRENDATARIO</span> correrá con los
        gastos bancarios que en su caso se devenguen con la devolución de la
        fianza, y en especial aquellos derivados del uso de otro método de
        devolución especial (Western Unión, Ria, MoneyGram…etc.).
      </p>
      <p className="mb-4 font-light">
        Para el caso de que se encuentren desperfectos en la revisión que en su
        día se efectúe, así como recibos impagados por parte del{" "}
        <span className="font-medium">ARRENDATARIO</span>, el{" "}
        <span className="font-medium">ARRENDADOR</span> podrá deducir dichos
        importes de la cantidad a devolver del antes mencionado depósito.
      </p>
      <p className="mb-4 font-light">
        - La cantidad de DOSCIENTOS EUROS (200 €) POR PERSONA en concepto de
        suministros de agua y luz por cada período de CINCO MESES de contrato.
        Una vez transcurrido dicho periodo, se calculará el importe exacto a
        abonar por parte del <span className="font-medium">ARRENDATARIO</span>{" "}
        en concepto de suministros, ajustando el importe abonado con el consumo
        real efectuado por el arrendatario.
      </p>
      <p className="mb-4 font-light">
        En caso de que los gastos de suministros hayan sido superiores al
        importe abonado de 200 € POR PERSONA, estas cantidades serán
        repercutidas al <span className="font-medium">ARRENDATARIO</span> por
        parte del <span className="font-medium">ARRENDADOR</span>.
      </p>

      <h3 className="font-bold mb-2">
        SEXTA. – DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR.
      </h3>
      <p className="mb-4 font-light">
        Las partes acuerdan expresamente la renuncia del{" "}
        <span className="font-medium">ARRENDATARIO</span> a impedir que el{" "}
        <span className="font-medium">ARRENDADOR</span> pueda acceder a las
        zonas comunes de la vivienda y a las habitaciones que
        circunstancialmente no se encuentren arrendadas en el momento del acceso
        a la vivienda.
      </p>
      <p className="mb-4 font-light">
        En caso de que se vaya a efectuar una visita por parte del responsable
        del <span className="font-medium">ARRENDADOR</span> a la vivienda, ésta
        será comunicada siempre con al menos una hora de antelación al
        arrendatario.
      </p>
      <p className="mb-4 font-light">
        La violación de este derecho del arrendador por parte de cualquier
        persona que se encuentre en la vivienda será considerada causa de
        resolución del contrato de arrendamiento y motivo de desahucio del
        arrendatario, siendo este responsable de los daños y perjuicios que el
        impedimento de acceso a la vivienda pueda ocasionar al arrendador, entre
        otros la pérdida de beneficios por no poder arrendar otras habitaciones.
      </p>

      <h3 className="font-bold mb-2">
        SÉPTIMA. – DESISTIMIENTO DEL CONTRATO POR PARTE DEL ARRENDATARIO.
      </h3>
      <p className="mb-4 font-light">
        En caso de desistimiento por parte de El{" "}
        <span className="font-medium">ARRENDATARIO</span>, éste vendrá obligado
        al pago íntegro de todas las mensualidades convenidas hasta la
        finalización del Contrato, salvo que éste presente un nuevo inquilino,
        se firme un nuevo contrato y sea aceptado por el resto de arrendatarios
        que ocupan la vivienda.
      </p>

      <h3 className="font-bold mb-2">OCTAVA. – FUERZA MAYOR.</h3>
      <p className="mb-4 font-light">
        En caso de fuerza mayor el{" "}
        <span className="font-medium">ARRENDATARIO</span> no podrá exigir la
        resolución, suspensión y/o modificación del contrato, ni la reducción de
        la renta pactada.
      </p>
      <p className="mb-4 font-light">
        Entiéndase por fuerza mayor, a los efectos de este contrato, toda
        circunstancia que tenga carácter imprevisible e inevitable que afecte al
        cumplimiento de las obligaciones contractuales, tales como, ad exemplum,
        acontecimientos naturales extraordinarios como inundaciones, terremotos,
        caída de rayos, situaciones de epidemia y pandemia.
      </p>
      <p className="mb-4 font-light">
        Se exime al <span className="font-medium">ARRENDADOR</span> de cualquier
        responsabilidad derivada de las medidas adoptadas por la autoridad
        competente que escapen de su ámbito de control.
      </p>

      <h3 className="font-bold mb-2">NOVENA. – CESIÓN Y SUBARRIENDO.</h3>
      <p className="mb-4 font-light">
        Con expresa renuncia a lo dispuesto en el artículo 32 de la LAU., el
        arrendatario se obliga a no subarrendar, en todo o en parte, ni ceder o
        traspasar la habitación arrendada sin el consentimiento expreso y
        escrito del arrendador, siendo éste un contrato personal e
        intransferible. El incumplimiento de esta cláusula será causa de
        resolución del contrato.
      </p>

      <h3 className="font-bold mb-2">
        DÉCIMA. – DEVOLUCIÓN DE LAS LLAVES POR PARTE DEL ARRENDATARIO.
      </h3>
      <p className="mb-4 font-light">
        La parte <span className="font-medium">ARRENDATARIA</span> hará entrega
        de las llaves de la vivienda y de la habitación en la que se encuentra
        en la fecha de finalización del presente contrato, y con el mismo
        formato de entrega (con arandela y código de habitación).
      </p>
      <p className="mb-4 font-light">
        De realizar la entrega más tarde, sin que hubiera ejercitado la facultad
        de contratar una noche extra, el{" "}
        <span className="font-medium">ARRENDATARIO</span> abonará al{" "}
        <span className="font-medium">ARRENDADOR</span> la cantidad de 35 € por
        cada día de retraso en la puesta a disposición de las llaves, en
        concepto de cláusula penal, además de todos los gastos que directos e
        indirectos que dicho retraso generen de cara a la recuperación de la
        vivienda y de la habitación.
      </p>

      <h3 className="font-bold mb-2">DECIMOPRIMERA. – EMPADRONAMIENTO.</h3>
      <p className="mb-4 font-light">
        El <span className="font-medium">ARRENDATARIO</span> tendrá derecho a
        empadronarse en la vivienda compartida, siempre y cuando cumpla con los
        requisitos exigidos en la normativa local de referencia.
      </p>
      <p className="mb-4 font-light">
        Los contratos de arrendamiento de habitación cuya duración sea inferior
        a SEIS (6) MESES no darán derecho a empadronamiento por así venir
        previsto por el Ayuntamiento de Valencia.
      </p>
      <p className="mb-4 font-light">
        Para el caso de que el <span className="font-medium">ARRENDATARIO</span>{" "}
        esté interesado en que sea HELLO FLAT MATE quien gestione la tramitación
        del empadronamiento ante las autoridades, el{" "}
        <span className="font-medium">ARRENDATARIO</span> deberá abonar un
        suplemento de 150 €.
      </p>
      <p className="mb-4 font-light">
        En todo caso, una vez finalizado el arrendamiento, el{" "}
        <span className="font-medium">ARRENDATARIO</span> se obliga a presentar
        ante la OFICINA DEL PADRÓN MUNICIPAL la solicitud de Baja.
      </p>
      <p className="mb-4 font-light">
        Si no lo hiciera, y no hubiera abonado el suplemento previsto en
        concepto de gestión, se descontarán del depósito 50 €.
      </p>

      <h3 className="font-bold mb-2">
        DECIMOSEGUNDA. – NORMAS DE CONVIVENCIA.
      </h3>
      <p className="mb-4 font-light">
        La parte <span className="font-medium">ARRENDATARIA</span> se someterá
        durante toda la vigencia del contrato a las normas establecidas por la
        comunidad de propietarios, especialmente las relativas a la convivencia,
        las obligaciones recogidas en la Ley 49/1960, de 21 de julio, sobre
        Propiedad Horizontal, y particularmente las normas incluidas en el ANEXO
        I del presente contrato, del que forma parte inseparable.
      </p>

      <h3 className="font-bold mb-2">
        DECIMOTERCERA. – OBLIGACIONES DEL ARRENDADOR Y ARRENDATARIO CON RESPECTO
        AL MANTENIMIENTO Y REPARACIONES.
      </h3>
      <p className="mb-4 font-light">
        El <span className="font-medium">ARRENDADOR</span> realizará, sin
        derecho por ello a elevar la renta al{" "}
        <span className="font-medium">ARRENDATARIO</span>, las reparaciones para
        conservar la vivienda en las condiciones oportunas de habitabilidad para
        servir al uso convenido, salvo cuando el deterioro o reparación sea
        imputable al arrendatario a tenor de lo dispuesto los artículos 1.563 y
        1.564 del Código Civil.
      </p>
      <p className="mb-4 font-light">
        Las pequeñas reparaciones que exija el desgaste por el uso ordinario de
        la vivienda correrán por cuenta del{" "}
        <span className="font-medium">ARRENDATARIO</span>.
      </p>
      <p className="mb-4 font-light">
        Se entienden como pequeñas reparaciones la sustitución de bombillas,
        atascos en fregaderos, atascos en el WC, atascos en las persianas,
        rociador de la manguera de la ducha, etc.
      </p>
      <p className="mb-4 font-light">
        Es obligación del arrendatario el mantenimiento correcto y diligente
        tanto de la habitación alquilada como del resto de dependencias de la
        vivienda.
      </p>
      <p className="mb-4 font-light">
        El arrendatario no podrá hacer agujeros en las paredes o puertas, así
        como tampoco podrá hacer uso de pegamentos o gomas adhesivas que puedan
        manchar o dañar las paredes o puertas.
      </p>
      <p className="mb-4 font-light">
        Las reparaciones e incidencias serán abonadas por parte del{" "}
        <span className="font-medium">ARRENDATARIO</span> al técnico encargado
        en el momento de su intervención. En caso de que las mismas corran a
        cargo del <span className="font-medium">ARRENDADOR</span>, éste se las
        abonará al <span className="font-medium">ARRENDATARIO</span> mediante
        transferencia bancaria.
      </p>

      <h3 className="font-bold mb-2">
        DECIMOCUARTA. – CONDICIONES DE EFECTIVIDAD DEL CONTRATO
      </h3>
      <p className="mb-4 font-light">
        El presente contrato de arrendamiento únicamente entrará en vigor y será
        válido cuando se cumplan de manera simultánea las siguientes
        condiciones:
      </p>
      <ul className="list-disc ml-5 mb-4 font-light">
        <li>
          El <span className="font-medium">ARRENDATARIO</span> haya abonado las
          cantidades indicadas en la cláusula quinta en concepto de fianza,
          depósito, tarifa plana de internet y gastos de suministros.
        </li>
        <li>
          El contrato haya sido firmado electrónicamente por ambas partes a
          través de la plataforma habilitada por Helloflatmate.
        </li>
        <li>
          El <span className="font-medium">ARRENDATARIO</span> cumpla con los
          requisitos de perfil establecidos por el{" "}
          <span className="font-medium">ARRENDADOR</span>, específicamente ser
          estudiante o joven trabajador menor de 35 años de edad.
        </li>
      </ul>
      <p className="mb-4 font-light">
        En caso de que el <span className="font-medium">ARRENDATARIO</span> no
        cumpla con alguno de estos requisitos, el contrato será considerado
        nulo, sin generar derechos ni obligaciones entre las partes.
      </p>

      <h3 className="font-bold mb-2">
        DECIMOQUINTA. – INCUMPLIMIENTO DE OBLIGACIONES.
      </h3>
      <p className="mb-4 font-light">
        El incumplimiento por cualquiera de las partes de las obligaciones
        resultantes del contrato dará derecho a la parte que hubiere cumplido
        las suyas a exigir el cumplimiento de la obligación o a promover la
        resolución del contrato de acuerdo con lo dispuesto en el artículo 1.124
        del Código Civil.
      </p>
      <p className="mb-4 font-light">
        Además, el <span className="font-medium">ARRENDADOR</span> podrá
        resolver de pleno Derecho el contrato por las siguientes causas:
      </p>
      <div className="mb-4 font-light">
        <p>
          a) La falta de pago de la renta o, en su caso, de cualquiera de las
          cantidades cuyo pago haya asumido o corresponda al{" "}
          <span className="font-medium">ARRENDATARIO</span>.
        </p>
        <p>b) La falta de pago del importe de la fianza.</p>
        <p>
          c) La realización de daños causados dolosamente en la finca o de obras
          no consentidas por el arrendador cuando el consentimiento de éste sea
          necesario.
        </p>
        <p>
          d) Cuando en el inmueble tengan lugar actividades molestas,
          insalubres, nocivas, peligrosas o ilícitas.
        </p>
        <p>
          e) El incumplimiento reiterado o grave de alguna de las normas de
          convivencia acompañadas como ANEXO I de este contrato.
        </p>
      </div>

      <h3 className="font-bold mb-2">DECIMOSEXTA. – LEGISLACIÓN APLICABLE.</h3>
      <p className="mb-4 font-light">
        En todo lo no previsto en el presente contrato, éste se regirá por lo
        dispuesto tanto en la Ley 29/1994, de 24 de noviembre, de Arrendamientos
        Urbanos, y supletoriamente por lo dispuesto en el Código Civil.
      </p>

      <h3 className="font-bold mb-2">DECIMOSEPTIMA. – SUMISIÓN.</h3>
      <p className="mb-4 font-light">
        Los contratantes se someten expresamente a los Juzgados y Tribunales de
        la ciudad de Valencia para todas aquellas cuestiones litigiosas que
        pudieran derivarse del presente contrato, por ser el lugar donde se
        encuentra la habitación arrendada.
      </p>
    </div>
  );
};

export default ClausesHelloColiving;

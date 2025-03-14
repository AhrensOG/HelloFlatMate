import React from "react";

export default function HelloColivingContractV2({
    contractDate,
    landlordName,
    landlordNIF,
    landlordStreet,
    landlordStreetNumber,
    landlordDoorNumber,
    landlordPostalCode,
    numberOfRooms,
    numberOfBathrooms,
    tenantName,
    tenantID,
    tenantPhone,
    tenantEmail,
    tenantAddress,
    tenantStreet,
    roomNumber,
    startDate,
    endDate,
    monthlyRent,
    handleModal,
    isChecked,
    setIsChecked,
}) {
    return (
        <div className="w-full grid place-items-center">
            <div className="container mx-auto max-w-screen-lg max-h-max overflow-y-auto w-full text-justify">
                <p className="text-justify mb-4">
                    <strong>
                        CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA
                        COMPARTIDA
                    </strong>
                </p>
                <p className="text-sm text-justify mb-4">
                    En la ciudad de Valencia, a <span>{contractDate}</span>
                </p>
                <h2 className="text-base font-bold mb-2">REUNIDOS</h2>
                <p className="mb-4 text-sm break-words font-light">
                    De una parte, D./Dª{" "}
                    <span className="font-semibold">{landlordName}</span>, como
                    parte ARRENDADORA, siendo mayor de edad, con NIF{" "}
                    <span className="font-semibold">{landlordNIF}</span>,
                    propietario/a en pleno dominio del inmueble sito en
                    Valencia:
                </p>
                <p className="mb-4 text-sm break-words font-light">
                    C/ <span className="font-semibold">{landlordStreet}</span>{" "}
                    nº{" "}
                    <span className="font-semibold">
                        {landlordStreetNumber}
                    </span>{" "}
                    - PUERTA{" "}
                    <span className="font-semibold">{landlordDoorNumber}</span>
                    ª, Valencia{" "}
                    <span className="font-semibold">{landlordPostalCode}</span>
                </p>
                <p className="mb-4 text-sm break-words font-light">
                    Dicho inmueble se halla amueblado y consta de{" "}
                    <span className="font-semibold">{numberOfRooms}</span>{" "}
                    habitaciones, sala de estar, cocina y{" "}
                    <span className="font-semibold">{numberOfBathrooms}</span>{" "}
                    cuartos de baño.
                </p>
                <p className="text-sm mb-4 text-justify">
                    EL ARRENDADOR autoriza a Hello Flat Mate S.L. con CIF
                    B98358963, bajo mandato expreso, únicamente la formalización
                    de este contrato.
                </p>
                <p className="text-sm mb-4 text-justify">
                    De otra parte,{" "}
                    <span className="font-semibold">D./Dª {tenantName}</span>,
                    mayor de edad, con D.N.I o pasaporte{" "}
                    <span className="font-semibold">{tenantID}</span>, nº de
                    teléfono{" "}
                    <span className="font-semibold">+{tenantPhone}</span>, email{" "}
                    <span className="font-semibold">{tenantEmail}</span>, y con
                    domicilio en{" "}
                    <span className="font-semibold">{tenantAddress}</span>,
                    Calle <span className="font-semibold">{tenantStreet}</span>{" "}
                    CP… actuando como parte ARRENDATARIA, está interesado en
                    arrendar la habitación n.º{" "}
                    <span className="font-semibold">{roomNumber}</span> del
                    mencionado inmueble.
                </p>
                <h2 className="text-base font-bold mb-2">INTERVIENEN</h2>
                <p className="mb-4 text-sm text-justify">
                    Las partes intervienen en su propio nombre y derecho,
                    reconociéndose la capacidad legal necesaria para celebrar el
                    presente contrato, a cuyo efecto acuerdan;
                </p>
                <p className="mb-4 text-sm text-justify">
                    Que, estando interesada la parte la ARRENDATARIA en el
                    arrendamiento de la habitación indicada en el Expositivo
                    anterior, y la ARRENDADORA en concedérselo, han convenido la
                    celebración del presente CONTRATO DE ARRENDAMIENTO DE
                    HABITACIÓN EN VIVIENDA COMPARTIDA, el cual se formaliza con
                    sujeción al régimen jurídico establecido en la Ley de
                    Arrendamientos Urbanos de 24 de noviembre de 1.994, así como
                    el recogido en el Código Civil, el cual llevan a cabo por
                    medio del presente contrato y, con arreglo a las siguientes
                </p>

                <h2 className="text-base font-bold mb-2">CLÁUSULAS</h2>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        PRIMERA. - DESTINO Y OBJETO DEL CONTRATO.
                    </span>
                    <br />
                    Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación
                    descrita en este contrato. El destino pactado para la
                    edificación es de Uso distinto al de vivienda y
                    concretamente la residencia temporal del ARRENDATARIO por
                    motivos laborales o educativos, sin que los arrendatarios
                    puedan cambiar el destino pactado para el mismo.
                </p>
                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">SEGUNDA. - ESTADO.</span>
                    <br />
                    Dado que el ARRENDATARIO es posible que firme el contrato
                    sin haber previamente visitado la vivienda in situ, tendrá 3
                    días para reportar cualquier desperfecto que se encuentren
                    en zonas comunes como en la habitación alquilada. Una vez
                    transcurrido este período sin que el ARRENDATARIO haya
                    notificado desperfecto alguno en la vivienda o en la
                    habitación arrendada, se entenderá que la vivienda se
                    encontraba en perfecto estado para su uso y habitabilidad,
                    debiendo devolverla el arrendatario a la finalización del
                    contrato en ese mismo estado.
                </p>
                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        TERCERA. - DURACIÓN DEL CONTRATO.
                    </span>
                    <br />
                    El presente contrato se acuerda que se extenderá por el
                    período comprendido del{" "}
                    <span className="font-semibold">{startDate}</span> al{" "}
                    <span className="font-semibold">{endDate}</span>.
                    Transcurrido dicho período, el contrato quedará resuelto sin
                    necesidad de requerimiento alguno y se dejará libre la
                    habitación a las 9 a.m. La expiración del tiempo pactado
                    para el presente contrato de arrendamiento producirá la
                    automática extinción del contrato, quedando obligadas los
                    arrendatarios a dejar la habitación libre de enseres a la
                    referida fecha y a disposición del ARRENDADOR, y en las
                    mismas condiciones existentes en el momento de la ocupación.
                    Para el caso de que el ARRENDATARIO estuviera interesado en
                    añadir una noche extra a su estancia, ésta tendrá un coste
                    de <span className="font-semibold">35 €</span>, y siempre
                    estará condicionada a la disponibilidad de la habitación y a
                    la autorización del ARRENDADOR.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">CUARTA. - RENTA.</span>
                    <br />
                    El arrendatario abonará al arrendador, en concepto de renta,
                    la cantidad de{" "}
                    <span className="font-semibold">{monthlyRent}</span> €
                    mensuales, siempre por adelantado y dentro del período
                    comprendido entre los días 20 y 25 de cada mes. <br />
                    Dicha renta se abonará a través del área de usuario del
                    ARRENDATARIO de la página web www.helloflatmate.com a través
                    de la pasarela de pago, mediante tarjeta de crédito o
                    débito. El incumplimiento reiterado de la obligación de pago
                    o notificación del justificante del pago en el periodo
                    fijado será motivo de resolución del contrato, dando derecho
                    al arrendador a solicitar el desahucio, siendo por cuenta
                    del ARRENDATARIO los gastos que estas acciones originen. El
                    ARRENDATARIO es conocedor y asume que en caso de impago de
                    las rentas deberá abandonar la vivienda, perdiendo las
                    cantidades entregadas en concepto de fianza así como
                    suministros de agua, luz, gas e internet.
                </p>

                <div className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        QUINTA. - PRIMERA ENTREGA DE LLAVES.
                    </span>
                    <br />
                    Que previamente a la entrega de llaves, el inquilino deberá
                    abonar las siguientes cantidades:
                    <ul className="list-disc ml-6">
                        <li>
                            Un depósito de{" "}
                            <span className="font-semibold">
                                QUINIENTOS EUROS (500 €)
                            </span>{" "}
                            en concepto de{" "}
                            <span className="font-semibold">FIANZA</span>.
                        </li>
                        <li>
                            La cantidad de{" "}
                            <span className="font-semibold">
                                DOSCIENTOS EUROS (200 €) POR PERSONA
                            </span>{" "}
                            en concepto de suministros de agua y luz por cada
                            período de CINCO MESES de contrato.
                        </li>
                    </ul>
                </div>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        SEXTA. - DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR.
                    </span>
                    <br />
                    Las partes acuerdan expresamente la renuncia del
                    ARRENDATARIO a impedir que el ARRENDADOR pueda acceder a las
                    zonas comunes de la vivienda y a las habitaciones que
                    circunstancialmente no se encuentren arrendadas en el
                    momento del acceso a la vivienda. En caso de que se vaya a
                    efectuar una visita por parte del responsable del ARRENDADOR
                    a la vivienda, ésta será comunicada siempre con al menos una
                    hora de antelación al arrendatario. La violación de este
                    derecho del arrendador por parte de cualquier persona que se
                    encuentre en la vivienda será considerada causa de
                    resolución del contrato de arrendamiento y motivo de
                    desahucio del arrendatario, siendo este responsable de los
                    daños y perjuicios que el impedimento de acceso a la
                    vivienda pueda ocasionar al arrendador, entre otros la
                    pérdida de beneficios por no poder arrendar otras
                    habitaciones.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        SÉPTIMA. – DESISTIMIENTO DEL CONTRATO POR PARTE DEL
                        ARRENDATARIO.
                    </span>
                    <br />
                    En caso de desistimiento por parte de El ARRENDATARIO, éste
                    vendrá obligado al pago íntegro de todas las mensualidades
                    convenidas hasta la finalización del Contrato, salvo que
                    éste presente un nuevo inquilino, se firme un nuevo contrato
                    y sea aceptado por el resto de arrendatarios que ocupan la
                    vivienda.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        OCTAVA. - FUERZA MAYOR.
                    </span>
                    <br />
                    En caso de fuerza mayor el ARRENDATARIO no podrá exigir la
                    resolución, suspensión y/o modificación del contrato, ni la
                    reducción de la renta pactada. Entiéndase por fuerza mayor,
                    a los efectos de este contrato, toda circunstancia que tenga
                    carácter imprevisible e inevitable que afecte al
                    cumplimiento de las obligaciones contractuales, tales como,
                    ad exemplum, acontecimientos naturales extraordinarios como
                    inundaciones, terremotos, caída de rayos, situaciones de
                    epidemia y pandemia. Se exime al ARRENDADOR de cualquier
                    responsabilidad derivada de las medidas adoptadas por la
                    autoridad competente que escapen de su ámbito de control.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        NOVENA. – CESIÓN Y SUBARRIENDO.
                    </span>
                    <br />
                    Con expresa renuncia a lo dispuesto en el artículo 32 de la
                    LAU., el arrendatario se obliga a no subarrendar, en todo o
                    en parte, ni ceder o traspasar la habitación arrendada sin
                    el consentimiento expreso y escrito del arrendador, siendo
                    éste un contrato personal e intransferible. El
                    incumplimiento de esta cláusula será causa de resolución del
                    contrato.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DÉCIMA. - DEVOLUCIÓN DE LAS LLAVES POR PARTE DEL
                        ARRENDATARIO.
                    </span>
                    <br />
                    La parte ARRENDATARIA hará entrega de las llaves de la
                    vivienda y de la habitación en la que se encuentra en la
                    fecha de finalización del presente contrato, y con el mismo
                    formato de entrega (con arandela y código de habitación). De
                    realizar la entrega más tarde, sin que hubiera ejercitado la
                    facultad de contratar una noche extra, el ARRENDATARIO
                    abonará al ARRENDADOR la cantidad de 35 € por cada día de
                    retraso en la puesta a disposición de las llaves, en
                    concepto de cláusula penal, además de todos los gastos que
                    directos e indirectos que dicho retraso generen de cara a la
                    recuperación de la vivienda y de la habitación.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOPRIMERA. – EMPADRONAMIENTO.
                    </span>
                    <br />
                    El ARRENDATARIO tendrá derecho a empadronarse en la vivienda
                    compartida, siempre y cuando, cumpla con los requisitos
                    exigidos en la normativa local de referencia. Los contratos
                    de arrendamiento de habitación cuya duración sea inferior a
                    SEIS (6) MESES no darán derecho a empadronamiento por así
                    venir previsto por el Ayuntamiento de Valencia. Para el caso
                    de que el ARRENDATARIO esté interesado en que sea HELLO FLAT
                    MATE quien gestione la tramitación del empadronamiento ante
                    las autoridades, el ARRENDATARIO deberá abonar un suplemento
                    de 150 €. En todo caso, una vez finalizado el arrendamiento,
                    el ARRENDATARIO se obliga a presentar ante la OFICINA DEL
                    PADRÓN MUNICIPAL la solicitud de Baja. Si no lo hiciera, y
                    no hubiera abonado el suplemento previsto en concepto de
                    gestión, se descontarán del depósito 50 €.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOSEGUNDA. - NORMAS DE CONVIVENCIA.
                    </span>
                    <br />
                    La parte ARRENDATARIA se someterá durante toda la vigencia
                    del contrato a las normas establecidas por la comunidad de
                    propietarios, especialmente las relativas a la convivencia,
                    las obligaciones recogidas en la Ley 49/1960, de 21 de
                    julio, sobre Propiedad Horizontal, y particularmente las
                    normas incluidas en el ANEXO I del presente contrato, del
                    que forma parte inseparable.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOTERCERA. - OBLIGACIONES DEL ARRENDADOR Y
                        ARRENDATARIO CON RESPECTO AL MANTENIMIENTO Y
                        REPARACIONES.
                    </span>
                    <br />
                    El ARRENDADOR realizará, sin derecho por ello a elevar la
                    renta al ARRENDATARIO, las reparaciones para conservar la
                    vivienda en las condiciones oportunas de habitabilidad para
                    servir al uso convenido, salvo cuando el deterioro o
                    reparación sea imputable al arrendatario a tenor de lo
                    dispuesto los artículos 1.563 y 1.564 del Código Civil. Las
                    pequeñas reparaciones que exija el desgaste por el uso
                    ordinario de la vivienda correrán por cuenta del
                    ARRENDATARIO. Se entienden como pequeñas reparaciones la
                    sustitución de bombillas, atascos en fregaderos, atascos en
                    el WC, atascos en las persianas, rociador de la manguera de
                    la ducha, etc. Es obligación del arrendatario el
                    mantenimiento correcto y diligente tanto de la habitación
                    alquilada como del resto de dependencias de la vivienda. El
                    arrendatario no podrá hacer agujeros en las paredes o
                    puertas, así como tampoco podrá hacer uso de pegamentos o
                    gomas adhesivas que puedan manchar o dañar las paredes o
                    puertas. Las reparaciones e incidencias serán abonadas por
                    parte del ARRENDATARIO al técnico encargado en el momento de
                    su intervención. En caso de que las mismas corran a cargo
                    del ARRENDADOR, éste se las abonará al ARRENDATARIO mediante
                    transferencia bancaria.
                </p>

                <h3 className="text-sm font-bold mb-2">
                    DECIMOCUARTA. – CONDICIONES DE EFECTIVIDAD DEL CONTRATO.
                </h3>
                <p className="mb-4 text-sm font-light">
                    El presente contrato de arrendamiento{" "}
                    <span className="font-semibold">
                        únicamente entrará en vigor y será válido cuando se
                        cumplan de manera simultánea las siguientes condiciones:
                    </span>
                </p>
                <p className="mb-4 text-sm font-light">
                    Además, el ARRENDADOR podrá resolver de pleno derecho el
                    contrato por las siguientes causas:
                </p>
                <ul className="list-disc ml-6">
                    <li className="mb-2">
                        1) El ARRENDATARIO haya abonado las cantidades indicadas
                        en la cláusula quinta en concepto de fianza, depósito,
                        tarifa plana de internet y gastos de suministros.
                    </li>
                    <li className="mb-2">
                        2) El contrato haya sido firmado electrónicamente por
                        ambas partes a través de la plataforma habilitada por{" "}
                        <span className="font-semibold">Helloflatmate</span>.
                    </li>
                    <li className="mb-2">
                        3) El ARRENDATARIO cumpla con los requisitos de perfil
                        establecidos por el ARRENDADOR,{" "}
                        <span className="font-semibold">
                            específicamente ser estudiante menor de 30 años de
                            edad
                        </span>
                        .
                    </li>
                </ul>
                <p className="mb-4 text-sm font-light">
                    <span className="font-semibold">
                        En caso de que el ARRENDATARIO no cumpla con alguno de
                        estos requisitos, el contrato será considerado nulo, sin
                        generar derechos ni obligaciones entre las partes.
                    </span>
                </p>

                <div className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOQUINTA. – INCUMPLIMIENTO DE OBLIGACIONES.
                    </span>
                    <br />
                    El incumplimiento por cualquiera de las partes de las
                    obligaciones resultantes del contrato dará derecho a la
                    parte que hubiere cumplido las suyas a exigir el
                    cumplimiento de la obligación o a promover la resolución del
                    contrato de acuerdo con lo dispuesto en el artículo 1.124
                    del Código Civil. Además, el ARRENDADOR podrá resolver de
                    pleno Derecho el contrato por las siguientes causas:
                    <ul className="list-disc ml-6">
                        <li>
                            La falta de pago de la renta o, en su caso, de
                            cualquiera de las cantidades cuyo pago haya asumido
                            o corresponda al ARRENDATARIO.
                        </li>
                        <li>La falta de pago del importe de la fianza.</li>
                        <li>
                            La realización de daños causados dolosamente en la
                            finca o de obras no consentidas por el arrendador
                            cuando el consentimiento de éste sea necesario.
                        </li>
                        <li>
                            Cuando en el inmueble tengan lugar actividades
                            molestas, insalubres, nocivas, peligrosas o
                            ilícitas.
                        </li>
                        <li>
                            El incumplimiento reiterado o grave de alguna de las
                            normas de convivencia acompañadas como ANEXO I de
                            este contrato.
                        </li>
                    </ul>
                </div>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOSEXTA. - LEGISLACIÓN APLICABLE.
                    </span>
                    <br />
                    En todo lo no previsto en el presente contrato, éste se
                    regirá por lo dispuesto tanto en la Ley 29/1994, de 24 de
                    noviembre, de Arrendamientos Urbanos, y supletoriamente por
                    lo dispuesto en el Código Civil.
                </p>

                <p className="mb-4 text-sm text-justify">
                    <span className="font-semibold">
                        DECIMOSEPTIMA. - SUMISIÓN.
                    </span>
                    <br />
                    Los contratantes se someten expresamente a los Juzgados y
                    Tribunales de la ciudad de Valencia para todas aquellas
                    cuestiones litigiosas que pudieran derivarse del presente
                    contrato, por ser el lugar donde se encuentra la habitación
                    arrendada.
                </p>

                {/* <p className="mb-4 text-sm break-words font-light">
          Y con el carácter expresado en la intervención, firman el presente
          contrato, en el lugar y fecha indicados.
          En prueba de conformidad, y para que así conste, firman el presente
            contrato por duplicado en el lugar y fecha al principio indicados.
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

                <h3 className="text-base font-bold mb-2">
                    ANEXO I – NORMAS DE CONVIVENCIA
                </h3>

                <p className="mb-4 text-sm text-justify">
                    1. La parte arrendataria afirma que ha sido informada y se
                    someterá durante toda la vigencia del contrato a las normas
                    establecidas por la comunidad de propietarios, especialmente
                    las relativas a la convivencia vecinal.
                </p>

                <p className="mb-4 text-sm text-justify">
                    2. El arrendatario deberá tener especial cuidado con los
                    ruidos, a cualquier hora. En particular, se establece que
                    «se consideran actividades no tolerables» acciones como
                    «gritar, vociferar o emplear un tono excesivamente alto de
                    la voz humana o la actividad directa de las personas,
                    movimiento de muebles y/o enseres, etc». Entra dentro de
                    esta categoría usar aparatos e instrumentos musicales o
                    acústicos, radio, televisión, cuando causen molestias.
                    Asimismo, se considera una actividad no tolerable «usar
                    electrodomésticos o maquinaria susceptibles de producir
                    ruidos» molestos; se pone el ejemplo de un taladro. Por
                    último, se añade también «la posesión de animales sin
                    adoptar las medidas necesarias para evitar que los ruidos
                    producidos por éstos ocasionen molestias a los vecinos». El
                    texto subraya que se consideran «especialmente gravosos»
                    estos comportamientos cuando tengan lugar entre las 22.00 y
                    las 8.00 horas.
                </p>

                <p className="mb-4 text-sm text-justify">
                    3. También deberá cumplir y respetar las normas internas de
                    convivencia razonable que sean decididas por la mayoría de
                    los arrendatarios de la vivienda, entre las que se incluye
                    el cumplimiento de los turnos de limpieza de zonas comunes,
                    baños y cocina, bajar la basura y el resto de las tareas
                    domésticas básicas.
                </p>

                <p className="mb-4 text-sm text-justify">
                    4. Queda prohibida expresamente la tenencia de cualquier
                    tipo de animal o mascota en la vivienda.
                </p>

                <div className="mb-4 text-sm text-justify">
                    5. El arrendamiento de la habitación tiene incluido el uso
                    de las zonas comunes de la vivienda. Se establecen como
                    normas de utilización de zonas comunes de la vivienda las
                    siguientes:
                    <ul className="list-disc ml-6">
                        <li>
                            Uso de los cuartos de baño, cocina y sala de estar:
                            se podrá utilizar en cualquier horario respetando en
                            todo momento las necesidades de utilización del
                            resto de usuarios.
                        </li>
                        <li>
                            El arrendatario acepta de forma expresa la
                            prohibición de fumar dentro de cualquier dependencia
                            de la vivienda, así como el consumo de sustancias
                            estupefacientes. En caso de que se denuncie esta
                            circunstancia por parte del resto de arrendatarios
                            de la vivienda o de los vecinos, quedará el
                            arrendador facultado para resolver el presente
                            contrato con pérdida de las cantidades previamente
                            abonadas en concepto de fianza y suministros
                            abonadas por el arrendatario.
                        </li>
                        <li>
                            Además, tampoco se podrá llevar a cabo ningún tipo
                            de fiesta, cena o comida multitudinaria en la
                            vivienda. Máximo se admiten 3 invitados a la vez,
                            entre todos los compañeros del piso.
                            <ul className="list-disc ml-6">
                                <li>
                                    Primer aviso por molestias vecinales (0€).
                                </li>
                                <li>
                                    Segundo aviso (200€) ampliación de fianza.
                                </li>
                                <li>
                                    Tercer aviso expulsión de la vivienda con
                                    pérdida de las aportaciones de fianza,
                                    suministros y wifi.
                                </li>
                            </ul>
                        </li>
                        <li>
                            El arrendatario da su consentimiento expreso de
                            poder compartir las zonas comunes de la vivienda con
                            personas de distinto género, etnia, nacionalidad o
                            religión.
                        </li>
                    </ul>
                </div>

                <p className="mb-4 text-sm text-justify">
                    6. Se hablará con educación y respeto o se penalizará con
                    100€ las faltas de respeto, insultos, etc al arrendador, a
                    la agencia, a los trabajadores de mantenimiento y limpieza,
                    o a los propios compañeros.
                </p>

                <p className="mb-4 text-sm text-justify">
                    7. El arrendatario no podrá hacer uso de las habitaciones de
                    la vivienda que no se encuentren arrendadas, siendo que para
                    el caso de que efectivamente lo haga, podrá ser detraído el
                    100% de la cantidad entregada en concepto de fianza.
                </p>

                <p className="mb-4 text-sm text-justify">
                    8. Queda terminantemente prohibido el encendido de velas,
                    candelas, incienso y cualquier otro material que arda y
                    pueda incendiar la habitación o el piso.
                </p>

                <p className="mb-4 text-sm text-justify">
                    9. El arrendatario se obliga a estar en el grupo de Whatsapp
                    del piso mientras resida en el piso.
                </p>

                <p className="mb-4 text-sm text-justify">
                    10. Visitas - Se puede recibir visitas en el piso siempre y
                    cuando se informe a los compañeros y al propietario a través
                    del grupo de Whatsapp y los compañeros estén de acuerdo. La
                    duración de la estancia es de máximo 3 noches y no pueden
                    coincidir más de 3 invitados de manera simultánea en la
                    vivienda. Si el invitado supera las 3 noches de estancia,
                    deberá contribuir con 20 € /semana para los gastos comunes
                    del piso, previa aceptación por parte de los compañeros y de
                    la agencia. En ningún caso debe convertirse en una
                    costumbre, sólo visitas esporádicas. El visitante no puede
                    dormir en las zonas comunes del piso, ni en el sofá. Siempre
                    deberá hacerlo dentro de la habitación de su anfitrión. No
                    puede haber un invitado pernoctando en el piso cuando su
                    anfitrión se encuentre fuera de la ciudad.
                </p>

                <p className="mb-4 text-sm text-justify">
                    11. Para el supuesto de que el arrendatario extravíe las
                    llaves de la vivienda o no las entregue a la finalización,
                    deberá abonar los gastos ocasionados por el cambio de la
                    cerradura de la puerta de entrada principal, más un juego de
                    llaves por cada habitación de la vivienda y dos juegos de
                    llaves extra que le corresponderá al arrendador.
                </p>

                <p className="mb-4 text-sm text-justify">
                    12. Una vez finalizado el presente contrato, el arrendatario
                    deberá dejar la habitación, así como las zonas comunes,
                    totalmente limpias y sin enseres personales, tal y como la
                    encontró a su llegada. En caso de desperfectos ocasionados
                    en las zonas comunes de la vivienda, y para el caso de que
                    el causante de los daños no se identifique, responderán de
                    los costes de las reparaciones pertinentes todos los
                    inquilinos de forma solidaria con sus respectivas fianzas,
                    sin perjuicio de que posteriormente puedan entablar las
                    acciones legales pertinentes de forma interna para la
                    restitución de dichos importes frente al responsable de los
                    desperfectos.
                </p>
                {/* <div className="pt-5 space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="form-checkbox"
                        />
                        <span>
                            Habiendo leído el contrato acepto los términos y
                            condiciones
                        </span>
                    </label>
                    <ButtonReadAndSingContract
                        action={() => handleModal(true)}
                        title={"Firmar contrato"}
                        isChecked={isChecked}
                    />
                </div> */}
            </div>
        </div>
    );
}

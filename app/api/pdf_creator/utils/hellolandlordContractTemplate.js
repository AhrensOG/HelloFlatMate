const hellolandlordContractTemplate = ({
  contractDate,
  landlordName,
  landlordNIF,
  landlordIBAN,
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
}) => {
  return `CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA COMPARTIDA\n
  En la ciudad de Valencia, a ${contractDate}\n

  REUNIDOS\n

  De una parte, D./Dª  ${landlordName}, como parte ARRENDADORA, siendo mayor de edad, con NIF ${landlordNIF}, propietario/a en pleno dominio del inmueble sito en Valencia:\n
  C/ ${landlordStreet} nº ${landlordStreetNumber} - PUERTA ${landlordDoorNumber}, Valencia ${landlordPostalCode}\n
  Dicho inmueble se halla amueblado y consta de ${numberOfRooms} habitaciones, sala de estar, cocina y ${numberOfBathrooms} cuartos de baño.\n
  EL ARRENDADOR autoriza a Hello Flat Mate S.L. con CIF B98358963, bajo mandato expreso, únicamente la formalización de este contrato.\n
  De otra parte, D./Dª  ${tenantName}, mayor de edad, con D.N.I o pasaporte ${tenantID}, nº de teléfono +${tenantPhone}, email ${tenantEmail}, y con domicilio en ${tenantAddress}, C/ ${tenantStreet}, actuando como parte ARRENDATARIA, está interesado en arrendar la habitación n.º ${roomNumber} del mencionado inmueble.\n

  INTERVIENEN\n

  Las partes intervienen en su propio nombre y derecho, reconociéndose la capacidad legal necesaria para celebrar el presente contrato, a cuyo efecto acuerdan;\n

  Que, estando interesada la parte ARRENDATARIA en el arrendamiento de la habitación indicada en el Expositivo anterior, y la ARRENDADORA en concedérselo, han convenido la celebración del presente CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA COMPARTIDA, el cual se formaliza con sujeción al régimen jurídico establecido en la Ley de Arrendamientos Urbanos de 24 de noviembre de 1.994, así como el recogido en el Código Civil, el cual llevan a cabo por medio del presente contrato y, con arreglo a las siguientes\n

  CLÁUSULAS\n

  PRIMERA. – DESTINO Y OBJETO DEL CONTRATO.\n
  Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación descrita en este contrato.\n
  \n
  El destino pactado para la edificación es de Uso distinto al de vivienda y concretamente la residencia temporal del ARRENDATARIO por motivos laborales o educativos, sin que los arrendatarios puedan cambiar el destino pactado para el mismo.\n
  \n
  SEGUNDA. – ESTADO.\n
  Dado que el ARRENDATARIO es posible que firme el contrato sin haber previamente visitado la vivienda in situ, tendrá 3 días para reportar cualquier desperfecto que se encuentren en zonas comunes como en la habitación alquilada.\n
  \n
  Una vez transcurrido este período sin que el ARRENDATARIO haya notificado desperfecto alguno en la vivienda o en la habitación arrendada, se entenderá que la vivienda se encontraba en perfecto estado para su uso y habitabilidad, debiendo devolverla el arrendatario a la finalización del contrato en ese mismo estado.\n
  \n
  TERCERA. – DURACIÓN DEL CONTRATO.\n
  El presente contrato se acuerda que se extenderá por el período comprendido del ${startDate} al ${endDate}. Transcurrido dicho período, el contrato quedará resuelto sin necesidad de requerimiento alguno y se dejará libre la habitación a las 9 a.m.\n
  La expiración del tiempo pactado para el presente contrato de arrendamiento producirá la automática extinción del contrato, quedando obligadas los arrendatarios a dejar la habitación libre de enseres a la referida fecha y a disposición del ARRENDADOR, y en las mismas condiciones existentes en el momento de la ocupación.\n
  Para el caso de que el ARRENDATARIO estuviera interesado en añadir una noche extra a su estancia, ésta tendrá un coste de 35 €, y siempre estará condicionada a la disponibilidad de la habitación y a la autorización del ARRENDADOR.\n
  \n
  CUARTA. – RENTA.\n
  El arrendatario abonará al arrendador, en concepto de renta, la cantidad de ${monthlyRent} € mensuales, siempre por adelantado y dentro del período comprendido entre los días 20 y 25 de cada mes.\n
  En dicho precio no se incluyen los gastos relativos a los suministros de agua, luz e internet.\n
  Dicha renta se abonará mediante transferencia bancaria o ingreso en la siguiente cuenta de EL ARRENDADOR, indicando en el concepto el nombre del inquilino:\n
  IBAN Arrendador: ${landlordIBAN}\n
  El incumplimiento reiterado de la obligación de pago o notificación del justificante del pago en el periodo fijado será motivo de resolución del contrato, dando derecho al arrendador a solicitar el desahucio, siendo por cuenta del ARRENDATARIO los gastos que estas acciones originen.\n
  El ARRENDATARIO es conocedor y asume que en caso de impago de las rentas deberá abandonar la vivienda, perdiendo las cantidades entregadas en concepto de fianza así como suministros de agua, luz, gas e internet.\n
  Del mismo modo, para el caso de que el arrendatario incumpla el plazo de pago de la renta, el ARRENDADOR podrá sancionar al ARRENDATARIO por dicho incumplimiento con 10€ por cada día de retraso en el pago.\n
  El ARRENDATARIO estará obligado a abonar junto a la renta del último mes de contrato, 50 € para la limpieza profunda de la vivienda. No obstante, el ARRENDATARIO deberá dejar la habitación, así como las zonas comunes totalmente limpias y sin enseres personales.\n
  En ese sentido, el ARRENDATARIO se responsabiliza solidariamente junto a sus compañeros a dejar la vivienda completamente limpia. En caso de que la vivienda no quede en las condiciones establecidas se descontará del depósito la cantidad de horas extra que se haya invertido en la limpieza de ésta.\n
  \n
  QUINTA. – PRIMERA ENTREGA DE LLAVES.\n
  Que previamente a la entrega de llaves, el inquilino deberá abonar las siguientes cantidades:\n
  Un depósito de TRESCIENTOS EUROS (300 €) en concepto de FIANZA. Este importe será devuelto entre 30 y 45 días tras la finalización del contrato, por parte del ARRENDADOR al ARRENDATARIO, mediante transferencia bancaria y una vez revisado que la vivienda se encuentra en perfecto estado y se hayan liquidado todos los gastos de suministros.\n
  \n
  El ARRENDATARIO correrá con los gastos bancarios que en su caso se devenguen con la devolución de la fianza, y en especial aquellos derivados del uso de otro método de devolución especial (Western Unión, Ria, MoneyGram…etc.).\n
  \n
  Para el caso de que se encuentren desperfectos en la revisión que en su día se efectúe, así como recibos impagados por parte del ARRENDATARIO, el ARRENDADOR podrá deducir dichos importes de la cantidad a devolver del antes mencionado depósito.\n
  \n
  La cantidad de DOSCIENTOS EUROS (200 €) en concepto de suministros de agua y luz por cada período de CINCO MESES de contrato. Una vez transcurrido dicho periodo, se calculará el importe exacto a abonar por parte del ARRENDATARIO en concepto de suministros, ajustando el importe abonado con el consumo real efectuado por el arrendatario.\n
  \n
  En caso de que los gastos de suministros hayan sido superiores al importe abonado de 200 €, estas cantidades serán repercutidas al ARRENDATARIO por parte del ARRENDADOR.\n
  \n
  La cantidad de OCHENTA EUROS (80 €) en concepto de TARIFA PLANA de internet por los primeros cinco meses de contrato.\n
  \n
  Para los contratos de 10 meses, a final de enero, junto a la renta de febrero, se hará otra aportación para los siguientes 5 meses de contrato para los suministros y wifi.\n
  \n
  SEXTA. – DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR.\n
  Las partes acuerdan expresamente la renuncia del ARRENDATARIO a impedir que el ARRENDADOR pueda acceder a las zonas comunes de la vivienda y a las habitaciones que circunstancialmente no se encuentren arrendadas en el momento del acceso a la vivienda.\n
  En caso de que se vaya a efectuar una visita por parte del responsable del ARRENDADOR a la vivienda, ésta será comunicada siempre con al menos una hora de antelación al arrendatario.\n
  \n
  La violación de este derecho del arrendador por parte de cualquier persona que se encuentre en la vivienda será considerada causa de resolución del contrato de arrendamiento y motivo de desahucio del arrendatario, siendo este responsable de los daños y perjuicios que el impedimento de acceso a la vivienda pueda ocasionar al arrendador, entre otros la pérdida de beneficios por no poder arrendar otras habitaciones.\n
  \n
  SÉPTIMA. – DESISTIMIENTO DEL CONTRATO POR PARTE DEL ARRENDATARIO.\n
  En caso de desistimiento por parte de El ARRENDATARIO, éste vendrá obligado al pago íntegro de todas las mensualidades convenidas hasta la finalización del Contrato, salvo que éste presente un nuevo inquilino, se firme un nuevo contrato y sea aceptado por el resto de arrendatarios que ocupan la vivienda.\n
  \n
  OCTAVA. – FUERZA MAYOR.\n
  En caso de fuerza mayor el ARRENDATARIO no podrá exigir la resolución, suspensión y/o modificación del contrato, ni la reducción de la renta pactada.\n
  Entiéndase por fuerza mayor, a los efectos de este contrato, toda circunstancia que tenga carácter imprevisible e inevitable que afecte al cumplimiento de las obligaciones contractuales, tales como, ad exemplum, acontecimientos naturales extraordinarios como inundaciones, terremotos, caída de rayos, situaciones de epidemia y pandemia.\n
  Se exime al ARRENDADOR de cualquier responsabilidad derivada de las medidas adoptadas por la autoridad competente que escapen de su ámbito de control.\n
  \n
  NOVENA. – CESIÓN Y SUBARRIENDO.\n
  Con expresa renuncia a lo dispuesto en el artículo 32 de la LAU., el arrendatario se obliga a no subarrendar, en todo o en parte, ni ceder o traspasar la habitación arrendada sin el consentimiento expreso y escrito del arrendador, siendo éste un contrato personal e intransferible. El incumplimiento de esta cláusula será causa de resolución del contrato.\n
  \n
  DÉCIMA. – DEVOLUCIÓN DE LAS LLAVES POR PARTE DEL ARRENDATARIO.\n
  La parte ARRENDATARIA hará entrega de las llaves de la vivienda y de la habitación en la que se encuentra en la fecha de finalización del presente contrato, y con el mismo formato de entrega (con arandela y código de habitación).\n
  \n
  De realizar la entrega más tarde, sin que hubiera ejercitado la facultad de contratar una noche extra, el ARRENDATARIO abonará al ARRENDADOR la cantidad de 35 € por cada día de retraso en la puesta a disposición de las llaves, en concepto de cláusula penal, además de todos los gastos que directos e indirectos que dicho retraso generen de cara a la recuperación de la vivienda y de la habitación.\n
  \n
  DECIMOPRIMERA. – EMPADRONAMIENTO.\n
  El ARRENDATARIO tendrá derecho a empadronarse en la vivienda compartida, siempre y cuando cumpla con los requisitos exigidos en la normativa local de referencia.\n
  Los contratos de arrendamiento de habitación cuya duración sea inferior a SEIS (6) MESES no darán derecho a empadronamiento por así venir previsto por el Ayuntamiento de Valencia.\n
  Para el caso de que el ARRENDATARIO esté interesado en que sea HELLO FLAT MATE quien gestione la tramitación del empadronamiento ante las autoridades, el ARRENDATARIO deberá abonar un suplemento de 150 €.\n
  \n
  En todo caso, una vez finalizado el arrendamiento, el ARRENDATARIO se obliga a presentar ante la OFICINA DEL PADRÓN MUNICIPAL la solicitud de Baja.\n
  Si no lo hiciera, y no hubiera abonado el suplemento previsto en concepto de gestión, se descontarán del depósito 50 €.\n
  \n
  DECIMOSEGUNDA. – NORMAS DE CONVIVENCIA.\n
  La parte ARRENDATARIA se someterá durante toda la vigencia del contrato a las normas establecidas por la comunidad de propietarios, especialmente las relativas a la convivencia, las obligaciones recogidas en la Ley 49/1960, de 21 de julio, sobre Propiedad Horizontal, y particularmente las normas incluidas en el ANEXO I del presente contrato, del que forma parte inseparable.\n
  \n
  DECIMOTERCERA. – OBLIGACIONES DEL ARRENDADOR Y ARRENDATARIO CON RESPECTO AL MANTENIMIENTO Y REPARACIONES.\n
  El ARRENDADOR realizará, sin derecho por ello a elevar la renta al ARRENDATARIO, las reparaciones para conservar la vivienda en las condiciones oportunas de habitabilidad para servir al uso convenido, salvo cuando el deterioro o reparación sea imputable al arrendatario a tenor de lo dispuesto en los artículos 1.563 y 1.564 del Código Civil.\n
  \n
  Las pequeñas reparaciones que exija el desgaste por el uso ordinario de la vivienda correrán por cuenta del ARRENDATARIO.\n
  \n
  Se entienden como pequeñas reparaciones la sustitución de bombillas, atascos en fregaderos, atascos en el WC, atascos en las persianas, rociador de la manguera de la ducha, etc.\n
  \n
  Es obligación del ARRENDATARIO el mantenimiento correcto y diligente tanto de la habitación alquilada como del resto de dependencias de la vivienda.\n
  \n
  El ARRENDATARIO no podrá hacer agujeros en las paredes o puertas, así como tampoco podrá hacer uso de pegamentos o gomas adhesivas que puedan manchar o dañar las paredes o puertas.\n
  \n
  Las reparaciones e incidencias serán abonadas por parte del ARRENDATARIO al técnico encargado en el momento de su intervención. En caso de que las mismas corran a cargo del ARRENDADOR, éste se las abonará al ARRENDATARIO mediante transferencia bancaria.\n
  \n
  DECIMOCUARTA. – CONDICIONES DE EFECTIVIDAD DEL CONTRATO\n
  El presente contrato de arrendamiento únicamente entrará en vigor y será válido cuando se cumplan de manera simultánea las siguientes condiciones:\n
  - El ARRENDATARIO haya abonado las cantidades indicadas en la cláusula quinta en concepto de fianza, depósito, tarifa plana de internet y gastos de suministros.\n
  - El contrato haya sido firmado electrónicamente por ambas partes a través de la plataforma habilitada por Helloflatmate.\n
  - El ARRENDATARIO cumpla con los requisitos de perfil establecidos por el ARRENDADOR, específicamente ser estudiante menor de 30 años de edad.\n
  \n
  En caso de que el ARRENDATARIO no cumpla con alguno de estos requisitos, el contrato será considerado nulo, sin generar derechos ni obligaciones entre las partes.\n
  \n
  DECIMOQUINTA. – INCUMPLIMIENTO DE OBLIGACIONES.\n
  El incumplimiento por cualquiera de las partes de las obligaciones resultantes del contrato dará derecho a la parte que hubiere cumplido las suyas a exigir el cumplimiento de la obligación o a promover la resolución del contrato de acuerdo con lo dispuesto en el artículo 1.124 del Código Civil.\n
  \n
  Además, el ARRENDADOR podrá resolver de pleno Derecho el contrato por las siguientes causas:\n
  a) La falta de pago de la renta o, en su caso, de cualquiera de las cantidades cuyo pago haya asumido o corresponda al ARRENDATARIO.\n
  b) La falta de pago del importe de la fianza.\n
  c) La realización de daños causados dolosamente en la finca o de obras no consentidas por el arrendador cuando el consentimiento de éste sea necesario.\n
  d) Cuando en el inmueble tengan lugar actividades molestas, insalubres, nocivas, peligrosas o ilícitas.\n
  e) El incumplimiento reiterado o grave de alguna de las normas de convivencia acompañadas como ANEXO I de este contrato.\n
  \n
  DECIMOSEXTA. – LEGISLACIÓN APLICABLE.\n
  En todo lo no previsto en el presente contrato, éste se regirá por lo dispuesto tanto en la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos, y supletoriamente por lo dispuesto en el Código Civil.\n
  \n
  DÉCIMOSEPTIMA. – SUMISIÓN.\n
  Los contratantes se someten expresamente a los Juzgados y Tribunales de la ciudad de Valencia para todas aquellas cuestiones litigiosas que pudieran derivarse del presente contrato, por ser el lugar donde se encuentra la habitación arrendada.\n
  \n
  \n
  ANEXO I – NORMAS DE CONVIVENCIA\n
  \n
  La parte arrendataria afirma que ha sido informada y se someterá durante toda la vigencia del contrato a las normas establecidas por la comunidad de propietarios, especialmente las relativas a la convivencia vecinal.\n
  \n
  El arrendatario deberá tener especial cuidado con los ruidos, a cualquier hora:\n
  \n
  En particular se establece que «se consideran actividades no tolerables» acciones como «gritar, vociferar o emplear un tono excesivamente alto de la voz humana o la actividad directa de las personas, movimiento de muebles y/o enseres, etc». Entra dentro de esta categoría usar aparatos e instrumentos musicales o acústicos, radio, televisión, cuando causen molestias.\n
  \n
  Asimismo, se considera una actividad no tolerable «usar electrodomésticos o maquinaria susceptibles de producir ruidos» molestos; se pone el ejemplo de un taladro. Por último, se añade también «la posesión de animales sin adoptar las medidas necesarias para evitar que los ruidos producidos por éstos ocasionen molestias a los vecinos». El texto subraya que se consideran «especialmente gravosos» estos comportamientos cuando tengan lugar entre las 22.00 y las 8.00 horas.\n
  \n
  También deberá cumplir y respetar las normas internas de convivencia razonable que sean decididas por la mayoría de los arrendatarios de la vivienda, entre las que se incluye el cumplimiento de los turnos de limpieza de zonas comunes, baños y cocina, bajar la basura y el resto de las tareas domésticas básicas.\n
  \n
  Queda prohibida expresamente la tenencia de cualquier tipo de animal o mascota en la vivienda.\n
  \n
  El arrendamiento de la habitación tiene incluido el uso de las zonas comunes de la vivienda. Se establecen como normas de utilización de zonas comunes de la vivienda las siguientes:\n
  \n
  1) Uso de los cuartos de baño, cocina y sala de estar: se podrá utilizar en cualquier horario respetando en todo momento las necesidades de utilización del resto de usuarios.\n
  \n
  2) El arrendatario acepta de forma expresa la prohibición de fumar dentro de cualquier dependencia de la vivienda, así como el consumo de sustancias estupefacientes. En caso de que se denuncie esta circunstancia por parte del resto de arrendatarios de la vivienda o de los vecinos, quedará el arrendador facultado para resolver el presente contrato con pérdida de las cantidades previamente abonadas en concepto de fianza y suministros abonadas por el arrendatario.\n
  \n
  3) Además, tampoco se podrá llevar a cabo ningún tipo de fiesta, cena o comida multitudinaria en la vivienda. Máximo se admiten 3 invitados a la vez, entre todos los compañeros del piso.\n
     - Primer aviso por molestias vecinales (0 €)\n
     - Segundo aviso (200 €) ampliación de fianza.\n
     - Tercer aviso expulsión de la vivienda con pérdida de las aportaciones de fianza, suministros y wifi.\n
  \n
     El arrendatario da su consentimiento expreso de poder compartir las zonas comunes de la vivienda con personas de distinto género, etnia, nacionalidad o religión.\n
     Se hablará con educación y respeto o se penalizará con 100€ las faltas de respeto, insultos, etc. al arrendador, a la agencia, a los trabajadores de mantenimiento y limpieza, o a los propios compañeros.\n
  \n
  4) El arrendatario no podrá hacer uso de las habitaciones de la vivienda que no se encuentren arrendadas, siendo que para el caso de que efectivamente lo haga, podrá ser detraído el 100% de la cantidad entregada en concepto de fianza.\n
  \n
  5) Queda terminantemente prohibido el encendido de velas, candelas, incienso y cualquier otro material que arda y pueda incendiar la habitación o el piso.\n
  \n
  6) El arrendatario se obliga a estar en el grupo de Whatsapp del piso mientras resida en el piso.\n
  \n
  7) Visitas: Se puede recibir visitas en el piso siempre y cuando se informe a los compañeros y a la agencia a través del grupo de Whatsapp y los compañeros estén de acuerdo. La duración de la estancia es de máximo 3 noches y no pueden coincidir más de 3 invitados de manera simultánea en la vivienda.\n
     - Si el invitado supera las 3 noches de estancia, deberá contribuir con 20 € /semana para los gastos comunes del piso, previa aceptación por parte de los compañeros y de la agencia. En ningún caso debe convertirse en una costumbre, sólo visitas esporádicas.\n
     - El visitante no puede dormir en las zonas comunes del piso, ni en el sofá. Siempre deberá hacerlo dentro de la habitación de su anfitrión.\n
     - No puede haber un invitado pernoctando en el piso cuando su anfitrión se encuentre fuera de la ciudad.\n
  \n
  8) Para el supuesto de que el arrendatario extravíe las llaves de la vivienda o no las entregue a la finalización, deberá abonar los gastos ocasionados por el cambio de la cerradura de la puerta de entrada principal, más un juego de llaves por cada habitación de la vivienda y dos juegos de llaves extra que le corresponderá al arrendador.\n
  \n
  9) Una vez finalizado el presente contrato, el arrendatario deberá dejar la habitación, así como las zonas comunes, totalmente limpias y sin enseres personales, tal y como la encontró a su llegada.\n
  \n
  10) En caso de desperfectos ocasionados en las zonas comunes de la vivienda, y para el caso de que el causante de los daños no se identifique, responderán de los costes de las reparaciones pertinentes todos los inquilinos de forma solidaria con sus respectivas fianzas, sin perjuicio de que posteriormente puedan entablar las acciones legales pertinentes de forma interna para la restitución de dichos importes frente al responsable de los desperfectos.\n`;
};

export default hellolandlordContractTemplate;

const hellocolivingContractTemplate = ({
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
    tenantPassport,
    tenantPhone,
    tenantEmail,
    tenantAddress,
    tenantStreet,
    tenantPostalCode,
    roomNumber,
    startDate,
    endDate,
    monthlyRent,
}) => {
    return `CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA COMPARTIDA\n
  
    En la ciudad de Valencia, a ${contractDate}\n
  
    REUNIDOS\n
  
    De una parte, D./Dª ${landlordName}, como parte ARRENDADORA, siendo mayor de edad, con NIF ${landlordNIF}, propietario/a en pleno dominio del inmueble sito en Valencia:
    C/ ${landlordStreet} nº ${landlordStreetNumber} - PUERTA ${landlordDoorNumber}, Valencia ${landlordPostalCode}.
    Dicho inmueble se halla amueblado y consta de ${numberOfRooms} habitaciones, sala de estar, cocina y ${numberOfBathrooms} cuartos de baño.\n
  
    EL ARRENDADOR autoriza a Hello Flat Mate S.L. con CIF B98358963, bajo mandato expreso, únicamente la formalización de este contrato.\n
  
    De otra parte, D./Dª ${tenantName}, mayor de edad, con pasaporte ${tenantPassport}, nº de teléfono ${tenantPhone}, email ${tenantEmail}, y con domicilio en ${tenantAddress}, Calle ${tenantStreet}, CP ${tenantPostalCode}, actuando como parte ARRENDATARIA, está interesado en arrendar la habitación n.º H${roomNumber} del mencionado inmueble.\n
  
    INTERVIENEN\n
  
    Las partes intervienen en su propio nombre y derecho, reconociéndose la capacidad legal necesaria para celebrar el presente contrato, a cuyo efecto acuerdan:\n
  
    Que, estando interesada la parte ARRENDATARIA en el arrendamiento de la habitación indicada en el Expositivo anterior, y la ARRENDADORA en concedérselo, han convenido la celebración del presente CONTRATO DE ARRENDAMIENTO DE HABITACIÓN EN VIVIENDA COMPARTIDA, el cual se formaliza con sujeción al régimen jurídico establecido en la Ley de Arrendamientos Urbanos de 24 de noviembre de 1.994, así como el recogido en el Código Civil, el cual llevan a cabo por medio del presente contrato y, con arreglo a las siguientes\n
  
    CLÁUSULAS\n
  
    PRIMERA. - DESTINO Y OBJETO DEL CONTRATO.\n
    Que el ARRENDADOR, arrienda al ARRENDATARIO, la habitación descrita en este contrato.\n
    El destino pactado para la edificación es de Uso distinto al de vivienda y concretamente la residencia temporal del ARRENDATARIO por motivos laborales o educativos, sin que los arrendatarios puedan cambiar el destino pactado para el mismo.\n
  
    SEGUNDA. - ESTADO.\n
    Dado que el ARRENDATARIO es posible que firme el contrato sin haber previamente visitado la vivienda in situ, tendrá 3 días para reportar cualquier desperfecto que se encuentren en zonas comunes como en la habitación alquilada.\n
    Una vez transcurrido este período sin que el ARRENDATARIO haya notificado desperfecto alguno en la vivienda o en la habitación arrendada, se entenderá que la vivienda se encontraba en perfecto estado para su uso y habitabilidad, debiendo devolverla el arrendatario a la finalización del contrato en ese mismo estado.\n
  
    TERCERA. - DURACIÓN DEL CONTRATO.\n
    El presente contrato se acuerda que se extenderá por el período comprendido del ${startDate} al ${endDate}. Transcurrido dicho período, el contrato quedará resuelto sin necesidad de requerimiento alguno y se dejará libre la habitación a las 9 a.m.\n
    La expiración del tiempo pactado para el presente contrato de arrendamiento producirá la automática extinción del contrato, quedando obligadas los arrendatarios a dejar la habitación libre de enseres a la referida fecha y a disposición del ARRENDADOR, y en las mismas condiciones existentes en el momento de la ocupación.\n
    Para el caso de que el ARRENDATARIO estuviera interesado en añadir una noche extra a su estancia, ésta tendrá un coste de 35 €, y siempre estará condicionada a la disponibilidad de la habitación y a la autorización del ARRENDADOR.\n
  
    CUARTA. - RENTA.\n
    El arrendatario abonará al arrendador, en concepto de renta, la cantidad de ${monthlyRent} € mensuales, siempre por adelantado y dentro del período comprendido entre los días 20 y 25 de cada mes.\n
    Dicha renta se abonará a través del área de usuario del ARRENDATARIO de la página web www.helloflatmate.com a través de la pasarela de pago, mediante tarjeta de crédito o débito.\n
    El incumplimiento reiterado de la obligación de pago o notificación del justificante del pago en el periodo fijado será motivo de resolución del contrato, dando derecho al arrendador a solicitar el desahucio, siendo por cuenta del ARRENDATARIO los gastos que estas acciones originen.\n
    El ARRENDATARIO es conocedor y asume que en caso de impago de las rentas deberá abandonar la vivienda, perdiendo las cantidades entregadas en concepto de fianza así como suministros de agua, luz, gas e internet.\n
    Del mismo modo, para el caso de que el arrendatario incumpla el plazo de pago de la renta, el ARRENDADOR podrá sancionar al ARRENDATARIO por dicho incumplimiento con 10€ por cada día de retraso en el pago.\n
    El ARRENDATARIO estará obligado a abonar junto a la renta del último mes de contrato, 50 € para la limpieza profunda de la vivienda. No obstante, el ARRENDATARIO deberá dejar la habitación, así como las zonas comunes totalmente limpias y sin enseres personales.\n\n
    En ese sentido, el ARRENDATARIO se responsabiliza solidariamente junto a sus compañeros a dejar la vivienda completamente limpia. En caso de que la vivienda no quede en las condiciones establecidas se descontará del depósito la cantidad de horas extra que se haya invertido en la limpieza de ésta.\n
  
    Servicios incluidos en la renta:\n
    - Internet Wifi\n
    - 2 limpiezas semanales de zonas comunes\n
    - Atención 24 horas\n
  
    QUINTA. - PRIMERA ENTREGA DE LLAVES.\n
    Que previamente a la entrega de llaves, el inquilino deberá abonar las siguientes cantidades:\n
    • Un depósito de QUINIENTOS EUROS (500 €) en concepto de FIANZA. Este importe será devuelto entre 30 y 45 días tras la finalización del contrato.\n
    • La cantidad de DOSCIENTOS EUROS (200 €) en concepto de suministros de agua y luz por cada período de CINCO MESES de contrato.\n
  
    SEXTA. - DERECHO DE ACCESO A LA VIVIENDA DEL ARRENDADOR.\n
    Las partes acuerdan expresamente la renuncia del ARRENDATARIO a impedir que el ARRENDADOR pueda acceder a las zonas comunes de la vivienda y a las habitaciones que circunstancialmente no se encuentren arrendadas en el momento del acceso a la vivienda.\n
  
    SÉPTIMA. – DESISTIMIENTO DEL CONTRATO POR PARTE DEL ARRENDATARIO.\n
    En caso de desistimiento por parte de El ARRENDATARIO, éste vendrá obligado al pago íntegro de todas las mensualidades convenidas hasta la finalización del Contrato, salvo que éste presente un nuevo inquilino.\n
  
    OCTAVA. - FUERZA MAYOR.\n
    En caso de fuerza mayor el ARRENDATARIO no podrá exigir la resolución, suspensión y/o modificación del contrato, ni la reducción de la renta pactada.\n
  
    NOVENA. – CESIÓN Y SUBARRIENDO.\n
    Con expresa renuncia a lo dispuesto en el artículo 32 de la LAU., el arrendatario se obliga a no subarrendar, en todo o en parte, ni ceder o traspasar la habitación arrendada sin el consentimiento expreso y escrito del arrendador.\n
  
    DÉCIMA. - DEVOLUCIÓN DE LAS LLAVES POR PARTE DEL ARRENDATARIO.\n
    La parte ARRENDATARIA hará entrega de las llaves de la vivienda y de la habitación en la fecha de finalización del presente contrato.\n
  
    DECIMOPRIMERA. – EMPADRONAMIENTO.\n
    El ARRENDATARIO tendrá derecho a empadronarse en la vivienda compartida, siempre y cuando cumpla con los requisitos exigidos en la normativa local de referencia.\n
  
    DECIMOSEGUNDA. - NORMAS DE CONVIVENCIA.\n
    La parte ARRENDATARIA se someterá a las normas establecidas por la comunidad de propietarios, especialmente las relativas a la convivencia vecinal.\n
  
    DECIMOTERCERA. - OBLIGACIONES DEL ARRENDADOR Y ARRENDATARIO CON RESPECTO AL MANTENIMIENTO Y REPARACIONES.\n
    El ARRENDADOR realizará las reparaciones para conservar la vivienda en condiciones de habitabilidad para servir al uso convenido.\n
  
    DECIMOCUARTA. – INCUMPLIMIENTO DE OBLIGACIONES.\n
    El incumplimiento por cualquiera de las partes de las obligaciones resultantes del contrato dará derecho a la parte que hubiere cumplido las suyas a exigir el cumplimiento de la obligación.\n
  
    DECIMOQUINTA. - LEGISLACIÓN APLICABLE.\n
    En todo lo no previsto en el presente contrato, éste se regirá por lo dispuesto tanto en la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos, y supletoriamente por el Código Civil.\n
  
    DECIMOSEXTA. - SUMISIÓN.\n
    Los contratantes se someten expresamente a los Juzgados y Tribunales de la ciudad de Valencia para todas aquellas cuestiones litigiosas que pudieran derivarse del presente contrato.\n
  
    Y con el carácter expresado en la intervención, firman el presente contrato, en el lugar y fecha indicados.\n
  
    Firma ARRENDADORA                                                      Firma ARRENDATARIA\n
    
    ANEXO I – NORMAS DE CONVIVENCIA\n

    1. La parte arrendataria afirma que ha sido informada y se someterá durante toda la vigencia del contrato a las normas establecidas por la comunidad de propietarios, especialmente las relativas a la convivencia vecinal.\n

    2. El arrendatario deberá tener especial cuidado con los ruidos, a cualquier hora:\n
    
       En particular, se establece que «se consideran actividades no tolerables» acciones como «gritar, vociferar o emplear un tono excesivamente alto de la voz humana o la actividad directa de las personas, movimiento de muebles y/o enseres, etc». Entra dentro de esta categoría usar aparatos e instrumentos musicales o acústicos, radio, televisión, cuando causen molestias.\n
    
       Asimismo, se considera una actividad no tolerable «usar electrodomésticos o maquinaria susceptibles de producir ruidos» molestos; se pone el ejemplo de un taladro. Por último, se añade también «la posesión de animales sin adoptar las medidas necesarias para evitar que los ruidos producidos por éstos ocasionen molestias a los vecinos». Estos comportamientos se consideran «especialmente gravosos» entre las 22.00 y las 8.00 horas.\n

    3. También deberá cumplir y respetar las normas internas de convivencia razonable que sean decididas por la mayoría de los arrendatarios de la vivienda, entre las que se incluye el cumplimiento de los turnos de limpieza de zonas comunes, baños y cocina, bajar la basura y el resto de las tareas domésticas básicas.\n

    4. Queda prohibida expresamente la tenencia de cualquier tipo de animal o mascota en la vivienda.\n

    5. El arrendamiento de la habitación tiene incluido el uso de las zonas comunes de la vivienda. Se establecen como normas de utilización de zonas comunes de la vivienda las siguientes:\n
    
       a. Uso de los cuartos de baño, cocina y sala de estar: se podrá utilizar en cualquier horario respetando en todo momento las necesidades de utilización del resto de usuarios.\n
    
       b. El arrendatario acepta de forma expresa la prohibición de fumar dentro de cualquier dependencia de la vivienda, así como el consumo de sustancias estupefacientes. En caso de que se denuncie esta circunstancia por parte del resto de arrendatarios de la vivienda o de los vecinos, quedará el arrendador facultado para resolver el presente contrato con pérdida de las cantidades previamente abonadas en concepto de fianza y suministros abonadas por el arrendatario.\n
    
       c. Además, tampoco se podrá llevar a cabo ningún tipo de fiesta, cena o comida multitudinaria en la vivienda. Máximo se admiten 3 invitados a la vez, entre todos los compañeros del piso.\n
    
          Para el caso de que esta circunstancia sea denunciada por el resto de los arrendatarios de la vivienda o de los vecinos, quedará facultado el arrendador para resolver el presente contrato con la pérdida de la fianza abonada por el arrendatario:\n
    
          - Primer aviso por molestias vecinales (0€)\n
          - Segundo aviso (200€) ampliación de fianza.\n
          - Tercer aviso: expulsión de la vivienda con pérdida de las aportaciones de fianza, suministros y wifi.\n
    
       d. El arrendatario da su consentimiento expreso de poder compartir las zonas comunes de la vivienda con personas de distinto género, etnia, nacionalidad o religión.\n

    6. Se hablará con educación y respeto o se penalizará con 100€ las faltas de respeto, insultos, etc. al arrendador, a la agencia, a los trabajadores de mantenimiento y limpieza, o a los propios compañeros.\n

    7. El arrendatario no podrá hacer uso de las habitaciones de la vivienda que no se encuentren arrendadas, siendo que para el caso de que efectivamente lo haga, podrá ser detraído el 100% de la cantidad entregada en concepto de fianza.\n

    8. Queda terminantemente prohibido el encendido de velas, candelas, incienso y cualquier otro material que arda y pueda incendiar la habitación o el piso.\n

    9. El arrendatario se obliga a estar en el grupo de Whatsapp del piso mientras resida en el piso.\n

    10. Visitas - Se puede recibir visitas en el piso siempre y cuando se informe a los compañeros y a la agencia a través del grupo de Whatsapp y los compañeros estén de acuerdo. La duración de la estancia es de máximo 3 noches y no pueden coincidir más de 3 invitados de manera simultánea en la vivienda.\n

        Si el invitado supera las 3 noches de estancia, deberá contribuir con 20 €/semana para los gastos comunes del piso, previa aceptación por parte de los compañeros y de la agencia. En ningún caso debe convertirse en una costumbre, solo visitas esporádicas.\n
    
        El visitante no puede dormir en las zonas comunes del piso, ni en el sofá. Siempre deberá hacerlo dentro de la habitación de su anfitrión.\n
    
        No puede haber un invitado pernoctando en el piso cuando su anfitrión se encuentre fuera de la ciudad.\n

    11. Para el supuesto de que el arrendatario extravíe las llaves de la vivienda o no las entregue a la finalización, deberá abonar los gastos ocasionados por el cambio de la cerradura de la puerta de entrada principal, más un juego de llaves por cada habitación de la vivienda y dos juegos de llaves extra que le corresponderá al arrendador.\n

    12. Una vez finalizado el presente contrato, el arrendatario deberá dejar la habitación, así como las zonas comunes, totalmente limpias y sin enseres personales, tal y como la encontró a su llegada.\n

        En caso de desperfectos ocasionados en las zonas comunes de la vivienda, y para el caso de que el causante de los daños no se identifique, responderán de los costes de las reparaciones pertinentes todos los inquilinos de forma solidaria con sus respectivas fianzas, sin perjuicio de que posteriormente puedan entablar las acciones legales pertinentes de forma interna para la restitución de dichos importes frente al responsable de los desperfectos.\n
    `;
};

export default hellocolivingContractTemplate;

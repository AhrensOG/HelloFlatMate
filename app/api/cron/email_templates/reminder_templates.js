const firstPaymentReminderTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de pago de renta - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">
  
  <p>🇪🇸 ¡Hola!</p>
  <p>Te recordamos que del 20 al 25 de este mes debes efectuar el pago de la renta del mes próximo a través de tu área de usuario en <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, iniciando sesión con Google.</p>
  <p>¡Muchas gracias!</p>

  <br>

  <p>🇬🇧 Hello!</p>
  <p>We remind you that from 20th to 25th of this month you must make the payment of next month's rent through your user area at <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, logging in with Google.</p>
  <p>Thank you very much!</p>

  <br>

  ${generateFooter()}
  
</body>
</html>
`;

const cleaningFeeJanuaryTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de pago de limpieza - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">

  <p>🇪🇸 ¡Hola!</p>
  <p>Recuerda que este mes, junto a la renta de enero, hay que pagar los 50€ de la limpieza del check out tal como indica tu contrato.</p>

  <br>
  <p>🇬🇧 Hello!</p>
  <p>Remember that this month, together with the January rent, you have to pay the €50 cleaning fee for the check out as indicated in your contract.</p>

  <br>

  ${generateFooter()}

</body>
</html>
`;

const suppliesFeeFebruaryTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de pago de renta y suministros - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">

  <p>🇪🇸 ¡Hola!</p>
  <p>Te recordamos que del 20 al 25 de enero debes efectuar el pago de la renta de febrero a través de tu área de usuario en <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, iniciando sesión con Google.</p>
  <p>Junto a la renta de febrero, también debes hacer el pago de la aportación para suministros y wifi para el próximo semestre, tal como indica el contrato.</p>
  <p>¡Muchas gracias!</p>

  <br>

  <p>🇬🇧 Hello!</p>
  <p>We remind you that from 20th to 25th January you must make the payment of the February rent through your user area at <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, by logging in with Google.</p>
  <p>Together with the February rent, you must also pay the contribution for supplies and wifi for the next semester, as indicated in the contract.</p>
  <p>Thank you very much!</p>

  <br>

  ${generateFooter()}

</body>
</html>
`;

const cleaningFeeJuneTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de pago de renta y limpieza - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">

  <p>🇪🇸 ¡Hola!</p>
  <p>Te recordamos que del 20 al 25 de mayo debes efectuar el pago de la renta de junio a través de tu área de usuario en <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, iniciando sesión con Google.</p>
  <p>Recuerda que junto a la renta de junio también hay que pagar la limpieza del check out tal como indica tu contrato.</p>
  <p>¡Muchas gracias!</p>

  <br>

  <p>🇬🇧 Hello!</p>
  <p>We remind you that from 20th to 25th May you must make the payment of the June rent through your user area at <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, by logging in with Google.</p>
  <p>Remember that together with the June rent you also have to pay the check out cleaning as indicated in your contract.</p>
  <p>Thank you very much!</p>

  <br>

  ${generateFooter()}

</body>
</html>
`;

const latePaymentReminderTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de pago vencido - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">

  <p>🇪🇸 ¡Hola!</p>
  <p>Te recordamos que ayer terminó el plazo de pago del alquiler.</p>
  <p>Por favor, realízalo lo antes posible, o envíanos el justificante de pago si ya lo has realizado para poder localizarlo.</p>
  <p>Gracias.</p>

  <br>

  <p>🇬🇧 Hello!</p>
  <p>We would like to remind you that the deadline for payment of the rent was yesterday.</p>
  <p>Please make the payment as soon as possible, or send us the proof of payment if you have already made the payment so that we can locate it.</p>
  <p>Thank you.</p>

  <br>

  ${generateFooter()}

</body>
</html>
`;

const checkInReminderTemplate = () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recordatorio de registro de Check-In - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">
  
  <p>🇪🇸 ¡Hola!</p>
  <p>Queremos recordarte que es necesario registrar tu <strong>fecha de Check-In</strong>.</p>
  <p>Por favor, accede a tu área de usuario en <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, inicia sesión y dirígete al apartado <strong>"Check-In"</strong>. Allí podrás seguir el proceso indicado para completar el registro.</p>
  <p>Este paso es importante para garantizar tu correcta llegada y recepción. Si tienes dudas, puedes escribirnos por email: rooms@helloflatmate.com</p>
  <p>¡Gracias por tu colaboración!</p>

  <br>

  <p>🇬🇧 Hello!</p>
  <p>We would like to remind you to register your <strong>Check-In date</strong>.</p>
  <p>Please go to your user area at <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a>, log in and access the <strong>"Check-In"</strong> section. There you will be able to follow the steps to complete your registration.</p>
  <p>This step is essential to ensure your proper arrival and welcome. If you have any questions, feel free to contact us by email: rooms@helloflatmate.com</p>
  <p>Thank you for your cooperation!</p>

  <br>

  ${generateFooter()}
  
</body>
</html>
`;

const generateFooter = () => `
<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
  <tr>
    <td align="left" style="padding:20px;padding-left: 0px;border-top:1px solid #e0e0e0">
      <!-- Logo -->
      <img src="https://firebasestorage.googleapis.com/v0/b/helloflatprueba.appspot.com/o/Organizacion%2FnewLogo.png?alt=media&token=7da551d3-9b1f-45a0-a0aa-d9d9697cd293" alt="Hello Flatmate Logo" width="150" style="display: block; margin-bottom: 10px;">
      
      <!-- Información de contacto -->
      <p style="margin: 5px 0;">
        Address: C/ Campoamor 8, 1C, 46021 Valencia<br>
        Horario: 9 - 17 h (Lunes - Viernes)<br>
        Website: <a href="https://www.helloflatmate.com" style="color: #0078d7; text-decoration: none;">www.helloflatmate.com</a><br>
        Phone: +34 601 158 261
      </p>

      <!-- Texto Legal -->
      <p style="font-size: 12px; color: #888; margin-top: 15px; text-align: justify;">
        La información contenida en este mensaje y los archivos adjuntos es confidencial. Cualquier modificación, retransmisión, difusión u otro uso de esta información por personas o entidades distintas a las personas a la que va dirigida está prohibida salvo que esté autorizado expresamente por el emisor del mensaje. Si recibe este mensaje por error, por favor bórrelo y notifíquelo al remitente. HELLO FLAT MATE, S.L. no aceptará ninguna responsabilidad acerca de los daños o pérdidas que pudieran producirse por este motivo.
      </p>

      <p style="font-size: 12px; color: #888; margin-top: 10px; text-align: justify;">
        Podrá ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad de datos y más, ante HELLO FLAT MATE, S.L. en la dirección C/ Campoamor 8, 1C, 46021 Valencia (VALENCIA), o por correo electrónico a 
        <a href="mailto:rooms@helloflatmate.com" style="color: #0078d7; text-decoration: none;">rooms@helloflatmate.com</a>.
        Más información en: 
        <a href="https://sedeagpd.gob.es/sede-electronica-web/vistas/formNuevaReclamacion/reclamacion.jsf" style="color: #0078d7; text-decoration: none;">Agencia Española de Protección de Datos</a>.
      </p>
    </td>
  </tr>
</table>`;

export {
  firstPaymentReminderTemplate,
  cleaningFeeJanuaryTemplate,
  suppliesFeeFebruaryTemplate,
  cleaningFeeJuneTemplate,
  latePaymentReminderTemplate,
  checkInReminderTemplate,
};

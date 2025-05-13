const preReservationTemplate = (name, lastName, email, startDate, endDate, price) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Solicitud enviada - helloFlatMate</title>
</head>
<body>
  <p>
    Hola ${name} ${lastName} (${email}),
  </p>
  <p>
    Tu solicitud para las fechas <strong>${startDate} - ${endDate}</strong> por un precio de <strong>${price}€</strong> ha sido enviada. La revisamos y en breve contactaremos contigo.
  </p>
  <p>
    ¡Gracias por tu paciencia!
  </p>
  <br/>
  <p>
    Un saludo,<br/>
    <strong>helloflatmate</strong> Team
  </p>

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
  </table>
</body>
</html>`;


export default preReservationTemplate;
const startToDoTemplate = (todo) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inicio de servicio de mantenimiento - helloFlatMate</title>
</head>
<body>
  <p>
    Le informamos que se ha programado una tarea titulada <strong>"${
      todo.title
    }"</strong> en el alojamiento <strong>${
  todo.propertySerial
}</strong> donde usted reside o es propietario.
  </p>
  <p>
    La tarea <strong>#${
      todo.id
    }</strong> se llevará a cabo el <strong>${formatDate(
  todo.startDate
)}</strong> a las <strong>${formatTime(todo.startDate)}hs</strong>.
  </p>
  <br/>
  <p>
    Puede consultar todos los detalles accediendo al panel de incidencias desde su cuenta en nuestra web.
  </p>
  <p>
    Si tiene alguna duda, puede contactarnos a través del correo electrónico:
    <a href="mailto:rooms@helloflatmate.com">rooms@helloflatmate.com</a>
  </p>
  <br/>
  <p>
    Un saludo,<br>
    helloflatmate, SL
  </p>

  ${generateFooter()}
</body>
</html>`;

const cancelToDoTemplate = (todo) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cancelación de servicio de mantenimiento - helloFlatMate</title>
</head>
<body>
  <p>
    Le informamos que la tarea titulada <strong>"${
      todo.title
    }"</strong> programada en el alojamiento <strong>${
  todo.propertySerial
}</strong> ha sido <strong>cancelada</strong>.
  </p>
  <p>
    <strong>Motivo:</strong> ${todo.cancellationReason || "No especificado"}.
  </p>
  <br/>
  <p>
    Puede consultar el historial de incidencias accediendo al panel de incidencias desde su cuenta en nuestra web.
  </p>
  <p>
    Si tiene alguna duda, puede contactarnos a través del correo electrónico:
    <a href="mailto:rooms@helloflatmate.com">rooms@helloflatmate.com</a>
  </p>
  <br/>
  <p>
    Un saludo,<br>
    helloflatmate, SL
  </p>

  ${generateFooter()}
</body>
</html>`;

const reprogramToDoTemplate = (todo) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reprogramación de servicio de mantenimiento - helloFlatMate</title>
</head>
<body>
  <p>
    Le informamos que la tarea titulada <strong>"${
      todo.title
    }"</strong> en el alojamiento <strong>${
  todo.propertySerial
}</strong> ha sido <strong>reprogramada</strong>.
  </p>
  <p>
    Nueva fecha: <strong>${formatDate(
      todo.reprogrammedStartDate
    )}</strong> a las <strong>${formatTime(
  todo.reprogrammedStartDate
)}hs</strong>.
  </p>
  <p>
    <strong>Motivo:</strong> ${todo.reprogramingComment || "No especificado"}
  </p>
  <br/>
  <p>
    Puede consultar todos los detalles accediendo al panel de incidencias desde su cuenta en nuestra web.
  </p>
  <p>
    Si tiene alguna duda, puede contactarnos a través del correo electrónico:
    <a href="mailto:rooms@helloflatmate.com">rooms@helloflatmate.com</a>
  </p>
  <br/>
  <p>
    Un saludo,<br>
    helloflatmate, SL
  </p>
  ${generateFooter()}
</body>
</html>`;

const completeToDoTemplate = (todo) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Finalización de servicio de mantenimiento - helloFlatMate</title>
</head>
<body>
  <p>
    Le informamos que la tarea titulada <strong>"${
      todo.title
    }"</strong> en el alojamiento <strong>${
  todo.propertySerial
}</strong> ha sido <strong>finalizada</strong> correctamente.
  </p>
  <p>
    Tarea <strong>#${todo.id}</strong> finalizada el día: <strong>${formatDate(
  todo.endDate || new Date()
)}</strong>.
  </p>
  <br/>
  <p>
    Puede consultar el historial de incidencias accediendo al panel de incidencias desde su cuenta en nuestra web.
  </p>
  <p>
    Si tiene alguna duda, puede contactarnos a través del correo electrónico:
    <a href="mailto:rooms@helloflatmate.com">rooms@helloflatmate.com</a>
  </p>
  <br/>
  <p>
    Un saludo,<br>
    helloflatmate, SL
  </p>
  ${generateFooter()}
</body>
</html>`;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "Fecha no disponible";

  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "Hora no disponible";

  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

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
  startToDoTemplate,
  cancelToDoTemplate,
  reprogramToDoTemplate,
  completeToDoTemplate,
};

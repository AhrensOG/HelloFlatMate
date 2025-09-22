// utils/email/incidenceTemplate.js
const getLastTwoDigits = (serial) => {
  if (typeof serial !== "string") return "";
  return serial.slice(-2);
};

const fmtBool = (v) => (v ? "Sí" : "No");

const safe = (v) => (v ?? "").toString();

const fmtDate = (d) => {
  try {
    const dt = d instanceof Date ? d : new Date(d);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dt);
  } catch {
    return "";
  }
};

const incidenceTemplate = ({
  name,
  lastName,
  email,
  address = {},
  roomSerial = "",
  incidentSite = "",
  incidentType = "",
  preferredTimeSlot = "",
  isPresent = false,
  emergency = false,
  clientMessage = "",
  submittedAt = new Date(),
} = {}) => {
  const suffix = getLastTwoDigits(roomSerial);
  const addressLine = [
    safe(address.street),
    safe(address.streetNumber),
    address.floor ? `P${safe(address.floor)}` : "",
    suffix ? suffix : "",
  ]
    .filter(Boolean)
    .join(" ");

  const submitted = fmtDate(submittedAt);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Nueva incidencia - helloFlatmate</title>
</head>
<body style="font-family: Arial, sans-serif; color:#333; line-height:1.5; font-size:14px;">
  <p style="margin:0 0 12px 0;">
    <strong>Hola equipo,</strong>
  </p>

  <p style="margin:0 0 12px 0;">
    Se ha registrado una <strong>nueva incidencia de mantenimiento</strong>:
  </p>

  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin: 10px 0 16px 0;">
    <tbody>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee; width:220px;"><strong>Solicitante</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${safe(
          name
        )} ${safe(lastName)} (${safe(email)})</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Dirección / Habitación</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${addressLine}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Ubicación de la incidencia</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${safe(
          incidentSite
        )}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Tipo de incidencia</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${safe(
          incidentType
        )}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Franja horaria preferida</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${
          safe(preferredTimeSlot) || "—"
        }</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Estará presente</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${fmtBool(
          isPresent
        )}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Es emergencia</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${fmtBool(
          emergency
        )}</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee; vertical-align:top;"><strong>Mensaje del cliente</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee; white-space:pre-wrap;">${
          safe(clientMessage) || "—"
        }</td>
      </tr>
      <tr>
        <td style="padding:6px 8px; border:1px solid #eee;"><strong>Fecha de solicitud</strong></td>
        <td style="padding:6px 8px; border:1px solid #eee;">${submitted}</td>
      </tr>
    </tbody>
  </table>

  <p style="margin:0 0 14px 0;">Por favor, realizar el seguimiento en el panel de mantenimiento.</p>

  <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color:#333; margin-top: 18px;">
    <tr>
      <td align="left" style="padding:16px 0; border-top:1px solid #e0e0e0">
        <img src="https://firebasestorage.googleapis.com/v0/b/helloflatprueba.appspot.com/o/Organizacion%2FnewLogo.png?alt=media&token=7da551d3-9b1f-45a0-a0aa-d9d9697cd293" alt="Hello Flatmate Logo" width="150" style="display:block; margin-bottom:10px;">
        <p style="margin:5px 0;">
          Address: C/ Campoamor 8, 1C, 46021 Valencia<br>
          Horario: 9 - 17 h (Lunes - Viernes)<br>
          Website: <a href="https://www.helloflatmate.com" style="color:#0078d7; text-decoration:none;">www.helloflatmate.com</a><br>
          Phone: +34 601 158 261
        </p>
        <p style="font-size:12px; color:#888; margin-top:12px; text-align:justify;">
          La información contenida en este mensaje y los archivos adjuntos es confidencial...
        </p>
        <p style="font-size:12px; color:#888; margin-top:10px; text-align:justify;">
          Podrá ejercer los derechos de acceso, rectificación, supresión, oposición...
          <a href="mailto:rooms@helloflatmate.com" style="color:#0078d7; text-decoration:none;">rooms@helloflatmate.com</a>.
          Más información:
          <a href="https://sedeagpd.gob.es/sede-electronica-web/vistas/formNuevaReclamacion/reclamacion.jsf" style="color:#0078d7; text-decoration:none;">Agencia Española de Protección de Datos</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export default incidenceTemplate;

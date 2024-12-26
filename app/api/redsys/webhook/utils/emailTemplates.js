const baseTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recibo de Compra - HelloFlatMate</title>
  <style>
    /* Estilos básicos para la plantilla */
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff; /* slate-50 */
      font-family: sans-serif;
      width: 100%;
    }
    .container {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto; /* Centrar horizontalmente */
      background-color: #ffffff;
    }
    .header {
      background-color: #f8fafc; /* slate-50 */
      padding: 30px;
      text-align: center;
      width: 100%;
    }
    .header a {
      text-decoration: none;
      color: #aeaeae;
      font-size: 18px;
      font-weight: bold;
    }
    .body {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto; /* Centrar horizontalmente */
      text-align: left; /* Alinear el texto a la izquierda */
    }
    .body h1 {
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10px;
    }
    .body p {
      font-size: 14px;
      color: #3d4852;
      line-height: 1.5;
      margin-bottom: 15px;
    }
    .button-container {
      text-align: center; /* Centrar el botón */
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3490dc;
      color: #ffffff!important;
      text-decoration: none;
      border-radius: 2px;
      font-weight: 200;
      font-size: small;
    }
    .supportText {
      border-top: 1px solid #edeff2;
      padding-top: 20px;
      font-size: 10px !important;
      text-align: left; /* Alinear el texto a la izquierda */
    }
    .supportText a {
      color: #3869d4;
      text-decoration: underline;
    }
    .footer {
      background-color: #f8fafc; /* slate-50 */
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #aeaeae;
      width: 100%;
    }
    /* Estilos responsivos */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .header, .body, .footer {
        padding: 15px;
      }
      .button {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Encabezado -->
    <div class="header">
      <a href="https://www.helloflatmate.com">helloflatmate</a>
    </div>
    
    <!-- Cuerpo -->
    <div class="body">
      <h1>Hello!</h1>
      <p>
        Si tiene alguna duda puede contactarnos a través de nuestro correo electrónico, teléfono, o mediante la página web.
      </p>
      <p>
        Teléfono: +34 601 158 261<br>
        Correo: <a href="mailto:rooms@helloflatmate.com">rooms@helloflatmate.com</a>
      </p>
      
      <!-- Botón de Contacto -->
      <div class="button-container">
        <a href="https://www.helloflatmate.com/contacto" class="button">Contáctenos mediante la WEB</a>
      </div>
      
      <!-- Mensaje de Apoyo -->
      <p>
        Saludos,<br>
        helloflatmate
      </p>
      <div class="divideLine"></div>
      <p class="supportText">
        If you’re having trouble clicking the "Contáctenos mediante la WEB" button, copy and paste the URL below into your web browser: <a href="https://www.helloflatmate.com/contacto">https://www.helloflatmate.com/contacto</a>
      </p>
    </div>
    
    <!-- Pie de Página -->
    <div class="footer">
      © 2024 helloflatmate. All rights reserved.
    </div>
  </div>
</body>
</html>

`;

export { baseTemplate };

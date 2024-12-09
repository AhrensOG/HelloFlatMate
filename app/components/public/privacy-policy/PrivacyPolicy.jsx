import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-resolution-blue">
        Política de Privacidad
      </h1>
      <section className="mb-6">
        <p>
          En HELLO FLAT MATE, S.L., nos tomamos muy en serio la privacidad y la
          protección de los datos personales. Esta política describe cómo
          recopilamos, usamos, almacenamos y compartimos su información de
          acuerdo con el Reglamento (UE) 2016/679 (Reglamento General de
          Protección de Datos, RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Al
          utilizar nuestros servicios, confirma que ha leído y entendido esta
          política.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">1. Responsable del Tratamiento</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Denominación social:</strong> HELLO FLAT MATE, S.L.
          </li>
          <li>
            <strong>CIF:</strong> B98358963
          </li>
          <li>
            <strong>Domicilio social:</strong> C/ Campoamor 8, 1º, 46021 -
            Valencia (Valencia)
          </li>
          <li>
            <strong>Teléfono:</strong> 601 158 261
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:rooms@helloflatmate.com"
              className="text-blue-600 hover:underline"
            >
              rooms@helloflatmate.com
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">
          2. ¿Qué datos recopilamos y cómo los obtenemos?
        </h2>

        <h3 className="text-base font-semibold mt-4">
          2.1. Información proporcionada directamente por usted
        </h3>
        <p className="pl-6 mt-2">
          <strong>a)</strong> Registro de usuario: Para crear una cuenta de
          usuario como inquilino o propietario, solicitamos información básica
          como nombre, apellidos y correo electrónico. Si utiliza opciones de
          registro mediante terceros (Facebook o Google), también se recopilan
          datos adicionales como fecha de nacimiento y género.
        </p>
        <p className="pl-6 mt-4">
          <strong>b)</strong> Solicitudes de reserva: Es posible que le
          solicitemos datos como:
        </p>
        <ul className="list-disc pl-12 mt-2 space-y-2">
          <li>Fecha de nacimiento</li>
          <li>Nacionalidad</li>
          <li>Género</li>
          <li>DNI/Pasaporte</li>
          <li>Información académica o profesional</li>
          <li>Descripción personal (estilo de vida, preferencias de convivencia, etc.)</li>
        </ul>
        <p className="pl-6 mt-4">
          En caso de aprobación, será redirigido a Stripe.com para el pago,
          garantizando que HELLO FLAT MATE no tiene acceso a sus datos
          financieros.
        </p>
        <p className="pl-6 mt-4">
          <strong>c)</strong> Registro de propietarios: Recopilamos los
          siguientes datos:
        </p>
        <ul className="list-disc pl-12 mt-2 space-y-2">
          <li>Nombre, apellidos, correo electrónico y teléfono</li>
          <li>Dirección de la propiedad que desea anunciar</li>
          <li>Información bancaria para realizar pagos relacionados con las reservas</li>
          <li>Fotografías o vídeos de la propiedad para su anuncio</li>
        </ul>
        <p className="pl-6 mt-4">
          <strong>e)</strong> Acciones promocionales: Participación en
          promociones, concursos o sorteos puede requerir datos como nombre y
          correo electrónico.
        </p>
        <p className="pl-6 mt-4">
          <strong>f)</strong> Encuestas de satisfacción: Recopilamos nombre,
          edad, nacionalidad y nivel de satisfacción tras su estancia.
        </p>

        <h3 className="text-base font-semibold mt-4">
          2.2. Datos recopilados automáticamente
        </h3>
        <p className="pl-6 mt-2">
          <strong>a)</strong> Datos de registro mediante terceros: Si opta por
          registrarse con Facebook o Google, obtenemos datos como nombre,
          correo electrónico, fecha de nacimiento y género.
        </p>
        <p className="pl-6 mt-4">
          <strong>b)</strong> Datos técnicos: A través de herramientas como
          Google Analytics, recopilamos información técnica sobre su
          interacción, incluyendo:
        </p>
        <ul className="list-disc pl-12 mt-2 space-y-2">
          <li>Dirección IP</li>
          <li>Tipo de navegador y sistema operativo</li>
          <li>Ubicación aproximada</li>
          <li>Páginas visitadas, duración de la sesión y otros datos relacionados con la navegación</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">3. Finalidad del tratamiento</h2>
        <p className="pl-6 mt-4">
          HELLO FLAT MATE utiliza sus datos personales para los siguientes
          propósitos:
        </p>
        <ul className="list-disc pl-12 mt-2 space-y-2">
          <li>Gestionar la creación y uso de su cuenta como inquilino o propietario</li>
          <li>Permitirle realizar y gestionar reservas</li>
          <li>Facilitar pagos a través de plataformas seguras como Stripe</li>
          <li>Formalizar contratos de arrendamiento mediante firma digital</li>
          <li>Comunicarnos con usted en relación con solicitudes de reserva</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">4. Base legal del tratamiento de datos</h2>
        <p className="pl-6 mt-4">
          HELLO FLAT MATE trata sus datos bajo las siguientes bases legales:
          ejecución del contrato, interés legítimo y consentimiento explícito.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">5. Plazo de conservación de los datos</h2>
        <p className="pl-6 mt-4">
          Los datos serán conservados mientras sean necesarios para la prestación
          del servicio o hasta que solicite su eliminación, respetando las
          obligaciones legales.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">6. ¿Con quién compartimos sus datos?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Propietarios e inquilinos: Información básica necesaria para reservas y estancias.
          </li>
          <li>
            Proveedores de servicios: Terceros autorizados para procesar pagos y alojar datos.
          </li>
          <li>Autoridades competentes: Según lo requiera la ley.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">7. Ejercicio de sus derechos</h2>
        <p className="pl-6 mt-4">
          Puede ejercer sus derechos de acceso, rectificación, supresión, limitación,
          portabilidad y oposición escribiendo a{" "}
          <a href="mailto:rooms@helloflatmate.com" className="text-blue-600 hover:underline">
            rooms@helloflatmate.com
          </a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">8. Seguridad de los datos</h2>
        <p className="pl-6 mt-4">
          HELLO FLAT MATE implementa medidas avanzadas para proteger sus datos personales.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">9. Cambios en esta política</h2>
        <p className="pl-6 mt-4">
          Nos reservamos el derecho de modificar esta Política de Privacidad. En caso de
          cambios sustanciales, le notificaremos por correo electrónico o mediante un aviso
          en nuestra plataforma.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-6">
        © 2024 HELLO FLAT MATE, S.L. Todos los derechos reservados.
      </p>
    </main>
  );
};

export default PrivacyPolicy;

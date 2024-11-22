export default function PrivacyPolicy() {
    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-resolution-blue">Política de Privacidad</h1>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Derecho de Información</h2>
                <p>
                    A los efectos de lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR), relativo a la protección de las
                    personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos, y la Ley Orgánica
                    3/2018 de 5 de diciembre, de protección de datos de carácter personal y garantía de los derechos digitales (LOPDGDD), se informa
                    al usuario de la existencia de un tratamiento automatizado de datos de carácter personal creado por{" "}
                    <strong>HELLO FLAT MATE, S.L.</strong> y bajo su responsabilidad. Esto incluye los datos que nos pudiera facilitar durante la
                    navegación por nuestro sitio web, en el momento de su registro o al enviar un mensaje de correo electrónico.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Responsable del Tratamiento</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Denominación social:</strong> HELLO FLAT MATE, S.L.
                    </li>
                    <li>
                        <strong>CIF:</strong> B98358963
                    </li>
                    <li>
                        <strong>Domicilio social:</strong> C/ CAMPOAMOR 8, 1º, 46021 - VALENCIA (VALENCIA)
                    </li>
                    <li>
                        <strong>Teléfono:</strong> 601 158 261
                    </li>
                    <li>
                        <strong>Correo electrónico:</strong>{" "}
                        <a href="mailto:rooms@helloflatmate.com" className="text-blue-600 hover:underline">
                            rooms@helloflatmate.com
                        </a>
                    </li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Finalidad del Tratamiento</h2>
                <p>
                    De acuerdo con la legislación vigente, la finalidad del tratamiento de sus datos es la descrita en cada formulario de nuestra
                    página web en el que se faciliten datos personales.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Legitimación</h2>
                <p>
                    Según el artículo 6.1.a) del RGPD, el interesado dio su consentimiento para el tratamiento de sus datos personales para uno o
                    varios fines específicos.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Conservación y Tratamiento de los Datos</h2>
                <p>
                    Sus datos se conservarán durante el tiempo necesario para atender su solicitud, a menos que nos indique lo contrario ejerciendo su
                    derecho de supresión. También se conservarán durante el tiempo necesario para cumplir con las obligaciones legales. Los datos no
                    serán cedidos a terceros salvo en los casos de obligación legal.
                </p>
                <p>
                    <strong>HELLO FLAT MATE, S.L.</strong> no elaborará perfiles ni tomará decisiones automatizadas basadas en perfiles.
                </p>
                <p>
                    Además, se solicitará su consentimiento para comunicaciones publicitarias mediante correo electrónico u otros medios equivalentes.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Medidas Técnicas y Organizativas</h2>
                <p>
                    <strong>HELLO FLAT MATE, S.L.</strong> adopta medidas técnicas, controles y procedimientos destinados a preservar la integridad y
                    la seguridad de sus datos. Aunque estas medidas son fiables y efectivas, no se puede garantizar la seguridad absoluta debido a
                    posibles alteraciones por terceros. En caso de brechas de seguridad, investigaremos y notificaremos a las partes afectadas y a las
                    autoridades competentes.
                </p>
                <p>
                    Los contratos con proveedores incluyen cláusulas que garantizan la confidencialidad de los datos y la implementación de medidas de
                    seguridad.
                </p>
            </section>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">Derechos del Usuario</h2>
                <p>
                    El usuario puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad de
                    datos y a no ser objeto de decisiones individualizadas automatizadas, dirigiéndose al responsable del tratamiento mediante:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Correo postal:</strong> C/ CAMPOAMOR 8, 1º, 46021 - VALENCIA (VALENCIA)
                    </li>
                    <li>
                        <strong>Correo electrónico:</strong>{" "}
                        <a href="mailto:rooms@helloflatmate.com" className="text-blue-600 hover:underline">
                            rooms@helloflatmate.com
                        </a>
                    </li>
                </ul>
                <p>
                    Adjunte una copia de su DNI o documento equivalente. Si no queda satisfecho, puede presentar una reclamación ante la Agencia
                    Española de Protección de Datos en{" "}
                    <a
                        href="https://sedeagpd.gob.es/sede-electronica-web/vistas/formNuevaReclamacion/reclamacion.jsf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        su página oficial
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}

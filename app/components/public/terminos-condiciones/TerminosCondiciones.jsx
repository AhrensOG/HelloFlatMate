import HTMLReactParser from "html-react-parser";
import { useTranslations } from "next-intl";

export default function TerminosCondiciones() {
    const t = useTranslations("terms");
    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-resolution-blue">{t("title")}</h1>
            <section className="mb-6">
                <h2 className="text-lg font-semibold">{HTMLReactParser(t("sect_1_h2"))}</h2>
                <p>{HTMLReactParser(t("sect_1_p"))}</p>
            </section>
            <section className="mb-6">
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t("sect_2_ul_li_1")}</li>
                    <li>{t("sect_2_ul_li_2")}</li>
                    <li>{t("sect_2_ul_li_3")}</li>
                    <li>{t("sect_2_ul_li_4")}</li>
                    <li>{t("sect_2_ul_li_5")}</li>
                    <li>{t("sect_2_ul_li_6")}</li>
                    <li>{t("sect_2_ul_li_7")}</li>
                </ul>
            </section>
            <section className="mb-6">
                <p>{HTMLReactParser(t("sect_3_p"))}</p>
            </section>
            <section className="mb-6">
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t("sect_4_ul_li_1")}</li>
                    <li>{t("sect_4_ul_li_2")}</li>
                    <li>{t("sect_4_ul_li_3")}</li>
                </ul>
            </section>
            {/* <section className="mb-6">
        <h2 className="text-lg font-semibold">Legitimación</h2>
        <p>
          Según el artículo 6.1.a) del RGPD, el interesado dio su consentimiento
          para el tratamiento de sus datos personales para uno o varios fines
          específicos.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold">
          Conservación y Tratamiento de los Datos
        </h2>
        <p>
          Sus datos se conservarán durante el tiempo necesario para atender su
          solicitud, a menos que nos indique lo contrario ejerciendo su derecho
          de supresión. También se conservarán durante el tiempo necesario para
          cumplir con las obligaciones legales. Los datos no serán cedidos a
          terceros salvo en los casos de obligación legal.
        </p>
        <p>
          <strong>HELLO FLAT MATE, S.L.</strong> no elaborará perfiles ni tomará
          decisiones automatizadas basadas en perfiles.
        </p>
        <p>
          Además, se solicitará su consentimiento para comunicaciones
          publicitarias mediante correo electrónico u otros medios equivalentes.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold">
          Medidas Técnicas y Organizativas
        </h2>
        <p>
          <strong>HELLO FLAT MATE, S.L.</strong> adopta medidas técnicas,
          controles y procedimientos destinados a preservar la integridad y la
          seguridad de sus datos. Aunque estas medidas son fiables y efectivas,
          no se puede garantizar la seguridad absoluta debido a posibles
          alteraciones por terceros. En caso de brechas de seguridad,
          investigaremos y notificaremos a las partes afectadas y a las
          autoridades competentes.
        </p>
        <p>
          Los contratos con proveedores incluyen cláusulas que garantizan la
          confidencialidad de los datos y la implementación de medidas de
          seguridad.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold">Derechos del Usuario</h2>
        <p>
          El usuario puede ejercer los derechos de acceso, rectificación,
          supresión, oposición, limitación del tratamiento, portabilidad de
          datos y a no ser objeto de decisiones individualizadas automatizadas,
          dirigiéndose al responsable del tratamiento mediante:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Correo postal:</strong> C/ CAMPOAMOR 8, 1º, 46021 - VALENCIA
            (VALENCIA)
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
        <p>
          Adjunte una copia de su DNI o documento equivalente. Si no queda
          satisfecho, puede presentar una reclamación ante la Agencia Española
          de Protección de Datos en{" "}
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
      </section> */}
        </main>
    );
}

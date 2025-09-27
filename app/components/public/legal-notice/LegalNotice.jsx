import { useTranslations } from "next-intl";
import React from "react";

const LegalNotice = () => {
  const t = useTranslations("legal_notice");

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-resolution-blue">
        {t("title")}
      </h1>

      {/* Datos de la entidad */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_1_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_1_p_1")}</p>
        <ul className="list-disc pl-12 mt-2 space-y-2">
          <li>{t("sect_1_ul_li_1")}</li>
          <li>{t("sect_1_ul_li_2")}</li>
          <li>{t("sect_1_ul_li_3")}</li>
          <li>{t("sect_1_ul_li_4")}</li>
          <li>{t("sect_1_ul_li_5")}</li>
          <li>{t("sect_1_ul_li_6")}</li>
        </ul>
        <p className="pl-6 mt-4">{t("sect_1_p_2")}</p>
      </section>

      {/* Condiciones de acceso y utilización */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_2_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_2_p_1")}</p>
        <p className="pl-6 mt-4">{t("sect_2_p_2")}</p>
        <p className="pl-6 mt-4">{t("sect_2_p_3")}</p>
        <p className="pl-6 mt-4">{t("sect_2_p_4")}</p>
        <p className="pl-6 mt-4">{t("sect_2_p_5")}</p>
        <p className="pl-6 mt-4">{t("sect_2_p_6")}</p>
      </section>

      {/* Política de enlaces */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_3_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_3_p_1")}</p>
        <p className="pl-6 mt-4">{t("sect_3_p_2")}</p>
        <p className="pl-6 mt-4">{t("sect_3_p_3")}</p>
      </section>

      {/* Uso de cookies */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_4_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_4_p_1")}</p>
        <p className="pl-6 mt-4">{t("sect_4_p_2")}</p>
      </section>

      {/* Protección de datos */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_5_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_5_p")}</p>
      </section>

      {/* Resolución de controversias */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">{t("sect_6_h2")}</h2>
        <p className="pl-6 mt-4">{t("sect_6_p_1")}</p>
        <p className="pl-6 mt-4">{t("sect_6_p_2")}</p>
        <p className="pl-6 mt-4">{t("sect_6_p_3")}</p>
      </section>
    </main>
  );
};

export default LegalNotice;

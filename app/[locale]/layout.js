import "../globals.css";
import { montserrat } from "@/font";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientWrapper from "../components/ClientWrapper";
import GlobalContext from "../context/GlobalContext";
import Script from "next/script";
import Head from "next/head";

export const metadata = {
  title: "helloflatmate",
  description:
    "Especializados en gestión de alojamientos para estudiantes en Valencia.",
};

export default async function RootLayout({ children, params: { locale } }) {
  // Verificar si el `locale` es válido
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  if (typeof window === "undefined") {
    require("../../utils/cron");
  }

  // Obtener mensajes de traducción
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <Head>
        {/* Google Tag Manager */}
        {/* <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TSK9NKT');`,
          }}
        /> */}
        {/* End Google Tag Manager */}
      </Head>
      <body className={`${montserrat.className}`}>
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSK9NKT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript> */}

        <GlobalContext>
          <ClientWrapper locale={locale} messages={messages}>
            {children}
          </ClientWrapper>
        </GlobalContext>
      </body>
    </html>
  );
}

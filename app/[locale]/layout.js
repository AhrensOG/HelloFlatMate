import "../globals.css";
import { montserrat } from "@/font";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientWrapper from "../components/ClientWrapper";
import GlobalContext from "../context/GlobalContext";

export default async function RootLayout({ children, params: { locale } }) {
    // Verificar si el `locale` es válido
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    // Obtener mensajes de traducción
    const messages = await getMessages(locale);

    return (
        <html lang={locale}>
            <body className={`${montserrat.className}`}>
                <GlobalContext>
                    <ClientWrapper locale={locale} messages={messages}>
                        {children}
                    </ClientWrapper>
                </GlobalContext>
            </body>
        </html>
    );
}

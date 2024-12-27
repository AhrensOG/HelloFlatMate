"use client";

import { NextIntlClientProvider } from "next-intl";
import GlobalContext from "../context/GlobalContext";
import { Toaster } from "sonner";

export default function ClientWrapper({ children, locale, messages }) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Madrid">
            <GlobalContext>
                {console.log(locale)}
                {children}
                <Toaster richColors={true} duration={3000} />
            </GlobalContext>
        </NextIntlClientProvider>
    );
}

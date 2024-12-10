import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(`Locale: ${locale}, Messages:`, messages.home.home_h3); // <-- Agrega este log
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
        timeZone: "Europe/Madrid",
    };
});

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Función para decodificar el token
function decodeToken(encodedToken) {
    try {
        const decodedPayload = Buffer.from(encodedToken, "base64").toString("utf-8");
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export async function middleware(request) {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    //tomar el lenguage de las cookies
    const preferredLocale = request.cookies.get("preferred_locale")?.value || "es"; // Valor por defecto: 'es'

    //Configuración de locales
    const supportedLocales = ["es", "en"];
    const url = new URL(request.url);
    const pathName = url.pathname;

    // Rutas públicas
    const allowedPaths = [
        "/",
        "/helloroom",
        "/hellostudio",
        "/hellocoliving",
        "/hellolandlord",
        "/lastrooms",
        "/pages/guest",
        "/faq",
        "/cookies",
        "/privacy-policy",
        "/clausulas",
        "/terminos-y-condiciones",
        "/clausulas",
        "/terminos-y-condiciones",
        "/como-funciona",
        "/colaboradores",
        "/colaboradores",
        "/sobre-nosotros",
    ];

    // Rutas públicas de la API
    const publicApiPaths = ["/api/auth", "/api/stripe/webhook", "/api/payment", "/api/property"];

    // Ignorar rutas de API públicas y estáticas
    if (
        publicApiPaths.includes(pathName) ||
        pathName.startsWith("/_next/") ||
        pathName.startsWith("/static/") ||
        pathName.startsWith("/public/") ||
        pathName.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map|mp4|woff|woff2|ttf|otf|eot|txt)$/)
    ) {
        return NextResponse.next();
    }

    // Capturar el locale desde la URL
    const segments = pathName.split("/");
    let locale = segments[1]; // Detectar el primer segmento como `locale`

    // Validar y redirigir si el `locale` no es válido
    if (!supportedLocales.includes(locale)) {
        // Redirigir a la ruta con el locale preferido
        const redirectUrl = new URL(`/${preferredLocale}${pathName}`, request.url);
        console.log(`Redirigiendo a: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    // Configurar el locale en las cabeceras para que `getRequestConfig` lo reciba
    const response = NextResponse.next();
    response.headers.set("x-next-intl-locale", locale); // Asegúrate de usar el nombre correcto del encabezado

    // Verificar si estamos en una ruta pública (con locale)
    if (supportedLocales.includes(locale)) {
        const pathWithoutLocale = `/${segments.slice(2).join("/")}`; // Eliminar el `locale` del path
        const isAllowedPath = allowedPaths.some((allowedPath) => pathWithoutLocale.startsWith(allowedPath));

        if (isAllowedPath) {
            console.log(`Ruta pública permitida: ${pathName}`);
            return response; // Permitir acceso sin token a rutas públicas
        }
    }

    // Redirigir al login si no hay token y la ruta no es pública
    if (!token) {
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        if (!url.searchParams.has("redirect")) {
            redirectUrl.searchParams.set("redirect", request.url);
        }
        console.log(`Redirigiendo al login: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    // Verificar el token y los permisos para rutas protegidas
    const decodedToken = decodeToken(token);

    if (!decodedToken) {
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        if (!url.searchParams.has("redirect")) {
            redirectUrl.searchParams.set("redirect", request.url);
        }
        console.log(`Token inválido. Redirigiendo al login: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    const { role } = decodedToken;

    const rolesPaths = {
        ADMIN: [
            `/${locale}/pages/worker-panel`,
            `/${locale}/pages/admin`,
            `/${locale}/pages/user`,
            `/${locale}/pages/owner`,
            `/${locale}/pages/home`,
        ],
        OWNER: [`/${locale}/pages/worker-panel`, `/${locale}/pages/owner`, `/${locale}/pages/user`, `/${locale}/pages/home`],
        WORKER: [`/${locale}/pages/worker-panel`, `/${locale}/pages/user`],
        CLIENT: [`/${locale}/pages/user`, `/${locale}/pages/home`],
    };

    const allowedRolesPaths = rolesPaths[role] || [];
    const hasAccess = allowedRolesPaths.some((allowedPath) => pathname.startsWith(allowedPath));

    if (!hasAccess && pathName !== `/${locale}/`) {
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        if (!url.searchParams.has("redirect")) {
            redirectUrl.searchParams.set("redirect", request.url);
        }
        console.log(`Acceso denegado. Redirigiendo al login: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

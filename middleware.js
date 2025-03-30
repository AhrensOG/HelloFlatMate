import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// import crypto from "crypto";
// import validateHMACToken from "./app/libs/lib";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

// Configuración
const supportedLocales = ["es", "en"];
const publicApiPaths = [
    "/api/auth",
    "/api/stripe/webhook",
    "/api/payment",
    "/api/property",
    "/api/maps/geocoding",
    "/api/redsys/checkout",
    "/api/redsys/webhook",
    "/api/cron",
    "/api/notification",
];

const publicPaths = [
    "/",
    "/alquiler-habitaciones-valencia",
    "/hellostudio",
    "/coliving-valencia",
    "/hellolandlord",
    "/ultimas-habitaciones",
    "/faq",
    "/cookies",
    "/privacy-policy",
    "/clausulas",
    "/terminos-y-condiciones",
    "/como-funciona",
    "/colaboradores",
    "/sobre-nosotros",
    "/contacto",
    "/pages/auth",
    "/pages/property-details",
];

// Roles y accesos permitidos
const rolesPaths = {
    ADMIN: ["/pages/worker-panel", "/pages/admin", "/pages/users", "/pages/owner", "/pages/home", "/api/admin", "/api", "/pages"],
    OWNER: ["/pages/worker-panel", "/pages/owner", "/pages/user", "/pages/home", "/api"],
    WORKER: ["/pages/worker-panel", "/pages/user", "/api"],
    CLIENT: ["/pages/user", "/pages/home", "/api"],
};

export async function middleware(request) {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    const preferredLocale = request.cookies.get("preferred_locale")?.value || "es";

    const { pathname, search } = new URL(request.url);
    const segments = pathname.split("/");
    let locale = segments[1];

    // Ignorar recursos estáticos
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/static/") ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map|mp4|woff|woff2|ttf|otf|eot|txt)$/)
    ) {
        return NextResponse.next();
    }

    // ✅ Internacionalización: Verificar si el locale es válido
    if (!supportedLocales.includes(locale)) {
        console.log(`🛑 Locale inválido. Redirigiendo a: /${preferredLocale}${pathname}${search}`);
        return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}${search}`, request.url));
    }

    const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

    // // ✅ Verificaion de token para cron
    // if (pathWithoutLocale.startsWith("/api/cron")) {
    //     console.log(`🔒 Verificando token para ruta cron: ${pathname}`);

    //     const cronToken = cookieStore.get("x-cron-token")?.value;
    //     console.log(cronToken)
    //     const secretKey = process.env.SECRET_KEY_CRON;
    //     const secretPassword = process.env.SECRET_PASSWORD_CRON;

    //     if (!cronToken || !secretKey || !secretPassword) {
    //         console.log(`🔒 Parametros no encontrado.`);
    //         return NextResponse.json({ error: "Unauthorized: Missing token or keys" }, { status: 401 });
    //     }

    //     if (!validateHMACToken(cronToken, secretPassword, secretKey)) {
    //         console.log(`🔒 Token inválido`);
    //         return NextResponse.json({ error: "Unauthorized: Invalid Token" }, { status: 401 });
    //     }
    //     console.log(`✅ Acceso permitido a ruta cron: ${pathname}`);

    //     return NextResponse.next();
    // }

    // ✅ Rutas públicas
    const isPublicApi = publicApiPaths.includes(pathname);
    const isPublicPage = publicPaths.some((publicPath) => pathWithoutLocale.startsWith(publicPath));

    if (isPublicApi || isPublicPage || pathname === `/${locale}/pages/auth`) {
        console.log(`✅ Acceso permitido a ruta pública: ${pathname}${search}`);
        const response = NextResponse.next();
        response.headers.set("x-next-intl-locale", locale);
        return response;
    }

    // ✅ Autenticación
    if (!token) {
        console.log(`🔒 Token no encontrado. Redirigiendo al login.`);
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        redirectUrl.searchParams.set("redirect", `${encodeURIComponent(BASE_URL + pathname + search)}`);
        return NextResponse.redirect(redirectUrl);
    }

    const decodedToken = decodeToken(token);
    if (!decodedToken) {
        console.log(`🔒 Token inválido. Redirigiendo al login.`);
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        redirectUrl.searchParams.set("redirect", `${encodeURIComponent(BASE_URL + pathname + search)}`);
        return NextResponse.redirect(redirectUrl);
    }

    // ✅ Autorización por roles
    const { role } = decodedToken;

    // Validar si la ruta es de ADMIN
    console.log(pathname);

    if (pathname.startsWith("/api/admin")) {
        console.log(role);
        if (role !== "ADMIN") {
            console.log(`🔒 Acceso denegado. Ruta /api/admin reservada para ADMIN.`);
            const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
            redirectUrl.searchParams.set("redirect", `${encodeURIComponent(BASE_URL + pathname + search)}`);
            return NextResponse.redirect(redirectUrl);
        }
    }

    const allowedRolesPaths = rolesPaths[role] || [];
    const hasAccess = allowedRolesPaths.some((allowedPath) => pathWithoutLocale.startsWith(allowedPath));

    if (!hasAccess) {
        console.log(`🔒 Acceso denegado para el rol ${role}.`);
        const redirectUrl = new URL(`/${locale}/pages/auth`, request.url);
        redirectUrl.searchParams.set("redirect", `${encodeURIComponent(BASE_URL + pathname + search)}`);
        return NextResponse.redirect(redirectUrl);
    }

    console.log(`✅ Acceso permitido para el rol ${role}: ${pathname}`);
    const response = NextResponse.next();
    response.headers.set("x-next-intl-locale", locale);
    return response;
}

// Aplicar el middleware a todas las rutas
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

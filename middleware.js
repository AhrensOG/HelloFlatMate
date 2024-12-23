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

    const preferredLocale = request.cookies.get("preferred_locale")?.value || "es";
    const supportedLocales = ["es", "en"];

    const url = new URL(request.url);
    const pathName = url.pathname;

    // ✅ Ignorar recursos estáticos y archivos especiales
    if (
        pathName.startsWith("/_next/") || // Archivos internos de Next.js
        pathName.startsWith("/static/") || // Recursos estáticos
        pathName.startsWith("/public/") || // Carpeta public
        pathName.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map|mp4|woff|woff2|ttf|otf|eot|txt)$/) // Archivos estáticos
    ) {
        console.log(`🛑 Ignorando recurso estático: ${pathName}`);
        return NextResponse.next();
    }

    // ✅ Rutas públicas de la API (sin autenticación)
    const publicApiPaths = [
        "/api/auth",
        "/api/stripe/webhook",
        "/api/payment",
        "/api/property",
        "/api/maps/geocoding",
        "/api/redsys",
        "/api/redsys/notify",
    ];

    if (publicApiPaths.includes(pathName)) {
        console.log(`🛑 Ruta API pública permitida: ${pathName}`);
        const response = NextResponse.next();
        response.headers.set("x-next-intl-locale", preferredLocale);
        return response;
    }

    // ✅ Rutas de API protegidas
    if (pathName.startsWith("/api")) {
        if (!token) {
            console.log(`🔒 Token no encontrado para API protegida. Redirigiendo al login.`);
            return NextResponse.redirect(new URL(`/${preferredLocale}/pages/auth?redirect=${encodeURIComponent(pathName)}`, request.url));
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken) {
            console.log(`🔒 Token inválido para API protegida. Redirigiendo al login.`);
            return NextResponse.redirect(new URL(`/${preferredLocale}/pages/auth?redirect=${encodeURIComponent(pathName)}`, request.url));
        }

        const { role } = decodedToken;
        console.log("🔑 API Role:", role);

        const rolesPaths = {
            ADMIN: ["/api/admin", "/api"],
            OWNER: ["/api"],
            WORKER: ["/api"],
            CLIENT: ["/api"],
        };

        const allowedRolesPaths = rolesPaths[role] || [];
        const hasAccess = allowedRolesPaths.some((allowedPath) => pathName.startsWith(allowedPath));

        console.log("🔑 API HasAccess:", hasAccess);

        if (!hasAccess) {
            console.log(`🔒 Acceso denegado para API protegida. Redirigiendo al login.`);
            return NextResponse.redirect(new URL(`/${preferredLocale}/pages/auth?redirect=${encodeURIComponent(pathName)}`, request.url));
        }

        const response = NextResponse.next();
        response.headers.set("x-next-intl-locale", preferredLocale);
        return response;
    }

    // ✅ Manejo de rutas de páginas
    const segments = pathName.split("/");
    let locale = segments[1];

    // ✅ Redirigir si el locale no es válido o no está presente
    if (!supportedLocales.includes(locale)) {
        console.log(`🛑 Locale no válido o ausente. Redirigiendo a: /${preferredLocale}${pathName}`);
        return NextResponse.redirect(new URL(`/${preferredLocale}${pathName}`, request.url));
    }

    const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

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
        "/como-funciona",
        "/colaboradores",
        "/sobre-nosotros",
        "/pages/auth",
    ];

    if (pathName === `/${locale}/pages/auth`) {
        const response = NextResponse.next();
        response.headers.set("x-next-intl-locale", locale);
        return response;
    }

    console.log(`📄 Ruta actual: ${pathName}`);

    const isPublicPath = allowedPaths.includes(pathWithoutLocale);

    if (isPublicPath) {
        console.log(`✅ Ruta pública permitida: ${pathName}`);
        const response = NextResponse.next();
        response.headers.set("x-next-intl-locale", locale);
        return response;
    }

    if (!token) {
        const redirectUrl = new URL(`/${locale}/pages/auth?redirect=${encodeURIComponent(pathName)}`, request.url);
        console.log(`🔒 Token no encontrado. Redirigiendo al login: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    const decodedToken = decodeToken(token);

    if (!decodedToken) {
        const redirectUrl = new URL(`/${locale}/pages/auth?redirect=${encodeURIComponent(pathName)}`, request.url);
        console.log(`🔒 Token inválido. Redirigiendo al login: ${redirectUrl.href}`);
        return NextResponse.redirect(redirectUrl);
    }

    const { role } = decodedToken;

    const rolesPaths = {
        ADMIN: ["/pages/worker-panel", "/pages/admin", "/pages/users", "/pages/owner", "/pages/home", "/pages/select-category"],
        OWNER: ["/pages/worker-panel", "/pages/owner", "/pages/user", "/pages/home"],
        WORKER: ["/pages/worker-panel", "/pages/user"],
        CLIENT: ["/pages/user", "/pages/home"],
    };

    const allowedRolesPaths = rolesPaths[role] || [];
    const hasAccess = allowedRolesPaths.some((allowedPath) => pathWithoutLocale.startsWith(allowedPath));

    console.log("🔑 Role:", role);
    console.log("🔑 HasAccess:", hasAccess);

    const response = NextResponse.next();
    response.headers.set("x-next-intl-locale", locale);

    console.log(`✅ Acceso permitido para el rol ${role}: ${pathName}`);
    return response;
}

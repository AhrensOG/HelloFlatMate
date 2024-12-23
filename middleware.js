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
    const cookieStore = cookies(); // Usa cookies() para acceder a las cookies
    const token = cookieStore.get("auth_token")?.value; // Obtén el valor de la cookie

    const allowedPaths = [
        "/",
        "/helloroom",
        "/hellostudio",
        "/hellocoliving",
        "/hellolandlord",
        "/lastrooms",
        "/pages/auth",
        "/pages/guest",
        "/api/auth",
        "/api/stripe/webhook",
        "/api/payment",
        "/api/property",
        "/pages/select-category",
        "/pages/user/filtered",
        "/faq",
        "/cookies",
        "/privacy-policy",
        "/clausulas",
        "/terminos-y-condiciones",
        "/como-funciona",
        "/colaboradores",
        "/sobre-nosotros",
        "/api/maps/geocoding",
        "/contacto",
        "/contacto/gracias",
        "/redsys",
        "/api/redsys/checkout",
        "/api/redsys/webhook",
    ];

    const dynamicPaths = [
        /^\/pages\/property-details\/\w+$/, // Coincide con /pages/property-details/[propertyId]
        /^\/pages\/property-details\/\w+\/room-details\/\w+$/, // Coincide con /pages/property-details/[propertyId]/room-details/[roomId]
    ];

    const { pathname, search } = new URL(request.url);

    if (allowedPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const isDynamicAllowed = dynamicPaths.some((regex) => regex.test(pathname));
    if (isDynamicAllowed) {
        return NextResponse.next();
    }

    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/static/") ||
        pathname.startsWith("/public/") ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map|mp4)$/)
    ) {
        return NextResponse.next();
    }

    if (!token) {
        const redirectPath = `${pathname}${search}`;
        const redirectUrl = new URL(
            `/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + redirectPath)}`,
            request.url
        );
        return NextResponse.redirect(redirectUrl);
    }

    const decodedToken = decodeToken(token);

    if (!decodedToken) {
        const redirectPath = `${pathname}${search}`;
        const redirectUrl = new URL(
            `/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + redirectPath)}`,
            request.url
        );
        return NextResponse.redirect(redirectUrl);
    }

    const { role } = decodedToken;

    const rolesPaths = {
        ADMIN: ["/pages/worker-panel", "/pages/admin", "/pages/user", "/pages/owner", "/pages/home", "/pages/select-category", "/api/admin", "/api"],
        OWNER: ["/pages/worker-panel", "/pages/owner", "/pages/user", "/pages/home", "/pages/select-category", "/api"],
        WORKER: ["/pages/worker-panel", "/api", "/pages/user"],
        CLIENT: ["/pages/user", "/pages/home", "/api"],
    };

    const allowedRolesPaths = rolesPaths[role] || [];
    const hasAccess = allowedRolesPaths.some((allowedPath) => pathname.startsWith(allowedPath));

    if (!hasAccess && pathname !== "/") {
        const redirectPath = `${pathname}${search}`;
        const redirectUrl = new URL(
            `/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + redirectPath)}`,
            request.url
        );
        return NextResponse.redirect(redirectUrl);
    }

    if (!role) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

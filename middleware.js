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
        "/como-funciona",
    ];

    const dynamicPaths = [
        /^\/pages\/property-details\/\w+$/, // Coincide con /pages/property-details/[propertyId]
        /^\/pages\/property-details\/\w+\/room-details\/\w+$/, // Coincide con /pages/property-details/[propertyId]/room-details/[roomId]
    ];

    const pathName = new URL(request.url).pathname;

    if (allowedPaths.includes(pathName)) {
        return NextResponse.next();
    }

    const isDynamicAllowed = dynamicPaths.some((regex) => regex.test(pathName));
    if (isDynamicAllowed) {
        return NextResponse.next();
    }

    if (
        pathName.startsWith("/_next/") ||
        pathName.startsWith("/static/") ||
        pathName.startsWith("/public/") ||
        pathName.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map)$/)
    ) {
        return NextResponse.next();
    }

    if (!token) {
        const redirectUrl = new URL(`/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + "/" + pathName)}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    const decodedToken = decodeToken(token);

    if (!decodedToken) {
        const redirectUrl = new URL(`/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + "/" + pathName)}`, request.url);
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
    const hasAccess = allowedRolesPaths.some((allowedPath) => pathName.startsWith(allowedPath));

    if (!hasAccess && pathName !== "/") {
        const redirectUrl = new URL(`/pages/auth?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + "/" + pathName)}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (!role) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Función para decodificar el token
function decodeToken(encodedToken) {
  try {
    const decodedPayload = Buffer.from(encodedToken, "base64").toString(
      "utf-8"
    );
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
    "/pages/auth",
    "/pages/guest",
    "/api/auth",
    "/api/stripe/webhook",
    "/api/payment",
  ];
  const pathName = new URL(request.url).pathname;

  // Permitir acceso a rutas permitidas sin autenticación
  if (allowedPaths.includes(pathName)) {
    return NextResponse.next();
  }

  // Permitir acceso a recursos estáticos (imágenes, archivos, etc.)
  if (
    pathName.startsWith("/_next/") ||
    pathName.startsWith("/static/") ||
    pathName.startsWith("/public/") ||
    pathName.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // Redirigir si el token no está presente o no es válido
  if (!token) {
    const redirectUrl = new URL(
      `/pages/auth?redirect=${encodeURIComponent(request.url)}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Decodificar el token para obtener el role y el accessToken
  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    const redirectUrl = new URL(
      `/pages/auth?redirect=${encodeURIComponent(request.url)}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  const { role } = decodedToken;

  const rolesPaths = {
    ADMIN: [
      "/pages/worker-panel",
      "/pages/admin",
      "/pages/user",
      "/pages/owner",
      "/pages/home",
      "/pages/select-category",
      "/api/admin",
      "/api",
    ],
    OWNER: [
      "/pages/owner",
      "/pages/user",
      "/pages/home",
      "/pages/select-category",
      "/api",
    ],
    CLIENT: ["/pages/user", "/pages/home", "/pages/select-category", "/api"],
  };

  const allowedRolesPaths = rolesPaths[role] || [];
  const hasAccess = allowedRolesPaths.some((allowedPath) =>
    pathName.startsWith(allowedPath)
  );

  if (!hasAccess && pathName !== "/") {
    const redirectUrl = new URL(
      `/pages/auth?redirect=${encodeURIComponent(request.url)}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (!role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

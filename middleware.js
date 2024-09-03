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

  // Define rutas permitidas sin autenticación
  const allowedPaths = ["/pages/auth", "/pages/guest", "/api/auth", "/api/stripe/webhook"];
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
    pathName.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|map)$/) // Permite acceso a archivos estáticos comunes
  ) {
    return NextResponse.next();
  }

  // Redirigir si el token no está presente o no es válido
  if (!token) {
    return NextResponse.redirect(new URL("/pages/auth", request.url));
  }

  // Decodificar el token para obtener el role y el accessToken
  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    // Si el token no se puede decodificar, redirige al usuario a la página de autenticación
    return NextResponse.redirect(new URL("/pages/auth", request.url));
  }

  const { role } = decodedToken;

  console.log("Role:", role);
  // console.log("Access Token:", accessToken);

  const rolesPaths = {
    ADMIN: ["/pages/admin", "/pages/user", "/pages/owner", "/api/admin", "/api"],
    OWNER: ["/pages/owner", "/pages/user", "/api"],
    CLIENT: ["/pages/user", "/api"],
  }

  // Verificar si el rol tiene acceso a la ruta solicitada
  const allowedRolesPaths = rolesPaths[role] || [];

  const hasAccess = allowedRolesPaths.some(allowedPath => pathName.startsWith(allowedPath));

  // Si el rol no tiene acceso a la ruta solicitada y no es la página de inicio
  if (!hasAccess && pathName !== "/") {
    // Redirige al usuario a la página de autenticación
    return NextResponse.redirect(new URL("/pages/auth", request.url));
  }

  // Si no hay rol y el usuario intenta acceder a la página de inicio, redirige a /pages/guest
  if (!role && pathName === "/") {
    return NextResponse.redirect(new URL("/pages/guest", request.url));
  }

  // Continuar si el token está presente y es válido
  return NextResponse.next();
}

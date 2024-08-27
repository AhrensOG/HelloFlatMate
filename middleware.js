import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Importa cookies desde next/headers

export async function middleware(request) {
    const cookieStore = cookies(); // Usa cookies() para acceder a las cookies
    const token = cookieStore.get('auth_token')?.value; // Obtén el valor de la cookie

    console.log('Token:', token);

    // Define rutas permitidas sin autenticación
    const allowedPaths = ['/', '/pages/auth']; // Asegúrate de que las rutas estén correctas
    const pathName = new URL(request.url).pathname;

    // Permitir acceso a rutas permitidas
    if (allowedPaths.includes(pathName)) {
        return NextResponse.next();
    }

    // Permitir acceso a recursos estáticos (imágenes, archivos, etc.)
    if (pathName.startsWith('/_next/') || pathName.startsWith('/static/') || pathName.startsWith('/public/')) {
        return NextResponse.next();
    }

    // Redirigir si el token no está presente o no es válido
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Continuar si el token está presente
    return NextResponse.next();
}

const crypto = require("crypto");
require("dotenv").config({ path: "./.env.local" });

function encodedToken() {
    const secretKey = process.env.SECRET_KEY_CRON;
    const secretPassword = process.env.SECRET_PASSWORD_CRON;

    if (!secretKey || !secretPassword) {
        console.error("❌ SECRET_KEY_CRON o SECRET_PASSWORD_CRON no están definidas.");
        process.exit(1);
    }

    // Crear hash HMAC con la contraseña
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(secretPassword);
    const hash = hmac.digest("hex");

    // console.log("🔑 Hash generado:", hash);

    // Formatear el token
    const token = Buffer.from(`${secretPassword}:${hash}`).toString("base64");
    // console.log("✅ Token generado:", token);

    return token;
}

// Mostrar el token en consola
encodedToken();

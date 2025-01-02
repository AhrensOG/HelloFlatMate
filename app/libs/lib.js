const crypto = require("crypto");

// Función para validar el token HMAC
const validateHMACToken = (token, password, secretKey) => {
    try {
        console.log("🔑 Decodificando token cron");

        // Decodificar el token en Base64
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        console.log("📝 Token decodificado:", decoded);

        const [receivedPassword, hash] = decoded.split(":");

        console.log("🔑 Password recibida:", receivedPassword);
        console.log("🔑 Hash recibido:", hash);

        // Validar que el password coincide
        if (receivedPassword !== password) {
            console.warn("❌ Las contraseñas no coinciden.");
            return false;
        }

        // Generar un nuevo hash con la clave secreta
        const hmac = crypto.createHmac("sha256", secretKey);
        hmac.update(password);
        const expectedHash = hmac.digest("hex");

        console.log("🔑 Hash esperado:", expectedHash);

        // Comparar hashes
        return hash === expectedHash;
    } catch (error) {
        console.error("❌ Error al validar el token:", error.message);
        return false;
    }
};

// Exportar la función
module.exports = validateHMACToken;

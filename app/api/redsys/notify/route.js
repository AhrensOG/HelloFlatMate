import crypto from "crypto";
import { NextResponse } from "next/server";

const generateSignature = (secretKey, params) => {
    const key = crypto.createHash("sha256").update(secretKey, "utf-8").digest();
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(params);
    return hmac.digest("base64");
};

const decodeParams = (params) => {
    const jsonParams = Buffer.from(params, "base64").toString("utf-8");
    return JSON.parse(jsonParams);
};

export async function POST(req) {
    console.log("🔑 Recibiendo notificación de RedSys...");

    try {
        const body = await req.text();
        const notificationParams = new URLSearchParams(body);
        const encodedParams = notificationParams.get("Ds_MerchantParameters");
        const receivedSignature = notificationParams.get("Ds_Signature");

        if (!encodedParams || !receivedSignature) {
            console.error("❌ Parámetros de notificación incompletos");
            return NextResponse.json({ error: "Parámetros incompletos" }, { status: 400 });
        }

        const expectedSignature = generateSignature(process.env.REDSYS_SECRET_KEY, encodedParams);

        if (receivedSignature !== expectedSignature) {
            console.error("❌ Firma de notificación inválida");
            return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
        }

        const decodedParams = decodeParams(encodedParams);
        console.log("✅ Notificación recibida de RedSys:", decodedParams);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ Error en la notificación de RedSys:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

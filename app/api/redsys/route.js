import crypto from "crypto";
import { NextResponse } from "next/server";

// 🔑 Generar Firma HMAC-SHA256
const generateSignature = (secretKey, params) => {
    const key = crypto.createHash("sha256").update(secretKey, "utf-8").digest();
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(params);
    return hmac.digest("base64");
};

// 🔒 Codificar Parámetros en Base64
const encodeParams = (params) => {
    const jsonParams = JSON.stringify(params);
    return Buffer.from(jsonParams).toString("base64");
};

export async function POST(req) {
    try {
        const paymentParams = {
            DS_MERCHANT_AMOUNT: "400", // En céntimos (4.00€)
            DS_MERCHANT_ORDER: "2255", // Número único de pedido
            DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE,
            DS_MERCHANT_CURRENCY: "978", // Euro
            DS_MERCHANT_TRANSACTIONTYPE: "0", // Compra normal
            DS_MERCHANT_TERMINAL: process.env.REDSYS_MERCHANT_TERMINAL,
            DS_MERCHANT_MERCHANTURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redsys/notify`,
            DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/success/2`,
            DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_BASE_URL}/pages/user/cancel/2`,
            DS_MERCHANT_PRODUCTDESCRIPTION: "Pago de prueba",
        };

        console.log("✅ Parámetros enviados a RedSys:", paymentParams);

        // Codificar parámetros
        const encodedParams = encodeParams(paymentParams);
        console.log("✅ Parámetros codificados (Base64):", encodedParams);

        // Generar firma
        const signature = generateSignature(process.env.REDSYS_SECRET_KEY, encodedParams);
        console.log("✅ Firma generada:", signature);

        // Devolver el formulario
        const formHtml = `
            <form id="redsysForm" action="https://sis.redsys.es/sis/realizarPago" method="POST">
                <input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA256_V1" />
                <input type="hidden" name="Ds_MerchantParameters" value="${encodedParams}" />
                <input type="hidden" name="Ds_Signature" value="${signature}" />
            </form>
            <script>document.getElementById('redsysForm').submit();</script>
        `;

        return NextResponse.json({
            success: true,
            form: formHtml,
        });
    } catch (error) {
        console.error("❌ Error en el endpoint de RedSys:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

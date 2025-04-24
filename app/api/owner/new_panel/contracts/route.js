import { getOwnerContractById } from "./controller/getOwnerContractById";
import { getOwnerContractsByOwnerId } from "./controller/getOwnerContractsByOwnerId";
import { createContractPdf } from "./controller/createContractPdf";
import { UAParser } from "ua-parser-js";
import { NextResponse } from "next/server";
import { OwnerContract } from "@/db/init";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get("ownerId");
  const contractId = searchParams.get("contractId");
  if (contractId) {
    return await getOwnerContractById(contractId);
  }
  const result = await getOwnerContractsByOwnerId(ownerId);

  return result;
}

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      id,
      originalPdfUrl,
      ownerSignature,
      hfmSignature = "https://firebasestorage.googleapis.com/v0/b/helloflatprueba.appspot.com/o/Firmas%2FhelloflatmateSignature.png?alt=media&token=d2049b5a-fccf-4407-bfcd-cd5d73f462a2",
      ownerFdoData,
      hfmFdoData,
      startDate,
      endDate,
    } = data;

    if (!id) {
      return NextResponse.json(
        { error: "ID del contrato es requerido" },
        { status: 400 }
      );
    }

    const userAgentString = request.headers.get("user-agent");
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      request.socket?.remoteAddress ||
      "IP no disponible";

    const parser = new UAParser();
    const result = parser.setUA(userAgentString).getResult();

    const userData = {
      IP: clientIp,
      device: result.device.type || false,
      browserName: result.browser.name || false,
      browserVersion: result.browser.version || false,
      OS: result.os.name || false,
    };

    // Generar PDF firmado
    const signedPdfUrl = await createContractPdf(
      {
        originalPdfUrl,
        ownerSignature,
        hfmSignature,
        ownerFdoData,
        hfmFdoData,
        startDate,
        endDate,
      },
      userData
    );

    // Actualizar el contrato con la URL del PDF firmado
    const updated = await OwnerContract.update(
      {
        signedPdfUrl,
        isSigned: true,
        signedAt: new Date().toISOString(),
        status: "ACTIVE",
        ownerSignature,
      },
      {
        where: { id },
      }
    );

    if (!updated || updated[0] === 0) {
      return NextResponse.json(
        { error: "No se pudo actualizar el contrato." },
        { status: 500 }
      );
    }

    return NextResponse.json("Contrato firmado", { status: 200 });
  } catch (error) {
    console.error("Error en POST /api/sign-contract:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al firmar el contrato." },
      { status: 500 }
    );
  }
}

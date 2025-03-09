import React, { Suspense } from "react";
import ContractDetailV2 from "./auxiliarComponents/ContractDetailV2";
import ContractDetailV2Fallback from "../auxiliarComponents/fallbacks/ContractDetailV2Fallback";

const SignatureV2 = () => {
    return (
        <div className="w-full h-full p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Revisa y firma tu contrato digital
            </h2>

            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                A continuación encontrarás el contrato digital necesario para
                completar tu reserva. Te invitamos a leer detenidamente cada
                sección del documento y, cuando estés listo, proceder a
                firmarlo.
            </p>
            <Suspense fallback={<ContractDetailV2Fallback />}>
                <ContractDetailV2 />
            </Suspense>
        </div>
    );
};

export default SignatureV2;

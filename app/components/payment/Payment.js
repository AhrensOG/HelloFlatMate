import Link from "next/link";

export default function Payment() {
    return (
        <div>
            <div>
                <button type="button" className="self-start m-5"><Image src={"/payment/back-icon.svg"} width={24} height={24} alt="Boton para regresar" /></button>
                <h1>¿Cómo te gustaría paga?</h1>
            </div>
            <div>
                <h2>Total (USD)</h2>
                <p>$440</p>
            </div>
            <div className="h-[1px] bg-[#DDDDDD]"></div>
            <div>
                <h2>Formas de pago</h2>
                <div>
                    <p><span>visa</span> ****5203</p>
                    <button type="button">Editar</button>
                </div>
            </div>
            <div className="h-[1px] bg-[#DDDDDD]"></div>
            <div>
                <h2>Política de cancelación</h2>
                <p>Esta reserva no es reembolsable.</p>
                <Link href="#">Más información</Link>
            </div>
            <div className="h-[1px] bg-[#DDDDDD]"></div>
            <div>
                <h4>
                    Al seleccionar el botón, <span>acepto los términos y condiciones de la reserva.</span>
                </h4>
            </div>
            <div className="h-[1px] bg-[#DDDDDD]"></div>
            <button type="button" className="text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300">Confirmar y pagar</button>
        </div>
    )
}
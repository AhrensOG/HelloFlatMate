import Image from "next/image";

export default function AddNewPaymentMethod() {
    return (
        <div>
            <div>
                <button type="button" className="self-start m-5"><Image src={"/payment/back-icon.svg"} width={24} height={24} alt="Boton para regresar" /></button>
                <h1>¿Cómo te gustaría paga?</h1>
            </div>
            <h2>
                El monto será cargado a tu cuenta una vez concluido el viaje.
            </h2>
            <div>
                <div>
                    <Image src={"/payment/add-new-payment-method/bank-icon.svg"} width={24} height={24} alt="Icono de cuenta de banco" />
                </div>
                <div>
                    <h3>Cuenta de banco</h3>
                    <p>Vincula tu cuenta de banco</p>
                </div>
                <button> <Image src={"/payment/add-new-payment-method/right-arrow.svg"} width={24} height={24} alt="Boton agregar nuevo banco" /></button>
            </div>
            <div>
                <div>
                    <Image src={"/payment/add-new-payment-method/paypal-icon.svg"} width={24} height={24} alt="Icono de PayPal" />
                </div>
                <div>
                    <h3>Paypal</h3>
                    <p>Agrega tu cuenta</p>
                </div>
                <button><Image src={"/payment/add-new-payment-method/right-arrow.svg"} width={24} height={24} alt="Boton agregar nuevo paypal" /></button>
            </div>
            <div>
                <div>
                    <Image src={"/payment/add-new-payment-method/card-icon.svg"} width={24} height={24} alt="Icono de tarjeta" />
                </div>
                <div>
                    <h3>Tajeta de Crédito o Débito</h3>
                    <p>Mastercard o Visa</p>
                </div>
                <button><Image src={"/payment/add-new-payment-method/right-arrow.svg"} width={24} height={24} alt="Boton agregar nueva tarjeta" /></button>
            </div>
            <h2>
                Descuida, no almacenamos tu informacion de pago.
            </h2>
            <button type="button" className="text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300">Omitir</button>
        </div>
    )
}
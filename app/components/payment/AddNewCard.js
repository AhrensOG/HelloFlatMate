import Image from "next/image";

export default function AddNewCard() {
    return (
        <div>
            <div>
                <button type="button" className="self-start m-5"><Image src={"/payment/back-icon.svg"} width={24} height={24} alt="Boton para regresar" /></button>
                <h1>¿Cómo te gustaría paga?</h1>
            </div>
            <form>
                <div>
                    <label>Numero de Tarjeta</label>
                    <div><span><Image src={"/payment/add-new-card/img-icon.svg"} width={24} height={24} alt="Icono de imagen" /><input type="text"></input></span></div>
                </div>
                <div>
                    <div>
                        <label>Fecha de exp.</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <div><label>CVV/CVC</label><span><Image src={"/payment/add-new-card/exclamation-icon.svg"} width={24} height={24} alt="Icono de exclamacion" /></span></div>
                        <input type="text"></input>
                    </div>
                </div>
                <div>
                    <label>Titular de tarjeta</label>
                    <input type="text"></input>
                </div>
                <button type="button" className="text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300">Guardar</button>
            </form>
        </div>
    )
}
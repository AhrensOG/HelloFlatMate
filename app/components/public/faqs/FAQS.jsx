import { getAllProperties } from "@/app/context/actions";
import { Context } from "@/app/context/GlobalContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function FAQS() {
    const [open, setOpen] = useState(null); // Permitir múltiples secciones abiertas o cerradas
    const [filteredProperties, setFilteredProperties] = useState([]); // Estado para propiedades ya filtradas
    const { dispatch, state } = useContext(Context);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                await getAllProperties(dispatch);
            } catch (error) {
                console.log(error);
            }
        };

        if (!state?.properties) {
            fetchProperties();
        } else if (filteredProperties?.length === 0) {
            console.log(state);

            const shuffledProperties = filterProperties(state.properties);
            setFilteredProperties(shuffledProperties);
        }
    }, [dispatch, state.properties]);

    const filterProperties = (properties) => {
        const filtered = properties?.filter((property) => property.isActive && property.price > 0 && property.status === "FREE");
        const shuffled = filtered?.sort(() => 0.5 - Math.random());
        return shuffled?.slice(0, 6);
    };

    const formatPrice = (price) => {
        return `${price.toFixed(2)} €`;
    };

    return (
        <main className="flex flex-col items-center gap-4 my-6">
            <h1 className="font-bold text-2xl text-resolution-blue w-full ml-[15rem]">Preguntas frecuentes</h1>
            <div className="flex justify-around gap-4 w-full">
                <section className="flex flex-col gap-4 w-[35rem]">
                    {[
                        {
                            question: "¿Qué es un hellorooms?",
                            answer: (
                                <>
                                    <p>Las habitaciones para estudiantes en Valencia, hellorooms son apartamentos que gestionamos completamente.</p>
                                    <p>
                                        No tendrás que gestionar nada con el propietario del piso y dentro del horario de 9 a 17 horas siempre podrás
                                        comunicarte con nosotros libremente.
                                    </p>
                                    <p>
                                        Del mismo modo también tendrás un número de teléfono para llamarnos en caso de emergencia fuera de horario
                                        laboral.
                                    </p>
                                    <p>Desglose de servicios:</p>
                                    <ul className="list-disc pl-4 space-y-1 ml-4 mt-2">
                                        <li>Nos encargamos de que nos encuentren estudiantes que vienen a estudiar a la ciudad.</li>
                                        <li>Formalizamos los contratos con los estudiantes.</li>
                                        <li>De preparar los pisos.</li>
                                        <li>Hacemos el check in.</li>
                                        <li>Estamos en contacto con los flatmates 24/7.</li>
                                        <li>Gestionamos el mantenimiento.</li>
                                        <li>Informamos de consumos de suministros.</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            question: "¿Qué es lo que se paga con la reserva de la habitación a través de la Web de helloflatmate?",
                            answer: (
                                <p>
                                    La persona que reserva la habitación está abonando la renta del primer mes de contrato de la habitación
                                    seleccionada.
                                </p>
                            ),
                        },
                        {
                            question: "¿Con qué compañeros compartiré piso?",
                            answer: (
                                <p>
                                    helloflatmate aloja a estudiantes o a personas jóvenes en prácticas de empresas de diversas nacionalidades,
                                    siempre y cuando sean menores de 30 años.
                                </p>
                            ),
                        },
                        {
                            question: "¿Hay pisos solo para chicas?",
                            answer: <p>helloflatmate dispone de pisos mixtos y pisos sólo para chicas. </p>,
                        },
                        {
                            question: "¿Puede venir familia y amigos a visitarme y dormir en el piso?",
                            answer: (
                                <>
                                    <p>
                                        Claro, no hay ningún problema, pero hay que informar a la oficina y a tus flatmates, y que todos estén de
                                        acuerdo. Si la estancia de este invitado llega a la semana de duración, éste deberá aportar 20 €/semana para
                                        los gastos comunes del piso.
                                    </p>
                                    <br />
                                    <p>En ningún caso debe convertirse en una costumbre, sólo visitas esporádicas.</p>
                                </>
                            ),
                        },
                        {
                            question: "¿Se admiten mascotas?",
                            answer: <p>No.</p>,
                        },
                        {
                            question: "¿Si llego al piso el 15 de septiembre por ejemplo, tengo que pagar todo el mes?",
                            answer: (
                                <>
                                    <p>Depende:</p>
                                    <ul className="list-disc pl-4 space-y-1 ml-4 mt-2">
                                        <li>La habitación siempre se cobra por mes entero.</li>
                                    </ul>
                                    <p>
                                        Si haces una reserva el 25 de agosto para entrar en la habitación el 15 de septiembre hasta el 30 de junio, se
                                        deberá abonar el mes completo ya que pudiera darse el caso de que hubiera una persona que quisiera entrar
                                        antes y la propiedad perdería beneficios.
                                    </p>
                                    <ul className="list-disc pl-4 space-y-1 ml-4 mt-2">
                                        <li>
                                            Si contratas una habitación el día 15 del mes para entrar el 16 pagarás únicamente la parte proporcional
                                            del mes.
                                        </li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            question: "¿Puedo cancelar mi reserva y que me devuelvan el dinero? Depende:",
                            answer: (
                                <>
                                    <ul className="list-disc pl-4 space-y-1 ml-4 mt-2">
                                        <li>
                                            Se devolverá el 100% del importe de reserva en caso de cancelar al menos 30 días antes del inicio del
                                            contrato.
                                        </li>
                                        <li>
                                            Cancelaciones realizadas con menos de 30 días de antelación al inicio de contrato, no darán lugar a ningún
                                            tipo de reembolso.
                                        </li>
                                    </ul>
                                    <p>
                                        El propietario también se reserva el derecho de cancelar la reserva al menos 30 días antes de inicio de
                                        contrato y desde helloflatmate te daremos la opción de trasladar tu reserva a otra habitación similar o el
                                        reembolso del 100% de tu dinero.
                                    </p>
                                </>
                            ),
                        },
                        {
                            question: "¿Tengo que pagar alguna comisión para el alquiler o reserva de la habitación?",
                            answer: (
                                <>
                                    <p>
                                        Sí. Tener un contrato legal, sujeto al código civil, que garantice derechos y obligaciones para cada uno de
                                        nuestros flatmates conlleva un trabajo extra para la agencia.
                                    </p>
                                    <br />
                                    <p>
                                        Por experiencia en nuestra etapa de estudiantes en el extranjero lo consideramos fundamental para la seguridad
                                        y tranquilidad de nuestros inquilinos.
                                    </p>
                                    <br />
                                    <p>La formalización de contrato tiene un coste de 380€ +iva (459.80€)</p>
                                </>
                            ),
                        },
                        {
                            question: "¿Las facturas están incluidas? Las facturas no están incluidas.",
                            answer: (
                                <p>
                                    Debes saber que nuestros flatmates están exentos de pago de los gastos comunitarios del edificio (ascensor,
                                    limpieza de la escalera, reparaciones en el edificio, etc..).
                                </p>
                            ),
                        },
                        {
                            question: "¿Hay internet? ¿Cómo se realizan los pagos de internet?",
                            answer: (
                                <>
                                    <p>Sí, todas las viviendas disponen de Internet wifi 300 megas Orange o en su defecto Movistar.</p>
                                    <br />
                                    <p>
                                        Cuota fija de 16 €/mes, que se paga cada 5 meses por adelantado (80 €/habitación) independientemente del
                                        número de habitaciones que disponga la vivienda.
                                    </p>
                                </>
                            ),
                        },
                        {
                            question: "¿Cómo pagamos las facturas de agua, luz y gas?",
                            answer: (
                                <>
                                    <p>Cada 5 meses de contrato se aportan 200€ en concepto de Adelanto de suministros.</p>
                                    <br />
                                    <p>En los contratos de 5 meses se abonará al inicio del contrato, el día del check in.</p>
                                    <br />
                                    <p>
                                        En los contratos de 10 meses se harán dos entregas, la primera al inicio de contrato, se abona el día del
                                        check in, y la segunda a finales de enero, junto a la renta de febrero.
                                    </p>
                                    <br />
                                    <p>
                                        Este importe se lo entregamos al propietario. Generalmente y con un consumo responsable, este adelanto de
                                        dinero deberá ser suficiente para cubrir tus gastos de agua, luz y gas.
                                    </p>
                                    <br />
                                    <p>
                                        En ambos casos el propietario regularizará con las facturas reales, en el caso de que no se haya consumido
                                        toda la aportación se devolverá la diferencia. En caso de superarla el propietario podrá exigir un pequeño
                                        adelanto para futuras facturas.
                                    </p>
                                </>
                            ),
                        },
                        {
                            question: "¿Qué fianza tengo que entregar? ¿Cuándo y cómo lo hago?",
                            answer: (
                                <>
                                    <p>
                                        Como en cualquier alquiler, se entrega una fianza por si hubiera impagos o desperfectos producido por el
                                        inquilino en la vivienda/habitación.
                                    </p>
                                    <br />
                                    <p>
                                        Las habitaciones van sujetas a una fianza de 350€ si tienen baño propio o terraza propia. Para el resto de
                                        habitaciones la fianza a entregar es de 300€.
                                    </p>
                                </>
                            ),
                        },
                        {
                            question: "¿Cómo hago mi reserva?",
                            answer: (
                                <>
                                    <ol className="list-decimal pl-4 space-y-1 ml-4 mt-2">
                                        <li>
                                            Tienes que entrar en www.helloflatmate.com , Registrarte, y cumplimentar todos los datos que te solicitan
                                            para Crear una cuenta. Te llegará un email de confirmación para que actives la cuenta a través de él.
                                        </li>
                                        <li>
                                            Ahora puedes entrar en www.helloflatmate.com e Iniciar Sesión con tu email y la contraseña que has
                                            definido.
                                        </li>
                                        <li>
                                            Ve al Link de la habitación que has elegido, Selecciona la Fecha de contrato y dale al botón azul de
                                            Reservar.
                                        </li>
                                        <li>
                                            Comprueba que las fechas y precio son correctos y dale al botón azul de Pago Seguro con Tarjeta. Te
                                            llevará a la pasarela de pago online del banco y puedes hacer la operación de compra con toda
                                            tranquilidad.
                                        </li>
                                        <li>
                                            Te llegará un email de confirmación con un recibo del pago y solicitando una documentación que debes
                                            enviarnos.
                                        </li>
                                    </ol>
                                    <br />
                                    <p>
                                        Ya está, ya tienes la habitación reservada para ti, a la espera de tus documentos para formalizar el contrato.
                                        Días antes de tu llegada recibirás un email con las instrucciones para el check in.
                                    </p>
                                    <br />
                                    <p>¡Bienvenido a helloflatmate!</p>
                                </>
                            ),
                        },
                    ].map((faq, index) => (
                        <article key={index} className="flex flex-col gap-4 border border-gris-español p-4">
                            <div className="flex justify-between items-center w-full">
                                <h2 className="font-semibold text-lg text-licorice-black break-words max-w-[80%]">{faq.question}</h2>
                                <div className="flex-shrink-0">
                                    {open === index ? (
                                        <MinusIcon
                                            onClick={() => setOpen(null)}
                                            className="w-7 h-7 text-gris-antracita bg-gray-300 p-1 rounded-full hover:bg-gray-400 cursor-pointer"
                                        />
                                    ) : (
                                        <PlusIcon
                                            onClick={() => setOpen(index)}
                                            className="w-7 h-7 text-gris-antracita bg-gray-300 p-1 rounded-full hover:bg-gray-400 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <AnimatePresence>
                                {open === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -100 }}
                                        className="text-gris-antracita flex flex-col gap-2"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </article>
                    ))}
                </section>
                <aside className="flex flex-col gap-4 w-[25rem] h-[48rem] border border-gris-español p-4">
                    <h2 className="font-semibold text-lg text-licorice-black">Podría interesarte</h2>
                    {filteredProperties?.length > 0 ? (
                        filteredProperties.map((property, index) => (
                            <div key={property.id}>
                                <article className="flex gap-4">
                                    <Image src={property.images[0]} width={130} height={100} alt={property.name} />
                                    <div className="flex flex-col justify-between">
                                        <h3 className="font-semibold break-words">{property.name}</h3>
                                        <p className="text-resolution-blue">{formatPrice(property.price) || "No definido"}</p>
                                    </div>
                                </article>
                                {index < 5 ? <div className="h-[1px] w-full bg-gris-español mt-4"></div> : null}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col justify-center items-center h-full">
                            <p className="text-gris-antracita">No hay propiedades disponibles</p>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    );
}

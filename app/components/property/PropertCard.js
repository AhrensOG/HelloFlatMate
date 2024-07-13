import { plus_jakarta } from "@/font"
import Image from "next/image"

export default function PropertyCard() {
    return (
        <section className={`${plus_jakarta.className} flex gap-3 my-2 px-4 w-full h-[15vh]`}>
            <div className="h-full"> <Image className="h-full" src={"/property-card/property-stock-1.svg"} objectFit="cover" width={117} height={117} /> </div>
            <div className="flex flex-col justify-between h-full grow">
                <div className="flex flex-col grow">
                    <h4 className="flex w-full gap-2 items-center text-[0.81rem] text-[#000000B2] font-normal">HelloRoom <span><Image src={"/property-card/gray-question-icon.svg"} width={17} height={17} /></span></h4>
                    <h2 className="flex w-full gap-2 items-center text-sm text-[#000000B2] font-medium"><span><Image src={"/property-card/location-icon.svg"} width={18} height={18} /></span> Ubicacion de la Habitacion</h2>
                    <p className="text-[0.68rem] text-[#828282] font-normal">Wifi - Baño compartido</p>
                </div>
                <div className="flex justify-between gap-2 h-[3.75rem] pb-2">
                    <span className="flex items-center gap-2 self-end text-[#000000B2] h-[0.68rem] font-medium"><Image className="" src={"/property-card/star.svg"} width={13} height={13} alt="Estrella" /> 4.9</span>
                    <div className="flex flex-col justify-end items-end font-medium">
                        <span className="text-xs text-[#171412] h-[1.06rem] bg-[#FFF06D] px-1">15% OFF</span>
                        <h3 className="text-xs text-[#000000B2]">$180 <span className="text-xs text-[#B2B2B2]">/mes</span></h3>
                    </div>
                </div>
            </div>
        </section>
    )
}
import Image from "next/image";

export default function RoomInfo({ title, info, image }) {
    return (
        <article className="flex flex-col gap-1">
            <Image src={image} alt={title} width={160} height={90} />
            <h3 className="text-base font-medium">{title}</h3>
            <p className="font-normal text-sm text-[#4F7A94]">{info}</p>
        </article>
    );
}

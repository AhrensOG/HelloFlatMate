import Image from "next/image";

export default function Feature({ data }) {
  return (
    <article className="flex flex-col items-center justify-center gap-3 m-3">
      <div className="h-[7.5rem] w-[7.5rem] border rounded-md border-white flex justify-center items-center relative p-4">
        <Image
          className="m-2"
          src={data.icon}
          width={200}
          height={200}
          alt={data.title}
        />
      </div>
      <h2 className="font-semibold text-xl text-white w-[12.4rem] text-center">
        {data.title}
      </h2>
      <p className="font-normal text-base text-white w-[85%] text-center">{data.body}</p>
    </article>
  );
}

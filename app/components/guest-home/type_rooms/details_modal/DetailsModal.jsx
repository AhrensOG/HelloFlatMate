import { motion } from "framer-motion";
import Image from "next/image";

export default function DetailsModal({ data, callback }) {
  console.log(data);
  return (
    <motion.aside
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-[13rem] relative">
        <button
          className="absolute left-0 top-0 p-4 z-50"
          type="button"
          onClick={callback}
        >
          <Image
            src="/guest_home/type_rooms/left-arrow.svg"
            alt="Cerrar modal"
            width={24}
            height={24}
          />
        </button>
        <div className="absolute inset-0 w-full h-full bg-type-room-gradient z-10"></div>
        <Image
          src={data.image}
          alt={data.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="flex justify-center items-center absolute inset-0 z-40">
          <h3 className="text-white font-extrabold text-4xl text-center">
            {data.title}
          </h3>
        </div>
      </div>

      <div className="font-normal text-base text-black m-5">
        <h4 className="font-semibold text-lg">{data.title}</h4>
        <p>{data.body}</p>
      </div>
    </motion.aside>
  );
}

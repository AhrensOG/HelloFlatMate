import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function PreviewModal({ action, img }) {
  return (
    <aside className="fixed inset-0 flex justify-center items-center z-10">
      <div className="absolute inset-0 z-20 w-full h-full bg-[#e1eff2ff] opacity-75"></div>
      <article className="relative w-[18rem] flex flex-col gap-2 items-center z-50 bg-white text-black p-4 rounded-2xl">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-lg text-start grow">Documentacion</h2>
          <div className="flex justify-end items-center">
            <button onClick={action} type="button">
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
        <div className="relative m-2 rounded-xl w-full min-h-[10rem]">
          <Image
            className="rounded-xl"
            src={img}
            fill
            alt="dni"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      </article>
    </aside>
  );
}

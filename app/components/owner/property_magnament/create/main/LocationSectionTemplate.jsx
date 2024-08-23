import {
  MapIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationSection from "@/app/components/property-details/main/LocationSection";

export default function LocationSectionTemplate({ data = null }) {
  const [showPencil, setShowPencil] = useState(false);

  const hidden = "hidden";
  return (
    <AnimatePresence mode="wait">
      <section className="flex flex-col gap-3 cursor-pointer">
        <h2 className="font-bold text-[1.37rem]">¿Donde Estaras?</h2>
        <article
          onMouseMove={() => setShowPencil(true)}
          onMouseLeave={() => setShowPencil(false)}
          className="w-full rounded-lg h-[20vh] relative bg-[#d6d6d6ff]"
        >
          <div className="absolute inset-0 w-full h-full flex justify-center items-center z-40">
            <div
              className={`${
                showPencil ? "" : "hidden"
              }  flex justify-center items-center ${
                data ? "h-16 w-16 rounded-full bg-[#82828266]" : "w-full h-full"
              }`}
            >
              <PencilSquareIcon className="w-9 h-9 text-white" />
            </div>
          </div>
          {data ? (
            <map className="w-full rounded-lg h-[20vh]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47827013538!2d-3.844343464188269!3d40.438098610297125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2zTWFkcmlkLCBFc3Bhw7Fh!5e0!3m2!1ses-419!2sar!4v1721089011154!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 10 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </map>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`${
                showPencil ? hidden : ""
              } absolute inset-0 flex justify-center items-center`}
            >
              <MapIcon className="w-10 h-10 text-white" />
            </motion.div>
          )}
        </article>
      </section>
    </AnimatePresence>
  );
}

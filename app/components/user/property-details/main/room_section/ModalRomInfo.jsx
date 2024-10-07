import { motion } from "framer-motion";
import SliderDetails from "../../header/SliderDetails";
import SliderItem from "../../header/slider/SliderItem";
export default function ModalRomInfo({ data, action }) {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={() => action(null)}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center z-40 items-center"
    >
      <div className="w-full m-6 bg-white rounded-xl z-50">
        <div className="w-full h-3/6">
          <SliderDetails>
            {data.images.map((image, index) => {
              return (
                <SliderItem key={index} img={image} rounded="rounded-t-xl" height="h-[300px]" />
              );
            })}
          </SliderDetails>
          <div className="w-full p-6 flex flex-col gap-3">
            <h2 className="text-center font-bold text-xl">{data.name}</h2>
            {data.bathroom ? (
              <h3>La habitacion posee baño privado</h3>
            ) : (
              <h3>La habitacion no posee baño privado</h3>
            )}
            {data.couple ? (
              <h3>La habitacion es para parejas</h3>
            ) : (
              <h3>La habitacion no es para parejas</h3>
            )}
            {data.numberBeds ? (
              <h3>La habitacion posee {data.numberBeds} camas</h3>
            ) : (
              <h3>La habitacion no posee camas</h3>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

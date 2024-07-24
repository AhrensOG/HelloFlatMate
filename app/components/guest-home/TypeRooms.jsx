import DetailsModal from "./type_rooms/details_modal/DetailsModal";
import Room from "./type_rooms/Room";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

export default function TypeRooms({ data }) {
  const [dataDetails, setDataDetails] = useState({});
  const [showDetailsRoom, setShowDetailsRoom] = useState(false);

  const handleShowDetails = (dataDetails) => {
    setShowDetailsRoom(!showDetailsRoom);
    setDataDetails({ ...dataDetails });
  };

  const handleCloseDetails = () => {
    setShowDetailsRoom(!showDetailsRoom);
    setDataDetails({});
  };

  return (
    <AnimatePresence>
      {!showDetailsRoom ? (
        <motion.section
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0" }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <h2 className="bg-black text-white text-[1.37rem] font-bold text-center">
            Mucho más que una habitación
          </h2>
          <Room
            title={data.helloRoom.title}
            body={data.helloRoom.body}
            image={data.helloRoom.image}
            callback={() => handleShowDetails(data.helloRoom)}
          />
          <Room
            title={data.helloColiving.title}
            body={data.helloColiving.body}
            image={data.helloColiving.image}
            callback={() => handleShowDetails(data.helloColiving)}
          />
          <Room
            title={data.helloStudio.title}
            body={data.helloStudio.body}
            image={data.helloStudio.image}
            callback={() => handleShowDetails(data.helloStudio)}
          />
          <Room
            title={data.helloLandlord.title}
            body={data.helloLandlord.body}
            image={data.helloLandlord.image}
            callback={() => handleShowDetails(data.helloLandlord)}
          />
        </motion.section>
      ) : (
        <DetailsModal data={dataDetails} callback={handleCloseDetails} />
      )}
    </AnimatePresence>
  );
}

import EditButton from "../../shared/EditButton";
import RoomInfoTemplate from "./room_section/RoomInfoTemplate";
import RoomEditModal from "./room_section/RoomEditModal";
import { useState } from "react";

export default function RoomSectionTemplate({
  data,
  setData,
  action,
  deleteRooms,
  setDeleteRooms,
  onEditRoom,
}) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    handleShowModal(); // Abre el modal para editar la habitación
  };

  const handleAddRoom = () => {
    setSelectedRoom(null); // Resetea la habitación seleccionada
    action(); // Abre el modal para añadir una nueva habitación
  };

  const handleDeletRoom = (room) => {
    if (room.id) {
      setDeleteRooms([...deleteRooms, room.id]);
    }
    setData(data.filter((item) => item !== room));
    console.log(deleteRooms);
  };

  return (
    <section className="flex flex-col gap-3 items-center w-full">
      <article className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[1.37rem] w-full text-start">
          Habitaciones
        </h2>
        <EditButton action={handleAddRoom} />{" "}
      </article>
      <article className="flex justify-evenly gap-1 w-full overflow-x-auto">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <RoomInfoTemplate
              info={item}
              key={index}
              img={item?.images[0] || "/property-details/stock-1.svg"}
              name={item.name}
              bedNumber={item.numberBeds}
              showModal={() => handleEditRoom(item)} // Pasa la habitación a editar al modal
              onDelete={() => handleDeletRoom(item)}
            />
          ))
        ) : (
          <>
            <RoomInfoTemplate showModal={handleShowModal} type={"empty"} />
            <RoomInfoTemplate showModal={handleShowModal} type={"empty"} />
          </>
        )}
      </article>
      {showModal && (
        <RoomEditModal
          data={data}
          setData={setData}
          showModal={handleShowModal}
          selectedRoom={selectedRoom} // Pasa la habitación seleccionada al modal
        />
      )}
    </section>
  );
}

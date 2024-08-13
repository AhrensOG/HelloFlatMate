import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";

function DraggableImage({ id, url }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-28 h-28 border border-gray-300 rounded-lg m-2 cursor-pointer"
    >
      <Image
        src={url}
        alt={`Image ${id}`}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  );
}

export default DraggableImage;

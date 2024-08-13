import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid"; // Para generar IDs únicos
import DraggableImage from "./DraggableImage";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

function ImageUploader({ initialImages = false, setImages, images }) {
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const mappedImages = initialImages.map((url) => ({
        id: uuidv4(),
        url,
      }));
      setImages(mappedImages);
    }
  }, [initialImages]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newImages = files.map((file) => ({
      id: uuidv4(),
      name: file.name,
      fileData: file,
      url: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={images.map((image) => image.id)}
        strategy={rectSortingStrategy}
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-wrap justify-center items-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-60"
        >
          {images.length > 0 ? (
            images.map((image) => (
              <DraggableImage key={image.id} id={image.id} url={image.url} />
            ))
          ) : (
            <span className="w-full flex flex-col justify-center items-center text-sm font-bold text-slate-300 gap-2">
              <ArrowUpTrayIcon className="size-10" /> Arrastra tus imagenes aquí
            </span>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ImageUploader;

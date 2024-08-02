import { PhotoIcon } from "@heroicons/react/20/solid";

export default function SliderCreateTemplate() {
  return (
    <div className="relative w-full h-60">
      <div className="absolute inset-0 bg-gradient-to-t from-custom-light to-custom-light"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-custom-dark to-transparent"></div>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-20 h-20 text-white">
            <PhotoIcon />
          </div>
        </div>
        <div className="absolute bottom-4 flex gap-2 justify-center items-center">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white"></span>
        </div>
      </div>
    </div>
  );
}

import SliderItem from "@/app/components/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/property-details/header/SliderDetails";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function SliderUpdateTemplate() {
  return (
    <div className="relative">
      <SliderDetails>
        <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
        <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
        <SliderItem img="/property_details/nav_bar_details/slider/slider-stock-1.svg" />
      </SliderDetails>
      <div className="w-full h-full absolute inset-0 z-50 flex justify-center items-center">
        <div className="bg-[#D9D9D966] h-36 w-36 rounded-[3rem] flex justify-center items-center">
          <PencilSquareIcon className="h-16 w-16 text-white" />
        </div>
      </div>
    </div>
  );
}

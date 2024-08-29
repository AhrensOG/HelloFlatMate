import SliderItem from "@/app/components/user/property-details/header/slider/SliderItem";
import SliderDetails from "@/app/components/user/property-details/header/SliderDetails";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function SliderUpdateTemplate({ data, action }) {
  return (
    <div className="relative h-[12.5rem]">
      <SliderDetails>
        {data?.map((item, index) => (
          <SliderItem key={index} img={item} />
        ))}
      </SliderDetails>
      <div className="w-full h-full absolute inset-0 z-50 flex justify-center items-center">
        <button
          onClick={action}
          type="button"
          className="bg-[#D9D9D966] h-36 w-36 rounded-[3rem] flex justify-center items-center"
        >
          <PencilSquareIcon className="h-16 w-16 text-white" />
        </button>
      </div>
    </div>
  );
}

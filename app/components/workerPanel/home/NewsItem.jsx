import { BellIcon } from "@heroicons/react/24/outline";

export default function NewsItem({ title, action }) {
  return (
    <div onClick={action} className="flex items-center gap-3 p-2">
      <span className="h-10 w-10 bg-[#F0F2F5] flex justify-center items-center rounded-lg">
        <BellIcon className="w-6 h-6" />
      </span>
      <p className="text-sm font-normal text-[#121417]">{title}</p>
    </div>
  );
}

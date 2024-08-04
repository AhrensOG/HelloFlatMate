import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function TitleAdminPanel({ title }) {
  return (
    <div className="flex items-center justify-between w-full mt-2">
      <button type="button" className="h-7 w-7 opacity-70">
        <ArrowLeftIcon />
      </button>
      <h1 className="font-semibold text-xl text-[#191B23] grow pl-4 ">
        {title}
      </h1>
    </div>
  );
}

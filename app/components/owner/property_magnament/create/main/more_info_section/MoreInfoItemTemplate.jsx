import { PlusIcon } from "@heroicons/react/20/solid";

export default function MoreInfoItemTemplate({ title }) {
  return (
    <article>
      <div className="flex justify-between items-center p-2 text-[#0D171C] bg-[#F7FAFA]">
        <h3 className="font-normal text-lg">{title}</h3>
        <button
          className="h-10 w-10 text-[#0E155F] p-2 bg-[#E8EDF2] rounded-lg"
          type="button"
        >
          <PlusIcon />
        </button>
      </div>
    </article>
  );
}

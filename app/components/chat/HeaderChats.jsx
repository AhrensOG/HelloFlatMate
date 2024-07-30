import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function HeaderChats() {
  return (
    <header className="flex justify-between items-center px-2 py-3">
      <button className="h-7 w-7 " type="button">
        <ChevronLeftIcon />
      </button>
      <h1 className="font-bold text-xl">Chats</h1>
      <button className="h-7 w-7" type="button">
        <QuestionMarkCircleIcon />
      </button>
    </header>
  );
}

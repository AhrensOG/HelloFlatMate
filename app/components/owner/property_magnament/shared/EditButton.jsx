import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditButton({ action }) {
  return (
    <button onClick={action} type="button" className="h-6 w-6">
      <PencilSquareIcon className="w-5 h-5" />
    </button>
  );
}

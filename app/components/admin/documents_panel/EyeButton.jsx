import { EyeIcon } from "@heroicons/react/20/solid";

export default function EyeButton({ action }) {
  return (
    <button onClick={action} className="h-6 w-6" type="button">
      <EyeIcon />
    </button>
  );
}

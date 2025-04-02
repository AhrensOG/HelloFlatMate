import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationIcon({ onClick, count }) {
    return (
        <div className="relative mt-2">
            <button className="h-5 w-5" onClick={onClick}>
                <BellIcon className={`${count > 0 ? "text-resolution-blue" : ""}`} />
                {/* Badge de notificaciones no leídas */}
                {count > 0 && (
                    <span
                        className="absolute -top-2 -right-2 inline-flex items-center justify-center 
                                   h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold"
                    >
                        {count}
                    </span>
                )}
            </button>
        </div>
    );
}

import Link from "next/link";

export default function NotificationCard({ data }) {
    return (
        <Link className="h-min-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2" href={"/pages/user/chats"}>
            {data}
        </Link>
    );
}

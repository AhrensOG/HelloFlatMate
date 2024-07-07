import Auth from "@/app/components/auth/Auth";

export default function authPage() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex justify-between items-center px-5"><button><img src="/icon-left-arrow.svg"></img></button> <button><img src="/Spain.svg"></img></button></nav>
            <div className="flex justify-center items-center grow">
                <Auth />
            </div>
        </div>
    )
}
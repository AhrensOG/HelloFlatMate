import Cookies from "@/app/components/public/cookies/Cookies";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import Footer_1 from "../components/public/home/Footer";

export default function CookiesPage() {
    return (
        <>
            <header>
                <NavbarV3 />
            </header>
            <Cookies />
            <Footer_1/>
        </>
    );
}

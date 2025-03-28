import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer_1() {
    const t = useTranslations("footer");

    return (
        <>
            {/* //Mobile */}
            <footer className="bg-[#f5f2f1] w-full flex flex-col gap-11 md:hidden py-10">
                <section className="flex flex-col gap-10 p-6">
                    <article className="flex flex-col gap-4">
                        <h2 className="font-bold uppercase text-lg">helloflatmate</h2>
                        <Link href="/sobre-nosotros" target="_blank" className="font-normal text-base">
                            {t("link_about_us")}
                        </Link>
                        <Link href="/contacto" target="_blank" className="font-normal text-base">
                            {t("contact")}
                        </Link>                        
                    </article>
                    <article className="flex flex-col gap-4">
                        <h2 className="font-bold uppercase text-lg">{t("title_legal")}</h2>
                        <Link href="/privacy-policy" target="_blank" className="font-normal text-base">
                            {t("link_privacy_policy")}
                        </Link>
                        <Link href="/cookies" target="_blank" className="font-normal text-base">
                            {t("link_cookies_policy")}
                        </Link>
                        <Link href="/terminos-y-condiciones" target="_blank" className="font-normal text-base">
                            {t("link_terms_and_conditions")}
                        </Link>
                    </article>
                    <article className="flex flex-col gap-4">
                        <h2 className="font-bold uppercase text-lg">{t("title_tenants")}</h2>
                        <Link href="/como-funciona" target="_blank" className="font-normal text-base">
                            {t("link_how_it_works")}
                        </Link>
                        <Link href="/clausulas" target="_blank" className="font-normal text-base">
                            {t("link_clauses")}
                        </Link>
                    </article>
                    <article className="flex flex-col gap-4">
                        <h2 className="font-bold uppercase text-lg">{t("title_colaborators")}</h2>
                        <Link href="/colaboradores" className="font-normal text-base">
                            {t("link_colaborators")}
                        </Link>
                    </article>
                </section>
                <section className="flex flex-col gap-7 p-6">
                    <h2 className="font-bold uppercase text-lg">{t("title_supp")}</h2>
                    <Link href="/faq" className="p-5 border border-[#676767] font-bold">
                        {t("link_faq")}
                    </Link>
                </section>

                <div className="border-t border-[#676767] w-[90%] mx-auto"></div>

                <section className="flex flex-wrap gap-7 p-4 justify-center">
                    <h2 className="font-bold uppercase text-lg w-full">{t("title_payment_methods")}</h2>
                    <Image src={"/home/new_home/paypal.svg"} width={50} height={50} alt="paypal" />
                    <Image src={"/home/new_home/visa.svg"} width={50} height={50} alt="visa" />
                    <Image src={"/home/new_home/mastercard.svg"} width={50} height={50} alt="mastercard" />
                    <Image src={"/home/new_home/americanexpress.svg"} width={50} height={50} alt="americanexpress" />
                    <Image src={"/home/new_home/unionpay.svg"} width={50} height={50} alt="unionpay" />
                </section>

                <section className="flex flex-col gap-7 p-6">
                    <article className="flex flex-wrap gap-4">
                        <h2 className="font-bold uppercase text-lg w-full">{t("title_follow_us")}</h2>
                        <Link href="#" target="_blank" className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 22" className="" aria-label="new-icon">
                                    <g clipPath="url(#clip0_2905_1174)">
                                        <path
                                            d="M10.4847 0.516113C7.63741 0.516113 7.28008 0.528563 6.1618 0.579454C5.0457 0.630563 4.28386 0.807261 3.61726 1.06652C2.92772 1.3343 2.34281 1.6925 1.76008 2.27545C1.17691 2.85818 0.818708 3.44309 0.550058 4.13241C0.290144 4.79923 0.113228 5.56129 0.0629922 6.67695C0.0129751 7.79524 -0.0001297 8.15278 -0.0001297 11C-0.0001297 13.8473 0.0125386 14.2035 0.0632109 15.3218C0.114538 16.4379 0.291236 17.1998 0.550276 17.8664C0.818272 18.5559 1.17647 19.1408 1.75942 19.7235C2.34193 20.3067 2.92685 20.6658 3.61595 20.9336C4.28299 21.1928 5.04504 21.3695 6.16092 21.4206C7.27921 21.4715 7.63632 21.484 10.4834 21.484C13.3308 21.484 13.6871 21.4715 14.8054 21.4206C15.9215 21.3695 16.6842 21.1928 17.3512 20.9336C18.0405 20.6658 18.6246 20.3067 19.2071 19.7235C19.7902 19.1408 20.1484 18.5559 20.4171 17.8666C20.6748 17.1998 20.8517 16.4377 20.9042 15.322C20.9544 14.2038 20.9675 13.8473 20.9675 11C20.9675 8.15278 20.9544 7.79545 20.9042 6.67717C20.8517 5.56107 20.6748 4.79923 20.4171 4.13263C20.1484 3.44309 19.7902 2.85818 19.2071 2.27545C18.6239 1.69228 18.0407 1.33408 17.3505 1.06652C16.6822 0.807261 15.9199 0.630563 14.8038 0.579454C13.6855 0.528563 13.3295 0.516113 10.4814 0.516113H10.4847ZM9.54417 2.4054C9.82331 2.40497 10.1348 2.4054 10.4847 2.4054C13.2839 2.4054 13.6156 2.41545 14.721 2.46569C15.7432 2.51243 16.298 2.68323 16.6676 2.82673C17.1568 3.01675 17.5056 3.2439 17.8723 3.61084C18.2393 3.97777 18.4664 4.32724 18.6569 4.81649C18.8004 5.18561 18.9714 5.74039 19.0179 6.76257C19.0682 7.86775 19.0791 8.19974 19.0791 10.9976C19.0791 13.7955 19.0682 14.1275 19.0179 15.2327C18.9712 16.2549 18.8004 16.8097 18.6569 17.1788C18.4669 17.668 18.2393 18.0164 17.8723 18.3831C17.5054 18.7501 17.157 18.9772 16.6676 19.1672C16.2984 19.3114 15.7432 19.4818 14.721 19.5285C13.6159 19.5787 13.2839 19.5897 10.4847 19.5897C7.68524 19.5897 7.35347 19.5787 6.24829 19.5285C5.22611 19.4813 4.67133 19.3105 4.30156 19.167C3.81231 18.977 3.46284 18.7498 3.0959 18.3829C2.72897 18.016 2.50181 17.6674 2.31136 17.1779C2.16786 16.8088 1.99684 16.254 1.95032 15.2318C1.90008 14.1267 1.89003 13.7947 1.89003 10.995C1.89003 8.19537 1.90008 7.86513 1.95032 6.75995C1.99706 5.73776 2.16786 5.18299 2.31136 4.81343C2.50138 4.32418 2.72897 3.97472 3.0959 3.60778C3.46284 3.24084 3.81231 3.01369 4.30156 2.82323C4.67111 2.67908 5.22611 2.50871 6.24829 2.46176C7.21543 2.41807 7.59023 2.40497 9.54417 2.40278V2.4054ZM16.0809 4.14617C15.3863 4.14617 14.8228 4.70903 14.8228 5.40381C14.8228 6.09837 15.3863 6.66188 16.0809 6.66188C16.7755 6.66188 17.339 6.09837 17.339 5.40381C17.339 4.70925 16.7755 4.14574 16.0809 4.14574V4.14617ZM10.4847 5.61611C7.51138 5.61611 5.10074 8.02676 5.10074 11C5.10074 13.9733 7.51138 16.3829 10.4847 16.3829C13.458 16.3829 15.8677 13.9733 15.8677 11C15.8677 8.02676 13.458 5.61611 10.4847 5.61611ZM10.4847 7.5054C12.4146 7.5054 13.9793 9.06991 13.9793 11C13.9793 12.93 12.4146 14.4947 10.4847 14.4947C8.55453 14.4947 6.99003 12.93 6.99003 11C6.99003 9.06991 8.55453 7.5054 10.4847 7.5054Z"
                                            fill="#666666"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2905_1174">
                                            <rect width="20.9683" height="20.9676" fill="white" transform="translate(0 0.516113)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                        </Link>
                        <Link href="#" target="_blank" className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 22 22"
                                className=""
                                aria-label="facebook-icon"
                            >
                                <g clipPath="url(#clip0_2905_1178)">
                                    <path
                                        d="M21.0932 10.7354C21.0932 4.9297 16.3866 0.223145 10.5809 0.223145C4.77515 0.223145 0.0685959 4.9297 0.0685959 10.7354C0.0685959 15.6653 3.4628 19.8021 8.04153 20.9382V13.948H5.8739V10.7354H8.04153V9.35117C8.04153 5.77321 9.66084 4.11479 13.1736 4.11479C13.8397 4.11479 14.9889 4.24556 15.459 4.37592V7.28782C15.2109 7.26175 14.7799 7.24871 14.2446 7.24871C12.521 7.24871 11.855 7.90173 11.855 9.59926V10.7354H15.2887L14.6987 13.948H11.855V21.1708C17.0594 20.5421 21.0932 16.1101 21.0932 10.7354Z"
                                        fill="#666666"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2905_1178">
                                        <rect width="20.9676" height="20.9676" fill="white" transform="translate(0.580872 0.516113)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </article>
                </section>
                <section>
                    <Image src={"/home/onlyLogo.svg"} width={30} height={30} alt="Logo de FlatMate" className="hidden md:block" />
                    <p className="text-center text-sm">©2024 helloflatmate — {t("legal_rights")}</p>
                </section>
            </footer>

            {/* Desktop */}

            <footer className="bg-[#f2efed] w-full flex-col gap-11 hidden md:flex py-10">
                <div className="flex justify-center gap-12 ">
                    <section className="flex gap-16 p-6">
                        <div className="flex flex-col gap-9">
                            <article className="flex flex-col gap-4">
                                <h2 className="font-bold uppercase text-lg">helloflatmate</h2>
                                <Link href="/sobre-nosotros" target="_blank" className="font-normal text-base">
                                    {t("link_about_us")}
                                </Link>
                                <Link href="/contacto" target="_blank" className="font-normal text-base">
                                    {t("contact")}
                                </Link>
                            </article>

                            <article className="flex flex-col gap-4">
                                <h2 className="font-bold uppercase text-lg">{t("legal_rights")}</h2>
                                <Link href="/privacy-policy" target="_blank" className="font-normal text-base">
                                    {t("link_privacy_policy")}
                                </Link>
                                <Link href="/cookies" target="_blank" className="font-normal text-base">
                                    {t("link_cookies_policy")}
                                </Link>
                                <Link href="/terminos-y-condiciones" target="_blank" className="font-normal text-base">
                                    {t("link_terms_and_conditions")}
                                </Link>
                            </article>
                        </div>
                        <div className="flex flex-col gap-9">
                            <article className="flex flex-col gap-4">
                                <h2 className="font-bold uppercase text-lg">{t("title_legal")}</h2>
                                <Link href="/como-funciona" target="_blank" className="font-normal text-base">
                                    {t("link_how_it_works")}
                                </Link>
                                <Link href="/clausulas" target="_blank" className="font-normal text-base">
                                    {t("link_clauses")}
                                </Link>
                            </article>
                            <article className="flex flex-col gap-4">
                                <h2 className="font-bold uppercase text-lg">{t("title_colaborators")}</h2>
                                <Link href="/colaboradores" className="font-normal text-base">
                                    {t("link_colaborators")}
                                </Link>
                            </article>
                        </div>
                    </section>
                    <section className="flex flex-col gap-7 p-6">
                        <h2 className="font-bold uppercase text-lg">{t("title_supp")}</h2>
                        <Link href="/faq" className="p-5 border border-[#676767] font-bold text-lg  text-center w-[15rem]">
                            {t("link_faq")}
                        </Link>
                    </section>

                    <section className="flex flex-col gap-7 p-6 w-[25rem]">
                        <article className="flex flex-wrap gap-4">
                            <h2 className="font-bold uppercase text-lg w-full">{t("title_follow_us")}</h2>
                            <Link href="#" target="_blank" className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 22" className="" aria-label="new-icon">
                                    <g clipPath="url(#clip0_2905_1174)">
                                        <path
                                            d="M10.4847 0.516113C7.63741 0.516113 7.28008 0.528563 6.1618 0.579454C5.0457 0.630563 4.28386 0.807261 3.61726 1.06652C2.92772 1.3343 2.34281 1.6925 1.76008 2.27545C1.17691 2.85818 0.818708 3.44309 0.550058 4.13241C0.290144 4.79923 0.113228 5.56129 0.0629922 6.67695C0.0129751 7.79524 -0.0001297 8.15278 -0.0001297 11C-0.0001297 13.8473 0.0125386 14.2035 0.0632109 15.3218C0.114538 16.4379 0.291236 17.1998 0.550276 17.8664C0.818272 18.5559 1.17647 19.1408 1.75942 19.7235C2.34193 20.3067 2.92685 20.6658 3.61595 20.9336C4.28299 21.1928 5.04504 21.3695 6.16092 21.4206C7.27921 21.4715 7.63632 21.484 10.4834 21.484C13.3308 21.484 13.6871 21.4715 14.8054 21.4206C15.9215 21.3695 16.6842 21.1928 17.3512 20.9336C18.0405 20.6658 18.6246 20.3067 19.2071 19.7235C19.7902 19.1408 20.1484 18.5559 20.4171 17.8666C20.6748 17.1998 20.8517 16.4377 20.9042 15.322C20.9544 14.2038 20.9675 13.8473 20.9675 11C20.9675 8.15278 20.9544 7.79545 20.9042 6.67717C20.8517 5.56107 20.6748 4.79923 20.4171 4.13263C20.1484 3.44309 19.7902 2.85818 19.2071 2.27545C18.6239 1.69228 18.0407 1.33408 17.3505 1.06652C16.6822 0.807261 15.9199 0.630563 14.8038 0.579454C13.6855 0.528563 13.3295 0.516113 10.4814 0.516113H10.4847ZM9.54417 2.4054C9.82331 2.40497 10.1348 2.4054 10.4847 2.4054C13.2839 2.4054 13.6156 2.41545 14.721 2.46569C15.7432 2.51243 16.298 2.68323 16.6676 2.82673C17.1568 3.01675 17.5056 3.2439 17.8723 3.61084C18.2393 3.97777 18.4664 4.32724 18.6569 4.81649C18.8004 5.18561 18.9714 5.74039 19.0179 6.76257C19.0682 7.86775 19.0791 8.19974 19.0791 10.9976C19.0791 13.7955 19.0682 14.1275 19.0179 15.2327C18.9712 16.2549 18.8004 16.8097 18.6569 17.1788C18.4669 17.668 18.2393 18.0164 17.8723 18.3831C17.5054 18.7501 17.157 18.9772 16.6676 19.1672C16.2984 19.3114 15.7432 19.4818 14.721 19.5285C13.6159 19.5787 13.2839 19.5897 10.4847 19.5897C7.68524 19.5897 7.35347 19.5787 6.24829 19.5285C5.22611 19.4813 4.67133 19.3105 4.30156 19.167C3.81231 18.977 3.46284 18.7498 3.0959 18.3829C2.72897 18.016 2.50181 17.6674 2.31136 17.1779C2.16786 16.8088 1.99684 16.254 1.95032 15.2318C1.90008 14.1267 1.89003 13.7947 1.89003 10.995C1.89003 8.19537 1.90008 7.86513 1.95032 6.75995C1.99706 5.73776 2.16786 5.18299 2.31136 4.81343C2.50138 4.32418 2.72897 3.97472 3.0959 3.60778C3.46284 3.24084 3.81231 3.01369 4.30156 2.82323C4.67111 2.67908 5.22611 2.50871 6.24829 2.46176C7.21543 2.41807 7.59023 2.40497 9.54417 2.40278V2.4054ZM16.0809 4.14617C15.3863 4.14617 14.8228 4.70903 14.8228 5.40381C14.8228 6.09837 15.3863 6.66188 16.0809 6.66188C16.7755 6.66188 17.339 6.09837 17.339 5.40381C17.339 4.70925 16.7755 4.14574 16.0809 4.14574V4.14617ZM10.4847 5.61611C7.51138 5.61611 5.10074 8.02676 5.10074 11C5.10074 13.9733 7.51138 16.3829 10.4847 16.3829C13.458 16.3829 15.8677 13.9733 15.8677 11C15.8677 8.02676 13.458 5.61611 10.4847 5.61611ZM10.4847 7.5054C12.4146 7.5054 13.9793 9.06991 13.9793 11C13.9793 12.93 12.4146 14.4947 10.4847 14.4947C8.55453 14.4947 6.99003 12.93 6.99003 11C6.99003 9.06991 8.55453 7.5054 10.4847 7.5054Z"
                                            fill="#666666"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2905_1174">
                                            <rect width="20.9683" height="20.9676" fill="white" transform="translate(0 0.516113)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                            <Link href="#" target="_blank" className="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 22 22"
                                    className=""
                                    aria-label="facebook-icon"
                                >
                                    <g clipPath="url(#clip0_2905_1178)">
                                        <path
                                            d="M21.0932 10.7354C21.0932 4.9297 16.3866 0.223145 10.5809 0.223145C4.77515 0.223145 0.0685959 4.9297 0.0685959 10.7354C0.0685959 15.6653 3.4628 19.8021 8.04153 20.9382V13.948H5.8739V10.7354H8.04153V9.35117C8.04153 5.77321 9.66084 4.11479 13.1736 4.11479C13.8397 4.11479 14.9889 4.24556 15.459 4.37592V7.28782C15.2109 7.26175 14.7799 7.24871 14.2446 7.24871C12.521 7.24871 11.855 7.90173 11.855 9.59926V10.7354H15.2887L14.6987 13.948H11.855V21.1708C17.0594 20.5421 21.0932 16.1101 21.0932 10.7354Z"
                                            fill="#666666"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2905_1178">
                                            <rect width="20.9676" height="20.9676" fill="white" transform="translate(0.580872 0.516113)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                        </article>
                    </section>
                </div>

                <div className="border-t border-[#676767] w-[90%] mx-auto"></div>

                <div className="flex justify-center gap-16">
                    <section className="flex gap-2 items-center">
                        <Image src={"/home/onlyLogo.svg"} width={50} height={30} alt="Logo de FlatMate" className="hidden md:block" />
                        <p className="text-center font-semibold">©2024 helloflatmate — {t("legal_rights")}</p>
                    </section>

                    <section className="flex gap-2 items-center p-4 justify-center">
                        <h2 className="font-bold uppercase text-lg w-full">{t("title_payment_methods")}</h2>
                        <Image src={"/home/new_home/paypal.svg"} width={50} height={50} alt="paypal" />
                        <Image src={"/home/new_home/visa.svg"} width={50} height={50} alt="visa" />
                        <Image src={"/home/new_home/mastercard.svg"} width={50} height={50} alt="mastercard" />
                        <Image src={"/home/new_home/americanexpress.svg"} width={50} height={50} alt="americanexpress" />
                        <Image src={"/home/new_home/unionpay.svg"} width={50} height={50} alt="unionpay" />
                    </section>
                </div>
            </footer>
        </>
    );
}

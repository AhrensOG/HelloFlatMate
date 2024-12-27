import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const MapSection = () => {
    const t = useTranslations("hellostudio_page.map_section");
    return (
        <div className="flex justify-center items-center w-full p-2 py-10">
            <div className="flex flex-col w-full max-w-screen-lg items-center justify-center gap-16 bg-white">
                {/* Left section (Blue box) */}
                <h1 className="text-4xl font-medium">{t("h1")}</h1>
                <div className="flex flex-col sm:flex-row w-full max-w-screen-lg items-stretch justify-between hover:scale-110 transition duration-500">
                    <div className="bg-blue-500 text-white sm:w-1/3 flex flex-col justify-between">
                        <div className="flex flex-col justify-between gap-0 p-8 pt-0">
                            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ZoomImagePromo__Icon"
              viewBox="0 0 128 128"
              width={86}
              height={86}
            >
              <path d="M109.5 115.6h-57c-.8 0-1.5-.7-1.5-1.5 0-4.2 1.6-8.2 4.6-11.2 3-3 6.9-4.7 11.2-4.7.8 0 1.6.1 2.4.2 1.4-3.2 3.8-5.9 6.9-7.7 5.3-3.1 11.9-3.1 17.2 0 4.5 2.7 7.5 7.3 8.2 12.4 2.4.3 4.7 1.4 6.4 3.2 2.1 2.1 3.2 4.9 3.2 7.8-.1.8-.8 1.5-1.6 1.5zm-55.4-3h53.8c-.3-1.6-1-3-2.2-4.2-1.2-1.2-2.6-2-4.2-2.3-.2.6-.8 1.1-1.5 1.1-.8 0-1.5-.7-1.5-1.5.1-5.1-2.5-9.8-6.9-12.4-4.4-2.6-9.8-2.6-14.1 0-2.7 1.6-4.7 4-5.8 6.8v.3c0 .3-.2.5-.3.7-.5 1.5-.7 3-.7 4.6 0 .8-.6 1.5-1.5 1.5-.8 0-1.5-.6-1.5-1.5 0-1.5.1-3 .5-4.4-.5-.1-1-.1-1.4-.1-3.3 0-6.6 1.4-9 3.8-2.1 2.1-3.4 4.7-3.7 7.6zM77 63.5H43.6c-2-.1-3.8-1.3-4.5-3.2L38 57.2h-.1c-4.8-.8-9.5-2.3-13.9-4.4-7.1-3.3-12.1-9.9-13.3-17.7L7.5 13.7c-.1-.4.1-.9.3-1.2S8.6 12 9 12h19.1c.8 0 1.5.7 1.5 1.5S29 15 28.1 15h-6.6l6.8 9.1c3.3 4.4 8.6 7 14.1 7h57.4c2.9 0 5.6 1.1 7.6 3.2 1.7 1.7 2.7 3.9 2.9 6.3l1.4.1c3.1-.1 6.1 1.5 7.7 4.2 1.6 2.7 1.6 6.1 0 8.9-1.6 2.7-4.6 4.4-7.8 4.2H82.9c-.1.9-.4 1.7-.8 2.5-.9 1.9-3 3-5.1 3zm-18.5-3h18.2c1.2.1 2.3-.5 2.9-1.5.6-1 .6-2.2 0-3.3-.6-1-1.7-1.6-2.9-1.5H53l5.5 6.3zm-19.9-11 3.3 9.8c.3.7 1 1.2 1.8 1.2h10.9l-5.7-6.7-.3-.3-3.3-4h-6.7zM82.7 55h29.1c2.1.1 4.1-1 5.1-2.8s1.1-4 0-5.8c-1.1-1.8-3-2.9-5.1-2.8h-.1l-2.8-.2h-9.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7.6c-.2-1.5-1-3-2-4.1-1.4-1.5-3.4-2.3-5.5-2.3H42.5c-6.5.1-12.6-3-16.5-8.1L17.8 15h-7.1l3 19.7c1 6.8 5.4 12.5 11.6 15.4 3.7 1.7 7.6 3 11.6 3.8L35 48.4c-.2-.5-.1-1 .2-1.4.3-.4.7-.6 1.2-.6H46c.4 0 .9.2 1.1.5l3.5 4.1h26.1c2.2-.1 4.3 1 5.5 3 .2.4.4.7.5 1zm7.5-11.5h-4.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h4.8c.8 0 1.5.7 1.5 1.5s-.6 1.5-1.5 1.5zm-14.4 0H71c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h4.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zm-14.5 0h-4.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h4.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
            </svg> */}
                            <div className="relative w-32 h-32">
                                <Image src={"/newIcons/13-100.png"} fill alt="Torres de Serranos" className="object-cover" />
                            </div>
                            <div>
                                <h2 className="text-3xl text-black font-bold mb-4">{t("h2")}</h2>
                                <p className="text-black text-lg">{t("p")}</p>
                            </div>
                        </div>
                        <div className="p-8 bg-[#b2d4ff]">
                            <p className="mb-2 font-bold text-black">{t("p_2")}</p>
                            <div className="flex justify-center items-center gap-4">
                                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded text-sm">{t("btn_1")}</button>
                                <span className="font-bold text-lg text-black">&</span>
                                <button className="bg-black text-white font-bold py-2 px-4 rounded text-sm">{t("btn_2")}</button>
                            </div>
                        </div>
                    </div>

                    {/* Right section (Map image) */}
                    <div className="relative sm:w-2/3">
                        <Image src="/home/mapa2.png" alt="Mapa" width={900} height={900} className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;

"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Dropdown({ mobile = false }) {
  const router = useRouter();
  const pathname = usePathname(); // Obtén el pathname actual
  const [selectedLanguage, setSelectedLanguage] = useState("ES");

  // Cargar el idioma preferido desde localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") || "ES";
    setSelectedLanguage(savedLanguage);
  }, []);

  function getCurrentSearchParams() {
    if (typeof window === "undefined") return "";
    const search = window.location.search; // conserva ?p=68&r=189&lo=409
    return search || "";
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("preferredLanguage", language);
    document.cookie = `preferred_locale=${language.toLowerCase()}; path=/`;

    const search = getCurrentSearchParams();
    const newPathname = pathname.replace(
      /^\/(es|en)/,
      `/${language.toLowerCase()}`
    );
    router.push(`${newPathname}${search}`); // ✅ conserva query
  };

  // useEffect(() => {
  //   const defaultLanguage = localStorage.getItem("preferredLanguage");
  //   const search = getCurrentSearchParams();

  //   // Se ejecuta solo al cargar la página
  //   if (
  //     defaultLanguage &&
  //     !window.location.pathname.startsWith(
  //       `/${defaultLanguage.toLowerCase()}`
  //     ) &&
  //     (window.location.pathname.startsWith("/en") ||
  //       window.location.pathname.startsWith("/es"))
  //   ) {
  //     const newPathname = window.location.pathname.replace(
  //       /^\/(es|en)/,
  //       `/${defaultLanguage.toLowerCase()}`
  //     );
  //     router.replace(`${newPathname}${search}`);
  //   }
  // }, []); // ← dependencia vacía

  return (
    <Menu as="div" className="relative inline-block text-left border-none">
      <div className="w-[48px] h-[48px] flex justify-between items-center">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50">
          <span>{selectedLanguage}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="bg-white absolute right-0 z-10 w-[3.5rem] origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          {["ES", "EN"].map((language) => (
            <MenuItem key={mobile ? `${language}-mobile` : language}>
              <button
                type="button"
                onClick={() => handleLanguageChange(language)}
                className={`w-full block px-4 py-2 text-sm ${
                  selectedLanguage === language
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } focus:bg-gray-100`}>
                {language}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

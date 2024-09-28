import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function AccountDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left border-none">
      <div className="w-[48px] h-[48px] flex justify-between items-center">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image src="/nav_bar/account.svg" fill alt="Cuenta del usuario" />
            </div>
            <span className="hidden sm:block">Cuenta</span>
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              href={"/pages/auth?register=true"}
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Registrarse
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href={"/pages/auth"}
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Iniciar sesión
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

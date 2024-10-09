import { Context } from "@/app/context/GlobalContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function AccountDropdown() {
  const { state } = useContext(Context);
  const user = state?.user; // Acceder al usuario desde el estado

  // Definir las rutas según el rol del usuario
  const userProfileLink =
    user?.role === "CLIENT"
      ? "/pages/user/profile"
      : user?.role === "ADMIN"
      ? "/pages/admin"
      : null;

  return (
    <Menu as="div" className="relative inline-block text-left border-none">
      <div>
        {/* Si el usuario está autenticado, mostrar el enlace correspondiente */}
        {user ? (
          <div className="w-[48px] h-[48px] flex justify-center items-center">
            <Link href={userProfileLink || "/"}>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50">
                <div className="relative w-6 h-6">
                  <Image
                    src="/nav_bar/account.svg"
                    fill
                    alt="Cuenta del usuario"
                  />
                </div>
              </MenuButton>
            </Link>
          </div>
        ) : (
          // Si no hay usuario, mostrar opciones de "Registrarse" y "Iniciar sesión"
          <div className="w-[48px] h-[48px] flex justify-between items-center">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6">
                  <Image
                    src="/nav_bar/account.svg"
                    fill
                    alt="Cuenta del usuario"
                  />
                </div>
              </div>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 top-10 z-20 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
              <div className="divide-y-2">
                <MenuItem>
                  <Link
                    href={"/pages/auth?register=true"}
                    type="button"
                    className="block px-4 py-4 text-center text-sm text-gray-700 data-[focus]:bg-gray-100 rounded-t-md data-[focus]:text-gray-900"
                  >
                    Registrarse
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href={"/pages/auth"}
                    type="button"
                    className="block px-4 py-4 text-center text-sm text-gray-700 data-[focus]:bg-gray-100 rounded-b-md data-[focus]:text-gray-900"
                  >
                    Iniciar sesión
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </div>
        )}
      </div>
    </Menu>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center">
      {/* MOBILE DESIGN */}
      <div className="bg-gray-400 p-6 relative w-full flex flex-col items-center justify-center">
        <div className="w-full sm:hidden flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/home/grayLogo.svg" // Cambiar la ruta de la imagen del logo
              alt="Logo HelloFlatMate"
              width={125}
              height={42}
            />
          </div>
          <div className="w-full py-6">
            <p className="font-medium text-lg text-center">
              Desde 2011 colaborando en la creación de alojamientos dignos para
              estudiantes y nómadas digitales.
            </p>
          </div>

          {/* Redes sociales */}
          <div className="flex space-x-10 mb-6">
            <a href="#" className="w-12 h-12 flex items-center justify-center">
              <Image
                src={"/home/facebook.svg"}
                width={25}
                height={25}
                alt="Centro de ayúda"
              />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center">
              <Image
                src={"/home/instagram.svg"}
                width={25}
                height={25}
                alt="Centro de ayúda"
              />
            </a>
          </div>

          {/* Enlaces principales */}
          <div className="flex justify-center space-x-20 mb-10">
            <div className="flex flex-col items-start space-y-4">
              <h3 className="font-bold text-sm">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-xs underline">
                    ¿Quiénes somos?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs underline">
                    FAQS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start space-y-4">
              <h3 className="font-['Plus Jakarta Sans'] font-bold text-sm">
                ¿En qué podemos ayudarte?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/helpCenter.svg"}
                    width={25}
                    height={25}
                    alt="Centro de ayúda"
                  />
                  <Link href="#" alt="Centro de ayúda" className="text-xs">
                    Centro de ayuda
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/chat.svg"}
                    width={25}
                    height={25}
                    alt="Centro de ayúda"
                  />

                  <Link href="#" alt="Habla con nostros" className="text-xs">
                    Habla con nosotros
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/contact.svg"}
                    width={25}
                    height={25}
                    alt="Centro de ayúda"
                  />

                  <Link href="#" alt="Contacto" className="text-xs">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DESKTOP DESIGN */}
        <div className="w-full sm:flex flex-col gap-4 hidden bg-gray-400 relative items-center justify-between min-h-72">
          {/* Enlaces principales */}
          <div className="w-full flex justify-around items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-bold text-sm sm:text-lg">
                ¿En qué podemos ayudarte?
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/helpCenter.svg"}
                    width={35}
                    height={35}
                    alt="Centro de ayúda"
                  />
                  <Link
                    href="#"
                    alt="Centro de ayúda"
                    className="text-xs sm:text-base"
                  >
                    Centro de ayuda
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/chat.svg"}
                    width={35}
                    height={35}
                    alt="Centro de ayúda"
                  />

                  <Link
                    href="#"
                    alt="Habla con nostros"
                    className="text-xs sm:text-base"
                  >
                    Habla con nosotros
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <Image
                    src={"/home/contact.svg"}
                    width={35}
                    height={35}
                    alt="Centro de ayúda"
                  />

                  <Link
                    href="#"
                    alt="Contacto"
                    className="text-xs sm:text-base"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* Logo */}
              <div className="">
                <Image
                  src="/home/grayLogo.svg" // Cambiar la ruta de la imagen del logo
                  alt="Logo HelloFlatMate"
                  width={200}
                  height={80}
                />
              </div>
              <div className="w-full py-6">
                <p className="font-medium text-lg text-center max-w-[32rem]">
                  Desde 2011 colaborando en la creación de alojamientos dignos
                  para estudiantes y nómadas digitales.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <h3 className="font-bold text-sm sm:text-lg">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    alt="¿Quiénes somos?"
                    className="text-xs sm:text-base underline"
                  >
                    ¿Quiénes somos?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    alt="FAQS"
                    className="text-xs sm:text-base underline"
                  >
                    FAQS
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    alt="Blog"
                    className="text-xs sm:text-base underline"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Derechos reservados */}
          <div className="w-full text-center font-bold">
            <p className="text-sm lg:text-lg text-black">
              Todos los derechos reservados @ HelloFlatmate 2024
            </p>
          </div>
        </div>
      </div>
      <div className="h-16 bg-black w-full" />
    </footer>
  );
}

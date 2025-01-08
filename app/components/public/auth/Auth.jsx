"use client";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import AuthModal from "./AuthModal";

import Link from "next/link";
import Image from "next/image";
import { logInWithGoogle } from "@/app/firebase/logInWithGoogle";
import { logInWithFacebook } from "@/app/firebase/logInWithFacebook";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { logInWithEmailAndPassword } from "@/app/firebase/loginWithEmailAndPassword";

export default function Auth() {
  const searchParams = useSearchParams(); // Captura los parámetros de la URL
  const redirect = searchParams.get("redirect"); // Obtén el valor del parámetro `redirect`
  const createAccount = searchParams.get("register");
  const [register, setRegister] = useState(createAccount ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const [registerProvider, setRegisterProvider] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { state } = useContext(Context);

  useEffect(() => {
    if (state.user) {
      router.push(redirect || "/");
    }
  }, [state.user, isOpen]);

  const handleIsRegister = () => {
    setRegister(!register);
  };

  const openModal = (provider) => {
    setRegisterProvider(provider);
    setIsOpen(true);
  };

  const handleAccept = async () => {
    try {
      if (registerProvider === "google") {
        await logInWithGoogle();
      } else if (registerProvider === "facebook") {
        await logInWithFacebook();
      } else {
        toast.error("No se reconoce el proveedor de registro");
      }
      setIsOpen(false);
      return router.push(redirect || "/");
    } catch (error) {
      toast.error("Fallo la autenticación. Intente nuevamente.");
    }
  };

  const handleReject = () => {
    setIsOpen(false); // Cerrar el modal al rechazar
  };

  const handleLoginFacebook = async () => {
    try {
      await logInWithFacebook();
      return router.push(redirect || "/");
    } catch (error) {
      toast.error("Fallo la autenticación. Intente nuevamente.");
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await logInWithGoogle();
      return router.push(redirect || "/");
    } catch (error) {
      toast.error("Fallo la autenticación. Intente nuevamente.");
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    try {
      await logInWithEmailAndPassword(email, password);
      toast.success("Inicio de sesión exitoso.");
      router.push(redirect || "/");
    } catch (error) {
      toast.error("Fallo la autenticación. Verifica tu correo y contraseña.");
    }
  };

  return (
    <section className="flex justify-center items-center w-full sm:bg-blue-500">
      <div className="relative sm:w-1/2 lg:w-2/3 h-screen sm:block hidden">
        <Image
          src={"/auth/desktop.png"}
          fill
          alt="Desktop Auth Image"
          className="object-cover object-bottom"
          priority
        />
      </div>
      <div
        className={`auth-card flex flex-col mx-3 w-full max-w-xs sm:max-w-none sm:w-1/2 lg:w-1/3 gap-10 items-center font-normal text-base sm:justify-center sm:h-screen`}
      >
        <Image
          className="logo-auth sm:block hidden"
          src="/auth/whiteLogo.png"
          alt="Logo de Autenticación"
          width={200}
          height={61.2}
        />
        <Image
          className="logo-auth sm:hidden"
          src="/logo-auth.svg"
          alt="Logo de Autenticación"
          width={200}
          height={100}
        />
        <div className="buttons-auth flex flex-col gap-5 items-center w-full">
          {/* <button
            type="button"
            onClick={
              register ? () => openModal("facebook") : handleLoginFacebook
            }
            className="facebook-auth flex px-0.5 items-center justify-center text-center text-white bg-resolution-blue gap-4 rounded-xl w-[100%] h-[3.25rem] text-base"
            aria-label={
              register ? "Regístrate con Facebook" : "Iniciar con Facebook"
            }
          >
            <span className="pl-0.5">
              <Image
                src="/face-logo.svg"
                alt="Logo de Facebook"
                width={24}
                height={24}
              />
            </span>
            {register ? "Regístrate con Facebook" : "Iniciar con Facebook"}
          </button> */}
          <button
            type="button"
            onClick={register ? () => openModal("google") : handleLoginGoogle}
            className="google-auth flex px-0.5 items-center justify-center text-center gap-4 rounded-xl w-[100%] h-[3.25rem] text-base text-black opacity-90 bg-white shadow-google-auth"
            aria-label={
              register ? "Regístrate con Google" : "Iniciar con Google"
            }
          >
            <span>
              <Image
                src="/google-logo.svg"
                alt="Logo de Google"
                width={24}
                height={24}
              />
            </span>
            {register ? "Regístrate con Google" : "Iniciar con Google"}
          </button>
          
          {!register && (
            <span className="flex items-center text-sm font-thin w-full sm:text-white">
              <span className="flex-1 border-t border-gray-300 mr-2"></span>{" "}
              {/* Línea izquierda */}
              También puedes
              <span className="flex-1 border-t border-gray-300 ml-2"></span>{" "}
              {/* Línea derecha */}
            </span>
          )}

          {!register && (
            // Formulario de inicio de sesión
            <form
              onSubmit={handleLoginWithEmail}
              className="flex flex-col gap-4 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="border p-2 rounded-md drop-shadow-md"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border p-2 rounded-md drop-shadow-md"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 sm:hover:bg-blue-500 sm:border sm:border-white drop-shadow-md"
              >
                Iniciar Sesión
              </button>
            </form>
          )}
          {/* <p className="register-or-login-auth text-wrap text-xs sm:text-white">
            {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            <button
              onClick={handleIsRegister}
              className="a-auth text-resolution-blue pl-1 sm:text-white"
              href="#"
            >
              {register ? " Iniciar Sesión" : " Regístrate"}
            </button>
          </p> */}
        </div>
        <AuthModal
          isOpen={isOpen}
          handleAccept={() =>
            toast.promise(handleAccept(), {
              loading: "Cargando...",
              success: "Iniciando Sesion",
              error: "Fallo la autenticación. Intente nuevamente.",
            })
          }
          handleReject={handleReject}
        />
      </div>
    </section>
  );
}

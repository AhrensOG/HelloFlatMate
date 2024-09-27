"use client";
import { toast } from "sonner";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { plus_jakarta } from "@/font";
import Link from "next/link";
import Image from "next/image";
import { logInWithGoogle } from "@/app/firebase/logInWithGoogle";
import { logInWithFacebook } from "@/app/firebase/logInWithFacebook";
import { useRouter, useSearchParams } from "next/navigation";

export default function Auth() {
  const searchParams = useSearchParams(); // Captura los parámetros de la URL
  const redirect = searchParams.get("redirect"); // Obtén el valor del parámetro `redirect`
  const createAccount = searchParams.get("register");
  const [register, setRegister] = useState( createAccount ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const [registerProvider, setRegisterProvider] = useState(null);
  const router = useRouter();

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
      router.push(redirect || "/"); // Redirige a la URL de redirect o al home
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
      router.push(redirect || "/"); // Redirige a la URL de redirect o al home
    } catch (error) {
      toast.error("Fallo la autenticación. Intente nuevamente.");
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await logInWithGoogle();
      router.push(redirect || "/"); // Redirige a la URL de redirect o al home
    } catch (error) {
      toast.error("Fallo la autenticación. Intente nuevamente.");
    }
  };

  return (
    <section
      className={`${plus_jakarta.className} auth-card flex flex-col m-3 gap-10 items-center font-normal text-base self-start pt-9`}
    >
      <Image
        className="logo-auth"
        src="/logo-auth.svg"
        alt="Logo de Autenticación"
        layout="responsive"
        width={100}
        height={100}
      />
      {/* <h1 className="title-auth pb-5">
        {register ? "Crear una Cuenta" : "Iniciar Sesión"}
      </h1> */}
      <div className="buttons-auth flex flex-col gap-5 items-center w-full">
        <button
          type="button"
          onClick={register ? () => openModal("facebook") : handleLoginFacebook}
          className="facebook-auth flex px-0.5 items-center justify-center text-center text-white bg-resolution-blue gap-4 rounded-xl w-[100%] h-[3.25rem] text-base"
          aria-label={
            register
              ? "Registrarse con Facebook"
              : "Iniciar Sesión con Facebook"
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
          {register
            ? "Registrarse con Facebook"
            : "Iniciar Sesión con Facebook"}
        </button>
        <button
          type="button"
          onClick={register ? () => openModal("google") : handleLoginGoogle}
          className="google-auth flex px-0.5 items-center justify-center text-center gap-4 rounded-xl w-[100%] h-[3.25rem] text-base text-black opacity-90 bg-white shadow-google-auth"
          aria-label={
            register ? "Registrarse con Google" : "Iniciar Sesión con Google"
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
          {register ? "Registrarse con Google" : "Iniciar Sesión con Google"}
        </button>
        <p className="register-or-login-auth text-wrap text-xs">
          {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          <Link
            onClick={handleIsRegister}
            className="a-auth text-resolution-blue"
            href="#"
          >
            {register ? " Iniciar Sesión" : " Registrarse"}
          </Link>
        </p>
      </div>
      <AuthModal
        isOpen={isOpen}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
    </section>
  );
}

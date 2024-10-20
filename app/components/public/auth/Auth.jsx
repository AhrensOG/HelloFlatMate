"use client";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { plus_jakarta } from "@/font";
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
      <div className="buttons-auth flex flex-col gap-5 items-center w-full">
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
              className="border p-2 rounded-md"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="border p-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
        )}
        <span className="flex items-center text-sm font-thin w-full">
          <span className="flex-1 border-t border-gray-300 mr-2"></span>{" "}
          {/* Línea izquierda */}
          También puedes
          <span className="flex-1 border-t border-gray-300 ml-2"></span>{" "}
          {/* Línea derecha */}
        </span>
        <button
          type="button"
          onClick={register ? () => openModal("facebook") : handleLoginFacebook}
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
        </button>
        <button
          type="button"
          onClick={register ? () => openModal("google") : handleLoginGoogle}
          className="google-auth flex px-0.5 items-center justify-center text-center gap-4 rounded-xl w-[100%] h-[3.25rem] text-base text-black opacity-90 bg-white shadow-google-auth"
          aria-label={register ? "Regístrate con Google" : "Iniciar con Google"}
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
        <p className="register-or-login-auth text-wrap text-xs">
          {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          <Link
            onClick={handleIsRegister}
            className="a-auth text-resolution-blue"
            href="#"
          >
            {register ? " Iniciar Sesión" : " Regístrate"}
          </Link>
        </p>
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
    </section>
  );
}

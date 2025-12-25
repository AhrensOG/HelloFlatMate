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
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const createAccount = searchParams.get("register");
  const [register, setRegister] = useState(createAccount ? true : false);
  const [isOpen, setIsOpen] = useState(false);
  const [registerProvider, setRegisterProvider] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { state } = useContext(Context);

  const [privacyWithAds, setPrivacyWithAds] = useState(false);
  const [privacyWithoutAds, setPrivacyWithoutAds] = useState(false);

  const [highlightConsent, setHighlightConsent] = useState(false);

  const hasConsent = () =>
    (privacyWithAds || privacyWithoutAds) &&
    !(privacyWithAds && privacyWithoutAds);

  const triggerValidationHighlight = () => {
    if (!hasConsent()) {
      setHighlightConsent(true);
      toast.info("Debe seleccionar una opción de privacidad.");
      setTimeout(() => setHighlightConsent(false), 1500);
      return true; // Hay error
    }
    return false; // Todo ok
  };

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
        toast.info("No se reconoce el proveedor de registro");
      }
      setIsOpen(false);
      return router.push(redirect || "/");
    } catch (error) {
      toast.info("Fallo la autenticación. Intente nuevamente.");
    }
  };

  const handleReject = () => {
    setIsOpen(false);
  };

  const handleLoginGoogle = async () => {
    if (triggerValidationHighlight()) return;

    const toastId = toast.loading("Autenticando...");
    try {
      await logInWithGoogle();
      toast.success("¡Inicio de sesión exitoso!", { id: toastId });
      return router.push(redirect || "/");
    } catch (error) {
      toast.info("Fallo la autenticación. Intente nuevamente.", {
        id: toastId,
      });
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (triggerValidationHighlight()) return;

    const toastId = toast.loading("Autenticando...");
    try {
      await logInWithEmailAndPassword(email, password);
      toast.success("¡Inicio de sesión exitoso!", { id: toastId });
      router.push(redirect || "/");
    } catch (error) {
      toast.info("Fallo la autenticación. Verifica tu correo y contraseña.", {
        id: toastId,
      });
    }
  };

  const consentHighlightClass = highlightConsent
    ? "ring-1 ring-yellow-400 p-3 rounded-lg bg-yellow-100/20 duration-300 animate-pulse"
    : "transition-all duration-300";

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
        className={`auth-card flex flex-col mx-3 w-full max-w-xs sm:max-w-none sm:w-1/2 lg:w-1/3 gap-10 items-center font-normal text-base sm:justify-center sm:h-screen`}>
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
          <button
            type="button"
            onClick={
              register
                ? () => {
                    if (triggerValidationHighlight()) return;
                    openModal("google");
                  }
                : handleLoginGoogle
            }
            className={`google-auth flex px-0.5 items-center justify-center text-center gap-4 rounded-xl w-[100%] h-[3.25rem] text-base text-black opacity-90 bg-white shadow-google-auth active:scale-95 transition-transform ${
              !hasConsent() ? "opacity-70" : ""
            }`}
            aria-label={
              register ? "Regístrate con Google" : "Iniciar con Google"
            }>
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

          {register && (
            <div
              className={`text-sm text-gray-600 sm:text-white space-y-3 ${consentHighlightClass}`}>
              <p>
                De conformidad con lo que establece la legislación vigente en
                materia de Protección de Datos de Carácter Personal, se le
                informa que los datos personales que nos facilite a través de
                dicho formulario serán tratados por{" "}
                <strong>HELLO FLAT MATE, S.L.</strong>, con la finalidad de
                gestionar su alta como usuario registrado. Para más información
                consulte la{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-blue-600 sm:text-white font-semibold underline">
                  política de privacidad
                </Link>
                .
              </p>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyWithAds}
                  onChange={() => {
                    const next = !privacyWithAds;
                    setPrivacyWithAds(next);
                    if (next) setPrivacyWithoutAds(false);
                  }}
                  className="mt-0.5"
                />
                <span>
                  He leído y acepto la política de privacidad de HELLO FLAT
                  MATE, S.L., <strong>así como el envío de publicidad</strong>.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyWithoutAds}
                  onChange={() => {
                    const next = !privacyWithoutAds;
                    setPrivacyWithoutAds(next);
                    if (next) setPrivacyWithAds(false);
                  }}
                  className="mt-0.5"
                />
                <span>
                  He leído y acepto la política de privacidad de HELLO FLAT
                  MATE, S.L.,{" "}
                  <strong>
                    pero no estoy interesado en recibir publicidad
                  </strong>
                  .
                </span>
              </label>
            </div>
          )}

          {!register && (
            <>
              <span className="flex items-center text-sm font-thin w-full sm:text-white">
                <span className="flex-1 border-t border-gray-300 mr-2"></span>{" "}
                También puedes
                <span className="flex-1 border-t border-gray-300 ml-2"></span>{" "}
              </span>

              <form
                onSubmit={handleLoginWithEmail}
                className="flex flex-col gap-4 w-full">
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

                <div
                  className={`text-sm text-gray-600 sm:text-white space-y-3 ${consentHighlightClass}`}>
                  <p>
                    De conformidad con lo que establece la legislación vigente
                    en materia de Protección de Datos de Carácter Personal, se
                    le informa que los datos personales que nos facilite a
                    través de dicho formulario serán tratados por{" "}
                    <strong>HELLO FLAT MATE, S.L.</strong>, con la finalidad de
                    gestionar su alta como usuario registrado. Para más
                    información consulte la{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-blue-600 sm:text-white font-semibold underline">
                      política de privacidad
                    </Link>
                    .
                  </p>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyWithAds}
                      onChange={() => {
                        const next = !privacyWithAds;
                        setPrivacyWithAds(next);
                        if (next) setPrivacyWithoutAds(false);
                      }}
                      className="mt-0.5"
                    />
                    <span>
                      He leído y acepto la política de privacidad de HELLO FLAT
                      MATE, S.L.,{" "}
                      <strong>así como el envío de publicidad</strong>.
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyWithoutAds}
                      onChange={() => {
                        const next = !privacyWithoutAds;
                        setPrivacyWithoutAds(next);
                        if (next) setPrivacyWithAds(false);
                      }}
                      className="mt-0.5"
                    />
                    <span>
                      He leído y acepto la política de privacidad de HELLO FLAT
                      MATE, S.L.,{" "}
                      <strong>
                        pero no estoy interesado en recibir publicidad
                      </strong>
                      .
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 sm:hover:bg-blue-500 sm:border sm:border-white drop-shadow-md active:scale-95 transition-transform">
                  Iniciar Sesión
                </button>
              </form>
            </>
          )}
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

"use client";
import '../../../styles/auth.component.css';
import { toast } from "sonner";
import { useState } from 'react';
import { logInWithGoogle } from '@/app/firebase/logInWithGoogle';
import { logInWithFacebook } from '@/app/firebase/logInWithFacebook';
import AuthModal from './AuthModal';
import { plus_jakarta } from '@/font';
import Link from 'next/link';
import Image from 'next/image';

export default function Auth() {
    const [register, setRegister] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [registerProvider, setRegisterProvider] = useState(null);

    const handleIsRegister = () => {
        setRegister(!register);
    };

    const openModal = (provider) => {
        setRegisterProvider(provider);
        setIsOpen(true);
    }

    const handleAccept = () => {
        if (registerProvider === 'google') {
            logInWithGoogle();
        } else if (registerProvider === 'facebook') {
            logInWithFacebook();
        } else {
            toast.error('No se reconoce el proveedor de registro');
        }
        setIsOpen(false); // Cerrar el modal después de aceptar
    };

    const handleReject = () => {
        setIsOpen(false); // Cerrar el modal al rechazar
    };

    return (
        <section className={`${plus_jakarta.className} auth-card flex flex-col m-3 gap-5 items-center font-normal text-base self-start pt-9`}>
            <Image className="logo-auth" src="/logo-auth.svg" alt="Logo de Autenticación" width={322} height={108} />
            <h1 className="title-auth pb-5">{register ? "Crear una Cuenta" : "Iniciar Sesión"}</h1>
            <div className="buttons-auth flex flex-col gap-5 w-max items-center">
                <button
                    type='button'
                    onClick={register ? () => openModal('facebook') : logInWithFacebook}
                    className="facebook-auth flex px-0.5 items-center justify-center text-center"
                    aria-label={register ? "Registrarse con Facebook" : "Iniciar Sesión con Facebook"}
                >
                    <span className='pl-0.5'><Image src="/face-logo.svg" alt="Logo de Facebook" width={24} height={24} /></span>
                    {register ? "Registrarse con Facebook" : "Iniciar Sesión con Facebook"}
                </button>
                <button
                    type='button'
                    onClick={register ? () => openModal('google') : logInWithGoogle}
                    className="google-auth flex px-0.5 items-center justify-center text-center"
                    aria-label={register ? "Registrarse con Google" : "Iniciar Sesión con Google"}
                >
                    <span><Image src="/google-logo.svg" alt="Logo de Google" width={24} height={24} /></span>
                    {register ? "Registrarse con Google" : "Iniciar Sesión con Google"}
                </button>
                <p className="register-or-login-auth text-wrap text-xs">
                    {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
                    <Link onClick={handleIsRegister} className="a-auth" href="#">
                        {register ? " Iniciar Sesión" : " Registrarse"}
                    </Link>
                </p>
            </div>
            {isOpen && <AuthModal isOpen{...isOpen} handleAccept={handleAccept} handleReject={handleReject} />}
        </section>
    );
}

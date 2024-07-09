"use client";
import '../../../styles/auth.component.css';
import { toast } from "sonner";
import { useState } from 'react';
import { logInWithGoogle } from '@/app/firebase/logInWithGoogle';
import { logInWithFacebook } from '@/app/firebase/logInWithFacebook';
import AuthModal from './AuthModal';
import { plus_jakarta } from '@/font';

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
        <section className={`${plus_jakarta.className} auth-card flex flex-col m-3 gap-5 items-center font-normal text-base`}>
            <img className="logo-auth" src="/logo-auth.svg" alt="logo" />
            <h4 className="title-auth pb-5">{register ? "Crear una Cuenta" : "Iniciar Sesion"}</h4>
            <div className="buttons-auth flex flex-col gap-5 w-max items-center">
                <button
                    type='button'
                    onClick={register ? () => openModal('facebook') : logInWithFacebook}
                    className="facebook-auth flex px-0.5 items-center justify-center text-center"
                >
                    <span className='pl-0.5'><img src="/face-logo.svg" alt="Facebook logo" /></span>
                    {register ? "Registrarse con Facebook" : "Iniciar Sesion con Facebook"}
                </button>
                <button
                    type='button'
                    onClick={register ? () => openModal('google') : logInWithGoogle}
                    className="google-auth flex px-0.5 items-center justify-center text-center"
                >
                    <span><img src="/google-logo.svg" alt="Google logo" /></span>
                    {register ? "Registrarse con Google" : "Iniciar Sesion con Google"}
                </button>
                <h6 className="register-or-login-auth text-wrap text-xs">
                    {register ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta una cuenta?"}
                    <a onClick={handleIsRegister} className="a-auth" href="#">
                        {register ? " Iniciar Sesion" : " Registrarse"}
                    </a>
                </h6>
            </div>
            {isOpen && <AuthModal handleAccept={handleAccept} handleReject={handleReject} />}
        </section>
    );
}

import {
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

export const logInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
    } catch (error) {
        toast.error('Ocurrio un error al autenticar.');
        return error;
    }
}
import {
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";
import axios from "axios";

export const logInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        axios.post('/api/auth', {
            id: credentials.user.uid,
            name: credentials.user.displayName,
            email: credentials.user.email,
            profile_picture: credentials.user.photoURL
        })

    } catch (error) {
        toast.error('Ocurrio un error al autenticar.');
        return error;
    }
}
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";

export const logInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
  } catch (error) {
    toast.error('Ocurrió un error al autenticar.');
    return error;
  }
};

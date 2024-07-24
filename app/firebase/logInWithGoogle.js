import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";
import axios from "axios";

export const logInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    const res = await axios.post("/api/auth", {
      id: credentials.user.uid,
      name: credentials.user.displayName,
      email: credentials.user.email,
      profile_picture: credentials.user.photoURL,
    });
    return res.data;
  } catch (error) {
    toast.error("Ocurrió un error al autenticar.");
    return error;
  }
};

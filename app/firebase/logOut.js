import { signOut } from "firebase/auth";
import { auth } from "./config";
import { toast } from "sonner";
import axios from "axios";

export const logOut = async () => {
  try {
    await signOut(auth);
    await axios.post("/api/auth/logout");
    toast.success("Has cerrado sesión exitosamente.");
  } catch (error) {
    toast.error("Ocurrió un error al cerrar sesión.");
    return error;
  }
};

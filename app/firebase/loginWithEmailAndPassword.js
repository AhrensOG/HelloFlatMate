import { signInWithEmailAndPassword } from "firebase/auth"; // Importar la función correcta
import { auth } from "./config"; // Importar la configuración de Firebase
import axios from "axios";

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    // Autenticar al usuario con email y contraseña
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message); // Lanzar el mensaje de error
  }
};

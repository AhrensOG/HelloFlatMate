import { auth } from "@/app/firebase/config";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const SERVER_URL_AUTH_ENDPOINT = "/api/auth";

export const isUserLogged = async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        const data = await axios.post(`${SERVER_URL_AUTH_ENDPOINT}`, {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          accessToken: user.accessToken,
        });

        await dispatch({ type: "IS_USER_LOGGED", payload: data.data });
        return true;
      } else {
        await dispatch({ type: "IS_USER_LOGGED", payload: false });
        return false;
      }
    } catch (error) {
      return error;
    }
  });
};

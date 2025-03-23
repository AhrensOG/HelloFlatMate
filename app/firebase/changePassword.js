import { updatePassword } from "firebase/auth";
import { auth } from "./config";

export async function changePassword(newPassword) {
    try {
        const user = auth.currentUser;
        await updatePassword(user, newPassword);
    } catch (error) {
        throw new Error(error);
    }
}

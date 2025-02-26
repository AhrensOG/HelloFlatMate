import admin from "firebase-admin";
import serviceAccount from "./helloflatmateadminsdk.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const authAdmin = admin.auth();

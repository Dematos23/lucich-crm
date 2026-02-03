import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId) {
  throw new Error("❌ Falta la variable de entorno FIREBASE_PROJECT_ID");
}

if (!clientEmail) {
  throw new Error("❌ Falta la variable de entorno FIREBASE_CLIENT_EMAIL");
}

if (!privateKey) {
  throw new Error("❌ Falta la variable de entorno FIREBASE_PRIVATE_KEY");
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;

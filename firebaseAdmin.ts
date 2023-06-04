import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

let serviceAccount;

if (process.env.NODE_ENV === 'test') {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_TEST ?? '{}');
} else {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY ?? '{}');
}
if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const adminDb = admin.firestore();

export { adminDb };
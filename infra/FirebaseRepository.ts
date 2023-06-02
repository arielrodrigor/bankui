import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import {Cuenta, DetallesDeCuenta} from "@/domain/Entities";
export class FirebaseRepository {


    async saveAccount(accountNumber: string, accountData: any) {
        const accountDocRef = adminDb.collection("cuentas").doc(accountNumber);
        await accountDocRef.set(accountData);

        // Save transactions to a subcollection within the account document
        for (let transaccion of accountData.transacciones) {
            await accountDocRef.collection("transacciones").add(transaccion);
        }
    }

    async getAccountByNumber(accountNumber: string): Promise<FirebaseFirestore.DocumentData | null> {
        const accountDocRef = adminDb.collection("cuentas").doc(accountNumber);
        const doc = await accountDocRef.get();
        if (!doc.exists) {
            return null;
        }
        return doc.data() || null;
    }
}
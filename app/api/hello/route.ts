import {CuentaRepository} from "@/infra/CuentaRepository";
import {EventStore} from "@/domain/EventStore";
import {Cuenta} from "@/domain/Entities";
import {adminDb} from "@/firebaseAdmin";
import admin from "firebase-admin";

export async function GET(request: Request) {

    // Asignar los detalles de la cuenta al documento
    await adminDb.collection("cuentas").doc("123456789").set({
        nombre: "Nombre de la Cuenta",
        numeroDeCuenta: "123456789",
        saldoInicial: 1000
    });

// Asegúrate de que este sea el saldo correcto para la transacción
    var saldo = 1000;

// Crear una colección de transacciones para esta cuenta
    var transacciones = [
        {
            Date: admin.firestore.Timestamp.fromDate(new Date()),
            Operation: 'DEPOSITO',
            Amount: 200,
            Balance: saldo += 200  // Este será el saldo después de la operación
        },
        {
            Date: admin.firestore.Timestamp.fromDate(new Date()),
            Operation: 'RETIRO',
            Amount: 50,
            Balance: saldo -= 50  // Este será el saldo después de la operación
        }
    ];

    for (let transaccion of transacciones) {
        await adminDb.collection("cuentas").doc("123456789").collection("transacciones").add(transaccion);
    }


    return new Response('Hello, Next.js!')
}
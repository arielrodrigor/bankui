import admin from "firebase-admin";

export class Cuenta {
    detalles: DetallesDeCuenta;
    transacciones: Transaccion[] = [];

    constructor(detalles: DetallesDeCuenta) {
        this.detalles = detalles;
    }

    realizarTransaccion(transaccion: Transaccion) {
        if (transaccion.tipo === 'RETIRO' && this.detalles.saldoActual < transaccion.monto) {
            throw new Error('Fondos insuficientes para el retiro.');
        }

        this.transacciones.push(transaccion);

        console.log('realizarTransaccion')
        console.log(transaccion)
        // Actualiza el saldo después de cada transacción
        if (transaccion.tipo === 'DEPOSITO') {
            this.detalles.saldoActual += transaccion.monto;
        } else { // RETIRO
            this.detalles.saldoActual -= transaccion.monto;
        }
        console.log( this.detalles.saldoActual)
    }


    getSaldo() {
        return this.transacciones.reduce((saldo, transaccion) => {
            return transaccion.tipo === 'DEPOSITO' ? saldo + transaccion.monto : saldo - transaccion.monto;
        }, this.detalles.saldoInicial);
    }


}


export class DetallesDeCuenta {
    nombre: string;
    numeroDeCuenta: string;
    saldoInicial: number;
    saldoActual: number;

    constructor(nombre: string, numeroDeCuenta: string, saldoInicial: number, saldoActual: number) {
        this.nombre = nombre;
        this.numeroDeCuenta = numeroDeCuenta;
        this.saldoInicial = saldoInicial;
        this.saldoActual = saldoActual;
    }
    toFirestore() {

        return {
            nombre: this.nombre,
            numeroDeCuenta: this.numeroDeCuenta,
            saldoInicial: this.saldoInicial,
            saldoActual: this.saldoActual
        };
    }
    static fromFirestore(data: any): DetallesDeCuenta {
        return new DetallesDeCuenta(data.detalles.nombre, data.detalles.numeroDeCuenta, data.detalles.saldoInicial, data.detalles.saldoActual);
    }
}


export class Transaccion {
    monto: number;
    tipo: 'DEPOSITO' | 'RETIRO';
    Date: admin.firestore.Timestamp;

    constructor(monto: number, tipo: 'DEPOSITO' | 'RETIRO') {
        this.monto = monto;
        this.tipo = tipo;
        this.Date = admin.firestore.Timestamp.fromDate(new Date());
    }

    toFirestore() {
        return {
            monto: this.monto,
            tipo: this.tipo,
            Date: this.Date
        };
    }
}
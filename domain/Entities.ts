export class Cuenta {
    detalles: DetallesDeCuenta;
    transacciones: Transaccion[] = [];

    constructor(detalles: DetallesDeCuenta) {
        this.detalles = detalles;
    }

    realizarTransaccion(transaccion: Transaccion) {
        if (transaccion.tipo === 'RETIRO' && this.getSaldo() < transaccion.monto) {
            throw new Error('Fondos insuficientes para el retiro.');
        }

        this.transacciones.push(transaccion);
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

    constructor(nombre: string, numeroDeCuenta: string, saldoInicial: number) {
        this.nombre = nombre;
        this.numeroDeCuenta = numeroDeCuenta;
        this.saldoInicial = saldoInicial;
    }
}

export class Transaccion {
    monto: number;
    tipo: 'DEPOSITO' | 'RETIRO';

    constructor(monto: number, tipo: 'DEPOSITO' | 'RETIRO') {
        this.monto = monto;
        this.tipo = tipo;
    }
}
import { DetallesDeCuenta } from '@/domain/Entities';
import {Transaccion} from "@/domain/Entities";


interface Evento {
    tipo: string;
    data: any;
}
export class CuentaCreada implements Evento {
    tipo = 'CuentaCreada';
    data: { detalles: DetallesDeCuenta };

    constructor(detalles: DetallesDeCuenta) {
        this.data = { detalles };
    }

    toFirestore() {
        return {
            tipo: this.tipo,
            data: {
                detalles: this.data.detalles.toFirestore()
            }
        };
    }
}

export class DepositoRealizado implements Evento {
    tipo = 'DepositoRealizado';
    data: { detalles: DetallesDeCuenta, transaccion: Transaccion, saldoFinal: number };

    constructor(detalles: DetallesDeCuenta, transaccion: Transaccion) {
        this.data = {
            detalles,
            transaccion,
            saldoFinal: detalles.saldoActual
        };
    }
}

export class RetiroRealizado implements Evento {
    tipo = 'RetiroRealizado';
    data: { detalles: DetallesDeCuenta, transaccion: Transaccion, saldoFinal: number };

    constructor(detalles: DetallesDeCuenta, transaccion: Transaccion) {
        this.data = {
            detalles,
            transaccion,
            saldoFinal: detalles.saldoActual
        };
    }
}


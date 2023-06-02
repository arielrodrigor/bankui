import { EventStore } from "@/domain/EventStore";
import { Cuenta, DetallesDeCuenta, Transaccion } from "@/domain/Entities";
import { CuentaCreada, DepositoRealizado, RetiroRealizado } from "@/domain/Events";
import {FirebaseRepository} from "@/infra/FirebaseRepository";
import admin from "firebase-admin";


export class CuentaRepository {
    private eventStore: EventStore;
    private firebaseRepository: FirebaseRepository;

    constructor(eventStore: EventStore, firebaseRepository: FirebaseRepository) {
        this.eventStore = eventStore;
        this.firebaseRepository = firebaseRepository;
    }

    async save(cuenta: Cuenta) {
        // Removed the CuentaCreada event generation from here
        const eventos = [];

        cuenta.transacciones.forEach(transaccion => {
            const evento = transaccion.tipo === 'DEPOSITO'
                ? new DepositoRealizado(cuenta.detalles, transaccion)
                : new RetiroRealizado(cuenta.detalles, transaccion);

            eventos.push(evento);

            // Actualizar el saldo actual después de cada transacción
            cuenta.detalles.saldoActual = evento.data.saldoFinal;
        });

        // Save the events to the event store
        eventos.forEach(evento => this.eventStore.grabar(evento));

        // Prepare account data for Firebase
        const accountData = {
            detalles: cuenta.detalles.toFirestore(),
            transacciones: cuenta.transacciones.map(evento => evento.toFirestore()),
        };

        // Save account data to Firebase
        await this.firebaseRepository.saveAccount(cuenta.detalles.numeroDeCuenta, accountData);
    }


    async findByAccountNumber(numeroDeCuenta: string): Promise<Cuenta | null> {

        const eventos = this.eventStore.obtenerEventosParaEntidad('Cuenta', numeroDeCuenta);
        let detallesDeCuenta: DetallesDeCuenta | null = null;
        if (eventos.length > 0) {
            detallesDeCuenta = eventos[0].data.detalles as DetallesDeCuenta;
        } else {
            const cuentaData = await this.firebaseRepository.getAccountByNumber(numeroDeCuenta);

            if (!cuentaData) {
                return null;
            }
            detallesDeCuenta = DetallesDeCuenta.fromFirestore(cuentaData);
        }


        const cuenta = new Cuenta(detallesDeCuenta);

        return cuenta;
    }


}
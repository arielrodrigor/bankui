import {EventStore} from "@/domain/EventStore";
import {Cuenta, DetallesDeCuenta, Transaccion} from "@/domain/Entities";
import {CuentaCreada, DepositoRealizado, RetiroRealizado} from "@/domain/Events";

export class CuentaRepository {
    private eventStore: EventStore;

    constructor(eventStore: EventStore) {
        this.eventStore = eventStore;
    }

    save(cuenta: Cuenta) {
        const cuentaCreadaEvent = new CuentaCreada(cuenta.detalles);
        this.eventStore.grabar(cuentaCreadaEvent);

        cuenta.transacciones.forEach(transaccion => {
            if (transaccion.tipo === 'DEPOSITO') {
                const depositoRealizadoEvent = new DepositoRealizado(cuenta.detalles, transaccion);
                this.eventStore.grabar(depositoRealizadoEvent);
            } else {
                const retiroRealizadoEvent = new RetiroRealizado(cuenta.detalles, transaccion);
                this.eventStore.grabar(retiroRealizadoEvent);
            }
        });
    }

    findByAccountNumber(numeroDeCuenta: string): Cuenta | null {
        const eventosDeCuenta = this.eventStore.obtenerEventosParaEntidad('CuentaCreada', numeroDeCuenta);

        if (eventosDeCuenta.length === 0) {
            return null;
        }

        const detallesDeCuenta = eventosDeCuenta[0].data.detalles as DetallesDeCuenta;
        const cuenta = new Cuenta(detallesDeCuenta);

        const eventosDeTransacciones = this.eventStore.obtenerEventosParaEntidad('DepositoRealizado', numeroDeCuenta)
            .concat(this.eventStore.obtenerEventosParaEntidad('RetiroRealizado', numeroDeCuenta));

        eventosDeTransacciones.forEach(evento => {
            const transaccion = evento.data.transaccion as Transaccion;
            cuenta.realizarTransaccion(transaccion);
        });

        return cuenta;
    }
}

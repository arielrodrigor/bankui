import { DetallesDeCuenta, Transaccion } from '@/domain/Entities';
import {CuentaCreada, DepositoRealizado, RetiroRealizado} from "../domain/Events";
import {EventStore} from "../domain/EventStore";

describe('EventStore', () => {
    let store;
    let detalles;
    let transaccion;

    beforeEach(() => {
        store = new EventStore();
        detalles = new DetallesDeCuenta('nombre', 'numeroDeCuenta', 500, 1000);
        transaccion = new Transaccion(200, 'DEPOSITO');
    });

    test('EventStore records events correctly', () => {
        const event1 = new CuentaCreada(detalles);
        const event2 = new DepositoRealizado(detalles, transaccion);
        store.grabar(event1);
        store.grabar(event2);
        expect(store.obtenerTodosEventos()).toContain(event1);
        expect(store.obtenerTodosEventos()).toContain(event2);
    });

    test('EventStore retrieves events for entity correctly', () => {
        const event1 = new CuentaCreada(detalles);
        const event2 = new DepositoRealizado(detalles, transaccion);
        const event3 = new RetiroRealizado(detalles, transaccion);
        store.grabar(event1);
        store.grabar(event2);
        store.grabar(event3);
        expect(store.obtenerEventosParaEntidad('DepositoRealizado', detalles.numeroDeCuenta)).toEqual([event2]);
    });
});

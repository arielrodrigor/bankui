import { DetallesDeCuenta, Transaccion } from '@/domain/Entities';
import {CuentaCreada, DepositoRealizado, RetiroRealizado} from "../domain/Events";


describe('Events', () => {
    let detalles;
    let transaccion;
    beforeEach(() => {
        detalles = new DetallesDeCuenta('nombre', 'numeroDeCuenta', 500, 1000);
        transaccion = new Transaccion(200, 'DEPOSITO');
    });

    test('CuentaCreada event behaves as expected', () => {
        const evento = new CuentaCreada(detalles);
        expect(evento.tipo).toBe('CuentaCreada');
        expect(evento.data.detalles).toBe(detalles);
        expect(evento.toFirestore().tipo).toBe('CuentaCreada');
        expect(evento.toFirestore().data.detalles).toEqual(detalles.toFirestore());
    });

    test('DepositoRealizado event behaves as expected', () => {
        const evento = new DepositoRealizado(detalles, transaccion);
        expect(evento.tipo).toBe('DepositoRealizado');
        expect(evento.data.detalles).toBe(detalles);
        expect(evento.data.transaccion).toBe(transaccion);
        expect(evento.data.saldoFinal).toBe(detalles.saldoActual);
    });

    test('RetiroRealizado event behaves as expected', () => {
        const evento = new RetiroRealizado(detalles, transaccion);
        expect(evento.tipo).toBe('RetiroRealizado');
        expect(evento.data.detalles).toBe(detalles);
        expect(evento.data.transaccion).toBe(transaccion);
        expect(evento.data.saldoFinal).toBe(detalles.saldoActual);
    });
});

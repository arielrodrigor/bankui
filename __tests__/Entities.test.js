import {Cuenta, DetallesDeCuenta, Transaccion} from "../domain/Entities";


describe('Cuenta', () => {
    let detallesDeCuenta;
    let cuenta;

    beforeEach(() => {
        detallesDeCuenta = new DetallesDeCuenta('Juan', '123456', 1000, 1000);
        cuenta = new Cuenta(detallesDeCuenta);
    });

    test('depositar incrementa el saldo', () => {
        const transaccion = new Transaccion(200, 'DEPOSITO');
        cuenta.realizarTransaccion(transaccion);

        expect(cuenta.getSaldo()).toEqual(1200);
    });

    test('retirar disminuye el saldo', () => {
        const transaccion = new Transaccion(200, 'RETIRO');
        cuenta.realizarTransaccion(transaccion);

        expect(cuenta.getSaldo()).toEqual(800);
    });

    test('retirar demasiado lanza un error', () => {
        const transaccion = new Transaccion(2000, 'RETIRO');

        expect(() => cuenta.realizarTransaccion(transaccion)).toThrow('Fondos insuficientes para el retiro.');
    });
});

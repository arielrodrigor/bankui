import {CuentaNoEncontradaError, MontoInvalidoError} from "../interfaces/Errores";


describe('Custom Error classes', () => {

    // Test for CuentaNoEncontradaError
    describe('CuentaNoEncontradaError', () => {
        it('should create a CuentaNoEncontradaError', () => {
            const error = new CuentaNoEncontradaError('Cuenta no encontrada');

            expect(error).toBeInstanceOf(CuentaNoEncontradaError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Cuenta no encontrada');
        });
    });

    // Test for MontoInvalidoError
    describe('MontoInvalidoError', () => {
        it('should create a MontoInvalidoError', () => {
            const error = new MontoInvalidoError('Monto inválido');

            expect(error).toBeInstanceOf(MontoInvalidoError);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Monto inválido');
        });
    });
});

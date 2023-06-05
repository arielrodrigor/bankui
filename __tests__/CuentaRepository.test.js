import {Cuenta, DetallesDeCuenta, Transaccion} from "../domain/Entities";
import {CuentaRepository} from "../infra/CuentaRepository";
import {CuentaNoEncontradaError} from "../interfaces/Errores";
import {DepositoRealizado, RetiroRealizado} from "../domain/Events";


describe('CuentaRepository', () => {
    let mockEventStore;
    let mockFirebaseRepository;
    let cuentaRepository;

    beforeEach(() => {
        mockEventStore = {
            grabar: jest.fn(),
            obtenerEventosParaEntidad: jest.fn(),
        };
        mockFirebaseRepository = {
            saveAccount: jest.fn(),
            getAccountByNumber: jest.fn(),
            getTransactionsForAccount: jest.fn(),
        };

        cuentaRepository = new CuentaRepository(mockEventStore, mockFirebaseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for save() method
    describe('save', () => {
        it('should save the account', async () => {
            const cuenta = new Cuenta(new DetallesDeCuenta());
            cuenta.transacciones.push(new Transaccion());

            await cuentaRepository.save(cuenta);

            expect(mockEventStore.grabar).toHaveBeenCalled();
            expect(mockFirebaseRepository.saveAccount).toHaveBeenCalled();
        });
    });

    // Tests for findByAccountNumber() method
    describe('findByAccountNumber', () => {
        it('should find the account by number', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([]);
            mockFirebaseRepository.getAccountByNumber.mockReturnValueOnce({
                detalles: {
                    nombre: 'test',
                    numeroDeCuenta: numeroDeCuenta,
                    saldoInicial: 500,
                    saldoActual: 1000
                },
                // include any other necessary properties
            });

            const cuenta = await cuentaRepository.findByAccountNumber(numeroDeCuenta);

            expect(cuenta).toBeDefined();
            expect(mockEventStore.obtenerEventosParaEntidad).toHaveBeenCalledWith('Cuenta', numeroDeCuenta);
            expect(mockFirebaseRepository.getAccountByNumber).toHaveBeenCalledWith(numeroDeCuenta);
        });
    });

    // Tests for transactionsByAccountNumber() method
    describe('transactionsByAccountNumber', () => {
        it('should get transactions by account number', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([]);
            mockFirebaseRepository.getAccountByNumber.mockReturnValueOnce({
                detalles: {
                    nombre: 'test',
                    numeroDeCuenta: numeroDeCuenta,
                    saldoInicial: 500,
                    saldoActual: 1000
                },
                // include any other necessary properties
            });
            mockFirebaseRepository.getTransactionsForAccount.mockReturnValueOnce([]);

            const cuenta = await cuentaRepository.transactionsByAccountNumber(numeroDeCuenta);

            expect(cuenta).toBeDefined();
            expect(mockEventStore.obtenerEventosParaEntidad).toHaveBeenCalledWith('Cuenta', numeroDeCuenta);
            expect(mockFirebaseRepository.getAccountByNumber).toHaveBeenCalledWith(numeroDeCuenta);
            expect(mockFirebaseRepository.getTransactionsForAccount).toHaveBeenCalledWith(numeroDeCuenta);
        });
    });

    // Test for save() method when there are no transactions
    describe('save', () => {
        it('should handle empty transactions array', async () => {
            const cuenta = new Cuenta(new DetallesDeCuenta());

            await cuentaRepository.save(cuenta);

            expect(mockEventStore.grabar).not.toHaveBeenCalled();
            expect(mockFirebaseRepository.saveAccount).toHaveBeenCalled();
        });
    });

// Test for findByAccountNumber() method when events are returned
    describe('findByAccountNumber', () => {
        it('should handle case when events are returned', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([{ data: { detalles: new DetallesDeCuenta() } }]);

            const cuenta = await cuentaRepository.findByAccountNumber(numeroDeCuenta);

            expect(cuenta).toBeDefined();
            expect(mockEventStore.obtenerEventosParaEntidad).toHaveBeenCalledWith('Cuenta', numeroDeCuenta);
            expect(mockFirebaseRepository.getAccountByNumber).not.toHaveBeenCalled();
        });
    });

// Test for transactionsByAccountNumber() method when events are returned
    describe('transactionsByAccountNumber', () => {
        it('should handle case when events are returned', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([{ data: { detalles: new DetallesDeCuenta() } }]);
            mockFirebaseRepository.getTransactionsForAccount.mockReturnValueOnce([{
                data: () => new Transaccion()
            }]);

            const cuenta = await cuentaRepository.transactionsByAccountNumber(numeroDeCuenta);

            expect(cuenta).toBeDefined();
            expect(mockEventStore.obtenerEventosParaEntidad).toHaveBeenCalledWith('Cuenta', numeroDeCuenta);
            expect(mockFirebaseRepository.getAccountByNumber).not.toHaveBeenCalled();
            expect(mockFirebaseRepository.getTransactionsForAccount).toHaveBeenCalledWith(numeroDeCuenta);
        });
    });

    describe('findByAccountNumber', () => {
        it('should throw an error if account number does not exist', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([]);
            mockFirebaseRepository.getAccountByNumber.mockReturnValueOnce(null);

            await expect(cuentaRepository.findByAccountNumber(numeroDeCuenta))
                .rejects.toThrow(CuentaNoEncontradaError);
        });
    });

    describe('transactionsByAccountNumber', () => {
        it('should throw an error if account number does not exist', async () => {
            const numeroDeCuenta = '123456789';
            mockEventStore.obtenerEventosParaEntidad.mockReturnValueOnce([]);
            mockFirebaseRepository.getAccountByNumber.mockReturnValueOnce(null);

            await expect(cuentaRepository.transactionsByAccountNumber(numeroDeCuenta))
                .rejects.toThrow(CuentaNoEncontradaError);
        });
    });
    describe('save', () => {
        it('should generate and store DepositoRealizado and RetiroRealizado events', async () => {
            const cuenta = new Cuenta(new DetallesDeCuenta());
            // Agregamos transacciones de ambos tipos a la cuenta
            cuenta.transacciones.push(new Transaccion(2 ,'DEPOSITO',null, 2));
            cuenta.transacciones.push(new Transaccion(2 ,'RETIRO',null, 0));

            await cuentaRepository.save(cuenta);
            // Comprobamos que el método grabar fue llamado dos veces
            expect(mockEventStore.grabar).toHaveBeenCalledTimes(2);
            // Comprobamos que el primer evento es un DepositoRealizado y el segundo un RetiroRealizado
            const firstEvent = mockEventStore.grabar.mock.calls[0][0];
            const secondEvent = mockEventStore.grabar.mock.calls[1][0];
            expect(firstEvent).toBeInstanceOf(DepositoRealizado);
            expect(secondEvent).toBeInstanceOf(RetiroRealizado);

            // Comprobamos que los eventos tienen el balance correcto
            expect(firstEvent.data.transaccion.balance).toBe(firstEvent.data.saldoFinal);
            expect(secondEvent.data.transaccion.balance).toBe(secondEvent.data.saldoFinal);
        });
    });



});

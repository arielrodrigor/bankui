import {Cuenta, DetallesDeCuenta, Transaccion} from "../domain/Entities";
import {CuentaRepository} from "../infra/CuentaRepository";


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
});

import { CuentaRepository } from "@/infra/CuentaRepository";
import {CuentaNoEncontradaError} from "../interfaces/Errores";
const {CuentaService} = require("../interfaces/Service");
const Transaccion = require("@/domain/Entities").Transaccion;


jest.mock("@/infra/CuentaRepository");

describe('CuentaService', () => {
    let cuentaRepository;
    let cuentaService;

    beforeEach(() => {
        cuentaRepository = new CuentaRepository();
        cuentaService = new CuentaService(cuentaRepository);
    });

    test('obtenerBalance() should return correct data', async () => {
        const mockNumeroDeCuenta = '12345678';
        cuentaRepository.findByAccountNumber.mockResolvedValue({
            getSaldo: () => 530
        });

        const result = await cuentaService.obtenerBalance(mockNumeroDeCuenta);

        expect(cuentaRepository.findByAccountNumber).toHaveBeenCalledWith(mockNumeroDeCuenta);
        expect(result).toEqual(530);
    });

    test('realizarTransaccion() should call correct methods with correct data', async () => {
        const mockNumeroDeCuenta = '12345678';
        const mockTransaccion = new Transaccion();

        const mockCuenta = {
            realizarTransaccion: jest.fn(),
        };

        cuentaRepository.findByAccountNumber.mockResolvedValue(mockCuenta);

        const cuentaRepositorySpy = jest.spyOn(cuentaRepository, 'save');

        await cuentaService.realizarTransaccion(mockNumeroDeCuenta, mockTransaccion);

        expect(mockCuenta.realizarTransaccion).toHaveBeenCalledWith(mockTransaccion);
        expect(cuentaRepositorySpy).toHaveBeenCalledWith(mockCuenta);
    });

    test('obtenerTransacciones() should return correct data', async () => {
        const mockNumeroDeCuenta = '12345678';

        cuentaRepository.transactionsByAccountNumber.mockResolvedValue([
            {
                monto: 100,
                tipo: 'DEPOSITO',
                balance: 1000,
                fecha: new Date()
            },
            {
                monto: 50,
                tipo: 'RETIRO',
                balance: 950,
                fecha: new Date()
            }
        ]);

        const result = await cuentaService.obtenerTransacciones(mockNumeroDeCuenta);

        expect(cuentaRepository.transactionsByAccountNumber).toHaveBeenCalledWith(mockNumeroDeCuenta);
        expect(result).toHaveLength(2);
    });


    // Test for obtenerBalance() method when account is not found
    test('obtenerBalance() should throw error when account is not found', async () => {
        const mockNumeroDeCuenta = '12345678';
        cuentaRepository.findByAccountNumber.mockResolvedValue(null);

        try {
            await cuentaService.obtenerBalance(mockNumeroDeCuenta);
        } catch (error) {
            expect(error).toBeInstanceOf(CuentaNoEncontradaError);
        }

        expect(cuentaRepository.findByAccountNumber).toHaveBeenCalledWith(mockNumeroDeCuenta);
    });

// Test for realizarTransaccion() method when account is not found
    test('realizarTransaccion() should throw error when account is not found', async () => {
        const mockNumeroDeCuenta = '12345678';
        const mockTransaccion = new Transaccion();

        cuentaRepository.findByAccountNumber.mockResolvedValue(null);

        try {
            await cuentaService.realizarTransaccion(mockNumeroDeCuenta, mockTransaccion);
        } catch (error) {
            expect(error).toBeInstanceOf(CuentaNoEncontradaError);
        }

        expect(cuentaRepository.findByAccountNumber).toHaveBeenCalledWith(mockNumeroDeCuenta);
    });

// Test for obtenerTransacciones() method when account is not found
    test('obtenerTransacciones() should throw error when account is not found', async () => {
        const mockNumeroDeCuenta = '12345678';

        cuentaRepository.transactionsByAccountNumber.mockResolvedValue(null);

        try {
            await cuentaService.obtenerTransacciones(mockNumeroDeCuenta);
        } catch (error) {
            expect(error).toBeInstanceOf(CuentaNoEncontradaError);
        }

        expect(cuentaRepository.transactionsByAccountNumber).toHaveBeenCalledWith(mockNumeroDeCuenta);
    });


});

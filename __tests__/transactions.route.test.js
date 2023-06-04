import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';
import {Transaccion} from "../domain/Entities";
import {cuentaService} from "../dependencies";



jest.mock('@/dependencies');
const server = setupServer(
    rest.post('/api/transactions', (req, res, ctx) => {
        const { accountNumber, type, amount } = req.body;

        if (!accountNumber) {
            return res(
                ctx.status(400),
                ctx.json({ error: 'Número de cuenta inválido.' })
            );
        }

        if (!amount) {
            return res(
                ctx.status(400),
                ctx.json({ error: 'Monto inválido.' })
            );
        }

        if (accountNumber === 'error') {
            return res(
                ctx.status(500),
                ctx.json({ error: 'Unknown error' })
            );
        }

        cuentaService.realizarTransaccion(accountNumber, new Transaccion(amount, type));
        const newBalance = cuentaService.obtenerBalance(accountNumber);

        return res(
            ctx.status(200),
            ctx.json({ balance: newBalance })
        );
    }),

    rest.get('/api/transactions', (req, res, ctx) => {
        const accountNumber = req.url.searchParams.get('accountNumber');

        if (!accountNumber) {
            return res(
                ctx.status(400),
                ctx.json({ error: 'Número de cuenta inválido.' })
            );
        }

        if (accountNumber === 'error') {
            return res(
                ctx.status(500),
                ctx.json({ error: 'Unknown error' })
            );
        }

        const transacciones = cuentaService.obtenerTransacciones(accountNumber);
        return res(
            ctx.status(200),
            ctx.json(transacciones)
        );
    })
);


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('API Tests', () => {
    describe('POST /api/transactions', () => {
        test('should return 400 if accountNumber is missing', async () => {
            try {
                await axios.post('/api/transactions', {
                    type: 'DEPOSITO',
                    amount: 100,
                });
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toEqual({ error: 'Número de cuenta inválido.' });
            }
        });

        test('should return 400 if amount is missing', async () => {
            try {
                await axios.post('/api/transactions', {
                    accountNumber: '123456789',
                    type: 'DEPOSITO',
                });
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toEqual({ error: 'Monto inválido.' });
            }
        });

        test('should return 200 and the new balance', async () => {
            const mockAccountNumber = '123456789';
            const mockAmount = 100;
            const mockNewBalance = {

                    nombre: 'Nombre de la Cuenta',
                    numeroDeCuenta: '123456789',
                    saldoInicial: 1000,
                    saldoActual: 530

            };

            const response = await axios.post('/api/accounts', {
                accountNumber: mockAccountNumber,
                type: 'DEPOSITO',
                amount: mockAmount,
            });

            expect(response.status).toBe(200);
            expect(response.data).toEqual({  ...mockNewBalance });
        });

        test('should return 500 if an error occurs', async () => {
            try {
                await axios.post('/api/transactions', {
                    accountNumber: 'error',
                    type: 'DEPOSITO',
                    amount: 100,
                });
            } catch (error) {
                expect(error.response.status).toBe(500);
                expect(error.response.data).toEqual({ error: 'Unknown error' });
            }
        });

    });

    describe('GET /api/transactions', () => {
        test('should return 400 if accountNumber is missing', async () => {
            try {
                await axios.get('/api/transactions');
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toEqual({ error: 'Número de cuenta inválido.' });
            }
        });

        test('should return 200 and the transactions', async () => {
            const mockAccountNumber = '123456789';
            const mockTransacciones =
                {"detalles": {"nombre": "Nombre de la Cuenta", "numeroDeCuenta": "123456789", "saldoActual": 530, "saldoInicial": 1000}, "transacciones": [{"Date": {"_nanoseconds": 0, "_seconds": 1648748400}, "balance": 530, "monto": "RETIRO", "tipo": 2}, {"Date": {"_nanoseconds": 0, "_seconds": 1648748400}, "balance": 530, "monto": 2, "tipo": "DEPOSITO"}, {"Date": {"_nanoseconds": 0, "_seconds": 1648748400}, "balance": 532, "monto": "DEPOSITO", "tipo": 2}]};

            const response = await axios.get('/api/transactions', {
                params: {
                    accountNumber: mockAccountNumber,
                },
            });

            expect(response.status).toBe(200);
            expect(response.data).toEqual(mockTransacciones);
        });

        test('should return 500 if an error occurs', async () => {
            try {
                await axios.get('/api/transactions', {
                    params: {
                        accountNumber: 'error',
                    },
                });
            } catch (error) {
                expect(error.response.status).toBe(500);
                expect(error.response.data).toEqual({ error: 'Unknown error' });
            }
        });
    });
});


import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';
import { cuentaService } from "../dependencies";

jest.mock('@/dependencies');
const server = setupServer(
    rest.post('/api/accounts', async (req, res, ctx) => {
        const { accountNumber } = req.body;

        if (!accountNumber) {
            return res(
                ctx.status(400),
                ctx.json({ error: 'Número de cuenta inválido.' })
            );
        }

        try {
            const balance = await cuentaService.obtenerBalance(accountNumber);

            return res(
                ctx.status(200),
                ctx.json({ balance })
            );
        } catch (error) {
            if (error instanceof Error) {
                return res(
                    ctx.status(500),
                    ctx.json({ error: error.message })
                );
            } else {
                return res(
                    ctx.status(500),
                    ctx.json({ error: 'Un error desconocido ocurrió.' })
                );
            }
        }
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('API Tests', () => {
    describe('POST /api/accounts', () => {
        test('should return 400 if accountNumber is missing', async () => {
            try {
                await axios.post('/api/accounts', {});
            } catch (error) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toEqual({ error: 'Número de cuenta inválido.' });
            }
        });

        test('should return 200 and the balance', async () => {
            const mockAccountNumber = '123456789';
            const mockBalance = {
                nombre: 'Nombre de la Cuenta',
                numeroDeCuenta: '123456789',
                saldoInicial: 1000,
                saldoActual: 530
            };

            cuentaService.obtenerBalance.mockResolvedValueOnce(mockBalance);

            const response = await axios.post('/api/accounts', {
                accountNumber: mockAccountNumber,
            });



            expect(response.status).toBe(200);
            expect(response.data).toEqual({ ...mockBalance });
        });

        test('should return 500 if an error occurs', async () => {
            try {
                cuentaService.obtenerBalance.mockRejectedValueOnce(new Error('An error occurred'));
                await axios.post('/api/accounts', {
                    accountNumber: '123456789',
                });
            } catch (error) {
                expect(error.response.status).toBe(500);
                expect(error.response.data).toEqual({ error: 'An error occurred' });
            }
        });
    });
});

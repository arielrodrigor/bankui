const mockAxios = jest.genMockFromModule('axios');

mockAxios.get.mockImplementation(url => {
    switch (url) {
        case '/api/transactions':
            return Promise.resolve({
                data: {
                    transacciones: [
                        {
                            monto: 'RETIRO',
                            tipo: 2,
                            balance: 530,
                            Date: { _seconds: 1648748400, _nanoseconds: 0 }
                        },
                        {
                            monto: 2,
                            tipo: 'DEPOSITO',
                            balance: 530,
                            Date: { _seconds: 1648748400, _nanoseconds: 0 }
                        },
                        {
                            monto: 'DEPOSITO',
                            tipo: 2,
                            balance: 532,
                            Date: { _seconds: 1648748400, _nanoseconds: 0 }
                        }
                    ],
                    detalles: {
                        nombre: 'Nombre de la Cuenta',
                        numeroDeCuenta: '123456789',
                        saldoInicial: 1000,
                        saldoActual: 530
                    }
                }
            });
        default:
            return Promise.reject(new Error('not found'));
    }
});

mockAxios.post.mockImplementation((url, data) => {
    switch (url) {
        case '/api/accounts':
            return Promise.resolve({
                data: {
                    nombre: 'Nombre de la Cuenta',
                    numeroDeCuenta: '123456789',
                    saldoInicial: 1000,
                    saldoActual: 530
                }
            });
        case '/api/transactions':
            return Promise.resolve({
                data: {
                    transacciones: [
                    ],
                }
            });
        default:
            return Promise.reject(new Error('not found'));
    }
});

mockAxios.mockImplementation(() => Promise.resolve({ data: {} }));

export default mockAxios;

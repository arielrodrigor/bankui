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
                },
                status: 200
            });
        default:
            return Promise.reject({
                response: {
                    status: 404,
                    data: { message: 'not found' }
                }
            });
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
                },
                status: 200
            });
        case '/api/transactions':
            if (!data.accountNumber) {
                return Promise.reject({
                    response: {
                        status: 400,
                        data: { error: 'Número de cuenta inválido.' }
                    }
                });
            }
            if (!data.amount) {
                return Promise.reject({
                    response: {
                        status: 400,
                        data: { error: 'Monto inválido.' }
                    }
                });
            }
            return Promise.resolve({
                data: {
                    transacciones: [
                        {
                            monto: 500,
                            tipo: 'DEPOSITO',
                            balance: 1530,
                            Date: { _seconds: 1648748400, _nanoseconds: 0 }
                        },
                        {
                            monto: 200,
                            tipo: 'RETIRO',
                            balance: 1330,
                            Date: { _seconds: 1648758400, _nanoseconds: 0 }
                        }
                    ],
                },
                status: 200
            });
        default:
            return Promise.reject({
                response: {
                    status: 404,
                    data: { message: 'not found' }
                }
            });
    }
});

mockAxios.mockImplementation(() => Promise.resolve({ data: {} }));

export default mockAxios;

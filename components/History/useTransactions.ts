import { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaccion {
    tipo: 'DEPOSITO' | 'RETIRO';
    monto: number;
    balance: number;
    Date: {
        _seconds: number;
        _nanoseconds: number;
    };
}

export default function useTransactions(): { transacciones: Transaccion[], error: string | null } {
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accountNumber = '123456789';

        axios.get(`/api/transactions`, { params: { accountNumber } })
            .then(res => {
                setTransacciones(res.data.transacciones);
                setError(null); // reset the error
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return { transacciones, error };
}

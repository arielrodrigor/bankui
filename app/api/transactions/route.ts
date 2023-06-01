// api/transactions.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { cuentaService } from '@/dependencies'
import { Transaccion } from '@/domain/Entities'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
            try {
                const { accountNumber, type, amount } = req.body
                const transaccion = new Transaccion(type, amount);
                cuentaService.realizarTransaccion(accountNumber, transaccion);
                const newBalance = await cuentaService.obtenerBalance(accountNumber);
                res.status(200).json({ balance: newBalance })
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                } else {
                    res.status(500).json({ error: 'Un error desconocido ocurrió.' });
                }
            }
}

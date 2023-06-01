// api/accounts/[accountNumber].ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { cuentaService } from '@/dependencies'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { accountNumber },
    } = req

            try {
                const balance = await cuentaService.obtenerBalance(accountNumber as string)
                res.status(200).json({ balance })
            } catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                } else {
                    res.status(500).json({ error: 'Un error desconocido ocurrió.' });
                }
            }
}

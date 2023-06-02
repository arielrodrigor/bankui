import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next'
import { cuentaService } from '@/dependencies'
import { Transaccion } from '@/domain/Entities'

type BalanceData = {
    balance: number;
}

type ErrorData = {
    error: string;
}

export async function POST(req: NextApiRequest) {
    const { method } = req

    try {
        const { accountNumber, type, amount } = req.body

        if (!accountNumber) {
            return NextResponse.json({ error: 'Número de cuenta inválido.' }, { status: 400 });
        }

        if (!amount) {
            return NextResponse.json({ error: 'Monto inválido.' }, { status: 400 });
        }
        const transaccion = new Transaccion(type, amount);
        cuentaService.realizarTransaccion(accountNumber, transaccion);
        const newBalance = await cuentaService.obtenerBalance(accountNumber);

        return NextResponse.json({ balance: newBalance });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ error: 'Un error desconocido ocurrió.' }, { status: 500 });
        }
    }
}

import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next'
import { cuentaService } from '@/dependencies'

type BalanceData = {
    balance: number;
}

type ErrorData = {
    error: string;
}

export async function POST(req: NextApiRequest) {
    const {
        query: { accountNumber },
    } = req

    try {
        if (!accountNumber) {
            return NextResponse.json({ error: 'Número de cuenta inválido.' }, { status: 400 });
        }
        const balance = await cuentaService.obtenerBalance(accountNumber as string)

        return NextResponse.json({ balance });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Un error desconocido ocurrió.' }, { status: 500 });
        }
    }
}

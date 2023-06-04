import { NextResponse, NextRequest } from 'next/server';
import { cuentaService } from '@/dependencies'


export async function POST(request: NextRequest) {
    const {
        params: { accountNumber },
    } =  await request.json();

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

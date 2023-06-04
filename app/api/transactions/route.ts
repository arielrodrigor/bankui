
import { NextResponse, NextRequest } from 'next/server';
import { cuentaService } from '@/dependencies'
import { Transaccion } from '@/domain/Entities'
import {CuentaNoEncontradaError, MontoInvalidoError} from "@/interfaces/Errores";

export async function POST(request: NextRequest) {
    try {
        const { accountNumber, type, amount } = await request.json();

        if (!accountNumber) {
            return NextResponse.json({ error: 'Número de cuenta inválido.' }, { status: 400 });
        }

        if (!amount) {
            return NextResponse.json({ error: 'Monto inválido.' }, { status: 400 });
        }
        const transaccion = new Transaccion(amount,type );
        await cuentaService.realizarTransaccion(accountNumber, transaccion);
        const newBalance = await cuentaService.obtenerBalance(accountNumber);

        return NextResponse.json({ balance: newBalance });
    } catch (error) {
        if (error instanceof CuentaNoEncontradaError || error instanceof MontoInvalidoError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Un error desconocido ocurrió.' }, { status: 500 });
        }
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get('accountNumber');

    try {
        if (!accountNumber) {
            return NextResponse.json({ error: 'Número de cuenta inválido.' }, { status: 400 });
        }
        const transacciones = await cuentaService.obtenerTransacciones(accountNumber as string)
        return NextResponse.json(transacciones);
    } catch (error) {
        if (error instanceof CuentaNoEncontradaError || error instanceof MontoInvalidoError) {
            throw new CuentaNoEncontradaError(`La cuenta con el número ${accountNumber} es invalida.`);
        } else {
            return NextResponse.json({ error: 'Un error desconocido ocurrió.' }, { status: 500 });
        }
    }
}

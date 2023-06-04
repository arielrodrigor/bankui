import {CuentaRepository} from "@/infra/CuentaRepository";
import {Transaccion} from "@/domain/Entities";
import {CuentaNoEncontradaError} from "@/interfaces/Errores";

export class CuentaService {
    private cuentaRepository: CuentaRepository;

    constructor(cuentaRepository: CuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    async obtenerBalance(numeroDeCuenta: string) {
        const cuenta = await this.cuentaRepository.findByAccountNumber(numeroDeCuenta);

        if (!cuenta) {
            throw new CuentaNoEncontradaError(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }
        return cuenta.getSaldo();
    }

    async realizarTransaccion(numeroDeCuenta: string, transaccion: Transaccion) {
        const cuenta = await this.cuentaRepository.findByAccountNumber(numeroDeCuenta);
        if (!cuenta) {
            throw new CuentaNoEncontradaError(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }
        cuenta.realizarTransaccion(transaccion);
        await this.cuentaRepository.save(cuenta);
    }

    async obtenerTransacciones(numeroDeCuenta: string) {
        const transacciones = await this.cuentaRepository.transactionsByAccountNumber(numeroDeCuenta);

        if (!transacciones) {
            throw new CuentaNoEncontradaError(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }
        return transacciones;
    }

}

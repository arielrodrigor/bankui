import {CuentaRepository} from "@/infra/CuentaRepository";
import {Transaccion} from "@/domain/Entities";

export class CuentaService {
    private cuentaRepository: CuentaRepository;

    constructor(cuentaRepository: CuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    async obtenerBalance(numeroDeCuenta: string) {
        const cuenta = await this.cuentaRepository.findByAccountNumber(numeroDeCuenta);

        if (!cuenta) {
            throw new Error(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }

        return cuenta.getSaldo();
    }

    async realizarTransaccion(numeroDeCuenta: string, transaccion: Transaccion) {
        const cuenta = await this.cuentaRepository.findByAccountNumber(numeroDeCuenta);

        if (!cuenta) {
            throw new Error(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }


        cuenta.realizarTransaccion(transaccion);


        await this.cuentaRepository.save(cuenta);
    }

}

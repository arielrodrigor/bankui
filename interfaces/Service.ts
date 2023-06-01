import {CuentaRepository} from "@/infra/Repositories";
import {Transaccion} from "@/domain/Entities";

export class CuentaService {
    private cuentaRepository: CuentaRepository;

    constructor(cuentaRepository: CuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    obtenerBalance(numeroDeCuenta: string) {
        const cuenta = this.cuentaRepository.findByAccountNumber(numeroDeCuenta);

        if (!cuenta) {
            throw new Error(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }

        return cuenta.getSaldo();
    }

    realizarTransaccion(numeroDeCuenta: string, transaccion: Transaccion) {
        const cuenta = this.cuentaRepository.findByAccountNumber(numeroDeCuenta);

        if (!cuenta) {
            throw new Error(`La cuenta con el número ${numeroDeCuenta} no existe.`);
        }

        cuenta.realizarTransaccion(transaccion);
        this.cuentaRepository.save(cuenta);
    }
}

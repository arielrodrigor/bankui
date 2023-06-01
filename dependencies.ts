// rootDir/dependencies.ts


import {EventStore} from "@/domain/EventStore";
import {CuentaRepository} from "@/infra/Repositories";
import {CuentaService} from "@/interfaces/Service";

const eventStore = new EventStore();
const cuentaRepository = new CuentaRepository(eventStore);
const cuentaService = new CuentaService(cuentaRepository);

export { cuentaRepository, cuentaService };

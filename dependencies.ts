// rootDir/dependencies.ts

import {EventStore} from "@/domain/EventStore";
import {FirebaseRepository} from "@/infra/FirebaseRepository";
import {CuentaRepository} from "@/infra/CuentaRepository";
import {CuentaService} from "@/interfaces/Service";

const eventStore = new EventStore();
const firebaseRepository = new FirebaseRepository();
const cuentaRepository = new CuentaRepository(eventStore, firebaseRepository);
const cuentaService = new CuentaService(cuentaRepository);
export { cuentaRepository, cuentaService };

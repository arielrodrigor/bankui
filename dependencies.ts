// rootDir/dependencies.ts

import {EventStore} from "@/domain/EventStore";
import {FirebaseRepository} from "@/infra/FirebaseRepository"; // Importamos FirebaseRepository
import {CuentaRepository} from "@/infra/CuentaRepository";
import {CuentaService} from "@/interfaces/Service";

const eventStore = new EventStore();
const firebaseRepository = new FirebaseRepository(); // Instanciamos FirebaseRepository pasando la instancia de Firestore administrada
const cuentaRepository = new CuentaRepository(eventStore, firebaseRepository); // Inyectamos FirebaseRepository en CuentaRepository
const cuentaService = new CuentaService(cuentaRepository);

export { cuentaRepository, cuentaService };

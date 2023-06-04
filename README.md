# Documentación
#Bienvenidos! 

Comandos para ejecutar el proyecto:

1. **Instalar dependencias**: Para instalar las dependencias del proyecto, abra una terminal en el directorio raíz del proyecto y ejecute el comando **`npm install`**.
2. **Ejecutar el proyecto**: Para ejecutar el proyecto en modo de desarrollo, ejecute el comando **`npm run dev`** en la terminal. Esto iniciará el servidor de desarrollo y podrá acceder a la aplicación en su navegador en **`http://localhost:3000`**.
3. **Ejecutar pruebas**: Para ejecutar las pruebas del proyecto, ejecute el comando **`npm run test`** en la terminal. Esto ejecutará todas las pruebas del proyecto y mostrará los resultados en la terminal.
4. **Cobertura de pruebas**: Para generar un informe de cobertura de pruebas, ejecute el comando **`npm run test:coverage`** en la terminal. Esto ejecutará todas las pruebas y generará un informe de cobertura en la carpeta **`coverage`** del proyecto. Puede ver el informe de cobertura abriendo el archivo **`coverage/lcov-report/index.html`** en su navegador. Esto le mostrará una vista detallada de qué partes del código están cubiertas por las pruebas y cuáles no.


# Descripción de la Aplicación

Este proyecto utiliza de manera efectiva los principios de Domain Driven Design (DDD) y Event Sourcing, y está dividido en las siguientes áreas clave:

- **Análisis de Dominio:** Identifiqué las entidades clave de mi aplicación: `Cuenta`, `Transacción` y `Detalles de la Cuenta` como Value Objects.

- **Implementación de Event Sourcing:** Implementé Event Sourcing con eventos de dominio que representan los cambios en las entidades, tales como `CuentaCreada`, `DepositoRealizado` y `RetiroRealizado`.

- **Event Store:** Implementé un Event Store utilizando Firebase como base de datos, para almacenar eventos y recuperar todos los eventos de una entidad específica. La aplicación cuenta con dos ambientes, uno de producción y otro de pruebas, ambos con la última versión de Firebase.

- **Persistencia de Entidades:** Desarrollé un `CuentaRepository` para manejar la persistencia de las entidades, usando el Event Store.

- **Servicios de Dominio:** Para operaciones que implican varias entidades, como la realización de transacciones, diseñé un `CuentaService`.

- **Inyección de Dependencias:** La aplicación utiliza inyección de dependencias para garantizar la flexibilidad y la escalabilidad.

- **UI y Manejo de Estado:** La interfaz del usuario está diseñada con React y cuenta con animaciones atractivas gracias a Tailwind. Opté por usar Recoil en lugar de Redux para manejar el estado de la aplicación, considerando que este proyecto es una prueba de concepto sobre la arquitectura DDD.

- **Pruebas:** Para asegurar el correcto funcionamiento de la aplicación, desarrollé un conjunto completo de pruebas usando Jest. Estas pruebas cubren la lógica de dominio, los servicios de dominio y otros componentes.

Además, esta aplicación cuenta con una estructura de carpetas clara que sigue los principios de DDD:

- **Capa de Aplicación:** Media entre las interfaces de entrada y el dominio empresarial.

- **Capa de Dominio:** Aquí se definen las clases, funciones y servicios del dominio empresarial.

- **Capa Infra:** Maneja la comunicación con elementos externos a la aplicación.

- **Carpeta de Interfaces:** Contiene todos los puntos de entrada para la aplicación.

Este proyecto es un ejemplo práctico de cómo se puede implementar DDD y Event Sourcing en una aplicación moderna, y espero que sirva de referencia y guía.
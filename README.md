# Documentación

Comandos para ejecutar el proyecto:

1. **Instalar dependencias**: Para instalar las dependencias del proyecto, abra una terminal en el directorio raíz del proyecto y ejecute el comando **`npm install`**.
2. **Ejecutar el proyecto**: Para ejecutar el proyecto en modo de desarrollo, ejecute el comando **`npm run dev`** en la terminal. Esto iniciará el servidor de desarrollo y podrá acceder a la aplicación en su navegador en **`http://localhost:3000`**.
3. **Ejecutar pruebas**: Para ejecutar las pruebas del proyecto, ejecute el comando **`npm run test`** en la terminal. Esto ejecutará todas las pruebas del proyecto y mostrará los resultados en la terminal.
4. **Cobertura de pruebas**: Para generar un informe de cobertura de pruebas, ejecute el comando **`npm run test:coverage`** en la terminal. Esto ejecutará todas las pruebas y generará un informe de cobertura en la carpeta **`coverage`** del proyecto. Puede ver el informe de cobertura abriendo el archivo **`coverage/lcov-report/index.html`** en su navegador. Esto le mostrará una vista detallada de qué partes del código están cubiertas por las pruebas y cuáles no.

- **Capa de aplicación**: Esta capa es responsable de mediar entre sus interfaces de entrada y su dominio empresarial. En esta capa tendremos los casos de uso de su aplicación y sus servicios de aplicación (como un servicio de correo que se comunica con un servicio Mailchimp desde la capa de infraestructura).
- **Capa del dominio**: Aquí definirás tus clases, funciones y servicios del dominio empresarial que componen tu modelo de dominio. Todas tus reglas comerciales deben declararse en esta capa para que la capa de aplicación pueda usarla para componer tus casos de uso.
- **Capa infra**: Esta es la capa más baja. En la capa infra tendrás la comunicación con lo que está fuera de tu aplicación, como la base de datos (consulta la sección del patrón del repositorio en [ [Recomendaciones y operaciones de patrones]]), servicios de correo y comunicación directa con marcos.
- **Carpeta interfaces**: Esta carpeta contiene todos los puntos de entrada para tu aplicación. Desde el principio aquí es donde estarán tus controladores Express (dentro de la carpeta interfaces / http).
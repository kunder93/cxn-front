# CXN Web

Aplicación web que visibiliza los servicios y características que ofrece CXN. Desarrollada en React con TypeScript para ofrecer una experiencia interactiva y amigable al usuario.

## Tabla de Contenidos

-   [Requisitos](#requisitos)
-   [Instalación](#instalación)
-   [Uso](#uso)
-   [Docker](#docker)
-   [Contribuyendo](#contribuyendo)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Tecnologías Utilizadas](#tecnologías-utilizadas)
-   [Licencia](#licencia)

## Requisitos

-   Node.js (versión recomendada: 18 o superior)
-   npm o yarn
-   Docker

## Instalación

1. Clona este repositorio:
   git clone https://github.com/kunder93/cxn-front.git

2. Instala las dependencias:
   npm install
   o
   yarn install

## Configuración de Variables de Entorno

Para ejecutar la aplicación en Docker, asegúrate de definir la siguiente variable de entorno:

-   **`COPY_CERTIFICATES=true/false`**: Esta variable habilita la copia de los certificados necesarios para la configuración de seguridad de la aplicación en entornos de producción. Debe estar presente en el archivo de configuración de Docker o en las variables de entorno del sistema antes de iniciar el contenedor.

## Uso

Para ejecutar el proyecto en modo de desarrollo, utiliza:

npm start
o
yarn start

Esto iniciará la aplicación en modo de desarrollo. Puedes acceder a la aplicación en tu navegador abriendo http://localhost:3000.

### Scripts disponibles

Además del comando `start`, hay otros scripts útiles definidos en el archivo `package.json`:

-   **`build`**: Crea una versión optimizada de la aplicación para producción en la carpeta `build`.
    npm run build

-   **`test`**: Ejecuta los tests de la aplicación.
    npm run test

-   **`lint`**: Verifica el código para cumplir con las reglas de estilo y evitar errores comunes.
    npm run lint

-   **`format`**: Revisa el formato del código usando Prettier.
    npm run format

-   **`analyze`**: Analiza el tamaño de los archivos JavaScript generados en el build.
    npm run analyze

## Docker

Para ejecutar la aplicación en un contenedor Docker:

1. Construye la imagen:
   docker build -t cxn-web .

2. Ejecuta el contenedor:
   docker run -p 80:80 cxn-web

## Contribuyendo

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   git checkout -b feature/nueva-caracteristica

3. Realiza tus cambios y haz commits:
   git commit -am 'Agrega nueva característica'

4. Sube tus cambios:
   git push origin feature/nueva-caracteristica

5. Abre un Pull Request.

## Estructura del Proyecto

-   **.github/workflows/**: Contiene archivos de configuración de GitHub Actions para la integración y despliegue continuo (CI/CD). En este caso, el archivo `docker-build-and-push.yml` configura la acción para construir y subir una imagen Docker del proyecto.

-   **docs/**: Carpeta destinada a la documentación del proyecto. Puede incluir archivos adicionales en formato markdown, diagramas, o cualquier documento relevante.

-   **nginx/**: Incluye archivos de configuración para NGINX, generalmente utilizados para servir la aplicación en producción.

-   **node_modules/**: Carpeta generada automáticamente que contiene todas las dependencias de npm instaladas en el proyecto.

-   **public/**: Archivos estáticos y recursos públicos de la aplicación. Incluye el archivo `index.html`, que es la plantilla principal donde se carga la aplicación de React.

-   **src/**: Carpeta principal del código fuente de la aplicación.

    -   **components/**: Contiene componentes reutilizables de React.
    -   **images/**: Carpeta para almacenar imágenes que se utilizan dentro de la aplicación.
    -   **pages/**: Contiene los componentes de página completos que representan las distintas rutas de la aplicación.
    -   **resources/**: Almacena archivos adicionales como datos, textos o configuraciones necesarias para la aplicación.
    -   **store/**: Configuración y lógica del estado global de la aplicación, generalmente usando Redux.
    -   **styles/**: Archivos CSS o SCSS utilizados para definir los estilos de la aplicación.
    -   **tests/**: Carpeta para pruebas unitarias o de integración.
    -   **utility/**: Funciones y archivos de utilidades que pueden ser usadas en distintos lugares de la aplicación.

-   **App.tsx**: Archivo principal de la aplicación de React. Este componente se monta en el DOM y representa el punto de entrada de la aplicación.

-   **index.tsx**: Punto de inicio de la aplicación que monta el componente `App` en el DOM.

-   **.dockerignore**: Archivo que especifica qué archivos y carpetas deben ignorarse al construir una imagen Docker para optimizar el tamaño de la imagen.

-   **.env.Example**: Archivo de ejemplo que define las variables de entorno necesarias para la aplicación, sin exponer información sensible.

-   **.eslintc.js**: Configuración de ESLint para asegurar un estilo de código consistente y detectar errores.

-   **config-overrides.js**: Archivo de configuración utilizado con `react-app-rewired` para modificar la configuración de Webpack sin necesidad de hacer eject del proyecto.

-   **Dockerfile**: Archivo de configuración para construir la imagen Docker de la aplicación.

-   **package.json**: Define las dependencias, scripts y metadatos del proyecto.

-   **package-lock.json**: Archivo de bloqueo de dependencias generado automáticamente para asegurar que las mismas versiones se instalen en todos los entornos.

-   **README.md**: Documento de introducción y guía del proyecto, que explica cómo instalar, ejecutar y contribuir al proyecto.

Esta estructura está organizada para facilitar la escalabilidad y el mantenimiento, manteniendo el código fuente, las configuraciones, y los recursos adicionales bien estructurados y separados.

## Tecnologías Utilizadas

-   React
-   TypeScript
-   Axios
-   Redux Toolkit
-   Otras tecnologías incluidas en el package.json...

## Licencia

Este proyecto está bajo la Licencia GNU General Public License versión 3 (GPLv3) - consulta el archivo LICENSE.md para más detalles.

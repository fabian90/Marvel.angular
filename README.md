# ⚡ Pokédex con Angular

Esta es una aplicación web moderna para explorar Pokémon, construida con **Angular 17+** y **Tailwind CSS**. Permite a los usuarios navegar por una lista de Pokémon, ver información detallada de cada uno, y gestionar una lista personal de favoritos.

## 📚 Tabla de Contenido

1.  [Manual de Instalación y Ejecución](#manual-de-instalación-y-ejecución)
    * [Requerimientos de Desarrollo](#requerimientos-de-desarrollo)
    * [Instrucciones de Ejecución](#instrucciones-de-ejecución)
    * [Solución de Problemas (Troubleshooting)](#solución-de-problemas-troubleshooting)
2.  [Documento de Arquitectura](#documento-de-arquitectura)
    * [Patrón General: Arquitectura Basada en Componentes](#patrón-general-arquitectura-basada-en-componentes)
    * [Principios y Patrones Específicos](#principios-y-patrones-específicos)
    * [Adopción del Patrón "Atomic Design"](#adopción-del-patrón-atomic-design)

---

## 🛠️ Manual de Instalación y Ejecución

A continuación se detallan los requerimientos y las instrucciones necesarias para la ejecución del sitio web en un entorno de desarrollo.

### Requerimientos de Desarrollo

Para compilar y ejecutar el proyecto, necesitarás tener instalado el siguiente software en tu sistema:

* **Node.js:** Se recomienda utilizar una versión **LTS (Soporte a Largo Plazo)** reciente, como `v18.x`, `v20.x` o `v22.x`. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
* **npm (Gestor de Paquetes de Nodos):** Se recomienda la versión `v8.19.0` o superior. NPM se instala automáticamente junto con Node.js.
* **CLI angular:** Se recomienda la versión `v17.0.0` o superior. Es la herramienta de línea de comandos oficial de Angular. Para instalarla, abre una terminal y ejecuta el siguiente comando:

```bash
npm install -g @angular/cli

Instrucciones de Ejecución
Sigue estos pasos para ejecutar la aplicación en tu máquina local:

Paso 1: Ejecutar el Backend (Pre-condición)
¡IMPORTANTE! Antes de iniciar el frontend, el servidor del backend debe estar en ejecución. La aplicación frontend necesita conectarse al backend para la autenticación y para obtener los datos de los Pokémon.

Asegúrate de que el backend esté corriendo y sea accesible en la URL configurada.

Paso 2: Configurar la Conexión con el Backend
La URL del backend (API_BASE_URL) se establece en un único lugar para facilitar su modificación.

Abre el archivo: .src/config.ts

Verifica que la constante apunte a la dirección donde se está ejecutando tu backend. Por defecto, está configurada para una ejecución local:
TypeScript
export const API_BASE_URL = 'https://localhost:7148/api';
Si tu backend corre en un puerto o dominio diferente, actualiza esta línea.

Paso 3: Instalar Dependencias del Frontend
Navega hasta el directorio raíz del proyecto en tu terminal y ejecuta el siguiente comando para descargar todas las librerías necesarias:
Bash

npm install

Paso 4: Ejecutar la Aplicación Frontend
Una vez instaladas las dependencias, utiliza el Angular CLI para compilar y servir la aplicación con el siguiente comando:

Bash

ng serve
Este comando iniciará un servidor de desarrollo local. Espera a que la compilación termine. Verás un mensaje en la terminal indicando que la aplicación está disponible, usualmente en la siguiente dirección:

http://localhost:4200/

Abre tu navegador web y navega a esa URL. ¡La aplicación Pokédex debería cargarse y estar lista para usar!

Solución de Problemas (Troubleshooting)
A continuación se listan algunos errores comunes que pueden surgir durante la instalación o ejecución, junto con sus soluciones.

Error: ERESOLVE unable to resolve dependency tree
Este es un error común de npm que ocurre cuando el comando npm install falla porque dos o más paquetes requieren versiones incompatibles de otra dependencia.

Ejemplo de error en la terminal:

npm error ERESOLVE unable to resolve dependency tree
...
npm error Could not resolve dependency:
npm error peer typescript@">=5.9 <6.0" from @angular/build@21.0.3
npm error Found: typescript@5.8.3
Causa: En este ejemplo, las herramientas de compilación de Angular (@angular/build) necesitan una versión de TypeScript 5.9 o superior, pero el proyecto está configurado para usar una versión anterior (5.8.3).

Solución (Paso a Paso): Sigue estos comandos en orden para resolver el problema.

Paso 1: Actualizar TypeScript Directamente Ejecuta el siguiente comando en tu terminal. Esto instalará la versión correcta de TypeScript como dependencia de desarrollo y actualizará tu archivo package.json automáticamente.

Bash

npm install -D typescript@~5.9.0
Paso 2: Reintentar la Instalación Principal Ahora que TypeScript tiene la versión correcta, ejecuta de nuevo el comando de instalación principal para que npm pueda resolver el resto de las dependencias sin conflictos.

Bash

npm install
Paso 3: Ejecutar la Aplicación Una vez que la instalación se complete sin errores, ya puedes iniciar el servidor de desarrollo.

Bash

ng serve
La aplicación debería compilarse y ejecutarse correctamente.

📐 Documento de Arquitectura
A continuación, se especifica el patrón de arquitectura empleado en el desarrollo del sitio web.

Patrón General: Arquitectura Basada en Componentes
La aplicación sigue una Arquitectura Basada en Componentes, que es el pilar fundamental del framework Angular. La interfaz de usuario se descompone en piezas lógicas y reutilizables llamadas componentes. Cada componente encapsula su propia vista (HTML), lógica (TypeScript) y estilos (CSS), promoviendo la modularidad y la mantenibilidad.

Principios y Patrones Específicos
Dentro de esta arquitectura general, se aplican varios patrones y principios modernos de desarrollo con Angular:

Componentes Independientes (standalone):

La aplicación utiliza exclusivamente componentes standalone, eliminando la necesidad de NgModules. Esto simplifica la estructura del código y mejora el tree-shaking.

Inyección de Dependencias y Servicios:

La lógica de negocio (PokemonService, AuthService, etc.) y la gestión del estado se aíslan en Servicios. Estos servicios se proporcionan a nivel de raíz (providedIn: 'root') y se inyectan en los componentes, respetando el principio de Separación de Responsabilidades (SoC).

Gestión de Estado Reactivo con Signals:

Para el manejo del estado local, se utilizan Signals de Angular. Los Signals proporcionan un sistema de reactividad granular que notifica automáticamente a la vista cuando un valor de estado cambia (ej. pokemonList, loading en PokedexComponent).

Enrutamiento Centralizado y Guards (Guardianes de Rutas):

La navegación se gestiona en app.routes.ts. Se utilizan Route Guards (ej. authGuard) para proteger rutas específicas, asegurando el acceso solo a usuarios autenticados.

Adopción del Patrón "Atomic Design"
Conceptualmente, la estructura de componentes de la aplicación se alinea con los principios de Atomic Design, lo que permite un desarrollo escalable y consistente.

Átomos:

Son los bloques de construcción más básicos (ej. <button>, <input>, etiquetas de tipo Pokémon).

Moléculas:

Son agrupaciones de átomos que funcionan como una unidad (ej. PokemonCardComponent, que combina imagen, nombre, ID y etiquetas de tipo).

Organismos:

Son grupos de moléculas/átomos que forman una sección compleja (ej. HeaderComponent, LoginComponent, la cuadrícula de Pokémon en PokedexComponent).

Páginas:

Son instancias específicas de organismos y moléculas que componen una vista completa, a la que el usuario accede a través de una ruta (ej. PokedexComponent, PokemonDetailComponent, FavoritesComponent).



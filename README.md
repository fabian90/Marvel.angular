
# Pokédex con Angular

Esta es una aplicación web moderna para explorar Pokémon, construida con Angular 17+ y Tailwind CSS. Permite a los usuarios navegar por una lista de Pokémon, ver información detallada de cada uno, y gestionar una lista personal de favoritos.

## Manual de Instalación y Ejecución

A continuación se detallan los requerimientos y las instrucciones necesarias para la ejecución del sitio web en un entorno de desarrollo.

### Requerimientos de Desarrollo

Para compilar y ejecutar el proyecto, necesitarás tener instalado el siguiente software en tu sistema:

1.  **Node.js:** Se recomienda utilizar una versión **LTS (Sorte a Largo Plazo)** reciente, como **v18.x**, **v20.x** o **v22.x**. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
2.  **npm (Node Package Manager):** Se recomienda la versión **v8.19.0 o superior**. npm se instala automáticamente junto con Node.js.
3.  **Angular CLI:** Se recomienda la versión **v17.0.0 o superior**. Es la herramienta de línea de comandos oficial de Angular. Para instalarla, abre una terminal y ejecuta el siguiente comando:
    ```bash
    npm install -g @angular/cli
    ```

### Instrucciones de Ejecución

Sigue estos pasos para ejecutar la aplicación en tu máquina local:

#### Paso 1: Ejecutar el Backend (Pre-condición)

**¡IMPORTANTE!** Antes de iniciar el frontend, el servidor del backend debe estar en ejecución. La aplicación frontend necesita conectarse al backend para la autenticación y para obtener los datos de los Pokémon.

Asegúrate de que el backend esté corriendo y sea accesible en la URL configurada.

#### Paso 2: Configurar la Conexión con el Backend

La URL del backend se establece en un único lugar para facilitar su modificación.

1.  Abre el archivo: `src/config.ts`.
2.  Verifica que la constante `API_BASE_URL` apunte a la dirección donde se está ejecutando tu backend. Por defecto, está configurada para una ejecución local:
    ```typescript
    export const API_BASE_URL = 'https://localhost:7148/api';
    ```
    Si tu backend corre en un puerto o dominio diferente, actualiza esta línea.

#### Paso 3: Instalar Dependencias del Frontend

Navega hasta el directorio raíz del proyecto en tu terminal y ejecuta el siguiente comando para descargar todas las librerías necesarias:

```bash
npm install typescript@~5.9.0 --save-dev
```

#### Paso 4: Ejecutar la Aplicación Frontend

Una vez instaladas las dependencias, utiliza el Angular CLI para compilar y servir la aplicación con el siguiente comando:

```bash
ng serve
```

Este comando iniciará un servidor de desarrollo local. Espera a que la compilación termine. Verás un mensaje en la terminal indicando que la aplicación está disponible, usualmente en la siguiente dirección:

**`http://localhost:4200/`**

Abre tu navegador web y navega a esa URL. ¡La aplicación Pokédex debería cargarse y estar lista para usar!

---

## Solución de Problemas (Troubleshooting)

A continuación se listan algunos errores comunes que pueden surgir durante la instalación o ejecución, junto con sus soluciones.

### Error: `ERESOLVE unable to resolve dependency tree`

Este es un error común de `npm` que ocurre cuando el comando `npm install` falla porque dos o más paquetes requieren versiones incompatibles de otra dependencia.

**Ejemplo de error en la terminal:**

```
npm error ERESOLVE unable to resolve dependency tree
...
npm error Could not resolve dependency:
npm error peer typescript@">=5.9 <6.0" from @angular/build@21.0.3
npm error Found: typescript@5.8.3
```

**Causa:**

En este ejemplo, las herramientas de compilación de Angular (`@angular/build`) necesitan una versión de TypeScript `5.9` o superior, pero el proyecto está configurado para usar una versión anterior (`5.8.3`).

**Solución (Paso a Paso):**

Sigue estos comandos en orden para resolver el problema.

1.  **Paso 1: Actualizar TypeScript Directamente**

    Ejecuta el siguiente comando en tu terminal. Esto instalará la versión correcta de TypeScript como dependencia de desarrollo y actualizará tu archivo `package.json` automáticamente.

    ```bash
    npm install -D typescript@~5.9.0
    ```

2.  **Paso 2: Reintentar la Instalación Principal**

    Ahora que TypeScript tiene la versión correcta, ejecuta de nuevo el comando de instalación principal para que `npm` pueda resolver el resto de las dependencias sin conflictos.

    ```bash
    npm install
    ```

3.  **Paso 3: Ejecutar la Aplicación**

    Una vez que la instalación se complete sin errores, ya puedes iniciar el servidor de desarrollo.

    ```bash
    ng serve
    ```

    La aplicación debería compilarse y ejecutarse correctamente.

---

## Documento de Arquitectura

A continuación, se especifica el patrón de arquitectura empleado en el desarrollo del sitio web.

### Patrón General: Arquitectura Basada en Componentes

La aplicación sigue una **Arquitectura Basada en Componentes**, que es el pilar fundamental del framework Angular. La interfaz de usuario se descompone en piezas lógicas y reutilizables llamadas componentes. Cada componente encapsula su propia vista (HTML), lógica (TypeScript) y estilos (CSS), promoviendo la modularidad y la mantenibilidad.

### Principios y Patrones Específicos

Dentro de esta arquitectura general, se aplican varios patrones y principios modernos de desarrollo con Angular:

1.  **Standalone Components (Componentes Autónomos):**
    *   **Descripción:** La aplicación utiliza exclusivamente componentes `standalone`, la aproximación moderna recomendada desde Angular 17. Esto elimina la necesidad de `NgModules`, simplificando la estructura del código. Cada componente declara explícitamente sus dependencias, lo que mejora la claridad y facilita el "tree-shaking" (eliminación de código no usado).
    *   **Ejemplo:** `PokedexComponent` importa `PokemonCardComponent` directamente en su decorador `@Component`, sin pasar por un módulo intermedio.

2.  **Inyección de Dependencias y Servicios:**
    *   **Descripción:** La lógica de negocio, la comunicación con la API y la gestión del estado compartido se aíslan en **Servicios** (ej. `PokemonService`, `AuthService`, `FavoritesService`). Estos servicios se proporcionan a nivel de raíz (`providedIn: 'root'`) y se inyectan en los componentes que los necesitan mediante el mecanismo de Inyección de Dependencias de Angular.
    *   **Beneficio:** Este patrón respeta el principio de **Separación de Responsabilidades (SoC)**, haciendo que los componentes se centren en la presentación y la experiencia de usuario, mientras que los servicios manejan la lógica subyacente.

3.  **Gestión de Estado Reactivo con Signals:**
    *   **Descripción:** Para el manejo del estado local de los componentes, se utilizan **Signals** de Angular. Los Signals proporcionan un sistema de reactividad granular y eficiente que notifica a la vista de manera automática cuando un valor de estado cambia.
    *   **Ejemplo:** En `PokedexComponent`, la lista de Pokémon (`pokemonList`) y el estado de carga (`loading`) son signals. La vista reacciona automáticamente a los cambios en estos signals sin necesidad de detección de cambios manual.

4.  **Enrutamiento Centralizado y Guards (Guardianes de Rutas):**
    *   **Descripción:** La navegación de la aplicación se gestiona a través de un sistema de enrutamiento centralizado definido en `app.routes.ts`. Se utilizan **Route Guards** (ej. `authGuard`) para proteger rutas específicas, asegurando que solo los usuarios autenticados puedan acceder a ciertas partes de la aplicación, como el Pokédex o la lista de favoritos.

### Adopción del Patrón "Atomic Design"

Conceptualmente, la estructura de componentes de la aplicación se alinea con los principios de **Atomic Design**, lo que permite un desarrollo escalable y consistente.

*   **Atoms (Átomos):**
    *   Son los bloques de construcción más básicos de la UI. En esta aplicación, serían los elementos HTML nativos con estilos de Tailwind CSS, como botones (`<button>`), campos de entrada (`<input>`) y etiquetas de tipo Pokémon (`<span class="type-fire">`).

*   **Molecules (Moléculas):**
    *   Son agrupaciones de átomos que funcionan juntos como una unidad.
    *   **Ejemplo:** El componente `PokemonCardComponent` es una molécula perfecta. Combina una imagen, un título (nombre del Pokémon), un ID y las etiquetas de tipo (átomos) para formar una tarjeta cohesiva y reutilizable.

*   **Organisms (Organismos):**
    *   Son grupos de moléculas y/o átomos que forman una sección relativamente compleja de una interfaz.
    *   **Ejemplos:**
        *   El `HeaderComponent` combina el logo, los enlaces de navegación y el botón de cierre de sesión.
        *   El formulario de inicio de sesión (`LoginComponent`) combina etiquetas, inputs y un botón para formar una funcionalidad completa.
        *   La cuadrícula de Pokémon dentro de `PokedexComponent`, que incluye la paginación y la colección de moléculas `PokemonCardComponent`.

*   **Pages (Páginas):**
    *   Son instancias específicas de organismos y moléculas que componen una vista completa, a la que el usuario accede a través de una ruta.
    *   **Ejemplos:** `PokedexComponent`, `PokemonDetailComponent`, y `FavoritesComponent` actúan como páginas principales de la aplicación, cada una con un propósito definido en el flujo de navegación.

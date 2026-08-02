# Convenciones de Desarrollo

Este documento define las convenciones de desarrollo, calidad, commits y Pull Requests del proyecto Frontend de Multicine. Deben respetarse durante todo el ciclo de desarrollo.

## Convención de Nombres

| Elemento     | Convención                  | Ejemplo             |
| ------------ | --------------------------- | ------------------- |
| Componentes  | PascalCase                  | `MovieCard.tsx`     |
| Hooks        | camelCase con prefijo `use` | `useMovies.ts`      |
| Servicios    | camelCase + `.service`      | `movie.service.ts`  |
| Tipos        | PascalCase                  | `Movie.ts`          |
| Validaciones | camelCase + `.schema`       | `login.schema.ts`   |
| Utilidades   | camelCase                   | `formatCurrency.ts` |
| Stores       | camelCase + `.store`        | `auth.store.ts`     |

## Organización de Componentes

- **Componentes globales**: elementos reutilizables en toda la aplicación (botones, tarjetas, diálogos, campos de entrada) en `src/components/`.
- **Componentes específicos**: cuando un componente pertenece exclusivamente a una funcionalidad, permanece dentro de su Feature.

```text
features/
└── movies/
    └── components/
        ├── MovieCard.tsx
        ├── MovieBanner.tsx
        └── MovieTrailer.tsx
```

## Organización de Hooks

- Los hooks reutilizables se almacenan en `src/hooks/`.
- Los hooks específicos permanecen dentro de la Feature correspondiente.

```text
hooks/
    useTheme.ts

features/
└── reservations/
    hooks/
        useReservation.ts
```

## Separación de Responsabilidades

Cada archivo cumple una única responsabilidad:

- los componentes renderizan la interfaz;
- los hooks encapsulan la lógica de presentación;
- los servicios gestionan la comunicación con la API;
- los esquemas validan datos;
- los stores administran el estado global.

Ningún archivo asume responsabilidades correspondientes a otra capa de la aplicación.

## Flujo de Dependencias

Las dependencias entre capas siguen un flujo descendente:

```text
Componente
      │
      ▼
Hook
      │
      ▼
Servicio
      │
      ▼
API
```

Los componentes no consumen directamente servicios cuando existe un hook que encapsule esa funcionalidad. Los servicios nunca dependen de elementos visuales del sistema.

## Reutilización de Código

Antes de implementar un nuevo componente, hook o utilidad, se verifica si ya existe una implementación equivalente en el proyecto. La reutilización es prioritaria frente a la duplicación de código.

## Exportaciones Centralizadas

Cada módulo utiliza archivos `index.ts` para centralizar sus exportaciones públicas. Otros módulos importan únicamente desde el punto de entrada del dominio, disminuyendo el acoplamiento entre directorios.

```text
features/
└── movies/
    ├── components/
    ├── hooks/
    ├── services/
    └── index.ts
```

## Commits (Conventional Commits)

El historial del proyecto sigue la especificación **Conventional Commits**: `tipo: descripción`.

Tipos utilizados:

| Tipo        | Uso                                                       |
| ----------- | --------------------------------------------------------- |
| `feat:`     | Nueva funcionalidad.                                      |
| `fix:`      | Corrección de errores.                                    |
| `docs:`     | Cambios en documentación.                                 |
| `style:`    | Formato, espaciado, comillas; sin cambio de lógica.       |
| `refactor:` | Cambio de código que no corrige ni añade funcionalidad.   |
| `test:`     | Añadir o corregir pruebas.                                |
| `build:`    | Cambios en el sistema de compilación o dependencias.      |
| `ci:`       | Cambios en la configuración de integración continua.      |
| `chore:`    | Tareas de mantenimiento sin impacto en código de negocio. |

Ejemplos:

```text
feat: configurar estructura inicial del proyecto
feat: implementar módulo de autenticación
fix: corregir validación del formulario de inicio de sesión
docs: actualizar arquitectura frontend
refactor: reorganizar servicios de películas
```

## Pull Requests

Todo cambio se incorpora al repositorio mediante un Pull Request hacia `develop`.

Antes de aprobar una integración se verifica que:

- el código compile correctamente;
- no existan errores de ESLint;
- las convenciones del proyecto sean respetadas;
- la funcionalidad cumpla con la historia de usuario correspondiente.

## Organización de Dependencias

- **Dependencias de producción** (`dependencies`): librerías necesarias para el funcionamiento de la aplicación, como React, React Router, Axios, Zustand o TanStack Query.
- **Dependencias de desarrollo** (`devDependencies`): herramientas utilizadas durante el desarrollo, como Vite, TypeScript, ESLint, Prettier y los paquetes relacionados con Tailwind CSS.

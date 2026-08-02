# Multicine Frontend

Aplicación frontend de **Multicine**, plataforma de cine en línea.

## Descripción del proyecto

Multicine es una plataforma de cine en línea que permite a los usuarios explorar la cartelera, consultar información de películas, seleccionar funciones y gestionar sus reservas. Este repositorio contiene el **frontend** de la aplicación, construido como una SPA (Single Page Application) que consume los servicios REST del backend de Multicine.

## Objetivo

Proveer una interfaz de usuario moderna, accesible y de alto rendimiento para la plataforma, estableciendo una base técnica sólida, documentada y estandarizada que permita al equipo de desarrollo agregar funcionalidades de forma ordenada, consistente y escalable.

## Tecnologías utilizadas

- **React 19** — Biblioteca principal de interfaz de usuario
- **TypeScript** — Tipado estático del lenguaje
- **Vite** — Herramienta de construcción y servidor de desarrollo
- **Tailwind CSS** — Framework de estilos utilitario
- **shadcn/ui** — Componentes de interfaz reutilizables (Radix UI + Lucide React)
- **React Router DOM** — Enrutamiento de la aplicación
- **TanStack Query** — Gestión del estado del servidor (caché y sincronización de datos)
- **Zustand** — Gestión del estado global del cliente
- **React Hook Form + Zod** — Formularios y validación de datos
- **Axios** — Cliente HTTP para la comunicación con la API
- **Sonner** — Notificaciones (toasts)
- **React Helmet Async** — Gestión de metadatos y SEO
- **ESLint + Prettier** — Calidad y formato del código
- **Docker** — Contenedorización de la aplicación

## Requisitos previos

- **Node.js** versión **22 o superior** (LTS recomendada)
- **npm** versión **10 o superior**
- **Docker** (opcional, solo si se usa el flujo de contenedores)

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/riwi-cine/multicine-frontend.git

# 2. Acceder al directorio del proyecto
cd multicine-frontend

# 3. Instalar dependencias
npm install

# 4. Crear el archivo de entorno a partir de la plantilla
cp .env.example .env
```

## Configuración de variables de entorno

El proyecto se configura mediante variables de entorno (ver `.env.example`):

| Variable            | Descripción                                        | Ejemplo                          |
| ------------------- | -------------------------------------------------- | -------------------------------- |
| `VITE_APP_NAME`     | Nombre de la aplicación                            | `Multicine`                      |
| `VITE_API_URL`      | URL base de la API REST                            | `https://api.multicine.com/api/v1` |
| `VITE_API_TIMEOUT`  | Tiempo máximo de espera de peticiones (ms)         | `10000`                          |
| `VITE_APP_ENV`      | Entorno de ejecución (`development` o `production`)| `development`                    |
| `VITE_PUBLIC_KEY`   | Claves públicas de servicios externos              | *(completar según entorno)*      |

> **Importante:** nunca se suben al repositorio claves ni información sensible (archivos `.env`, `.env.local`, etc.).

## Comandos disponibles

| Comando                  | Descripción                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | Inicia el servidor de desarrollo                    |
| `npm run build`          | Compila el proyecto para producción                 |
| `npm run preview`        | Previsualiza la compilación de producción           |
| `npm run lint`           | Ejecuta el análisis estático del código             |
| `npm run format`         | Formatea el código según Prettier                   |

### Docker

```bash
docker build -t multicine-frontend .
docker run -p 8080:80 multicine-frontend
```

La aplicación quedará disponible en `http://localhost:8080`.

## Arquitectura general del proyecto

El frontend sigue una arquitectura por **capas de responsabilidad** que separa la presentación de la comunicación con el backend:

```text
+----------------+        +----------------+        +----------------+
|   UI           |  →     |   Servicios    |  →     |   Cliente API  |
| (Componentes,  |        |  (services/)   |        |   (api/)       |
|  páginas,      |        |                |        |                |
|  hooks)        |        |                |        |                |
+----------------+        +----------------+        +----------------+
                                                          ↓
                                                  +----------------+
                                                  |   API REST     |
                                                  |   (Backend)    |
                                                  +----------------+
```

- **Componentes y hooks**: representan y manipulan la interfaz; no realizan llamadas HTTP directamente.
- **Servicios** (`src/services/`): agrupan las operaciones por dominio (películas, autenticación, reservas, etc.) y son el único punto de acceso a la API desde la UI.
- **Cliente API** (`src/api/`): instancia centralizada de Axios con interceptores, manejo global de errores y configuración común.
- **Estado**: TanStack Query para datos del servidor (caché y sincronización) y Zustand para estado global del cliente.

## Flujo de comunicación

La comunicación sigue la cadena obligatoria:

```text
Componente → Servicio → Cliente Axios → API REST
```

1. Un **componente/hook** invoca un método de un **servicio** (`src/services/`).
2. El servicio delega la petición en la **instancia centralizada de Axios** (`src/api/client.ts`).
3. El cliente agrega headers, configuración y autenticación; envía la petición a la **API REST**.
4. Los **interceptores** procesan la respuesta: normalizan errores (`ApiError`) y respuestas (`ApiResponse`).

## Estructura principal de carpetas

```text
multicine-frontend/
├── .github/                  Configuración de GitHub
├── .husky/                   Hooks de Git
├── docs/                     Documentación técnica del proyecto
├── public/                   Recursos estáticos servidos sin compilar
├── src/
│   ├── api/                  Cliente HTTP centralizado y manejo de errores
│   ├── assets/               Recursos estáticos del código fuente
│   ├── components/
│   │   ├── ui/               Componentes base (shadcn/ui)
│   │   └── ...               Componentes reutilizables de la aplicación
│   ├── config/               Configuración de la aplicación
│   ├── features/             Módulos por dominio de negocio
│   ├── hooks/                Hooks personalizados reutilizables
│   ├── layouts/              Layouts de la aplicación
│   ├── lib/                  Utilidades y helpers
│   ├── pages/                Páginas (vistas) de la aplicación
│   ├── routes/               Definición y configuración de rutas
│   ├── services/             Capa de servicios por dominio
│   ├── store/                Estado global (Zustand)
│   ├── types/                Tipos e interfaces compartidas
│   └── main.tsx              Punto de entrada de la aplicación
├── .env.example              Plantilla de variables de entorno
├── Dockerfile                Imagen de producción
├── docker-compose.yml        Orquestación local con Docker
├── nginx.conf                Configuración de Nginx (producción)
├── README.md                 Este documento
└── docs/                     Documentación técnica del proyecto (incluye la guía de contribución `CONTRIBUTING.md`)
```

## Flujo de ramas

El proyecto usa una estrategia **Git Flow simplificada** (ver `docs/ESTRATEGIA-CONTROL-VERSIONES.md`):

```text
main ──► release ──► develop ──► feature/* | fix/* | hotfix/*
```

| Rama          | Propósito                                                    |
| ------------- | ------------------------------------------------------------ |
| `main`        | Versión estable en producción. Solo se integra desde `release/*`. |
| `develop`     | Integración continua del trabajo del equipo.                 |
| `feature/*`   | Historias de usuario nuevas. Nomenclatura: `feature/HU-CINE-XXX-descripcion`. |
| `fix/*`       | Correcciones de errores sobre `develop`.                     |
| `hotfix/*`    | Correcciones urgentes de producción.                         |
| `release/*`   | Preparación de versiones para publicación.                   |

**Reglas:** no se hace commit directo sobre `main` ni `develop`; todo el trabajo se integra mediante Pull Requests.

## Convención de commits

Se utiliza **Conventional Commits**:

| Prefijo    | Uso                                              | Ejemplo                                        |
| ---------- | ------------------------------------------------ | ---------------------------------------------- |
| `feat:`    | Nueva funcionalidad                              | `feat: implementar login de usuarios`          |
| `fix:`     | Corrección de errores                            | `fix: corregir validación del formulario`      |
| `docs:`    | Documentación                                    | `docs: actualizar guía de contribución`        |
| `refactor:`| Cambios que no alteran comportamiento            | `refactor: extraer componente de navbar`       |
| `style:`   | Formato, espacios, estilos (sin lógica)          | `style: formatear archivos con prettier`       |
| `test:`    | Pruebas                                         | `test: agregar pruebas del servicio de auth`   |
| `build:`   | Build o dependencias                             | `build: actualizar dependencias de lint`       |
| `chore:`   | Tareas varias                                    | `chore: actualizar archivos de entorno`        |

Ver la referencia completa en `docs/CONVENCIONES-DESARROLLO.md`.

## Buenas prácticas

- **Componentes**: un componente, una responsabilidad; componentes reutilizables en `src/components/`, específicos de dominio en `src/features/`.
- **Sin HTTP directo en la UI**: los componentes y hooks nunca invocan Axios directamente; siempre a través de un servicio.
- **Tipado**: todo el código es TypeScript; no se usa `any` salvo justificación.
- **Estado**: datos del servidor con TanStack Query; estado de UI global con Zustand; estado local con hooks de React.
- **Formularios**: React Hook Form + Zod para validación.
- **Estilos**: Tailwind CSS con tokens del Design System; no se escriben estilos inline salvo excepciones.
- **Calidad**: el código debe pasar `npm run lint` sin errores y `npm run format`.
- **Nombres y exportaciones**: nomenclatura consistente en español o inglés según la capa; exportaciones centralizadas (barrels).
- **Commits**: Conventional Commits; un commit por tarea lógica con mensaje descriptivo.

## Proceso para contribuir

1. Leer `docs/CONTRIBUTING.md` antes de comenzar.
2. Crear una rama `feature/*` desde `develop`.
3. Implementar la Historia de Usuario asignada (un solo alcance por rama).
4. Validar con `npm run lint` y `npm run build`.
5. Abrir un Pull Request hacia `develop` con la descripción requerida.
6. Esperar la revisión y aprobación antes del merge.

## Información del equipo

| Rol                        | Nombre              | Correo electrónico                 |
| -------------------------- | ------------------- | ---------------------------------- |
| **Tech Lead / Frontend**   | *(por confirmar)*   | *(por confirmar)*                  |
| **Desarrollador Frontend** | *(por confirmar)*   | *(por confirmar)*                  |
| **Desarrollador Frontend** | *(por confirmar)*   | *(por confirmar)*                  |
| **QA**                     | *(por confirmar)*   | *(por confirmar)*                  |

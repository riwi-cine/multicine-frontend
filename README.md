# Multicine Frontend

Aplicación frontend de Multicine, plataforma de cine en línea.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- Lucide React
- Sonner
- React Helmet Async

## Requisitos previos

- Node.js (versión LTS recomendada)
- npm

## Instalación

```bash
npm install
```

## Ejecución del entorno de desarrollo

```bash
npm run dev
```

## Docker

```bash
docker build -t multicine-frontend .
docker run -p 8080:80 multicine-frontend
```

La aplicación quedará disponible en `http://localhost:8080`.

## Estructura general del proyecto

```text
multicine-frontend/
├── .github/          Configuración de GitHub (workflows y plantillas)
├── public/           Recursos estáticos servidos sin compilar
├── src/              Código fuente del frontend
├── docs/             Documentación técnica del proyecto
├── .env.example      Plantilla de variables de entorno
└── ESTRATEGIA-CONTROL-VERSIONES.md (en docs/)
```

## Convenciones básicas del equipo

- Estrategia de ramas: `main`, `develop`, `feature/*`, `fix/*`, `hotfix/*`, `release/*` (ver `docs/ESTRATEGIA-CONTROL-VERSIONES.md`).
- Toda funcionalidad se desarrolla en una rama `feature/*` y se integra a `develop` mediante Pull Request.

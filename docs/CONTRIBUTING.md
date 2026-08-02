# Guía de contribución

Este documento describe el flujo de trabajo completo del equipo de desarrollo de **Multicine Frontend**. Léelo antes de realizar cualquier cambio en el repositorio.

## 1. Flujo de trabajo del equipo

El proyecto sigue una estrategia **Git Flow simplificada** (detalle en `docs/ESTRATEGIA-CONTROL-VERSIONES.md`):

1. Todo el trabajo se realiza en ramas `feature/*` creadas desde `develop`.
2. Cada **Historia de Usuario (HU)** se implementa en una rama exclusiva.
3. La integración a `develop` se realiza únicamente mediante **Pull Requests** con revisión.
4. `main` solo recibe versiones listas para producción (vía `release/*`).

### Ciclo de una Historia de Usuario

```text
1. Crear rama feature desde develop
2. Implementar la HU (solo el alcance definido)
3. Validar: npm run lint + npm run build
4. Commit con Conventional Commits
5. Push de la rama
6. Abrir Pull Request hacia develop
7. Revisión de código y ajustes
8. Aprobación y merge a develop
9. Eliminar la rama de la feature
```

## 2. Cómo crear una rama

```bash
# Asegurarse de estar al día con develop
git checkout develop
git pull origin develop

# Crear la rama de la Historia de Usuario
git checkout -b feature/HU-CINE-XXX-descripcion
```

## 3. Cómo nombrar ramas

| Tipo      | Patrón                          | Ejemplo                                 |
| --------- | ------------------------------- | --------------------------------------- |
| Historia  | `feature/HU-CINE-XXX-descripcion` | `feature/HU-CINE-003-cartelera-peliculas` |
| Fix       | `fix/descripcion`               | `fix/validacion-formulario-login`       |
| Hotfix    | `hotfix/descripcion`            | `hotfix/error-500-en-produccion`        |
| Release   | `release/vX.Y.Z`                | `release/v1.0.0`                        |

Reglas de nomenclatura:

- Minúsculas, palabras separadas por guiones (`-`).
- Descripción corta y descriptiva del trabajo.
- Para historias: usar el código de la HU (`HU-CINE-XXX`).

## 4. Cómo implementar una Historia de Usuario

1. Tomar la HU asignada del **Product Backlog**.
2. Crear la rama correspondiente (ver sección 2 y 3).
3. Implementar **únicamente** los criterios de aceptación de la HU. No adelantar funcionalidades de otras historias.
4. Respetar la arquitectura definida en `../README.md` (capa UI → servicios → cliente API).
5. No modificar archivos o componentes ajenos al alcance, salvo necesidad justificada.
6. Validar antes de commitear:
   ```bash
   npm run lint
   npm run build
   ```
7. Hacer commit(s) con **Conventional Commits** (ver sección 5).
8. Publicar la rama y abrir el Pull Request (ver sección 6).

## 5. Convención de Conventional Commits

Formato general:

```text
<prefijo>(<ámbito>): <descripción>
```

### Prefijos permitidos

| Prefijo    | Uso                                              |
| ---------- | ------------------------------------------------ |
| `feat:`    | Nueva funcionalidad                              |
| `fix:`     | Corrección de errores                            |
| `docs:`    | Documentación                                    |
| `refactor:`| Cambios que no alteran el comportamiento         |
| `style:`   | Formato y estilos (sin lógica)                   |
| `test:`    | Pruebas                                          |
| `build:`   | Compilación o dependencias                       |
| `chore:`   | Tareas de mantenimiento                          |

### Ejemplos

```text
feat: implementar autenticación de usuarios
feat(services): agregar servicio de películas
fix: corregir validación del formulario de registro
docs: documentar flujo de contribución
refactor: extraer componente de navbar
```

Reglas:

- Mensajes en español, en infinitivo o imperativo, concisos y descriptivos.
- Un commit por tarea lógica; no mezclar cambios sin relación.
- Nunca commitear claves, tokens o datos sensibles.
- No commitear directamente sobre `develop` ni `main`.

## 6. Reglas para Pull Requests

- **Destino**: siempre `develop` (nunca `main`).
- **Título**: `HU-CINE-XXX - <descripción breve>` (para historias).
- **Descripción** (mínima): objetivo, resumen de cambios, criterios de aceptación cumplidos, evidencias de validación y observaciones.
- La rama debe estar **pushed y al día** con `develop`.
- El PR debe pasar las validaciones (`lint` y `build`) sin errores.
- **No se mergea** un PR sin revisión y aprobación previa.

## 7. Reglas de revisión de código

- Cada PR debe ser revisado por al menos **un integrante del equipo** que no haya sido el autor.
- La revisión evalúa: cumplimiento de los criterios de la HU, calidad del código, adherencia a la arquitectura, buenas prácticas y ausencia de código muerto o sensibilidad de datos.
- Los comentarios de la revisión se resuelven antes del merge; en caso de cambios, se realizan commits de ajuste en la misma rama.
- La aprobación es **requisito obligatorio** para el merge.

## 8. Qué está permitido modificar y qué no

### Permitido

- Archivos dentro del alcance de la HU asignada.
- Documentación (`docs/`, `../README.md`).
- Pruebas y configuración de calidad (si es necesario para la HU).
- Dependencias y configuración de build **con justificación** y aprobación del Tech Lead.

### No permitido

- Cambiar la **arquitectura general** del proyecto sin autorización.
- Implementar funcionalidades **fuera del alcance** de la HU asignada.
- Modificar componentes, servicios o configuraciones de **otras historias** en la misma rama.
- Commitear directamente sobre `develop` o `main`.
- Subir al repositorio archivos `.env`, claves, tokens o información sensible.
- Eliminar documentación existente sin reemplazo.

## 9. Cómo sincronizar la rama `develop`

Antes de crear una rama o de actualizar un PR:

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Integrar los cambios a la rama de trabajo (rebase recomendado)
git checkout feature/HU-CINE-XXX-descripcion
git rebase develop

# 3. Resolver conflictos si existen y continuar el rebase
git add .
git rebase --continue

# 4. Actualizar la rama remota (requiere fuerza si ya fue publicada)
git push --force-with-lease origin feature/HU-CINE-XXX-descripcion
```

> Alternativa: `git merge develop` cuando el flujo de trabajo así lo defina el equipo.

## 10. Buenas prácticas de desarrollo

- **Una HU por rama y por PR**: no mezclar historias.
- **Arquitectura por capas**: la UI nunca llama a la API directamente; siempre a través de servicios.
- **Tipado estricto**: TypeScript sin `any` salvo justificación.
- **Formularios**: React Hook Form + Zod.
- **Estados**: TanStack Query para datos del servidor, Zustand para estado global, hooks para estado local.
- **Estilos**: Tailwind con tokens del Design System; evitar estilos inline.
- **Calidad**: pasar `npm run lint` y `npm run format` antes de commitear.
- **Commits atómicos y descriptivos** con Conventional Commits.
- **No commitear cambios sin validar** ni depender de la revisión para detectar errores de compilación.
- Ante dudas, preguntar al **Tech Lead** antes de tomar decisiones de arquitectura.

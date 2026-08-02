# Guía para enviar y aprobar Pull Requests

Guía operativa paso a paso para que el equipo de desarrollo envíe Pull Requests (PR) y el administrador (Tech Lead) los apruebe y fusione. Complementa `CONTRIBUTING.md` y `docs/ESTRATEGIA-CONTROL-VERSIONES.md`.

## 1. Contexto

- Cada **Historia de Usuario (HU)** se implementa en una rama exclusiva: `feature/HU-CINE-XXX-descripcion`.
- Todo PR tiene como destino **`develop`** (nunca `main`).
- La rama `main` está **protegida**: solo recibe cambios vía `release/*`, por lo que no es posible (ni necesario) hacer push directo.
- La aprobación del PR la realiza al menos un integrante del equipo que no haya sido el autor. El administrador ejecuta el merge.

```text
feature/* ──PR──► develop ──release──► main
```

## 2. Preparación (desarrollador)

```bash
# Clonar el repositorio (una sola vez)
git clone https://github.com/riwi-cine/multicine-frontend.git
cd multicine-frontend

# Instalar dependencias
npm install
```

Antes de crear una rama, asegurarse de estar al día con `develop`:

```bash
git checkout develop
git pull origin develop
```

## 3. Crear la rama de la HU

```bash
git checkout -b feature/HU-CINE-XXX-descripcion
```

Ejemplo real del proyecto:

```bash
git checkout -b feature/HU-CINE-003-cartelera
```

## 4. Implementar y validar

- Implementar **únicamente** los criterios de aceptación de la HU asignada.
- La UI nunca llama a la API directamente; siempre a través de servicios (`src/services/`).
- Commitear con **Conventional Commits** (mensajes en español):

```text
feat: implementar consulta de películas desde la API
fix: corregir validación del formulario de registro
docs: actualizar documentación
```

Validar antes de publicar la rama (requisito para abrir el PR):

```bash
npm run lint
npm run build
```

Ambos deben terminar sin errores. Los warnings de `react-refresh` en `src/components/ui/` son aceptables (componentes generados por shadcn/ui).

## 5. Publicar la rama

```bash
git add .
git commit -m "feat: describir el cambio"
git push -u origin feature/HU-CINE-XXX-descripcion
```

## 6. Crear el Pull Request

El PR debe apuntar a `develop` como base y a la rama de la HU como head. Hay dos formas:

### Opción A: desde GitHub web

1. Ir a <https://github.com/riwi-cine/multicine-frontend>.
2. GitHub muestra el botón **Compare & pull request** para la rama recién pusheada. Si no aparece: pestaña **Pull requests → New pull request** → base `develop` ← compare `feature/HU-CINE-XXX-descripcion`.
3. Completar el formulario:
   - **Título**: `HU-CINE-XXX - <descripción breve>` (ej.: `HU-CINE-003 - Implementar cartelera de películas`).
   - **Descripción** (mínima): objetivo, resumen de cambios, criterios de aceptación cumplidos, evidencias de validación y observaciones.
4. Clic en **Create pull request**.

### Opción B: desde terminal con GitHub CLI (`gh`)

Instalar y autenticar una sola vez:

```powershell
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements
gh auth login
```

> Si `gh` no se reconoce en la sesión actual, usar la ruta completa: `& "C:\Program Files\GitHub CLI\gh.exe"`.

Crear el PR (escribir la descripción en un archivo y referenciarlo):

```bash
gh pr create --base develop --head feature/HU-CINE-XXX-descripcion `
  --title "HU-CINE-XXX - <descripción breve>" `
  --body-file descripcion-pr.md
```

> El comando `--body-file` reemplaza a `--body` (texto directo) y evita problemas de formato en la terminal.

El comando imprime la URL del PR al terminar. Verificar PRs abiertos:

```bash
gh pr list
```

## 7. Revisión y merge (rol del administrador)

1. Abrir el PR desde <https://github.com/riwi-cine/multicine-frontend/pulls>.
2. Verificar que aparezca **"This branch has no conflicts with the base branch"** (el PR debe verse `MERGEABLE`).
3. Revisar los cambios en la pestaña **Files changed** y aprobar (**Review changes → Approve**) o solicitar ajustes.
4. Si todo está correcto, clic en **Merge pull request → Confirm merge**.

Validación rápida con `gh`:

```bash
gh pr view <numero> --json state,mergeable,additions,deletions
# mergeable: MERGEABLE → listo para fusionar
```

### Si hay conflictos

El PR mostrará "conflicts that must be resolved". El desarrollador debe resolverlos en su rama:

```bash
git checkout feature/HU-CINE-XXX-descripcion
git pull origin develop            # o: git rebase develop
git add .
git commit -m "fix: resolver conflictos con develop"
git push
```

Después de resolver, el PR vuelve a estar `MERGEABLE`.

## 8. Después del merge

- Sincronizar la rama local de desarrollo:

```bash
git checkout develop
git pull origin develop
```

- Eliminar la rama de la feature (local y remota) si el administrador no lo hizo desde GitHub:

```bash
git branch -d feature/HU-CINE-XXX-descripcion
git push origin --delete feature/HU-CINE-XXX-descripcion
```

- Crear la siguiente rama de la HU correspondiente partiendo de `develop` actualizado.

## 9. Errores comunes

| Error | Solución |
| ----- | -------- |
| PR apuntando a `main` | Cambiar la base del PR a `develop` desde la pestaña Edit del PR |
| Rama desactualizada / conflictos | Ejecutar `git pull origin develop` (o rebase) y volver a pushear |
| PR con cambios de otras HUs | Solo mezclar en una rama lo que pertenezca a su alcance; deshacer con `git revert` o `git reset` según el caso |
| `gh` no reconocido en terminal | Usar la ruta completa `C:\Program Files\GitHub CLI\gh.exe` |
| Lint o build fallando | Corregir antes de abrir el PR; no se aceptan PRs que no compilen |
| Push rechazado por `main` protegida | Es correcto: todo push debe ir a ramas `feature/*` y el PR a `develop` |

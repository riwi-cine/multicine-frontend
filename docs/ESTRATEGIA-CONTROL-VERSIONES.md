# Estrategia de Control de Versiones

Documento que define la estructura del repositorio, la estrategia de ramas, el flujo de trabajo y las convenciones de Git y GitHub para el proyecto **Frontend de Multicine**.

## 1. Repositorio

El repositorio contendrá exclusivamente el proyecto del Frontend de Multicine.

| Propiedad | Valor                |
| --------- | -------------------- |
| Nombre    | `multicine-frontend` |

## 2. Rama principal: `main`

- Contiene únicamente versiones estables.
- No se desarrollan funcionalidades directamente sobre esta rama.
- Solo recibe cambios aprobados provenientes de `develop`.

## 3. Rama de desarrollo: `develop`

- Es la rama base para el desarrollo del equipo.
- Todas las funcionalidades se integran aquí antes de pasar a `main`.
- Sirve como punto de referencia para las pruebas de integración.

## 4. Ramas de funcionalidades

El proyecto sigue una arquitectura organizada por funcionalidades (Feature-Based Architecture), por lo que las ramas también siguen este enfoque. Cada historia de usuario tiene su propia rama, lo que permite que varios desarrolladores trabajen en paralelo con un mínimo de conflictos.

Convención:

```text
feature/HU-CINE-001-configuracion-frontend
feature/HU-CINE-002-servicios-api
feature/HU-CINE-003-cartelera
feature/HU-CINE-004-detalle-pelicula
feature/HU-CINE-005-reservas
feature/HU-CINE-006-perfil
```

## 5. Ramas de soporte

| Tipo       | Convención             | Uso                                                        |
| ---------- | ---------------------- | ---------------------------------------------------------- |
| `fix/`     | `fix/<descripcion>`    | Correcciones detectadas durante el desarrollo.             |
| `hotfix/`  | `hotfix/<descripcion>` | Correcciones urgentes sobre una versión publicada.         |
| `release/` | `release/<version>`    | Preparación de una versión antes de fusionarla con `main`. |

## 6. Flujo de trabajo

```text
main
  ▲
  │
release/*
  ▲
  │
develop
  ▲
  │
feature/*
```

Proceso:

1. Crear una rama `feature` desde `develop`.
2. Desarrollar la historia de usuario.
3. Abrir un Pull Request hacia `develop`.
4. Revisar y aprobar los cambios.
5. Integrar en `develop`.
6. Cuando exista una versión estable, crear una rama `release`.
7. Fusionar la `release` en `main`.

## 7. ¿Por qué esta estrategia?

Esta estrategia está alineada con la arquitectura definida para Multicine, ya que:

- Facilita el trabajo simultáneo entre varios desarrolladores.
- Reduce el acoplamiento entre funcionalidades.
- Organiza el proyecto por funcionalidades independientes.
- Aprovecha las prácticas de trabajo colaborativo con Git y GitHub establecidas en el Frontend Master Plan.

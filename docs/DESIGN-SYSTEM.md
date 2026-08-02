# Design System

Sistema de diseño base del Frontend de Multicine, construido sobre **Tailwind CSS v4**, **shadcn/ui** (base Radix), **Lucide React** y la tipografía **Geist**.

## Tailwind CSS

- Versión 4, integrado mediante el plugin `@tailwindcss/vite` en `vite.config.ts`.
- Punto de entrada: `src/index.css`, que importa Tailwind, `tw-animate-css`, el tema de shadcn (`shadcn/tailwind.css`) y Geist.
- Utilidades aplicadas directamente en los componentes; estilos globales únicamente en `src/index.css` (directorio `styles/` queda disponible para estilos globales adicionales).

## Tema y Dark Mode

- Variables CSS globales en `:root` y en `.dark` (clase aplicada sobre `<html>`).
- Soporte de modo oscuro mediante `@custom-variant dark (&:is(.dark *))`.
- El tema se extiende desde el preset `radix-nova` de shadcn/ui, con `baseColor: neutral` y `cssVariables: true` (ver `components.json`).

## Design Tokens

Los tokens se definen en `src/index.css` dentro de `@theme inline` y como variables CSS.

### Paleta de colores

Tokens semánticos (luz y oscuro), basados en OKLCH:

| Token                                    | Uso                              |
| ---------------------------------------- | -------------------------------- |
| `--background` / `--foreground`          | Fondo y texto base.              |
| `--card` / `--card-foreground`           | Superficies de tarjeta.          |
| `--popover` / `--popover-foreground`     | Menús y popovers.                |
| `--primary` / `--primary-foreground`     | Acciones principales.            |
| `--secondary` / `--secondary-foreground` | Acciones secundarias.            |
| `--muted` / `--muted-foreground`         | Contenido atenuado.              |
| `--accent` / `--accent-foreground`       | Resaltados.                      |
| `--destructive`                          | Acciones destructivas / errores. |
| `--border` / `--input` / `--ring`        | Bordes, campos y focos.          |
| `--chart-1` … `--chart-5`                | Gráficas.                        |
| `--sidebar-*`                            | Panel de administración.         |

Se usan mediante utilidades de Tailwind: `bg-background`, `text-foreground`, `bg-primary`, `border-border`, `ring-ring`, etc.

### Tipografía

- Fuente: **Geist Variable** (`@fontsource-variable/geist`).
- Tokens: `--font-sans: 'Geist Variable', sans-serif` y `--font-heading` (hereda de `--font-sans`).
- Aplicada globalmente en `html` mediante `@apply font-sans`.

### Espaciado

Se utiliza la escala de espaciado estándar de Tailwind (`0.25rem` por unidad): `p-2`, `gap-3`, `m-4`, `space-y-6`, etc.

### Border Radius

| Token          | Valor                             |
| -------------- | --------------------------------- |
| `--radius-sm`  | `calc(var(--radius) * 0.6)`       |
| `--radius-md`  | `calc(var(--radius) * 0.8)`       |
| `--radius-lg`  | `var(--radius)` (base `0.625rem`) |
| `--radius-xl`  | `calc(var(--radius) * 1.4)`       |
| `--radius-2xl` | `calc(var(--radius) * 1.8)`       |

### Sombras

Escala de elevación definida en `@theme inline`:

| Token       | Uso                           |
| ----------- | ----------------------------- |
| `shadow-xs` | Elementos planos.             |
| `shadow-sm` | Elementos levemente elevados. |
| `shadow-md` | Tarjetas y menús.             |
| `shadow-lg` | Diálogos y popovers.          |
| `shadow-xl` | Superficies flotantes.        |

### Animaciones base

- Librería `tw-animate-css` para animaciones de entrada/salida (`animate-in`, `animate-out`, `fade-in-*`, `slide-in-*`, `zoom-in-*`).
- Animaciones base nombradas en `@theme inline`:

| Token              | Keyframe                          |
| ------------------ | --------------------------------- |
| `animate-fade-in`  | `fade-in` (opacity)               |
| `animate-slide-up` | `slide-up` (opacity + translateY) |
| `animate-scale-in` | `scale-in` (opacity + scale)      |

## Componentes (shadcn/ui + Radix UI)

- **shadcn/ui** configurado en `components.json` (estilo `radix-nova`, alias `@/components`, utilidad `@/utils/cn`).
- **Radix UI** integrado mediante el paquete unificado `radix-ui` (primitivas accesibles: Dialog, DropdownMenu, Select, Tabs, Tooltip, etc.).
- **Lucide React** como librería de iconos (`iconLibrary: lucide`).
- Componentes base en `src/components/ui/`: `button`, `input`, `textarea`, `label`, `card`, `dialog`, `badge`, `skeleton`, `avatar`, `separator`, `dropdown-menu`, `select`, `tabs`, `checkbox`, `alert`, `tooltip` y `sonner`.
- Los componentes reutilizables de negocio se ubicarán en `src/components/` y los específicos dentro de cada Feature (`src/features/<dominio>/components/`).

## Modo oscuro

Aplicar la clase `dark` sobre el elemento `<html>` alterna toda la paleta. Las variables de tema permiten construir el alternador de tema posteriormente sin cambios estructurales.

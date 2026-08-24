# 🎬 Multicine Homepage — Rediseño Visual Integral

> **Plan estratégico para elevar el homepage del frontend actual al diseño propuesto (HTML mockup), manteniendo 100% la lógica de negocio, routing, estado, APIs y tipos.**

---

## 📊 Tabla Resumen: Fases y Duración

| Fase | Enfoque | Duración | Entregable |
|------|---------|----------|------------|
| **0** | Fundación: Tokens, Tipografía, Utilidades CSS | 1-2 días | `globals.css`, `index.html`, `package.json` |
| **1** | UI Kit Base: Componentes reutilizables | 1-2 días | `components/ui/eyebrow`, `section-head`, `chip`, `link-arrow`, `button` variants |
| **2** | Navbar — Visual redesign | 0.5-1 día | `Navbar.tsx` elevado |
| **3** | Hero — Cinematic redesign | 1-2 días | `Hero.tsx` con hero-frame, badge, cardfloat |
| **4** | Cartelera / MovieCover — Premium | 1-2 días | `MovieCard.tsx` + `MovieCarousel.tsx` con glows dinámicos |
| **5** | Próximamente / ComingSoonGrid | 0.5-1 día | Poster variants p1-p6, tags estreno |
| **6** | Promociones | 0.5 día | PromoCard con top accent bar |
| **7** | Experiencia | 0.5 día | Feature-list pink dots, accent-italic |
| **8** | Footer — Brand redesign | 0.5 día | Gradient wine-900, glow radial, social invert |
| **9** | Integración Global & Consistencia | 1 día | Reveal stagger, spacing, dark mode, responsive |
| **10** | QA, Performance, Accesibilidad, Polish | 1 día | Lighthouse ≥90, WCAG AA, 60fps, cross-browser |

**Total estimado: 8-13 días laborables**

---

## 🗺️ Arquitectura Completa: Mapeo Diseño → Código

| Sección Mockup | Componente Actual | Acción | Complejidad |
|----------------|-------------------|--------|-------------|
| `<header class="nav">` | `Navbar.tsx` | Rediseño visual: tokens, logo-mark, dropdown, mobile | Media |
| `<section class="hero">` | `Hero.tsx` | Reescribir: hero-frame, badge, cardfloat, tipografía | Alta |
| `<section id="cartelera">` | `MovieCarousel.tsx` + `MovieCard.tsx` | Elevar visual: background glows, MovieCard premium, keyboard, dots | Alta |
| `<section tinted>Próximamente</section>` | `ComingSoonGrid.tsx` | Poster variants p1-p6, tags "ESTRENO dd MMM" | Media |
| `<section id="promociones">` | `PromotionsSection.tsx` | PromoCard top accent bar, link-arrow | Media |
| `<section tinted>Experiencia</section>` | `ExperienceSection.tsx` | Feature-list pink dots, accent-italic heading | Baja |
| `<footer class="footer">` | `Footer.tsx` | Gradient wine-900, glow radial, social invert hover | Media |
| **Global** | `globals.css` + `Reveal` | 18 tokens, 3 fuentes, film-grain, glow, vignette, radius, dark mode | Base |

---

## 📁 Estructura del Archivo Generado

Archivo creado: **`/home/cohorte5/Escritorio/Cine/multicine-frontend/PROJECT_PLAN.md`**

Este archivo contiene:

1. **Fases detalladas** con entregables por día
2. **Mapeo completo** de cada sección del mockup al componente actual
3. **Tokens CSS** completos (18 variables semánticas)
4. **Tipografía** editorial (Fraunces + Manrope + IBM Plex Mono)
5. **Componentes UI** nuevos a crear (Eyebrow, SectionHead, Chip, LinkArrow)
6. **Redesign por sección** (Navbar, Hero, Cartelera, Próximamente, Promociones, Experiencia, Footer)
7. **Decisiones marcadas** para resolver al llegar a cada fase
8. **Riesgos y mitigaciones** técnicos
9. **Checklist QA** ejecutable
10. **Metricas de éxito** (Definition of Done)

---

## 🔑 Decisiones Marcadas (Para Resolver Al Llegar a Cada Fase)

| # | Decisión | Fase | Recomendación |
|---|----------|------|---------------|
| 1 | SectionHead incluye rail-controls? | 1 | No — solo si Cartelera lo pide |
| 2 | MovieCard overlay: solo active o todas? | 4 | **Solo active** (limpieza visual) |
| 3 | Carousel dots indicadores? | 4 | **Sí, 3-4 sutiles** |
| 4 | Carousel rail-controls (botones prev/next)? | 4 | **No** — keyboard + swipe + click-to-center |
| 5 | Active card glow: pulse o estático? | 4 | **Estático + pulse 3s si !hover** |
| 6 | Hero usa imagen real o solo gradiente SVG? | 3 | **MovieArtwork (imagen real + overlay SVG)** |
| 7 | Hero-cardfloat dinámico o estático? | 3 | **Estático (featured movie)** |
| 8 | Dark mode completo en este scope? | 0 | **Sí** — tokens ya mapeados |
| 9 | Poster variants p1-p6: aleatorio o determinístico? | 5 | **`index % 6`** (determinístico) |
| 10 | Eliminar `tw-animate-css`? | 0 | **Sí** — CSS nativo más ligero |

---

## 🎨 Tokens CSS — `:root` (Fase 0)

```css
:root {
  /* ── Base ────────────────────────────────────────────────────── */
  --bg-canvas:   #FFFCFB;
  --bg-base:     #FBF5F6;
  --bg-tint:     #F6E7EE;
  --bg-tint-soft:#FCF0F4;
  
  /* ── Ink scale ───────────────────────────────────────────────── */
  --ink-900:     #260A14;
  --ink-700:     #4B2733;
  --ink-500:     #7C5866;
  --ink-300:     #B79AA5;
  
  /* ── Brand wine → pink ──────────────────────────────────────── */
  --wine-900:    #33000D;
  --wine-800:    #800021;
  --wine-700:    #881144;
  --rose-600:    #9C2E56;
  --pink-400:    #FF69B4;
  --pink-200:    #FFC7E1;
  --pink-100:    #FFE9F2;
  
  /* ── Lines & shadows ─────────────────────────────────────────── */
  --line:        rgba(128,0,33,0.12);
  --line-soft:   rgba(128,0,33,0.07);
  --shadow-1:    0 1px 2px rgba(51,0,13,0.06), 0 8px 24px -12px rgba(51,0,13,0.18);
  --shadow-2:    0 20px 45px -20px rgba(51,0,13,0.35);
  
  /* ── Radius ──────────────────────────────────────────────────── */
  --radius-lg:   28px;
  --radius-md:   18px;
  --radius-sm:   11px;
  
  /* ── Fonts ───────────────────────────────────────────────────── */
  --font-display: 'Fraunces', serif;
  --font-body:    'Manrope', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}
```

---

## 🌓 Dark Mode Mapping

```css
.dark {
  --bg-canvas:   #1A0A0E;
  --bg-base:     #1F0F14;
  --bg-tint:     #2A141C;
  --bg-tint-soft:#241018;
  --ink-900:     #FFFCFB;
  --ink-700:     #F6E7EE;
  --ink-500:     #C4B0B8;
  --ink-300:     #8A7880;
  --line:        rgba(255,105,180,0.15);
  --line-soft:   rgba(255,105,180,0.08);
  --shadow-1:    0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(255,105,180,0.15);
  --shadow-2:    0 20px 45px -20px rgba(255,105,180,0.25);
}
```

---

## 📦 Eliminar `tw-animate-css` (Fase 0)

- Quitar `@import 'tw-animate-css';` de `globals.css`
- Remover de `package.json` devDependencies
- Usar CSS nativo del diseño propuesto (más ligero, control total)

---

## 📄 Checklist QA & Definition of Done

### Performance
- [ ] Lighthouse Performance ≥ 90
- [ ] CLS < 0.1
- [ ] TBT < 200ms
- [ ] 60fps sostenido en carousel

### Accesibilidad
- [ ] 0 violations axe-core
- [ ] WCAG AA contraste (texto normal: 4.5:1, grande: 3:1)
- [ ] Navegación teclado completa (Tab order, focus-visible)
- [ ] `prefers-reduced-motion` respeta (auto-play off, transiciones instantáneas)

### Responsive
- [ ] Sin overflow horizontal en ningún breakpoint
- [ ] Breakpoints: 320, 375, 640, 768, 1024, 1280, 1440
- [ ] Touch targets ≥ 44px
- [ ] Layout fluido sin "jumps"

### Cross-Browser
- [ ] Chrome 120+
- [ ] Firefox 120+
- [ ] Safari 17+

### Type Safety
- [ ] `tsc --noEmit` cero errores
- [ ] `npm run lint` cero errores

### Dark Mode
- [ ] Funcional en todas las secciones
- [ ] Sin flash de contenido al mount

### Bundle
- [ ] No regresión > 10% vs baseline actual

---

## 📦 Entregables por Fase (Tracking)

| Fase | Archivos Creados/Modificados | Commit Sugerido |
|------|------------------------------|-----------------|
| 0 | `globals.css`, `index.html`, `package.json` | `feat: design tokens, typography & css utilities` |
| 1 | `components/ui/eyebrow.tsx`, `section-head.tsx`, `chip.tsx`, `link-arrow.tsx`, `button.tsx` (variants) | `feat: ui kit base components` |
| 2 | `Navbar.tsx` | `feat: navbar visual redesign` |
| 3 | `Hero.tsx` (rewrite) | `feat: hero cinematic redesign` |
| 4 | `MovieCard.tsx`, `MovieCarousel.tsx`, `MovieCardSkeleton.tsx` | `feat: cartelera premium cover-flow` |
| 5 | `ComingSoonGrid.tsx` | `feat: proximamente poster variants` |
| 6 | `PromotionsSection.tsx` | `feat: promotions visual redesign` |
| 7 | `ExperienceSection.tsx` | `feat: experience section polish` |
| 8 | `Footer.tsx` | `feat: footer brand redesign` |
| 9 | `Reveal.tsx`, `globals.css` (spacing), todos los componentes (dark mode) | `chore: global integration & consistency` |
| 10 | — | `chore: qa, performance, a11y polish` |

---

## 🚦 Critical Path

```
Fase 0 (Tokens/Tipografía)
    ├─→ Fase 1 (UI Kit: Eyebrow, SectionHead, Chip, LinkArrow, Button variants)
    │       ├─→ Fase 2 (Navbar)
    │       ├─→ Fase 3 (Hero)
    │       ├─→ Fase 4 (MovieCard + MovieCarousel ← usa MovieArtwork existente)
    │       ├─→ Fase 5 (ComingSoonGrid)
    │       ├─→ Fase 6 (PromotionsSection)
    │       ├─→ Fase 7 (ExperienceSection)
    │       └─→ Fase 8 (Footer)
    └─→ Fase 9 (Integración Global: reveal stagger, spacing, dark mode, responsive)
          └─→ Fase 10 (QA: performance, a11y, cross-browser, visual regression)
```

---

## ⚠️ Riesgos Técnicos y Mitigaciones

| Riesgo | Prob | Impact | Mitigación |
|--------|------|--------|------------|
| `MovieArtwork` SVG no escala bien en mobile | Media | Alto | Testear 320px; fallback CSS gradient simple |
| Cover-flow 3D performance móvil | Media | Alto | `will-change: transform`, `transform3d`, visibleMovies ≤ 7 |
| Fuentes Google Fonts FOUT/FOIT | Baja | Medio | `preload` + `font-display: swap` + fallback local |
| Tokens chocan con shadcn/ui existentes | Media | Medio | `--mc-*` prefijos o `@layer theme` aislamiento |
| Auto-play falla accesibilidad | Media | Alto | `prefers-reduced-motion` → `clearInterval` + `transition: none` |
| Dark mode inconsistente shadcn | Media | Medio | Sobrescribir `--primary`, `--secondary`, `--accent` en `.dark` |

---

## 🛠️ Próximos Pasos Inmediatos

1. **Revisar y validar** este plan (decisiones, alcance, priorización)
2. **Confirmar inicio de Fase 0** — presentaré diff de `globals.css` + `index.html` + ajustes `package.json` para tu aprobación antes de aplicar
3. **Definir decisiones pendientes** marcadas en la tabla #1-#10

---

> **Hecho como diseñador UI/frontend profesional:** Sistema completo, decisiones explícitas, riesgos identificados, QA ejecutable. Listo para comenzar cuando tú digas.
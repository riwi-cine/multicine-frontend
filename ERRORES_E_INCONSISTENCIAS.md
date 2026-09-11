# Errores e inconsistencias del proyecto Multicine

## 1. Propósito

Este documento separa los problemas detectados del mapa de desarrollo. Su objetivo es registrar errores funcionales, inconsistencias de arquitectura, elementos incompletos, riesgos de negocio y piezas irrelevantes o desconectadas de la experiencia actual.

El listado está orientado a decisiones de desarrollo. Cada punto indica la zona del proyecto que debe revisarse o modificarse.

## 2. Errores críticos de producto

### E-001: El flujo de compra no termina

**Problema:** el usuario puede llegar a seleccionar sede, fecha, sala y horario, pero no existe un cierre completo con asientos, resumen, pago, confirmación y ticket.

**Impacto:** la aplicación funciona más como catálogo y selector de funciones que como plataforma de venta.

**Archivos a revisar o modificar:**

- `src/features/details/Details.tsx`
- `src/features/reservations/*`
- `src/features/payments/*`
- `src/services/booking.service.ts`
- `src/routes/AppRoutes.tsx`

**Corrección requerida:** crear el flujo de checkout, pago, confirmación y ticket siguiendo la estructura por features indicada en `MAPA_DESARROLLO_PROYECTO.md`.

### E-002: Los horarios de funciones no representan una disponibilidad real

**Problema:** el detalle de película construye horarios localmente y de forma variable, en lugar de depender de funciones reales asociadas a una película, sede, sala y fecha.

**Impacto:** el usuario puede ver horarios que no correspondan a la disponibilidad real del negocio.

**Archivos a revisar o modificar:**

- `src/features/details/Details.tsx`
- `src/features/schedules/*`
- `src/services/booking.service.ts`
- `src/services/movie.service.ts`
- `src/types/domain.ts`

**Corrección requerida:** obtener funciones desde el servicio de negocio y asociarlas a identificadores estables.

### E-003: La cartelera regional no está suficientemente demostrada

**Problema:** existe selección de país, ciudad y sede, pero la experiencia debe garantizar que cada combinación cambie realmente la cartelera, promociones, funciones y disponibilidad.

**Impacto:** el requisito principal de negocio multi-país puede quedar solo a nivel visual.

**Archivos a revisar o modificar:**

- `src/features/landing/pages/SelectLocationPage.tsx`
- `src/features/landing/data/locations.ts`
- `src/features/landing/LandingPage.tsx`
- `src/features/movies/*`
- `src/features/promotions/*`
- `src/routes/RequireLocation.tsx`

**Corrección requerida:** convertir la ubicación activa en parámetro real de las consultas y hacer visible el contexto actual al usuario.

### E-004: El perfil privado es un placeholder

**Problema:** la ruta protegida muestra una pantalla mínima sin historial, reservas, datos personales, beneficios ni configuración.

**Impacto:** no existe una relación posterior a la compra ni una zona real de gestión de cuenta.

**Archivos a revisar o modificar:**

- `src/routes/AppRoutes.tsx`
- `src/features/profile/*`
- `src/services/user.service.ts`
- `src/store/useAuthStore.ts`

**Corrección requerida:** convertir profile en una feature completa con páginas y componentes propios.

## 3. Errores y riesgos de arquitectura

### E-005: Posible duplicidad de entradas y enrutamiento

**Problema:** existen archivos paralelos de entrada y rutas: `src/main.tsx`, `src/app/main.tsx`, `src/App.tsx`, `src/app/App.tsx`, `src/routes/AppRoutes.tsx` y `src/routes/index.tsx`.

**Impacto:** puede generar confusión sobre qué aplicación se ejecuta, qué rutas están activas y dónde debe hacerse una corrección.

**Archivos a revisar o modificar:**

- `src/main.tsx`
- `src/app/main.tsx`
- `src/App.tsx`
- `src/app/App.tsx`
- `src/routes/AppRoutes.tsx`
- `src/routes/index.ts`
- `src/routes/index.tsx`

**Corrección requerida:** definir una entrada efectiva y retirar, consolidar o documentar claramente los duplicados.

### E-006: Ubicación y sesión dependen demasiado de almacenamiento local

**Problema:** la ubicación y la sesión se apoyan en claves de localStorage.

**Impacto:** el mecanismo puede quedar desincronizado, manipularse desde el navegador o no reflejar correctamente cambios de sesión, expiración y contexto regional.

**Archivos a revisar o modificar:**

- `src/routes/RequireLocation.tsx`
- `src/store/useAuthStore.ts`
- `src/features/landing/pages/SelectLocationPage.tsx`
- `src/services/auth.service.ts`

**Corrección requerida:** centralizar el estado, validar expiración, manejar restauración de sesión y definir la política de persistencia con el backend.

### E-007: No existe una matriz visible de roles y permisos

**Problema:** hay protección de rutas, pero el alcance completo del rol administrador no queda especificado ni reflejado en una navegación administrativa consolidada.

**Impacto:** riesgo de mezclar permisos de usuario, administrador y posibles subroles.

**Archivos a revisar o modificar:**

- `src/routes/ProtectedRoute.tsx`
- `src/routes/AppRoutes.tsx`
- `src/types/auth.ts`
- `src/features/admin/*`
- `src/services/admin.service.ts`

**Corrección requerida:** documentar y centralizar permisos por rol antes de completar las rutas de admin.

## 4. Errores de navegación y contenido

### E-008: Enlaces placeholder

**Problema:** algunas acciones del footer, promociones y experiencia apuntan a `#` o a destinos que no existen como pantallas reales.

**Impacto:** el usuario recibe señales de funcionalidad que no puede completar.

**Archivos a revisar o modificar:**

- `src/features/landing/components/Footer.tsx`
- `src/features/landing/components/PromotionsSection.tsx`
- `src/features/landing/components/ExperienceSection.tsx`
- `src/features/landing/components/Navbar.tsx`

**Corrección requerida:** crear las rutas correspondientes o retirar temporalmente las acciones no disponibles.

### E-009: La navegación “Cines” no tiene una experiencia propia suficiente

**Problema:** el concepto de cines se relaciona con la ubicación, pero no se ofrece una página completa de sedes, servicios, salas, accesibilidad y horarios.

**Impacto:** se pierde una oportunidad importante para el negocio físico y para la decisión de compra.

**Archivos a revisar o modificar:**

- `src/features/landing/components/Navbar.tsx`
- `src/features/landing/components/Footer.tsx`
- `src/features/theaters/*`
- `src/routes/AppRoutes.tsx`

**Corrección requerida:** crear o consolidar la feature de theaters y conectarla con la ubicación activa.

### E-010: La ubicación seleccionada no es suficientemente visible durante la navegación

**Problema:** el usuario puede seleccionar una ubicación, pero no se establece un indicador global permanente o fácilmente accesible.

**Impacto:** existe riesgo de que el usuario no recuerde en qué país, ciudad o sede está consultando.

**Archivos a revisar o modificar:**

- `src/features/landing/components/Navbar.tsx`
- `src/features/landing/pages/SelectLocationPage.tsx`
- `src/routes/RequireLocation.tsx`
- `src/store/*`

**Corrección requerida:** mostrar ubicación activa y permitir cambiarla sin perder el contexto de forma inesperada.

## 5. Errores de lógica de negocio

### E-011: No está definido el modelo de precio

**Problema:** no se encuentra una definición completa de precio por entrada, formato, sala, horario, país, impuestos, recargos o promoción.

**Impacto:** el checkout no puede ser confiable ni auditable.

**Archivos a revisar o modificar:**

- `src/types/domain.ts`
- `src/features/payments/*`
- `src/features/reservations/*`
- `src/services/booking.service.ts`
- `src/services/promotion.service.ts`

**Corrección requerida:** definir los datos necesarios para calcular y mostrar el total de compra.

### E-012: No está definido el ciclo de vida de una reserva

**Problema:** no quedan reflejados los estados de una reserva: iniciada, temporal, pagada, confirmada, cancelada, expirada o reembolsada.

**Impacto:** es difícil manejar errores, concurrencia, vencimiento y atención al cliente.

**Archivos a revisar o modificar:**

- `src/features/reservations/*`
- `src/services/booking.service.ts`
- `src/types/domain.ts`
- `src/types/error.ts`

**Corrección requerida:** definir estados y pantallas asociadas a cada uno.

### E-013: No está definida la política de cancelación y reembolso

**Problema:** no hay una experiencia visible para cancelar una reserva, cambiarla o solicitar un reembolso.

**Impacto:** falta una parte importante de la operación real de venta de entradas.

**Archivos a revisar o modificar:**

- `src/features/profile/*`
- `src/features/reservations/*`
- `src/features/payments/*`
- `src/services/booking.service.ts`

**Corrección requerida:** documentar reglas del negocio y reflejarlas en estados, botones y mensajes.

### E-014: Promociones sin ciclo de negocio completo

**Problema:** las promociones se muestran visualmente, pero no se observa una validación completa de vigencia, sede, película, membresía, límite de uso y compatibilidad.

**Impacto:** existe riesgo de ofrecer descuentos no aplicables o de comunicar condiciones incompletas.

**Archivos a revisar o modificar:**

- `src/features/promotions/*`
- `src/services/promotion.service.ts`
- `src/features/landing/components/PromotionsSection.tsx`
- `src/features/checkout/*`

**Corrección requerida:** convertir cada promoción en una regla validable y explicar sus condiciones al usuario.

## 6. Elementos irrelevantes o desconectados

### I-001: Secciones conceptuales sin destino funcional

Las secciones de experiencia, membresía, confitería y bonos de regalo aparecen como conceptos de negocio, pero todavía no están conectadas a flujos reales.

**Archivos a revisar:**

- `src/features/landing/components/ExperienceSection.tsx`
- `src/features/landing/components/PromotionsSection.tsx`
- `src/features/landing/components/Navbar.tsx`

**Decisión recomendada:** mantenerlas solo si existe un plan de implementación cercano. En caso contrario, reducir la promesa visual hasta que el negocio esté disponible.

### I-002: Estructuras de features sin experiencia visible

Hay módulos de admin, membership, payments, reservations, schedules y theaters cuya presencia técnica sugiere alcance futuro, pero no todos tienen una experiencia completa para el usuario.

**Decisión recomendada:** mantener la separación por features, pero priorizar las que cierran el flujo principal. No crear más carpetas hasta definir el contrato de negocio de cada una.

### I-003: Duplicidad de componentes UI

Existen grupos paralelos de componentes en `src/components/` y `src/assets/components/`, además de variantes dentro de `ui`.

**Impacto:** puede provocar estilos divergentes y dudas sobre qué componente usar.

**Archivos a revisar:**

- `src/components/*`
- `src/assets/components/*`
- `components.json`

**Corrección requerida:** definir una fuente oficial de componentes y migrar o retirar variantes que no se utilicen.

## 7. Inconsistencias visuales

### V-001: Identidad visual fuerte, pero no universal

La landing y el detalle de película tienen una dirección visual clara, mientras que algunas pantallas auxiliares son más genéricas y no tienen el mismo nivel de acabado.

**Archivos a revisar:**

- `src/features/landing/*`
- `src/features/details/*`
- `src/features/landing/pages/SelectLocationPage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/routes/AppRoutes.tsx`

**Corrección requerida:** aplicar el mismo sistema de color, espaciado, estados y jerarquía a ubicación, perfil, checkout, confirmación y admin.

### V-002: Estados incompletos de compra

La selección tiene estados visuales, pero faltan estados equivalentes para pago, expiración, error de disponibilidad, conflicto de asiento y confirmación.

**Archivos a revisar:**

- `src/features/details/Details.tsx`
- `src/features/reservations/*`
- `src/features/payments/*`
- `src/components/ui/*`

### V-003: Falta de contexto persistente

El usuario necesita ver de forma consistente película, sede, fecha, sala, horario y total durante la compra.

**Archivos a revisar:**

- `src/features/checkout/*`
- `src/features/reservations/*`
- `src/features/landing/components/Navbar.tsx`
- `src/features/details/Details.tsx`

## 8. Correcciones prioritarias

### Corrección inmediata

- Resolver la entrada y el enrutamiento duplicado.
- Validar la cartelera por ubicación real.
- Sustituir horarios aleatorios por funciones reales.
- Eliminar o conectar enlaces placeholder.
- Definir roles y permisos.

### Corrección de negocio

- Implementar asientos, checkout, pagos y confirmación.
- Crear historial y detalle de reservas.
- Definir precios, promociones, cancelación y reembolso.

### Corrección visual

- Homogeneizar pantallas auxiliares con la identidad de landing y detalle.
- Diseñar estados de éxito, error, carga, expiración y disponibilidad.
- Dar visibilidad permanente a la ubicación activa.

## 9. Criterio para considerar un error resuelto

Un error se considera resuelto solo cuando:

- la funcionalidad tiene una ruta o interacción real,
- el dato proviene del modelo de negocio correspondiente,
- existen estados de carga, éxito y error,
- el diseño mantiene la identidad visual del producto,
- la acción puede verificarse desde el flujo de usuario o administrador,
- y la funcionalidad no depende de datos aleatorios o placeholders.

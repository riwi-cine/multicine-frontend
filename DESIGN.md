# DESIGN.md — Multicine Frontend

## 1. Resumen ejecutivo

El proyecto ya tiene una base de UI/UX sólida, visualmente coherente y muy bien orientada a una experiencia moderna de cine y ticketing. La identidad general se siente premium, cinematográfica y clara, con una paleta sobria, tipografía contemporánea, secciones de gran impacto visual y una navegación que ayuda a explorar contenido con rapidez.

Sin embargo, el producto todavía tiene brechas importantes respecto a la lógica de negocio completa. La parte visual está bastante avanzada, pero todavía falta cerrar el recorrido principal de compra, perfil de usuario, beneficios, confirmación y administración. En otras palabras: el diseño base está bien, pero el producto necesita seguir evolucionando para ser una experiencia completa, consistente y útil para el usuario final.

## 2. Estado actual del diseño

### 2.1 Lo que sí está bien implementado

- Landing page clara, atractiva y bien estructurada.
- Hero visual impactante con fondo cinematográfico, degradados y CTA fuerte.
- Navegación principal con diseño limpio y elegante.
- Sección de cartelera con filtros, búsqueda y carrusel visualmente atractivo.
- Vista de detalle de película con jerarquía clara y flujo de selección por pasos.
- Autenticación con formularios validados y feedback visual.
- Persistencia de sesión y ubicación.
- Estados vacíos, errores y 404 gestionados de forma visible.
- Paleta, tipografía y componentes consistentes con diseño moderno.

### 2.2 Lo que aún hace falta

Estas son las principales áreas que aún no están resueltas o que están incompletas desde la perspectiva de UX y lógica de negocio:

1. Flujo de compra completo
   - No se observa un checkout final con resumen, selección de asientos, método de pago y confirmación.
   - La vista de detalle llega hasta la elección de horario, pero no termina el ciclo con una experiencia de compra cerrada.

2. Confirmación de reserva / ticket
   - Faltan pantallas de confirmación clara, comprobante, código de reserva o ticket final.

3. Perfil de usuario real
   - La vista protegida de perfil es muy básica y no refleja un ecosistema de cuenta completo.
   - Hace falta historial de reservas, próximos eventos, puntos o beneficios, y configuración personalizada.

4. Membresía / fidelización
   - La sección visual de promociones existe, pero aún no queda claro cómo se relaciona con membresía, puntos, descuentos acumulables o beneficios por perfil.

5. Información de cines y ubicaciones
   - La selección de ubicación está implementada, pero no se ve una experiencia más rica de “cines” con servicios, salas, accesibilidad o horarios por sede.

6. Administración del contenido
   - Existen carpetas y módulos de admin, pero no se ve una UI completa para gestionar películas, promociones, horarios, reportes y contenido editorial.

7. Placeholders y enlaces no funcionales
   - Hay varias secciones con enlaces tipo `#` o textos descriptivos que aún no tienen destino real.
   - Esto reduce la sensación de producto terminado.

8. Pago y transacciones
   - No se observa un flujo de pago real, confirmación de transacción ni escenarios de fallo/éxito de compra.

## 3. Tecnología y stack visual

### 3.1 Tecnologías visibles en la implementación

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui y Radix UI
- React Router DOM
- TanStack Query
- Zustand
- React Hook Form + Zod
- Axios
- Sonner
- Lucide React
- Geist Variable font

### 3.2 Cómo se refleja esto en el diseño

La base tecnológica permite una UI moderna con:
- componentes reutilizables,
- animaciones suaves,
- toasts,
- formularios con validación,
- un diseño consistente y escalable.

Esto es una buena base para mantener un diseño limpio y profesional, y además facilita continuidad visual a medida que se agreguen más vistas.

## 4. Colorimetría y sistema visual

### 4.1 Paleta actual
La paleta principal actual se percibe como:
- fondo claro: gris muy claro / blanco cálido
- texto principal: negro o gris muy oscuro
- rojo principal: profundo, fuerte y premium
- rojo secundario: coral / rosado para gradientes y CTA
- fondos de secciones: azul-gris suave para diferencia visual

Esto crea una apariencia elegante y reconocible, con fuerte fuerza de marca en los CTAs.

### 4.2 Qué debe mantenerse

La marca actual funciona bien porque:
- el rojo es usado como acción dominante,
- el fondo claro evita saturación visual,
- la identidad cinematográfica se mantiene con contraste y luces dramáticas,
- el diseño no se siente cargado ni excesivo.

### 4.3 Qué puede mejorarse sin perder la identidad

- Mantener la paleta base, pero reforzar jerarquías con mayor contraste inteligente.
- Usar el rojo principal con más consistencia en botones, estados activos y más elementos de acción.
- Introducir sutiles variaciones de fondo para distinguir secciones sin romper el sistema visual.
- Mantener las sombras suaves y el blur ligero, pero controlarlos para evitar que se vean inconsistentes en pantallas largas.

## 5. Diseño, animaciones e interacciones

### 5.1 Estilo visual actual
El diseño actual tiene una sensación de:
- Premium
- Editorial
- Cinematográfica
- Moderna
- Dinámica pero no caótica

### 5.2 Animaciones y microinteracciones presentes
- Reveal de contenido al aparecer.
- Hover con elevación y cambio de fondo.
- Carrusel con enfoque y escala.
- Menú móvil desplegable.
- Scroll suave a secciones.
- Toasters de feedback.

### 5.3 Lo que debe seguir igual o mejor

Para no romper la cohesión visual, las nuevas pantallas o secciones que se agreguen deberían seguir esta dirección:

- mantener la misma línea visual del hero,
- conservar el uso de fondos claros con overlays oscuros,
- mantener los botones con gradiente rojo y sombra ligera,
- preservar la mezcla de fotografía + tipografía + espacio editorial,
- usar animaciones sutiles y no excesivas,
- mantener una claridad visual alta en todas las etapas del flujo.

### 5.4 Qué debería mejorar

- Más consistencia de estados hover y active en todos los componentes.
- Evitar elementos visuales que parezcan “pegados” a una sola pantalla sin continuidad con el resto del sistema.
- Mejorar la calidad visual de los placeholders para que no se sientan incompletos.
- Usar microinteracciones más expresivas en pasos de flujo de compra.

## 6. Flujo completo de navegación y UX

### 6.1 Flujo actual del navegador

El flujo actual se puede resumir así:

1. Landing Page
2. Selección de ubicación
3. Catálogo y filtrado
4. Detalle de película
5. Selección de funciones por pasos
6. Login o registro
7. Perfil protegido básico

### 6.2 Qué falta para que el flujo sea completo

- El usuario debe poder pasar de “seleccionar función” a “confirmar compra” con una experiencia clara.
- Debe haber una pantalla de resumen final antes del pago.
- Debe existir un estado de reserva confirmada y un lugar para consultar el detalle de la compra.
- El perfil debe convertirse en un centro de gestión de reservas, beneficios y preferencias.

## 7. Qué falta estrictamente en diseño y negocio

### 7.1 Faltante de UX

- Checkout visualmente terminado.
- Confirmación de compra con diseño elegante y claro.
- Pantalla de errores y estados de compra mejor definidos.
- Mejor transición entre secciones de navegación.

### 7.2 Faltante de negocio

- Realización de pagos.
- Historial de compras.
- Beneficios por membresía.
- Promociones con lógica real y no solo presentación visual.
- Gestión administrativa de contenido y sedes.

### 7.3 Faltante de continuidad visual

- Los enlaces placeholders y componentes incompletos restan fuerza a la marca.
- Si se agregan nuevas pantallas, deben seguir el mismo estilo editorial y premium del proyecto actual, no caer en un diseño genérico o demasiado minimalista.

## 8. Recomendaciones de diseño para continuar

### 8.1 Principio general

El diseño debe seguir siendo similar al que ya existe, pero mejorando su acabado, su completitud y su claridad funcional. No se trata de cambiar la identidad, sino de reforzarla.

### 8.2 Lo que debería mantenerse

- la paleta roja + neutros,
- la tipografía moderna,
- los héroes cinematográficos,
- la composición editorial,
- los CTA con gradiente rojo,
- las animaciones suaves y elegantes.

### 8.3 Lo que debería mejorarse

- cerrar el flujo de compra de manera más natural,
- dar más peso visual a los estados de éxito y confirmación,
- convertir placeholders en piezas definitivas,
- diseñar un perfil de usuario más completo y útil,
- fortalecer la consistencia entre todas las vistas del producto.

## 9. Conclusión

El proyecto ya tiene una base de diseño muy buena: visualmente coherente, moderna, premium y con una identidad clara. Sin embargo, todavía hace falta cerrar la parte más importante del producto: la experiencia de compra completa, la confirmación, la gestión del usuario y la lógica de negocio asociada.

Por eso, la recomendación principal es esta:

- seguir el mismo diseño base que ya existe o mejorarlo,
- pero llevarlo a un nivel más completo, más terminado y más útil,
- y no perder la esencia visual actual.

La línea a seguir es: mantener la identidad visual actual y mejorarlo en acabado, claridad y funcionalidad, en lugar de reinventar el sistema completo.

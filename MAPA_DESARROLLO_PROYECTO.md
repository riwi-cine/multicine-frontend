# Mapa de desarrollo del proyecto Multicine

## 1. Propósito del documento

Este documento define la ruta de desarrollo necesaria para convertir el frontend actual en una web app completa de compra de entradas de cine, con operación multi-país, múltiples ciudades y sedes, cartelera diferenciada por ubicación y separación clara entre usuario y administrador.

La ruta mantiene la identidad visual actual. Las nuevas vistas deben seguir el lenguaje existente: estética cinematográfica, fondos neutros, rojo como color de acción, tipografía Geist, tarjetas sobrias, imágenes de películas, jerarquía editorial y animaciones suaves.

No se recomienda rediseñar el producto desde cero. Se recomienda completar, corregir y conectar la experiencia existente.

La fuente de datos actual es el Postman Mock Server configurado mediante `VITE_API_URL`. Esta ruta no contempla la creación de un backend: todas las fases deben consumir únicamente los endpoints disponibles en el mock server. La futura API real debe poder reemplazar la capa de servicios sin obligar a rediseñar las vistas ni cambiar la lógica de presentación.

## 2. Principios de desarrollo

1. La ubicación seleccionada debe controlar toda la disponibilidad posterior.
2. Ninguna función debe mostrarse como disponible si no pertenece al país, ciudad o sede seleccionada.
3. El usuario debe poder entender siempre en qué etapa del proceso se encuentra.
4. Cada operación de compra debe tener estados de carga, éxito, error y cancelación.
5. El usuario debe poder revisar y recuperar sus compras desde su perfil.
6. El administrador debe gestionar el contenido sin depender de cambios manuales en componentes visuales.
7. La interfaz nueva debe conservar el sistema visual existente y mejorar su consistencia.
8. Las rutas, servicios, tipos, hooks y componentes deben mantenerse organizados por feature.

## 3. Prioridades de desarrollo

### Prioridad P0: bloquear riesgos principales

- Corregir la duplicidad de entradas y rutas de aplicación.
- Definir la fuente única de verdad para ubicación, sesión y permisos.
- Completar el modelo de compra antes de ampliar promociones o membresía.
- Eliminar enlaces y acciones que aparentan funcionar pero apuntan a placeholders.
- Verificar que la cartelera realmente cambie según país, ciudad y sede.

En esta fase, la verificación regional debe hacerse contra los endpoints existentes del mock server (`/countries`, `/cities`, `/cinemas`, `/movies` y `/movies/filter`). No deben inventarse rutas nuevas ni sustituirse los endpoints del mock por una implementación local que simule el backend.

### Prioridad P1: completar la compra

- Selección de función.
- Selección de asientos.
- Resumen de compra.
- Aplicación de promociones.
- Pago.
- Confirmación.
- Ticket o comprobante.

### Prioridad P2: completar la cuenta de usuario

- Perfil real.
- Reservas activas.
- Historial.
- Cancelaciones o cambios según reglas del negocio.
- Membresía y beneficios.

### Prioridad P3: construir la operación administrativa

- Dashboard.
- Cartelera por ubicación.
- Películas.
- Sedes.
- Salas.
- Funciones.
- Promociones.
- Usuarios y roles.
- Reportes.

## 4. Ruta por fases

## Fase 0: saneamiento y definición de contratos

### Objetivo

Evitar que el desarrollo posterior se construya sobre rutas duplicadas, estados dispersos o modelos ambiguos.

### Cambios requeridos

- Definir un único punto de entrada de aplicación y un único sistema de rutas.
- Revisar la convivencia entre `src/App.tsx`, `src/app/App.tsx`, `src/main.tsx`, `src/app/main.tsx`, `src/routes/AppRoutes.tsx` y `src/routes/index.tsx`.
- Definir si la ruta raíz debe mostrar landing o redirigir a registro; la decisión debe ser única.
- Consolidar los nombres y contratos de ubicación.
- Establecer una matriz de permisos para usuario y administrador.
- Confirmar cuáles carpetas son activas y cuáles son únicamente estructura futura.

### Archivos a revisar o modificar

- `src/App.tsx`
- `src/app/App.tsx`
- `src/main.tsx`
- `src/app/main.tsx`
- `src/routes/AppRoutes.tsx`
- `src/routes/index.ts`
- `src/routes/index.tsx`
- `src/routes/ProtectedRoute.tsx`
- `src/routes/RequireLocation.tsx`
- `src/types/domain.ts`
- `src/types/auth.ts`
- `src/store/useAuthStore.ts`

### Archivos nuevos solo si hacen falta

- `src/types/location.ts` para centralizar país, ciudad, sede, sala y ubicación activa.
- `src/types/roles.ts` para definir roles y permisos.
- `src/store/useLocationStore.ts` si la ubicación actual no puede mantenerse correctamente con el estado existente.

### Resultado esperado

La aplicación debe tener una sola entrada, una sola definición efectiva de rutas y una única fuente de verdad para la ubicación y el rol autenticado.

## Fase 1: ubicación y cartelera regional

### Objetivo

Garantizar que la cartelera, las funciones, las promociones y la disponibilidad dependan realmente del país, ciudad y sede seleccionados.

### Reglas de negocio

- País es el primer nivel de segmentación.
- Ciudad depende del país.
- Sede depende de la ciudad.
- Sala depende de la sede.
- Cartelera depende como mínimo de la ubicación y del rango de fechas.
- Una película puede estar disponible en una sede y no en otra.
- Una promoción puede ser global, nacional, regional o exclusiva de una sede.

### Archivos a revisar o modificar

- `src/features/landing/pages/SelectLocationPage.tsx`
- `src/features/landing/data/locations.ts`
- `src/routes/RequireLocation.tsx`
- `src/features/landing/LandingPage.tsx`
- `src/features/movies/api/*`
- `src/features/movies/hooks/*`
- `src/features/movies/types/*`
- `src/services/movie.service.ts`
- `src/features/promotions/*`
- `src/types/domain.ts`
- `src/types/Pagination.ts`

### Archivos nuevos solo si hacen falta

- `src/features/locations/index.ts`
- `src/features/locations/api/locations.api.ts`
- `src/features/locations/components/LocationSelector.tsx`
- `src/features/locations/hooks/useLocations.ts`
- `src/features/locations/types/location.types.ts`
- `src/features/movies/hooks/useRegionalMovies.ts`

### Resultado esperado

Al cambiar de país, ciudad o sede, el usuario debe ver una cartelera diferente cuando los datos del negocio así lo indiquen. La ubicación debe ser visible en la interfaz y modificable desde un punto claro de navegación.

## Fase 2: detalle de película y funciones reales

### Objetivo

Convertir el detalle actual en el inicio formal de una compra.

### Estado actual

La vista ya presenta información cinematográfica, disponibilidad visual y un selector por sede, fecha, sala y horario. Falta conectarla con una función real y con disponibilidad confiable.

### Cambios requeridos

- Reemplazar horarios generados localmente por funciones provenientes del backend.
- Mostrar disponibilidad real de la función.
- Evitar seleccionar una sala o función que no corresponda a la sede o fecha.
- Mostrar precio base, formato, idioma, tipo de sala y restricciones.
- Permitir volver a cambiar de ubicación sin perder contexto innecesariamente.
- Persistir la función seleccionada solo cuando esté validada.

### Archivos a revisar o modificar

- `src/features/details/Details.tsx`
- `src/features/details/MovieDetailSkeleton.tsx`
- `src/features/movies/api/*`
- `src/features/movies/types/*`
- `src/features/schedules/*`
- `src/services/booking.service.ts`
- `src/services/movie.service.ts`
- `src/types/domain.ts`
- `src/types/ApiResponse.ts`

### Archivos nuevos solo si hacen falta

- `src/features/showtimes/index.ts`
- `src/features/showtimes/api/showtimes.api.ts`
- `src/features/showtimes/hooks/useShowtimes.ts`
- `src/features/showtimes/components/ShowtimeSelector.tsx`
- `src/features/showtimes/types/showtime.types.ts`

### Resultado esperado

El usuario debe seleccionar una función válida y pasar a la compra con un identificador inequívoco de película, sede, sala, fecha, hora y formato.

## Fase 3: selección de asientos

### Objetivo

Permitir que el usuario seleccione asientos disponibles antes de pagar.

### Reglas de negocio

- Los asientos ocupados no pueden seleccionarse.
- Los asientos reservados temporalmente deben tener un estado diferenciado.
- La selección debe expirar después de un tiempo definido.
- El total debe actualizarse con cada asiento.
- Deben contemplarse asientos especiales, accesibilidad y restricciones de sala.

### Archivos a revisar o modificar

- `src/features/reservations/*`
- `src/services/booking.service.ts`
- `src/types/domain.ts`
- `src/types/ApiResponse.ts`

### Archivos nuevos solo si hacen falta

- `src/features/seats/index.ts`
- `src/features/seats/api/seats.api.ts`
- `src/features/seats/components/SeatMap.tsx`
- `src/features/seats/components/SeatLegend.tsx`
- `src/features/seats/hooks/useSeatSelection.ts`
- `src/features/seats/types/seat.types.ts`
- `src/features/reservations/components/ReservationTimer.tsx`

### Resultado esperado

La pantalla debe mostrar una representación clara de la sala, con estados de asiento comprensibles en desktop y mobile, y un resumen siempre visible.

## Fase 4: checkout y pagos

### Objetivo

Cerrar el flujo comercial desde la función seleccionada hasta una transacción confirmada.

### Pantallas necesarias

- resumen de compra,
- selección o aplicación de promoción,
- datos del comprador,
- método de pago,
- revisión final,
- estado de procesamiento,
- éxito,
- error,
- cancelación o expiración.

### Archivos a revisar o modificar

- `src/features/payments/*`
- `src/features/reservations/*`
- `src/services/booking.service.ts`
- `src/services/*`
- `src/api/client.ts`
- `src/api/error.ts`
- `src/types/error.ts`
- `src/types/ApiResponse.ts`

### Archivos nuevos solo si hacen falta

- `src/features/checkout/index.ts`
- `src/features/checkout/pages/CheckoutPage.tsx`
- `src/features/checkout/components/OrderSummary.tsx`
- `src/features/checkout/components/PromoCodeField.tsx`
- `src/features/checkout/components/PaymentMethodSelector.tsx`
- `src/features/checkout/components/CheckoutProgress.tsx`
- `src/features/checkout/hooks/useCheckout.ts`
- `src/features/checkout/types/checkout.types.ts`
- `src/features/payments/components/PaymentStatus.tsx`

### Resultado esperado

El usuario debe conocer qué compra, cuánto paga, qué promoción aplica, qué método utiliza y qué ocurrió con la transacción.

## Fase 5: confirmación y ticket

### Objetivo

Dar cierre confiable a la compra y permitir recuperar el comprobante.

### Funcionalidad requerida

- número de reserva,
- película,
- sede y ciudad,
- sala,
- fecha y hora,
- asientos,
- formato,
- importe,
- estado del pago,
- código QR o código de acceso,
- opción de descargar o compartir.

### Archivos a revisar o modificar

- `src/features/reservations/*`
- `src/features/profile/*`
- `src/services/booking.service.ts`
- `src/services/user.service.ts`
- `src/types/domain.ts`

### Archivos nuevos solo si hacen falta

- `src/features/booking-confirmation/index.ts`
- `src/features/booking-confirmation/pages/BookingConfirmationPage.tsx`
- `src/features/booking-confirmation/components/TicketCard.tsx`
- `src/features/booking-confirmation/components/BookingQrCode.tsx`
- `src/features/booking-confirmation/types/booking-confirmation.types.ts`

## Fase 6: cuenta y perfil de usuario

### Objetivo

Convertir el perfil actual en el centro de relación del usuario con Multicine.

### Secciones requeridas

- información personal,
- reservas próximas,
- historial de compras,
- detalle de tickets,
- membresía,
- puntos y beneficios,
- preferencias de ubicación,
- seguridad y cierre de sesión.

### Archivos a revisar o modificar

- `src/routes/AppRoutes.tsx`
- `src/routes/ProtectedRoute.tsx`
- `src/features/profile/*`
- `src/services/user.service.ts`
- `src/store/useAuthStore.ts`
- `src/types/auth.ts`

### Archivos nuevos solo si hacen falta

- `src/features/profile/pages/ProfilePage.tsx`
- `src/features/profile/components/ProfileHeader.tsx`
- `src/features/profile/components/BookingHistory.tsx`
- `src/features/profile/components/UpcomingBookings.tsx`
- `src/features/profile/components/MembershipSummary.tsx`
- `src/features/profile/components/ProfileSettings.tsx`
- `src/features/profile/hooks/useUserBookings.ts`
- `src/features/profile/types/profile.types.ts`

## Fase 7: membresía, promociones y fidelización

### Objetivo

Conectar las promociones visuales con reglas reales de negocio.

### Reglas requeridas

- alcance de la promoción,
- fechas de vigencia,
- sedes aplicables,
- películas o formatos aplicables,
- límite de uso,
- condiciones de membresía,
- compatibilidad entre promociones,
- cálculo visible del descuento.

### Archivos a revisar o modificar

- `src/features/promotions/*`
- `src/features/membership/*`
- `src/services/promotion.service.ts`
- `src/services/user.service.ts`
- `src/types/domain.ts`
- `src/features/landing/components/PromotionsSection.tsx`

### Archivos nuevos solo si hacen falta

- `src/features/membership/pages/MembershipPage.tsx`
- `src/features/membership/components/MembershipCard.tsx`
- `src/features/membership/components/PointsBalance.tsx`
- `src/features/promotions/pages/PromotionDetailPage.tsx`
- `src/features/promotions/components/PromotionConditions.tsx`

## Fase 8: experiencia administrativa

### Objetivo

Crear la operación completa para que el negocio pueda gestionar el contenido y la disponibilidad sin modificar manualmente la interfaz.

### Módulos administrativos requeridos

- dashboard general,
- películas,
- géneros y clasificaciones,
- países, ciudades y sedes,
- salas y tipos de sala,
- funciones y horarios,
- disponibilidad de asientos,
- promociones,
- usuarios,
- roles y permisos,
- reservas y pagos,
- reportes.

### Archivos a revisar o modificar

- `src/features/admin/*`
- `src/services/admin.service.ts`
- `src/routes/AppRoutes.tsx`
- `src/routes/ProtectedRoute.tsx`
- `src/components/ui/*`
- `src/types/auth.ts`
- `src/types/domain.ts`

### Archivos nuevos solo si hacen falta

- `src/features/admin/pages/AdminDashboardPage.tsx`
- `src/features/admin/pages/AdminMoviesPage.tsx`
- `src/features/admin/pages/AdminLocationsPage.tsx`
- `src/features/admin/pages/AdminTheatersPage.tsx`
- `src/features/admin/pages/AdminShowtimesPage.tsx`
- `src/features/admin/pages/AdminPromotionsPage.tsx`
- `src/features/admin/pages/AdminBookingsPage.tsx`
- `src/features/admin/pages/AdminUsersPage.tsx`
- `src/features/admin/components/AdminLayout.tsx`
- `src/features/admin/components/AdminSidebar.tsx`
- `src/features/admin/components/AdminDataTable.tsx`
- `src/features/admin/components/AdminFilters.tsx`
- `src/features/admin/hooks/useAdminPermissions.ts`
- `src/features/admin/types/admin.types.ts`

### Resultado esperado

El administrador debe poder gestionar el negocio por ubicación y ver el impacto de sus acciones en cartelera, funciones, promociones y reservas.

## Fase 9: navegación, contenido y correcciones visuales

### Objetivo

Eliminar la sensación de producto incompleto y conectar cada interacción con un destino real.

### Cambios requeridos

- Reemplazar enlaces `#` por rutas reales o eliminar acciones que todavía no estén disponibles.
- Crear páginas para cines, promociones, ayuda, FAQ, contacto, términos, privacidad y cookies.
- Revisar la navegación del footer y del menú “Más”.
- Asegurar que el CTA “Comprar entradas” lleve a una función o cartelera contextual.
- Hacer visible la ubicación activa en navbar o en una zona de contexto.

### Archivos a revisar o modificar

- `src/features/landing/components/Navbar.tsx`
- `src/features/landing/components/Footer.tsx`
- `src/features/landing/components/PromotionsSection.tsx`
- `src/features/landing/components/ExperienceSection.tsx`
- `src/routes/AppRoutes.tsx`
- `src/features/landing/pages/SelectLocationPage.tsx`

### Archivos nuevos solo si hacen falta

- `src/features/theaters/pages/TheatersPage.tsx`
- `src/features/promotions/pages/PromotionsPage.tsx`
- `src/features/support/pages/FaqPage.tsx`
- `src/features/support/pages/ContactPage.tsx`
- `src/features/legal/pages/TermsPage.tsx`
- `src/features/legal/pages/PrivacyPage.tsx`
- `src/features/legal/pages/CookiesPage.tsx`

## 5. Orden recomendado de implementación

1. Fase 0: saneamiento de entradas, rutas y contratos.
2. Fase 1: ubicación y cartelera regional.
3. Fase 2: funciones reales.
4. Fase 3: asientos.
5. Fase 4: checkout y pagos.
6. Fase 5: confirmación y ticket.
7. Fase 6: perfil de usuario.
8. Fase 7: membresía y promociones reales.
9. Fase 8: administración.
10. Fase 9: contenido, navegación y pulido visual.

No conviene construir el dashboard administrativo antes de estabilizar los contratos de ubicación, películas, funciones, reservas y pagos. El admin debe operar sobre los mismos modelos de negocio que utiliza el usuario final.

## 6. Criterios de aceptación globales

### Usuario

- Puede seleccionar país, ciudad y sede.
- Solo ve contenido y funciones compatibles con su ubicación.
- Puede consultar una película y seleccionar una función válida.
- Puede seleccionar asientos disponibles.
- Puede revisar un resumen y pagar.
- Recibe confirmación y ticket.
- Puede consultar su compra desde su perfil.

### Administrador

- Puede crear y modificar películas.
- Puede administrar ubicaciones y sedes.
- Puede crear salas y funciones.
- Puede controlar disponibilidad.
- Puede publicar promociones con reglas.
- Puede consultar reservas y estados de pago.
- Puede acceder solo a las secciones permitidas por su rol.

### UI/UX

- Las nuevas pantallas conservan la identidad actual.
- Las pantallas funcionan en mobile y desktop.
- Todos los estados tienen feedback visible.
- El usuario conoce su ubicación y su progreso.
- No hay enlaces que aparenten ser funcionales y no lo sean.
- Los componentes respetan tokens, tipografía, colorimetría y espaciado existentes.

## 7. Resultado final esperado

Al completar esta ruta, Multicine debe funcionar como una plataforma integral de cine y no solamente como un catálogo visual:

- catálogo regionalizado,
- funciones reales,
- compra de entradas,
- pagos,
- tickets,
- cuenta de usuario,
- beneficios,
- operación administrativa,
- y una experiencia visual consistente de principio a fin.

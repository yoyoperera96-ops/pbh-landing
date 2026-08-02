# Landing Page — Peña Barcelonista de La Habana (PBH)

Landing page oficial construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, pensada para captar nuevos socios y servir de base a un futuro sitio institucional (portal de socios, noticias, eventos, pagos, tienda).

## 1. Instalar Node.js

Este equipo no tiene Node.js instalado. Se necesita **Node.js 18 LTS o superior**:

1. Descarga el instalador desde [nodejs.org](https://nodejs.org/) (versión LTS).
2. Instálalo y reinicia la terminal.
3. Verifica con:

```bash
node -v
npm -v
```

## 2. Instalar dependencias y correr el proyecto

```bash
cd C:\Users\Yoyo\pbh-landing
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para producción:

```bash
npm run build
npm run start
```

## 3. Estructura del proyecto

```
app/
  layout.tsx        Metadata SEO, fuentes, JSON-LD
  page.tsx           Ensambla todas las secciones de la landing
  sitemap.ts         Sitemap dinámico
  robots.ts          robots.txt dinámico
  api/inscripcion/   Endpoint del formulario de inscripción (guarda en Postgres)
  admin/page.tsx     Panel protegido: lista/mosaico, buscador, filtro por estado
  admin/actions.ts   Server actions: aceptar/rechazar solicitud + envío de email
  api/admin/export/  Exporta a CSV los resultados filtrados
components/          Un componente por sección (Header, Hero, Timeline, etc.)
components/ui/       Componentes reutilizables (Container, SectionHeading)
lib/data.ts          Todo el contenido editable (historia, beneficios, testimonios,
                     eventos, FAQ, redes sociales) en un único archivo
lib/db.ts            Cliente de Postgres (Neon) + getInscripciones (búsqueda/filtro)
lib/email.ts         Envío de correos de aceptación/rechazo (Gmail SMTP)
scripts/setup-db.mjs                 Crea la tabla "inscripciones" (npm run db:setup)
scripts/migrate-002-estado.mjs       Agrega carné, dirección y estado a la tabla
scripts/migrate-003-numero-socio.mjs Agrega la secuencia de número de socio
proxy.ts             Protege /admin y /api/admin con usuario/contraseña
public/images/       Carpeta para assets reales (ver README interno)
```

## 4. Manual de marca

El Manual de Identidad Visual oficial de la PBH ya está implementado:

- **Colores institucionales** (`tailwind.config.ts` > `colors`): Marino `#142C54`,
  Azul Barça `#1D4D91`, Grana `#9C1C3A`, Oro Habana `#F0B429`, Blanco Hueso `#FAF6EE`.
- **Tipografías** (`app/layout.tsx` + `app/globals.css`): Spectral (titulares),
  Oswald (eyebrows/cifras), Public Sans (texto).
- **Valores de marca** (`components/Valores.tsx` + `lib/data.ts` > `brandValues`):
  los 6 valores oficiales (Pasión, Pertenencia, Tradición, Comunidad, Elegancia,
  Profesionalismo).
- **Fechas**: fundación 1996, 30 Aniversario 2026 (`lib/data.ts` > `siteConfig`).

Assets reales ya colocados en `public/images/`:

| Archivo | Uso | Componente |
| --- | --- | --- |
| `escudo-pbh.png` | Escudo oficial de la PBH | `components/Escudo.tsx` |
| `logo-30-aniversario.png` | Logotipo 30 Aniversario (solo cifra) | `components/AnniversaryLogo.tsx` |
| `logo-30-aniversario-wordmark.png` | Versión del logo con nombre debajo (sin usar aún) | — |
| `hero-bg.jpg` | Foto de fondo del Hero | `components/Hero.tsx` |
| `galeria/galeria-01.jpg` … `07.jpg` | Fotos reales de la afición | `components/Galeria.tsx` + `lib/data.ts` (`gallery`) |

Pendiente: imagen Open Graph (`public/images/og-cover.jpg`, 1200×630) y favicon
(`public/favicon.ico`) — usar el escudo o el logo del 30 aniversario como base.

Todo el **texto de contenido** (historia, línea de tiempo, beneficios, testimonios,
eventos, preguntas frecuentes, redes sociales, correo/WhatsApp de contacto) vive en
un solo archivo: **`lib/data.ts`**. Es contenido de ejemplo y debe ser validado por
la Junta Directiva de la PBH antes de publicar.

## 5. Formulario de inscripción, base de datos y panel admin

El formulario (`components/FormularioInscripcion.tsx`) pide nombre, **carné de
identidad**, correo, teléfono, **dirección**, municipio y mensaje; envía los
datos a `app/api/inscripcion/route.ts`, que los valida y los guarda en la tabla
`inscripciones` de **Postgres (Neon, vía Vercel Storage)** con estado inicial
`pendiente`.

### Variables de entorno necesarias

| Variable | De dónde sale | Uso |
| --- | --- | --- |
| `POSTGRES_URL` | Vercel → proyecto → Storage → tu base de datos → pestaña ".env.local" | Conexión a la base de datos (`lib/db.ts`) |
| `ADMIN_USER` | La eliges tú | Usuario para entrar a `/admin` |
| `ADMIN_PASSWORD` | La eliges tú | Contraseña para entrar a `/admin` |
| `GMAIL_USER` | La cuenta oficial de la PBH | Remitente de los correos de aceptación/rechazo |
| `GMAIL_APP_PASSWORD` | Ver instrucciones abajo | Autentica el envío por Gmail SMTP |

**En producción (Vercel):** `POSTGRES_URL` se agrega sola al conectar la base de
datos al proyecto desde la pestaña Storage. Las otras cuatro hay que añadirlas
a mano en Project Settings → Environment Variables (y darle Redeploy después).

**En local:** crea un archivo `.env.local` (no se sube a git) en la raíz del
proyecto:

```
POSTGRES_URL="postgres://...que copiaste de Vercel..."
ADMIN_USER=junta
ADMIN_PASSWORD=elige-una-contraseña
GMAIL_USER=penyabhavana@gmail.com
GMAIL_APP_PASSWORD=contraseña-de-aplicación-de-16-caracteres
```

Luego, para crear/actualizar la tabla:

```bash
npm run db:setup
node --env-file=.env.local scripts/migrate-002-estado.mjs
node --env-file=.env.local scripts/migrate-003-numero-socio.mjs
```

### Cómo generar la Contraseña de aplicación de Gmail

**Nunca uses la contraseña normal de la cuenta** — Google permite crear una
contraseña específica para aplicaciones que solo sirve para enviar/recibir
correo por SMTP, y se puede revocar en cualquier momento sin afectar el login
normal de la cuenta.

1. Entra a la cuenta `penyabhavana@gmail.com`
2. Activa la **verificación en 2 pasos** si no está activa: [myaccount.google.com/signinoptions/two-step-verification](https://myaccount.google.com/signinoptions/two-step-verification)
3. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Crea una nueva con el nombre "PBH Landing" (o el que prefieras)
5. Copia el código de 16 caracteres que te da Google — ese es el valor de
   `GMAIL_APP_PASSWORD`

### Panel de administración

`/admin` (protegido con usuario/contraseña vía `proxy.ts`) muestra cada
solicitud con todos sus datos (incluido el carné de identidad y la dirección)
y dos botones, **Aceptar** y **Rechazar** (`app/admin/actions.ts`). Al usarlos:

1. Se actualiza el `estado` de la solicitud en la base de datos (`pendiente` →
   `aceptada` / `rechazada`) junto con la fecha de proceso.
2. Si se acepta, recibe un **número de socio consecutivo** (secuencia
   `socio_numero_seq`, arranca en 1), visible en el panel como "Socio #N".
3. Se envía automáticamente un correo a la persona, desde `GMAIL_USER`, con la
   plantilla correspondiente (`lib/email.ts`) — la de aceptación incluye el
   número de socio.

El panel además tiene:

- **Buscador**: filtra por nombre, carné, correo, teléfono, municipio,
  dirección o mensaje (`?q=`).
- **Filtro por estado**: todas / pendientes / aceptadas / rechazadas (`?estado=`).
- **Dos vistas**: Lista (detalle completo) y Mosaico (grid compacto) (`?view=`).
- **Exportar CSV**: descarga los resultados actualmente filtrados
  (`/api/admin/export`, protegido igual que `/admin`), listo para abrir en
  Excel/Sheets — incluye número de socio, carné, contacto, estado y fechas.

Si `GMAIL_USER`/`GMAIL_APP_PASSWORD` no están configuradas, el estado se
actualiza igual — el envío del correo simplemente falla y queda registrado en
los logs del servidor, sin bloquear el resto del panel.

## 6. Actualidad del Club (`/actualidad`)

Nueva pestaña con dos cosas:

- **Calendario del FC Barcelona**: los partidos del primer equipo en los
  próximos 7 días, calculados desde el momento en que cada visitante entra a
  la página. Los datos vienen de `lib/fcbFixtures.ts`, que lee en el servidor
  el bloque de datos estructurados (JSON-LD `SportsEvent`, schema.org) que
  `fcbarcelona.com` publica en su propia página oficial de calendario — no es
  contenido inventado ni un scraping del maquetado visual, es el mismo feed
  que el club expone para que lo lean buscadores y apps externas. Se
  refresca solo (revalidación cada hora); si no hay partidos en la ventana de
  7 días, o si fcbarcelona.com no responde, se muestra un aviso con enlace al
  calendario oficial en vez de romper la página.
- **Canal de YouTube de la Peña**: enlace destacado a
  `youtube.com/@habanacule1899`, también agregado a los íconos de redes del
  footer en todas las páginas.

Si en el futuro cambia la URL o estructura de la página oficial del Barça,
ajusta el selector en `lib/fcbFixtures.ts` (`FCB_SCHEDULE_URL` y la función
`extraerEventos`).

## 7. SEO y rendimiento

- Metadata, Open Graph, Twitter Card y datos estructurados (JSON-LD `SportsOrganization`)
  configurados en `app/layout.tsx`.
- `sitemap.ts` y `robots.ts` generados dinámicamente.
- Fuentes cargadas con `next/font` (sin bloqueo de renderizado).
- `siteUrl` en `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts` apunta a
  `https://penabarcelonista-habana-cuba.vercel.app`. Si más adelante se conecta
  un dominio propio, actualízalo en los tres archivos.

## 8. Arquitectura pensada para crecer

La landing vive toda en `app/page.tsx` como una única ruta. Para las futuras
funciones mencionadas (portal de socios, noticias, eventos, pagos, tienda),
la convención recomendada con App Router es agregar nuevas carpetas de ruta,
por ejemplo:

```
app/
  (marketing)/page.tsx     -> esta landing
  socios/                  -> portal de socios (login, perfil, carné digital)
  noticias/                -> blog/noticias del club y la peña
  eventos/                 -> calendario completo + detalle de evento
  tienda/                  -> tienda online
  api/                     -> endpoints (pagos, autenticación, etc.)
```

`lib/data.ts` puede evolucionar hacia llamadas a una API/CMS sin tocar los
componentes de la landing, ya que estos ya consumen los datos como props/imports
tipados.

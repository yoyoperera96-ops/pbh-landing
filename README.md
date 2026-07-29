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
  admin/page.tsx     Panel protegido con la lista de inscripciones
components/          Un componente por sección (Header, Hero, Timeline, etc.)
components/ui/       Componentes reutilizables (Container, SectionHeading)
lib/data.ts          Todo el contenido editable (historia, beneficios, testimonios,
                     eventos, FAQ, redes sociales) en un único archivo
lib/db.ts            Cliente de la base de datos Postgres (Neon)
scripts/setup-db.mjs Crea la tabla "inscripciones" (npm run db:setup)
proxy.ts             Protege /admin con usuario/contraseña
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

## 5. Formulario de inscripción y base de datos

El formulario (`components/FormularioInscripcion.tsx`) envía los datos a
`app/api/inscripcion/route.ts`, que valida los campos y los guarda en una tabla
`inscripciones` de **Postgres (Neon, vía Vercel Storage)**.

### Variables de entorno necesarias

| Variable | De dónde sale | Uso |
| --- | --- | --- |
| `POSTGRES_URL` | Vercel → proyecto → Storage → tu base de datos → pestaña ".env.local" | Conexión a la base de datos (`lib/db.ts`) |
| `ADMIN_USER` | La eliges tú | Usuario para entrar a `/admin` |
| `ADMIN_PASSWORD` | La eliges tú | Contraseña para entrar a `/admin` |

**En producción (Vercel):** `POSTGRES_URL` se agrega sola al conectar la base de
datos al proyecto desde la pestaña Storage. `ADMIN_USER` y `ADMIN_PASSWORD` hay
que añadirlas a mano en Project Settings → Environment Variables.

**En local:** crea un archivo `.env.local` (no se sube a git) en la raíz del
proyecto:

```
POSTGRES_URL="postgres://...que copiaste de Vercel..."
ADMIN_USER=junta
ADMIN_PASSWORD=elige-una-contraseña
```

Luego, para crear la tabla una sola vez:

```bash
npm run db:setup
```

### Panel de administración

`/admin` (protegido con usuario/contraseña vía `proxy.ts`) muestra la lista de
inscripciones ordenadas por fecha, con nombre, correo, teléfono, municipio y
mensaje. Pensado para que la Junta Directiva revise las solicitudes sin entrar
al dashboard de Vercel.

Pendiente de integración futura: un servicio de email transaccional (p.ej.
Resend) para notificar a la Junta Directiva por correo cuando llega una
solicitud nueva, además de guardarla en la base de datos.

## 6. SEO y rendimiento

- Metadata, Open Graph, Twitter Card y datos estructurados (JSON-LD `SportsOrganization`)
  configurados en `app/layout.tsx`.
- `sitemap.ts` y `robots.ts` generados dinámicamente.
- Fuentes cargadas con `next/font` (sin bloqueo de renderizado).
- `siteUrl` en `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts` apunta a
  `https://penabarcelonista-habana-cuba.vercel.app`. Si más adelante se conecta
  un dominio propio, actualízalo en los tres archivos.

## 7. Arquitectura pensada para crecer

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

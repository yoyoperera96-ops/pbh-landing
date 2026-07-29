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
  api/inscripcion/   Endpoint del formulario de inscripción
components/          Un componente por sección (Header, Hero, Timeline, etc.)
components/ui/       Componentes reutilizables (Container, SectionHeading)
lib/data.ts          Todo el contenido editable (historia, beneficios, testimonios,
                     eventos, FAQ, redes sociales) en un único archivo
public/images/       Carpeta para assets reales (ver README interno)
```

## 4. Manual de marca

El Manual de Identidad Visual oficial de la PBH ya está implementado:

- **Colores institucionales** (`tailwind.config.ts` > `colors`): Marino `#142C54`,
  Azul Barça `#1D4D91`, Grana `#9C1C3A`, Oro Habana `#F0B429`, Blanco Hueso `#FAF6EE`.
- **Tipografías** (`app/layout.tsx` + `app/globals.css`): Spectral (titulares),
  Oswald (eyebrows/cifras), Public Sans (texto).
- **Logo 30 Aniversario** (`components/AnniversaryBadge.tsx`): círculo bicolor
  azul/grana sobre anillo dorado, según sección 05 del manual.
- **Valores de marca** (`components/Valores.tsx` + `lib/data.ts` > `brandValues`):
  los 6 valores oficiales (Pasión, Pertenencia, Tradición, Comunidad, Elegancia,
  Profesionalismo).
- **Fechas**: fundación 1996, 30 Aniversario 2026 (`lib/data.ts` > `siteConfig`).

Pendiente de asset real (el archivo del manual supera el límite de 256KB de la
herramienta de importación de diseño, así que hay que colocarlo a mano):

| Elemento | Archivo a modificar |
| --- | --- |
| Escudo oficial de la PBH | Colocar el PNG en `public/images/escudo-pbh.png` y sustituir `components/ShieldPlaceholder.tsx` por `<Image src="/images/escudo-pbh.png">` en Header, Hero, QuienesSomos, Galeria y Footer |
| Foto de fondo del Hero | `components/Hero.tsx` (sección con comentario "Imagen de fondo provisional") |
| Fotos de la galería | `components/Galeria.tsx` + `lib/data.ts` (`gallery`) |
| Imagen Open Graph / favicon | `public/images/og-cover.jpg`, `public/favicon.ico` |

Todo el **texto de contenido** (historia, línea de tiempo, beneficios, testimonios,
eventos, preguntas frecuentes, redes sociales, correo/WhatsApp de contacto) vive en
un solo archivo: **`lib/data.ts`**. Es contenido de ejemplo y debe ser validado por
la Junta Directiva de la PBH antes de publicar.

## 5. Formulario de inscripción

El formulario (`components/FormularioInscripcion.tsx`) envía los datos a
`app/api/inscripcion/route.ts`, que por ahora solo valida y registra la solicitud
en el log del servidor. Antes de producción, conecta ese endpoint a:

- Un servicio de email transaccional (p.ej. Resend, SendGrid) para notificar a la
  Junta Directiva, y/o
- Una base de datos (p.ej. Postgres/Supabase) para llevar el registro de socios.

## 6. SEO y rendimiento

- Metadata, Open Graph, Twitter Card y datos estructurados (JSON-LD `SportsOrganization`)
  configurados en `app/layout.tsx`.
- `sitemap.ts` y `robots.ts` generados dinámicamente.
- Fuentes cargadas con `next/font` (sin bloqueo de renderizado).
- Antes de publicar, actualiza `siteUrl` en `app/layout.tsx`, `app/sitemap.ts` y
  `app/robots.ts` con el dominio real.

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

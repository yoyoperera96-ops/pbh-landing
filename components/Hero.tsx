import { ShieldPlaceholder } from "./ShieldPlaceholder";
import { AnniversaryBadge } from "./AnniversaryBadge";
import { Container } from "./ui/Container";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-blaugrana-gradient pt-24"
    >
      {/* Imagen de fondo provisional: sustituir por foto real de socios/estadio */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(237,187,0,0.18),transparent_40%)]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-tinta/30" aria-hidden />

      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-fadeUp text-center lg:text-left">
          <div className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
            <ShieldPlaceholder className="h-16 w-14 md:h-20 md:w-[4.5rem]" />
            <span className="h-10 w-px bg-white/25" />
            <AnniversaryBadge className="h-16 w-16 md:h-20 md:w-20" />
          </div>

          <span className="mb-4 inline-block rounded-full border border-dorado/50 bg-white/5 px-4 py-1 font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
            {siteConfig.foundedYear} — {siteConfig.anniversaryYear} · {siteConfig.anniversaryLabel}
          </span>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-3 font-display text-lg italic text-dorado">
            {siteConfig.brandConcept}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85 lg:mx-0">
            Casi 30 años reuniendo a la afición del FC Barcelona en Cuba. Vive cada
            partido, cada título y cada emoción junto a tu familia culé en La Habana.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#inscripcion"
              className="w-full rounded-full bg-grana px-8 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-gold transition hover:-translate-y-0.5 hover:bg-grana-light sm:w-auto"
            >
              Únete a la Peña
            </a>
            <a
              href="#quienes-somos"
              className="w-full rounded-full border border-white/30 px-8 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Conoce nuestra historia
            </a>
          </div>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-8 text-center lg:mx-0 lg:text-left">
            <div>
              <dt className="sr-only">Años de historia</dt>
              <dd className="font-eyebrow text-3xl font-bold text-dorado">30</dd>
              <p className="text-xs uppercase tracking-wide text-white/70">Años de historia</p>
            </div>
            <div>
              <dt className="sr-only">Socios activos</dt>
              <dd className="font-eyebrow text-3xl font-bold text-dorado">+300</dd>
              <p className="text-xs uppercase tracking-wide text-white/70">Socios activos</p>
            </div>
            <div>
              <dt className="sr-only">Encuentros al año</dt>
              <dd className="font-eyebrow text-3xl font-bold text-dorado">+40</dd>
              <p className="text-xs uppercase tracking-wide text-white/70">Encuentros al año</p>
            </div>
          </dl>
        </div>

        {/* Bloque visual: sustituir por foto real de la afición / collage de la peña */}
        <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-card backdrop-blur lg:flex">
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <ShieldPlaceholder className="h-28 w-24" />
            <p className="text-sm text-white/60">
              Foto de socios / afición de la PBH
              <br />
              (reemplazar en producción)
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

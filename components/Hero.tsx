import Image from "next/image";
import { Escudo } from "./Escudo";
import { AnniversaryLogo } from "./AnniversaryLogo";
import { Container } from "./ui/Container";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-tinta pt-24"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Afición de la Peña Barcelonista de La Habana celebrando"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-blaugrana-gradient opacity-45" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-tinta/95 via-tinta/75 to-tinta/30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-transparent to-transparent" aria-hidden />

      <Container className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-fadeUp text-center lg:text-left">
          <div className="mb-6 flex items-center justify-center gap-4 lg:justify-start">
            <Escudo className="h-16 w-16 md:h-20 md:w-20" />
            <span className="h-10 w-px bg-white/25" />
            <AnniversaryLogo className="h-16 w-16 md:h-20 md:w-20" />
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

        <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 shadow-card lg:block">
          <Image
            src="/images/galeria/galeria-03.jpg"
            alt="Socios de la PBH con la bandera de la Peña"
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

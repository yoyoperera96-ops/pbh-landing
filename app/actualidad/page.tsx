import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ProximosPartidos } from "@/components/ProximosPartidos";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Actualidad del Club",
  description:
    "Los próximos partidos del FC Barcelona en los próximos 7 días y el canal de YouTube de la Peña Barcelonista de La Habana.",
};

export default function ActualidadPage() {
  return (
    <>
      <Header />
      <main className="bg-tinta">
        <section className="pt-32 pb-16 sm:pt-40">
          <Container>
            <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
              Actualidad
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold text-hueso sm:text-5xl">
              Actualidad del Club
            </h1>
            <p className="mt-4 max-w-2xl text-white/70">
              Sigue de cerca al FC Barcelona: los próximos partidos de la próxima semana
              y todo el contenido en vivo de la Peña en nuestro canal de YouTube.
            </p>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <ProximosPartidos />
          </Container>
        </section>

        <section className="bg-hueso py-20">
          <Container className="flex flex-col items-center gap-6 rounded-3xl bg-grana px-6 py-12 text-center sm:px-16">
            <svg viewBox="0 0 24 24" className="h-14 w-14 text-white" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
            </svg>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Síguenos en YouTube
            </h2>
            <p className="max-w-xl text-white/85">
              Resúmenes, tertulias y encuentros de la Peña Barcelonista de La Habana,
              en nuestro canal oficial.
            </p>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-grana transition hover:-translate-y-0.5"
            >
              Ir al canal
            </a>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

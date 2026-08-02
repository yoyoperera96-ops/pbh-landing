import type { ReactElement } from "react";
import { Escudo } from "./Escudo";
import { Container } from "./ui/Container";
import { siteConfig } from "@/lib/data";

const socialIcons: Record<string, ReactElement> = {
  facebook: (
    <path d="M13 22v-8h3l.5-4H13V7.5c0-1.2.3-2 2-2h2V2h-3c-3.3 0-4.5 2-4.5 4.5V10H7v4h2.5v8H13z" />
  ),
  instagram: (
    <path d="M12 2c2.7 0 3 0 4.1.1 1.1.1 1.8.2 2.4.5.7.3 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.4 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 1.1-.2 1.8-.5 2.4-.3.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.4-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1-.1-1.8-.2-2.4-.5-.7-.3-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.4-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c.1-1.1.2-1.8.5-2.4.3-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.4 2.4-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
  ),
  youtube: (
    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  ),
  website: (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9h-3.6c-.1-2-.5-3.8-1.1-5.2A8 8 0 0119.9 11zM12 4.1c.8 1.1 1.7 3.3 1.9 5.9h-3.8c.2-2.6 1.1-4.8 1.9-5.9zM4.1 13h3.6c.1 2 .5 3.8 1.1 5.2A8 8 0 014.1 13zm0-2a8 8 0 014.7-7.2c-.6 1.4-1 3.2-1.1 5.2H4.1zM10.1 13h3.8c-.2 2.6-1.1 4.8-1.9 5.9-.8-1.1-1.7-3.3-1.9-5.9zm5.2 5.2c.6-1.4 1-3.2 1.1-5.2h3.6a8 8 0 01-4.7 5.2z" />
  ),
};

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  website: "Web oficial",
};

export function Footer() {
  return (
    <footer className="bg-tinta py-16 text-white/70">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Escudo className="h-10 w-10" />
              <span className="font-display text-lg font-semibold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm">{siteConfig.description}</p>
            <div className="mt-6 flex gap-3">
              {Object.entries(siteConfig.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLabels[key] ?? key}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-dorado hover:text-dorado"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    {socialIcons[key]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-eyebrow text-sm font-bold uppercase tracking-wide text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/#quienes-somos" className="hover:text-dorado">Quiénes somos</a></li>
              <li><a href="/#historia" className="hover:text-dorado">Historia</a></li>
              <li><a href="/#beneficios" className="hover:text-dorado">Beneficios</a></li>
              <li><a href="/#eventos" className="hover:text-dorado">Eventos</a></li>
              <li><a href="/actualidad" className="hover:text-dorado">Actualidad</a></li>
              <li><a href="/#inscripcion" className="hover:text-dorado">Únete</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-eyebrow text-sm font-bold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>{siteConfig.officialNumber} · Miembro de la Confederación Mundial de Peñas del FC Barcelona.</p>
        </div>
      </Container>
    </footer>
  );
}

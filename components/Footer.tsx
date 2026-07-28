import type { ReactElement } from "react";
import { ShieldPlaceholder } from "./ShieldPlaceholder";
import { Container } from "./ui/Container";
import { siteConfig } from "@/lib/data";

const socialIcons: Record<string, ReactElement> = {
  facebook: (
    <path d="M13 22v-8h3l.5-4H13V7.5c0-1.2.3-2 2-2h2V2h-3c-3.3 0-4.5 2-4.5 4.5V10H7v4h2.5v8H13z" />
  ),
  instagram: (
    <path d="M12 2c2.7 0 3 0 4.1.1 1.1.1 1.8.2 2.4.5.7.3 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.3.6.4 1.3.5 2.4.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 1.1-.2 1.8-.5 2.4-.3.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.6.3-1.3.4-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1-.1-1.8-.2-2.4-.5-.7-.3-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.3-.6-.4-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c.1-1.1.2-1.8.5-2.4.3-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.6-.3 1.3-.4 2.4-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
  ),
  twitter: (
    <path d="M21 5.9c-.7.3-1.5.6-2.3.7a4 4 0 001.8-2.2c-.8.5-1.6.8-2.6 1a4 4 0 00-6.8 3.6A11.4 11.4 0 013 4.7a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 18.4a11.3 11.3 0 006.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1z" />
  ),
  youtube: (
    <path d="M22 12s0-3.1-.4-4.6a2.8 2.8 0 00-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.4a2.8 2.8 0 00-2 2C2 8.9 2 12 2 12s0 3.1.4 4.6c.2 1 1 1.8 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.4a2.8 2.8 0 002-2C22 15.1 22 12 22 12zM10 15V9l5.2 3-5.2 3z" />
  ),
  tiktok: (
    <path d="M14 2h3a5.5 5.5 0 004 4v3a8.5 8.5 0 01-4-1v6.5A6.5 6.5 0 1110.5 8v3a3.5 3.5 0 103.5 3.5V2z" />
  ),
};

const socialLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X (Twitter)",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function Footer() {
  return (
    <footer className="bg-black py-16 text-white/70">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <ShieldPlaceholder className="h-10 w-9" />
              <span className="font-display text-lg font-bold uppercase text-white">
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
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#quienes-somos" className="hover:text-dorado">Quiénes somos</a></li>
              <li><a href="#historia" className="hover:text-dorado">Historia</a></li>
              <li><a href="#beneficios" className="hover:text-dorado">Beneficios</a></li>
              <li><a href="#eventos" className="hover:text-dorado">Eventos</a></li>
              <li><a href="#inscripcion" className="hover:text-dorado">Únete</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.whatsapp}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>Peña de aficionados independiente · No afiliada oficialmente al FC Barcelona.</p>
        </div>
      </Container>
    </footer>
  );
}

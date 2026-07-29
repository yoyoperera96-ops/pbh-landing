"use client";

import { useEffect, useState } from "react";
import { Escudo } from "./Escudo";
import { Container } from "./ui/Container";

const links = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#historia", label: "Historia" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#galeria", label: "Galería" },
  { href: "#eventos", label: "Eventos" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-tinta/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-3">
          <Escudo className="h-9 w-9 md:h-10 md:w-10" />
          <span className="font-display text-lg font-semibold leading-none text-white md:text-xl">
            Peña Barcelonista
            <span className="block font-eyebrow text-xs font-medium tracking-widest text-dorado">
              DE LA HABANA
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-dorado"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#inscripcion"
            className="rounded-full bg-grana px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-grana-light"
          >
            Únete a la Peña
          </a>
        </div>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
        >
          <span className="sr-only">Menú</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-tinta/98 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-dorado"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscripcion"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-grana px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Únete a la Peña
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { ShieldPlaceholder } from "./ShieldPlaceholder";
import { gallery } from "@/lib/data";

// Mosaicos de gradiente como placeholder visual. Sustituir cada tile por
// <Image src="/images/galeria/xx.jpg" .../> con fotos reales (ver README).
const gradients = [
  "from-grana to-tinta",
  "from-blau to-tinta",
  "from-dorado/80 to-grana",
  "from-tinta to-blau",
  "from-grana to-blau",
  "from-blau-dark to-dorado/60",
  "from-grana-dark to-tinta",
  "from-tinta to-grana",
];

export function Galeria() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galeria" className="bg-tinta/[0.03] py-24">
      <Container>
        <SectionHeading
          eyebrow="Galería"
          title="Momentos de nuestra afición"
          description="Encuentros, celebraciones y actividades de la familia culé habanera."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <button
              key={item.caption}
              onClick={() => setActive(index)}
              className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} shadow-card`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center opacity-90 transition group-hover:opacity-100">
                <ShieldPlaceholder className="h-10 w-9 opacity-80" />
                <span className="text-xs font-medium text-white/85">{item.caption}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </button>
          ))}
        </div>
      </Container>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className={`relative flex aspect-video w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br ${gradients[active % gradients.length]} p-10 text-center shadow-card`}
            onClick={(e) => e.stopPropagation()}
          >
            <ShieldPlaceholder className="h-16 w-14" />
            <p className="text-white">{gallery[active].caption}</p>
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { gallery } from "@/lib/data";

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
              key={item.image}
              onClick={() => setActive(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-card"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition group-hover:opacity-100">
                <span className="text-xs font-medium text-white">{item.caption}</span>
              </div>
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
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-card">
              <Image
                src={gallery[active].image}
                alt={gallery[active].caption}
                fill
                sizes="700px"
                className="object-cover"
              />
            </div>
            <p className="text-center text-white">{gallery[active].caption}</p>
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

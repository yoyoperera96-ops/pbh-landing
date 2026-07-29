"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-tinta/[0.03] py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="¿Tienes dudas?"
          description="Resolvemos las preguntas más comunes sobre la membresía en la PBH."
        />

        <div className="mt-12 divide-y divide-tinta/10 rounded-2xl border border-tinta/10 bg-hueso">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-eyebrow text-base font-bold uppercase text-tinta sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-grana/10 text-grana transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-tinta/70">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

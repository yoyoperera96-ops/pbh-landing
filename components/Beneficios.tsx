import type { ReactElement } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { benefits, type Benefit } from "@/lib/data";

const icons: Record<Benefit["icon"], ReactElement> = {
  shield: (
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
  ),
  users: (
    <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm7-2a3 3 0 100-6 3 3 0 000 6zM2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M16 14c3 0 6 2 6 6" />
  ),
  calendar: (
    <path d="M4 5h16v16H4V5zm0 4h16M8 3v4M16 3v4" />
  ),
  star: (
    <path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 6.9L12 17.8 5.8 21.1l1.4-6.9L2 9.4l7-.9L12 2z" />
  ),
  ticket: (
    <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4V8z" />
  ),
  handshake: (
    <path d="M2 12l5-5 4 3 3-3 5 5-3 3-2-2-3 3-3-3-2 2-4-3z" />
  ),
};

function BenefitIcon({ icon }: { icon: Benefit["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[icon]}
    </svg>
  );
}

export function Beneficios() {
  return (
    <section id="beneficios" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Ventajas de ser socio"
          title="Beneficios de pertenecer a la PBH"
          description="Ser socio de la Peña Barcelonista de La Habana es mucho más que ver fútbol: es formar parte de una comunidad."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-tinta/10 p-7 transition hover:-translate-y-1 hover:border-grana/30 hover:shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blaugrana-gradient text-dorado">
                <BenefitIcon icon={benefit.icon} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-tinta">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-tinta/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

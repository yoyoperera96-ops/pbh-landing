import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { events } from "@/lib/data";

export function Eventos() {
  return (
    <section id="eventos" className="bg-tinta py-24">
      <Container>
        <SectionHeading
          light
          eyebrow="Agenda"
          title="Próximos eventos"
          description="No te pierdas ninguna actividad de la Peña Barcelonista de La Habana."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-dorado/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dorado">
                {event.date}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">
                {event.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-white/70">{event.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {event.location}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          El calendario completo de encuentros se comparte a los socios inscritos.
        </p>
      </Container>
    </section>
  );
}

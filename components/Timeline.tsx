import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { timeline } from "@/lib/data";

export function Timeline() {
  return (
    <section id="historia" className="bg-tinta py-24">
      <Container>
        <SectionHeading
          light
          eyebrow="30 años de historia"
          title="Nuestra línea de tiempo"
          description="Un recorrido por los momentos que marcaron a la Peña Barcelonista de La Habana."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-4 top-0 h-full w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          <ol className="space-y-12">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <li
                  key={item.year}
                  className="relative flex flex-col gap-4 pl-12 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
                >
                  <span
                    className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-dorado bg-tinta md:left-1/2"
                    aria-hidden
                  />
                  <div className={`${isEven ? "md:pr-14 md:text-right" : "md:pl-14 md:order-2"}`}>
                    <span className="font-display text-2xl font-bold text-dorado">{item.year}</span>
                  </div>
                  <div className={`${isEven ? "md:pl-14" : "md:order-1 md:pr-14 md:text-right"}`}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <h3 className="font-display text-lg font-bold uppercase text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{item.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

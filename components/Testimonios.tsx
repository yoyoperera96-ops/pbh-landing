import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonios() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Voces de la peña"
          title="Lo que dicen nuestros socios"
          description="Historias reales de quienes ya forman parte de la familia culé de La Habana."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl border border-tinta/10 bg-white p-7 shadow-card"
            >
              <svg
                viewBox="0 0 32 24"
                className="h-8 w-10 text-grana/25"
                fill="currentColor"
              >
                <path d="M0 24V13.5C0 5.6 5.1 0.6 13 0v5.4c-4.3.6-6.6 3.3-6.9 7.1H13V24H0zm18 0V13.5c0-7.9 5.1-12.9 13-13.5v5.4c-4.3.6-6.6 3.3-6.9 7.1H31V24H18z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-tinta/80">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-tinta/10 pt-4">
                <p className="font-display text-lg font-bold uppercase text-tinta">
                  {testimonial.name}
                </p>
                <p className="text-sm text-grana">{testimonial.memberSince}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

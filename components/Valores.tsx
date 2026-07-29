import { Container } from "./ui/Container";
import { brandValues, siteConfig } from "@/lib/data";

// ADN de la marca (Manual de Identidad Visual PBH, sección 03).
export function Valores() {
  return (
    <section className="bg-tinta/[0.03] py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-blau">
            ADN de la marca
          </span>
          <p className="mt-3 font-display text-2xl italic text-tinta">
            &ldquo;{siteConfig.brandConcept}&rdquo;
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {brandValues.map((value) => (
            <div key={value.n} className="rounded flex flex-col gap-1.5 bg-tinta px-4 py-4">
              <span className="font-eyebrow text-2xl font-semibold text-dorado">{value.n}</span>
              <span className="font-body text-sm font-semibold text-hueso">{value.title}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { siteConfig } from "@/lib/data";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="bg-hueso py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="¿Quiénes somos?"
            title="Casi 30 años de barcelonismo en Cuba"
          />
          <div className="mt-6 space-y-5 text-tinta/75">
            <p>
              La <strong className="text-tinta">{siteConfig.name}</strong> nació en{" "}
              {siteConfig.foundedYear} de la mano de un grupo de aficionados que
              decidió transformar su pasión individual por el FC Barcelona en un
              proyecto colectivo: un espacio para vivir cada partido en comunidad.
            </p>
            <p>
              Desde entonces, generación tras generación de socios ha mantenido
              viva la tradición culé en La Habana, organizando encuentros,
              actividades y celebraciones que han convertido a la peña en un
              referente del barcelonismo cubano.
            </p>
            <p>
              Hoy, a las puertas de nuestro <strong className="text-tinta">30 aniversario</strong>,
              seguimos creciendo con la misma esencia de siempre: pasión,
              tradición y sentido de pertenencia, abriendo las puertas a nuevas
              generaciones de socios.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              { label: "Fundación", value: String(siteConfig.foundedYear) },
              { label: "Sede", value: "La Habana" },
              { label: "Aniversario", value: "30 años" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-tinta/10 p-4 text-center">
                <p className="font-eyebrow text-2xl font-bold text-grana">{item.value}</p>
                <p className="text-xs uppercase tracking-wide text-tinta/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -inset-6 rounded-[2rem] bg-blaugrana-gradient opacity-90 blur-2xl" aria-hidden />
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src="/images/galeria/galeria-05.jpg"
              alt="Un socio de la PBH con su hijo, familia culé de varias generaciones"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

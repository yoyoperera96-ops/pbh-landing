import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuienesSomos } from "@/components/QuienesSomos";
import { Timeline } from "@/components/Timeline";
import { Beneficios } from "@/components/Beneficios";
import { Galeria } from "@/components/Galeria";
import { Testimonios } from "@/components/Testimonios";
import { Eventos } from "@/components/Eventos";
import { FormularioInscripcion } from "@/components/FormularioInscripcion";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuienesSomos />
        <Timeline />
        <Beneficios />
        <Galeria />
        <Testimonios />
        <Eventos />
        <FormularioInscripcion />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

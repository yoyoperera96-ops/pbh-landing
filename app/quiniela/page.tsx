import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { sql } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { cerrarSesion } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Quiniela",
};

export const dynamic = "force-dynamic";

export default async function QuinielaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const rows = (await sql`
    SELECT usuario, estado FROM inscripciones WHERE id = ${session.id}
  `) as { usuario: string; estado: string }[];

  const socio = rows[0];
  if (!socio) redirect("/login");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-tinta px-4 pb-20 pt-32">
        <Container className="max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
                Quiniela PBH
              </span>
              <h1 className="mt-2 font-display text-2xl font-semibold text-hueso">
                Hola, {socio.usuario}
              </h1>
            </div>
            <form action={cerrarSesion}>
              <button type="submit" className="text-sm text-white/60 hover:text-dorado">
                Cerrar sesión
              </button>
            </form>
          </div>

          {socio.estado === "aceptada" ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-white/80">
              <p>
                Ya eres socio aceptado — la quiniela de la temporada 26-27 del FC
                Barcelona estará disponible aquí muy pronto. Vuelve a revisar en
                unos días.
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dorado/30 bg-dorado/10 p-8 text-white/80">
              <p>
                Tu solicitud de membresía está{" "}
                <strong className="text-dorado">{socio.estado}</strong>. La
                quiniela se habilita solo para socios aceptados por la Junta
                Directiva.
              </p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

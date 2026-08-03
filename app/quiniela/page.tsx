import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { sql } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { cerrarSesion } from "@/app/login/actions";
import { guardarPrediccion } from "./actions";
import { ClasificacionQuiniela } from "@/components/ClasificacionQuiniela";

export const metadata: Metadata = {
  title: "Quiniela",
};

export const dynamic = "force-dynamic";

const fechaFormatter = new Intl.DateTimeFormat("es-CU", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

type PartidoConPrediccion = {
  id: number;
  fecha: string;
  equipo_local: string;
  equipo_visitante: string;
  competicion: string | null;
  prediccion_local: number | null;
  prediccion_visitante: number | null;
};

export default async function QuinielaPage({
  searchParams,
}: {
  searchParams: Promise<{ vista?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { vista: vistaParam } = await searchParams;
  const vista = vistaParam === "temporada" ? "temporada" : "semana";

  const rows = (await sql`
    SELECT usuario, estado FROM inscripciones WHERE id = ${session.id}
  `) as { usuario: string; estado: string }[];

  const socio = rows[0];
  if (!socio) redirect("/login");

  const partidos =
    socio.estado === "aceptada"
      ? ((await sql`
          SELECT pq.id, pq.fecha, pq.equipo_local, pq.equipo_visitante, pq.competicion,
                 pr.prediccion_local, pr.prediccion_visitante
          FROM partidos_quiniela pq
          LEFT JOIN predicciones pr
            ON pr.partido_id = pq.id AND pr.inscripcion_id = ${session.id}
          WHERE pq.activo = true AND pq.estado = 'programado' AND pq.fecha >= CURRENT_DATE
          ORDER BY pq.fecha ASC
        `) as PartidoConPrediccion[])
      : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-tinta px-4 pb-20 pt-32">
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
                Quiniela PBH · Temporada 26-27
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

          {socio.estado !== "aceptada" && (
            <div className="mt-8 rounded-2xl border border-dorado/30 bg-dorado/10 p-8 text-white/80">
              <p>
                Tu solicitud de membresía está{" "}
                <strong className="text-dorado">{socio.estado}</strong>. La
                quiniela se habilita solo para socios aceptados por la Junta
                Directiva.
              </p>
            </div>
          )}

          {socio.estado === "aceptada" && (
            <>
              <p className="mt-6 text-sm text-white/60">
                Predice el resultado de cada partido antes de que empiece: 3
                puntos por el marcador exacto, 1 punto por acertar el signo
                (1 · X · 2).
              </p>

              <div className="mt-6">
                <ClasificacionQuiniela vista={vista} />
              </div>

              <div className="mt-6 space-y-3">
                {partidos.map((p) => (
                  <form
                    key={p.id}
                    action={guardarPrediccion}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <input type="hidden" name="partidoId" value={p.id} />
                    <div>
                      <p className="font-eyebrow text-xs font-semibold uppercase tracking-wide text-dorado">
                        {fechaFormatter.format(new Date(p.fecha))} ·{" "}
                        {p.competicion ?? ""}
                      </p>
                      <p className="mt-1 font-display text-lg text-hueso">
                        {p.equipo_local} <span className="text-white/40">vs</span>{" "}
                        {p.equipo_visitante}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="local"
                        min={0}
                        max={20}
                        required
                        defaultValue={p.prediccion_local ?? ""}
                        className="w-14 rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-center text-sm text-white outline-none focus:border-dorado"
                      />
                      <span className="text-white/40">-</span>
                      <input
                        type="number"
                        name="visitante"
                        min={0}
                        max={20}
                        required
                        defaultValue={p.prediccion_visitante ?? ""}
                        className="w-14 rounded-lg border border-white/15 bg-white/10 px-2 py-2 text-center text-sm text-white outline-none focus:border-dorado"
                      />
                      <button
                        type="submit"
                        className="ml-2 rounded-full bg-grana px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-grana-light"
                      >
                        {p.prediccion_local !== null ? "Actualizar" : "Guardar"}
                      </button>
                    </div>
                  </form>
                ))}

                {partidos.length === 0 && (
                  <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
                    Aún no hay partidos abiertos para predicción. Vuelve pronto.
                  </p>
                )}
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

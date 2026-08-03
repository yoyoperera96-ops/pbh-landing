import Link from "next/link";
import { sql } from "@/lib/db";

type Fila = {
  usuario: string;
  puntos: number;
  partidos: number;
};

function inicioSemana(base = new Date()) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  const dia = d.getDay(); // 0 = domingo
  const diferencia = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diferencia);
  return d;
}

function finSemana(inicio: Date) {
  const f = new Date(inicio);
  f.setDate(f.getDate() + 6);
  return f;
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function ClasificacionQuiniela({ vista }: { vista: "semana" | "temporada" }) {
  const inicio = inicioSemana();
  const fin = finSemana(inicio);

  const filas = (
    vista === "semana"
      ? await sql`
          SELECT i.usuario, SUM(p.puntos)::int AS puntos, COUNT(p.id)::int AS partidos
          FROM predicciones p
          JOIN inscripciones i ON i.id = p.inscripcion_id
          JOIN partidos_quiniela pq ON pq.id = p.partido_id
          WHERE pq.estado = 'jugado' AND p.puntos IS NOT NULL
            AND pq.fecha BETWEEN ${toISODate(inicio)} AND ${toISODate(fin)}
          GROUP BY i.usuario
          ORDER BY puntos DESC, i.usuario ASC
        `
      : await sql`
          SELECT i.usuario, SUM(p.puntos)::int AS puntos, COUNT(p.id)::int AS partidos
          FROM predicciones p
          JOIN inscripciones i ON i.id = p.inscripcion_id
          JOIN partidos_quiniela pq ON pq.id = p.partido_id
          WHERE pq.estado = 'jugado' AND p.puntos IS NOT NULL
          GROUP BY i.usuario
          ORDER BY puntos DESC, i.usuario ASC
        `
  ) as Fila[];

  const medallas = ["🥇", "🥈", "🥉"];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-hueso">Tabla de posiciones</h2>
        <div className="flex overflow-hidden rounded-full border border-white/15 text-xs">
          <Link
            href="/quiniela?vista=semana"
            className={`px-3 py-1.5 font-semibold ${
              vista === "semana" ? "bg-dorado text-tinta" : "text-white/60 hover:bg-white/5"
            }`}
          >
            Esta semana
          </Link>
          <Link
            href="/quiniela?vista=temporada"
            className={`px-3 py-1.5 font-semibold ${
              vista === "temporada" ? "bg-dorado text-tinta" : "text-white/60 hover:bg-white/5"
            }`}
          >
            Temporada
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {filas.map((f, idx) => (
          <div
            key={f.usuario}
            className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-sm"
          >
            <span className="flex items-center gap-2 text-white/85">
              <span className="w-6 text-center font-eyebrow text-white/40">
                {medallas[idx] ?? idx + 1}
              </span>
              {f.usuario}
            </span>
            <span className="font-eyebrow font-bold text-dorado">{f.puntos} pts</span>
          </div>
        ))}

        {filas.length === 0 && (
          <p className="py-6 text-center text-sm text-white/50">
            {vista === "semana"
              ? "Todavía no hay partidos puntuados esta semana."
              : "Todavía no hay partidos puntuados esta temporada."}
          </p>
        )}
      </div>
    </div>
  );
}

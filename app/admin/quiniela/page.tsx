import Link from "next/link";
import { sql } from "@/lib/db";
import {
  sincronizarCalendario,
  alternarActivo,
  actualizarResultadoAutomatico,
  guardarResultadoManual,
} from "./actions";

export const dynamic = "force-dynamic";

type PartidoQuiniela = {
  id: number;
  fecha: string;
  equipo_local: string;
  equipo_visitante: string;
  competicion: string | null;
  resultado_local: number | null;
  resultado_visitante: number | null;
  estado: "programado" | "jugado";
  activo: boolean;
};

const fechaFormatter = new Intl.DateTimeFormat("es-CU", { dateStyle: "medium" });

export default async function AdminQuinielaPage() {
  const partidos = (await sql`
    SELECT id, fecha, equipo_local, equipo_visitante, competicion,
           resultado_local, resultado_visitante, estado, activo
    FROM partidos_quiniela
    ORDER BY fecha ASC
  `) as PartidoQuiniela[];

  return (
    <main className="min-h-screen bg-hueso p-6 font-body text-tinta sm:p-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="text-sm text-tinta/50 hover:text-grana">
          ← Solicitudes de inscripción
        </Link>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold">Quiniela — Calendario</h1>
            <p className="mt-1 text-sm text-tinta/60">
              {partidos.length} partido{partidos.length === 1 ? "" : "s"} de competición
              oficial importado{partidos.length === 1 ? "" : "s"}.
            </p>
          </div>
          <div className="flex gap-3">
            <form action={actualizarResultadoAutomatico}>
              <button
                type="submit"
                className="rounded-full bg-grana px-5 py-2.5 text-sm font-semibold text-white hover:bg-grana-light"
              >
                Actualizar resultados
              </button>
            </form>
            <form action={sincronizarCalendario}>
              <button
                type="submit"
                className="rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white hover:bg-tinta-light"
              >
                Sincronizar calendario
              </button>
            </form>
          </div>
        </div>
        <p className="mt-2 text-xs text-tinta/40">
          &quot;Actualizar resultados&quot; solo trae el último partido jugado según
          fcbarcelona.com. Si falta alguno (dos partidos seguidos sin revisar,
          o cambió el formato de la web oficial), escribe el marcador a mano
          abajo — funciona igual para corregir un resultado ya guardado.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-tinta/10 bg-white">
          {partidos.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-tinta/5 px-5 py-4 last:border-b-0"
            >
              <div>
                <p className="text-xs text-tinta/50">
                  {fechaFormatter.format(new Date(p.fecha))} · {p.competicion ?? "—"}
                </p>
                <p className="font-medium">
                  {p.equipo_local} <span className="text-tinta/40">vs</span> {p.equipo_visitante}
                </p>
                {p.estado === "jugado" && (
                  <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">
                    Jugado: {p.resultado_local} - {p.resultado_visitante}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <form action={guardarResultadoManual} className="flex items-center gap-1.5">
                  <input type="hidden" name="partidoId" value={p.id} />
                  <input
                    type="number"
                    name="golesLocal"
                    min={0}
                    max={20}
                    required
                    defaultValue={p.resultado_local ?? ""}
                    className="w-12 rounded-lg border border-tinta/15 px-1.5 py-1.5 text-center text-sm outline-none focus:border-grana"
                  />
                  <span className="text-tinta/30">-</span>
                  <input
                    type="number"
                    name="golesVisitante"
                    min={0}
                    max={20}
                    required
                    defaultValue={p.resultado_visitante ?? ""}
                    className="w-12 rounded-lg border border-tinta/15 px-1.5 py-1.5 text-center text-sm outline-none focus:border-grana"
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-tinta/20 px-3 py-1.5 text-xs font-semibold text-tinta hover:bg-tinta/5"
                  >
                    Guardar
                  </button>
                </form>

                <form action={alternarActivo}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="activo" value={String(p.activo)} />
                  <button
                    type="submit"
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      p.activo
                        ? "border-blau/30 text-blau hover:bg-blau/5"
                        : "border-tinta/20 text-tinta/40 hover:bg-tinta/5"
                    }`}
                  >
                    {p.activo ? "Activo" : "Inactivo"}
                  </button>
                </form>
              </div>
            </div>
          ))}

          {partidos.length === 0 && (
            <p className="p-8 text-center text-tinta/50">
              Aún no hay partidos importados. Dale a &quot;Sincronizar calendario&quot;.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

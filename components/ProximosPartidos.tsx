import { getProximosPartidos } from "@/lib/fcbFixtures";

const fechaFormatter = new Intl.DateTimeFormat("es-CU", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export async function ProximosPartidos() {
  const partidos = await getProximosPartidos(7);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
            Próximos 7 días
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-hueso sm:text-3xl">
            Calendario del FC Barcelona
          </h2>
        </div>
        <a
          href="https://www.fcbarcelona.com/es/futbol/primer-equipo/calendario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-dorado hover:underline"
        >
          Ver calendario completo →
        </a>
      </div>

      {partidos.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partidos.map((p, idx) => (
            <a
              key={`${p.fecha}-${idx}`}
              href={p.url ?? "https://www.fcbarcelona.com/es/futbol/primer-equipo/calendario"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-dorado/40 hover:bg-white/10"
            >
              <span className="font-eyebrow text-xs font-semibold uppercase tracking-wide text-dorado">
                {fechaFormatter.format(new Date(p.fecha + "T00:00:00"))}
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-hueso">
                {p.equipoLocal} <span className="text-white/40">vs</span> {p.equipoVisitante}
              </p>
              {p.sede && <p className="mt-2 text-sm text-white/60">{p.sede}</p>}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No hay partidos programados del FC Barcelona en los próximos 7 días. Consulta el
          calendario completo en{" "}
          <a
            href="https://www.fcbarcelona.com/es/futbol/primer-equipo/calendario"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dorado hover:underline"
          >
            fcbarcelona.com
          </a>
          .
        </p>
      )}
    </div>
  );
}

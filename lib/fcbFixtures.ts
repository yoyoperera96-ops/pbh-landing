// Próximos partidos del primer equipo del FC Barcelona, obtenidos de los datos
// estructurados (JSON-LD schema.org/SportsEvent) que el propio fcbarcelona.com
// publica en su página oficial de calendario — no son datos inventados ni un
// scraping del maquetado visual, sino el mismo bloque que el club expone para
// que buscadores y apps externas lean su calendario.
const FCB_SCHEDULE_URL = "https://www.fcbarcelona.com/es/futbol/primer-equipo/calendario";

export type PartidoFCB = {
  nombre: string;
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string; // ISO yyyy-mm-dd
  sede: string | null;
  url: string | null;
};

function extraerEventos(html: string): PartidoFCB[] {
  const bloques = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];

  for (const bloque of bloques) {
    try {
      const data = JSON.parse(bloque[1]);
      const eventos = Array.isArray(data) ? data : [data];
      const partidos = eventos.filter((e) => e?.["@type"] === "SportsEvent");
      if (partidos.length > 0) {
        return partidos.map((e) => ({
          nombre: e.name ?? "",
          equipoLocal: e.homeTeam?.name ?? "",
          equipoVisitante: e.awayTeam?.name ?? "",
          fecha: e.startDate ?? "",
          sede: e.location?.name ?? null,
          url: e.url ?? null,
        }));
      }
    } catch {
      // Bloque JSON-LD no parseable (p.ej. de otro tipo) — se ignora y se sigue
      // con el siguiente, no debe tumbar la carga de la página.
    }
  }

  return [];
}

// Se cachea 1 hora (revalidate) para no golpear fcbarcelona.com en cada visita.
export async function getProximosPartidos(dias = 7): Promise<PartidoFCB[]> {
  try {
    const res = await fetch(FCB_SCHEDULE_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PBH-LaHabana/1.0)" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const html = await res.text();
    const todos = extraerEventos(html);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const limite = new Date(hoy);
    limite.setDate(limite.getDate() + dias);

    return todos
      .filter((p) => {
        if (!p.fecha) return false;
        const fecha = new Date(p.fecha + "T00:00:00");
        return fecha >= hoy && fecha <= limite;
      })
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  } catch {
    return [];
  }
}

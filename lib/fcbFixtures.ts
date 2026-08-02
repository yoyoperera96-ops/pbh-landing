// Partidos del primer equipo del FC Barcelona, obtenidos de los datos
// estructurados (JSON-LD schema.org/SportsEvent) que el propio fcbarcelona.com
// publica en sus páginas oficiales de calendario y resultados — no son datos
// inventados ni un scraping del maquetado visual, sino el mismo bloque que el
// club expone para que buscadores y apps externas lo lean.
const FCB_CALENDARIO_URL = "https://www.fcbarcelona.com/es/futbol/primer-equipo/calendario";
const FCB_RESULTADOS_URL = "https://www.fcbarcelona.com/es/futbol/primer-equipo/resultados";

// Competiciones oficiales que cuentan para la quiniela — se excluyen
// amistosos de pretemporada, trofeos y giras.
const COMPETICION_OFICIAL_RE = /la liga|champions league|copa del rey|supercopa/i;

export type PartidoFCB = {
  nombre: string;
  equipoLocal: string;
  equipoVisitante: string;
  competicion: string | null;
  fecha: string; // ISO yyyy-mm-dd
  sede: string | null;
  url: string | null;
};

function extraerCompeticion(nombre: string): string | null {
  const match = nombre.match(/\(([^)]+)\)\s*$/);
  return match ? match[1] : null;
}

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
          competicion: extraerCompeticion(e.name ?? ""),
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

async function fetchEventos(url: string): Promise<PartidoFCB[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PBH-LaHabana/1.0)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return extraerEventos(await res.text());
  } catch {
    return [];
  }
}

// Se cachea 1 hora (revalidate) para no golpear fcbarcelona.com en cada visita.
export async function getProximosPartidos(dias = 7): Promise<PartidoFCB[]> {
  const todos = await fetchEventos(FCB_CALENDARIO_URL);

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
}

// Calendario completo de competiciones oficiales (Liga, Champions, Copa del
// Rey, Supercopa) — para sembrar la quiniela de la temporada.
export async function getCalendarioTemporadaOficial(): Promise<PartidoFCB[]> {
  const todos = await fetchEventos(FCB_CALENDARIO_URL);
  return todos
    .filter((p) => p.competicion && COMPETICION_OFICIAL_RE.test(p.competicion))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export type ResultadoFCB = {
  equipoLocal: string;
  equipoVisitante: string;
  fecha: string;
  golesLocal: number;
  golesVisitante: number;
};

// Lee el marcador del último partido jugado desde la página de resultados.
// Es el único partido cuyo marcador llega en el HTML plano sin ejecutar JS
// (ver README, sección Quiniela) — por eso se revisa uno a la vez.
export async function getUltimoResultado(): Promise<ResultadoFCB | null> {
  try {
    const res = await fetch(FCB_RESULTADOS_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PBH-LaHabana/1.0)" },
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const eventos = extraerEventos(html);
    const ultimo = eventos.find((e) => e.fecha);
    if (!ultimo) return null;

    // El marcador vive dentro de un div.fixture-info__score anidado en
    // results-hero__score; se busca de forma laxa (sin asumir el anidado
    // exacto de tags) para no romperse ante pequeños cambios de maquetado.
    const marcadorMatch = html.match(/fixture-info__score[\s\S]{0,200}?(\d+)\s*-\s*(\d+)/);
    if (!marcadorMatch) return null;

    return {
      equipoLocal: ultimo.equipoLocal,
      equipoVisitante: ultimo.equipoVisitante,
      fecha: ultimo.fecha,
      golesLocal: Number(marcadorMatch[1]),
      golesVisitante: Number(marcadorMatch[2]),
    };
  } catch {
    return null;
  }
}

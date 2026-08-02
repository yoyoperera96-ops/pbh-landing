import { neon } from "@neondatabase/serverless";

export type EstadoInscripcion = "pendiente" | "aceptada" | "rechazada";

export type Inscripcion = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  municipio: string | null;
  mensaje: string | null;
  carnet_identidad: string | null;
  direccion: string | null;
  estado: EstadoInscripcion;
  numero_socio: number | null;
  procesado_en: string | null;
  creado_en: string;
};

// POSTGRES_URL la inyecta Vercel automáticamente al conectar la base de datos
// Postgres (Neon) al proyecto. En local, se toma de .env.local (ver README).
// Se resuelve de forma perezosa para no romper el build cuando la variable
// aún no está definida (p.ej. antes de configurar la base de datos).
function getSql() {
  if (!process.env.POSTGRES_URL) {
    throw new Error(
      "Falta la variable de entorno POSTGRES_URL. Configura la base de datos Postgres en Vercel o en .env.local."
    );
  }
  return neon(process.env.POSTGRES_URL);
}

export const sql: ReturnType<typeof neon> = ((...args: Parameters<ReturnType<typeof neon>>) =>
  getSql()(...args)) as ReturnType<typeof neon>;

export type EstadoFiltro = "todas" | EstadoInscripcion;

// Búsqueda por nombre/carné/correo/teléfono/municipio/dirección/mensaje, con
// filtro opcional por estado. Usado por el panel /admin y por la exportación CSV.
export async function getInscripciones({
  q,
  estado,
}: {
  q?: string | null;
  estado?: EstadoFiltro | string | null;
}) {
  const qParam = q?.trim() ? q.trim() : null;
  const estadoParam = estado && estado !== "todas" ? estado : null;

  return sql`
    SELECT id, nombre, carnet_identidad, correo, telefono, direccion, municipio,
           mensaje, estado, numero_socio, procesado_en, creado_en
    FROM inscripciones
    WHERE (${estadoParam}::text IS NULL OR estado = ${estadoParam})
      AND (
        ${qParam}::text IS NULL OR
        nombre ILIKE '%' || ${qParam} || '%' OR
        correo ILIKE '%' || ${qParam} || '%' OR
        telefono ILIKE '%' || ${qParam} || '%' OR
        carnet_identidad ILIKE '%' || ${qParam} || '%' OR
        municipio ILIKE '%' || ${qParam} || '%' OR
        direccion ILIKE '%' || ${qParam} || '%' OR
        mensaje ILIKE '%' || ${qParam} || '%'
      )
    ORDER BY creado_en DESC
  ` as unknown as Promise<Inscripcion[]>;
}

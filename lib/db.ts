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

// Crea la tabla de inscripciones. Ejecutar una sola vez:
//   npm run db:setup
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`
  CREATE TABLE IF NOT EXISTS inscripciones (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    telefono TEXT NOT NULL,
    municipio TEXT,
    mensaje TEXT,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

console.log("Tabla 'inscripciones' lista.");

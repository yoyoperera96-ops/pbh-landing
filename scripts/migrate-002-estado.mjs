// Agrega carné de identidad, dirección y el flujo de aceptar/rechazar.
// Ejecutar una sola vez: node --env-file=.env.local scripts/migrate-002-estado.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`
  ALTER TABLE inscripciones
    ADD COLUMN IF NOT EXISTS carnet_identidad TEXT,
    ADD COLUMN IF NOT EXISTS direccion TEXT,
    ADD COLUMN IF NOT EXISTS estado TEXT NOT NULL DEFAULT 'pendiente',
    ADD COLUMN IF NOT EXISTS procesado_en TIMESTAMPTZ
`;

console.log("Migración aplicada: carnet_identidad, direccion, estado, procesado_en.");

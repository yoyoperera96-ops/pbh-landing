// Agrega usuario/contraseña a inscripciones para que la solicitud de ingreso
// también sirva como registro de cuenta de socio.
// Ejecutar una sola vez: node --env-file=.env.local scripts/migrate-004-cuentas.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`
  ALTER TABLE inscripciones
    ADD COLUMN IF NOT EXISTS usuario TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS password_hash TEXT
`;

console.log("Migración aplicada: usuario, password_hash.");

// Agrega token de activación de cuenta para peñistas aceptados antes de que
// existiera el sistema de usuario/contraseña (registro + login).
// Ejecutar una sola vez: node --env-file=.env.local scripts/migrate-006-activacion.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`
  ALTER TABLE inscripciones
    ADD COLUMN IF NOT EXISTS activacion_token TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS activacion_expira TIMESTAMPTZ
`;

console.log("Migración aplicada: activacion_token, activacion_expira.");

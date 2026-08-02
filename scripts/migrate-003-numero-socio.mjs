// Agrega un número consecutivo de socio, asignado al aceptar una solicitud.
// Ejecutar una sola vez: node --env-file=.env.local scripts/migrate-003-numero-socio.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`CREATE SEQUENCE IF NOT EXISTS socio_numero_seq START WITH 1`;
await sql`
  ALTER TABLE inscripciones
    ADD COLUMN IF NOT EXISTS numero_socio INTEGER UNIQUE
`;

// Si ya había solicitudes aceptadas antes de este cambio, les asigna número
// en orden cronológico de aceptación.
const pendientesDeNumero = await sql`
  SELECT id FROM inscripciones
  WHERE estado = 'aceptada' AND numero_socio IS NULL
  ORDER BY procesado_en ASC, id ASC
`;

for (const row of pendientesDeNumero) {
  await sql`
    UPDATE inscripciones
    SET numero_socio = nextval('socio_numero_seq')
    WHERE id = ${row.id}
  `;
}

console.log(
  `Migración aplicada. Socios ya aceptados numerados retroactivamente: ${pendientesDeNumero.length}.`
);
